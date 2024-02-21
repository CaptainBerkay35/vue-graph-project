import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

@Module({ namespaced: true })
export default class BarInfoModule extends VuexModule {
    barData: any[] = [];

    @Action
    async fetchBarData({
        isDaysCompare,
        marketplace,
        pageNumber,
        pageSize,
        salesDate,
        salesDate2,
        sellerId
    }: {
        isDaysCompare: number,
        marketplace: string,
        pageNumber: number,
        pageSize: number,
        salesDate: string,
        salesDate2: string,
        sellerId: string
    }): Promise<void> {
        try {
            const response = await axios.post('https://iapitest.eva.guru/data/daily-sales-sku-list', {
                isDaysCompare,
                marketplace,
                pageNumber,
                pageSize,
                salesDate,
                salesDate2,
                sellerId
            }, {
                headers: {
                    Authorization: `Bearer ${this.context.rootGetters['auth/getToken']}`,
                },
            });
            const barInfo = response.data.Data.item
            console.log("deneme",barInfo)
            this.context.commit('setBarData', barInfo);
        } catch (error) {
            console.error('Error fetching bar data:', error);
        }
    }

    @Mutation
    setBarData(data: any[]): void {
        this.barData = data;
    }

    get getBarData() {
        return this.barData;
    }
}
