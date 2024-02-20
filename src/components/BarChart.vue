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
    methods: {
        renderChart() {
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
                                // Sadece Total Amount sütunu için data labels aktif olsun
                                return this.series.name === 'Total Amount';
                            },
                            inside: true,
                            rotation: -90, // Döndürme
                            crop: false,
                            overflow: 'none',
                            formatter: function () {
                                // Total amount değerlerini sadece 6 haneli olarak biçimlendir
                                return Highcharts.numberFormat(this.y, 0, '.', ',').slice(0, 6);
                            }
                        }
                    }
                },

                series: [{
                    name: 'Daily Profit',
                    data: this.dailyData.map(item => item.dailyProfit),
                    dataLabels: {
                        enabled: false // Profit değerlerini gösterme
                    }
                }, {
                    name: 'Total Amount',
                    data: this.dailyData.map(item => item.totalAmount),
                    showInLegend: false
                }]
            });
        }
    }
}
</script>
  