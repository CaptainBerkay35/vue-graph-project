// chartDataModule.ts

import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import axios from 'axios';

@Module({ namespaced: true })
export default class ChartDataModule extends VuexModule {
    @Action
    async fetchDataForChart({ marketplace, sellerId }: { marketplace: string | null, sellerId: string | null }): Promise<void> {
      try {
        if (!marketplace || !sellerId) {
          console.error("Marketplace or sellerId not found.");
          return;
        }

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

        console.log("Chart data:", response.data);
      
      } catch (error) {
        console.error("Error fetching data for chart:", error);
      }
    }
}
