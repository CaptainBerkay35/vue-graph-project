<template>
  <div class="w-full h-3/4 px-2">
    <BarChart :dailyData="dailyData" />
  </div>
</template>

<script>
import { mapState , mapActions} from 'vuex';
import BarChart from '@/components/BarChart.vue'; 

export default {
  name: 'HomeView',
  components: {
    BarChart
  },
  computed: {
    ...mapState({
      dailyData: state => state.chartDataModule.dailyData
    })
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    ...mapActions('chartDataModule', ['fetchDataForChart']),
    async fetchChartData() {
      const marketplace = this.$store.getters['auth/getMarketplace'];
      const sellerId = this.$store.getters['auth/getSellerId'];
      try {
        await this.$store.dispatch('chartDataModule/fetchDataForChart', { marketplace, sellerId });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }
  }
}
</script>
