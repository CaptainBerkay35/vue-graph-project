<template>
    <div>
        <div ref="chart"></div>
        <div v-if="selectedColumns.length > 0">
            <ComparisonTable/>
        </div>
    </div>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import ComparisonTable from './InfoTable.vue';
import { mapState, mapActions,mapGetters } from 'vuex';
HighchartsMore(Highcharts);

export default {
    props: {
        dailyData: {
            type: Array,
            required: true
        }
    },
    components: {
        ComparisonTable
    },
    data() {
        return {
            selectedColumns: []
        };
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
        },
        selectedColumns: {
            handler(newValue, oldValue) {
                if (newValue.length !== oldValue.length) {
                    this.$nextTick(() => {
                    });
                }
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
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: this.columnClickHandler
                            }
                        }
                    },
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
                    showInLegend: true, 
                    legendIndex: 0 
                }],
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                }

            });
        },

        columnClickHandler(event) {
            const clickedColumn = event.point.category;

            if (this.selectedColumns.length < 2) {
                if (this.selectedColumns.includes(clickedColumn)) {
                    this.selectedColumns = this.selectedColumns.filter(column => column !== clickedColumn);
                } else {
                    this.selectedColumns.push(clickedColumn);
                    this.fetchBarData();
                }
            } else {
                if (this.selectedColumns.includes(clickedColumn)) {
                    this.selectedColumns = this.selectedColumns.filter(column => column !== clickedColumn);
                    this.fetchBarData();
                   
                } else {
                    console.log('Maximum selection reached. Deselect a column first.');
                }
            }
        },

        async fetchBarData() {
            try {
                let isDaysCompare = this.selectedColumns.length === 2 ? 1 : 0;

                await this.$store.dispatch('barInfo/fetchBarData', {
                    isDaysCompare: isDaysCompare,
                    marketplace: this.$store.getters['auth/getMarketplace'],
                    pageNumber: 1,
                    pageSize: 30,
                    salesDate: this.selectedColumns[0],
                    salesDate2: isDaysCompare === 1 ? this.selectedColumns[1] : '',
                    sellerId: this.$store.getters['auth/getSellerId']
                });
            } catch (error) {
                console.error('Error fetching bar data:', error);
            }
        }
    },
    computed: {
    ...mapGetters('barInfo', ['getBarData']),

  },
}
</script>
