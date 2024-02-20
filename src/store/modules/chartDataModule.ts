// chartDataModule.ts

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

@Module({ namespaced: true })
export default class ChartDataModule extends VuexModule {
    chartData: any = null;
    dailyProfits: { day: string, profit: number }[] = []; // Günlük profitleri ve günleri tutacak dizi
    fbaAmountData: number[] = [];
    fbmAmountData: number[] = [];
    dailyData: { day: string, dailyProfit: number, totalAmount: number }[] = []; // Günlük veri

    @Action
    async fetchDataForChart({ marketplace, sellerId }: { marketplace: string | null, sellerId: string | null }): Promise<void> {
        try {
            const response = await axios.post(
                "https://iapitest.eva.guru/data/daily-sales-overview/",
                {
                    customDateData: null,
                    day: 30,
                    excludeYoYData: true,
                    marketplace: marketplace,
                    requestStatus: 0,
                    sellerId: sellerId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.context.rootGetters['auth/getToken']}`,
                    },
                }
            );

            const rawData = response.data.Data.item;
            console.log('rawData:', rawData);

            this.context.commit('setChartData', { rawData });
        } catch (error) {
            console.error("Error fetching data for chart:", error);
        }
    }

    @Mutation
    setChartData(data: any): void {
        const dailyProfits = data.rawData.map((item: any) => ({ day: item.date, profit: item.profit }));
        const fbaAmountData = data.rawData.map((item: any) => item.fbaAmount);
        const fbmAmountData = data.rawData.map((item: any) => item.fbmAmount);

        // Calculate total amount for each day
        const totalAmounts = data.rawData.map((item: any) => item.fbaAmount + item.fbmAmount);

        // Create an array to store daily data
        this.dailyData = dailyProfits.map((dailyProfit: any, index: number) => {
            return {
                day: dailyProfit.day,
                dailyProfit: dailyProfit.profit,
                totalAmount: totalAmounts[index] // Total amount for the day
            };
        });
        console.log("dailyData", this.dailyData);
    }
    
    get getChartData() {
        return this.chartData;
    }

    get getDailyProfits() {
        return this.dailyProfits;
    }

    get getFbaAmountData() {
        return this.fbaAmountData;
    }

    get getFbmAmountData() {
        return this.fbmAmountData;
    }

    get getDailyData() {
        return this.dailyData;
    }
}
