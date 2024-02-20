<template>
    <div>
        <div ref="chart"></div>
    </div>
</template>
  
<script>
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

export default {
    props: {
        dailyData: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.renderChart();
    },
    watch: {
        dailyData: {
            handler() {
                this.renderChart();
            },
            deep: true
        }
    },
    methods: {
        renderChart() {
            const dayCount = this.dailyData.length; 
            const fontSize = dayCount > 14 ? '10px' : '14px'; 

            Highcharts.chart(this.$refs.chart, {
                chart: {
                    type: 'column',
                    height: '500px'
                },
                title: {
                    text: 'Daily Data Chart'
                },
                xAxis: {
                    categories: this.dailyData.map(item => item.day),
                    title: {
                        text: 'Days'
                    },
                    labels: {
                        style: {
                            fontSize: fontSize 
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Amount and Profit'
                    },
                    min: -500,
                    stackLabels: {
                        enabled: false
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        grouping: false,
                        dataLabels: {
                            enabled: function () {
                                return this.series.name === 'Total Amount';
                            },
                            inside: true,
                            rotation: -90, 
                            crop: false,
                            overflow: 'none',
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',').slice(0, 6);
                            }
                        }
                    }
                },
                series: [{
                    name: 'Daily Profit',
                    data: this.dailyData.map(item => item.dailyProfit),
                    dataLabels: {
                        enabled: false 
                    }
                }, {
                    name: 'Total Amount',
                    data: this.dailyData.map(item => item.totalAmount),
                    showInLegend: true, // Lejantı göster
                    legendIndex: 0 // Sıralama indeksi
                }],
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                }
            });
        }
    }
}
</script>
