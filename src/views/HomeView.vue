<template>
  <div class="w-full flex flex-col px-2">
    <div class="flex justify-end items-end mb-2">
      <select v-model="selectedDays" @change="updateChartData"
        class="block appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-gray-500">
        <option value="7" class="text-gray-700">7 Days</option>
        <option value="14" class="text-gray-700">14 Days</option>
        <option value="30" class="text-gray-700">30 Days</option>
        <option value="60" class="text-gray-700">60 Days</option>
      </select>
    </div>

    <div ref="chart">
      <BarChart :dailyData="dailyData" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'HomeView',
  components: {
    BarChart
  },
  data() {
    return {
      selectedDays: '14'
    };
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
      const days = parseInt(this.selectedDays) - 1;
      try {
        await this.$store.dispatch('chartDataModule/fetchDataForChart', { marketplace, sellerId, days });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },
    updateChartData() {
      this.fetchChartData();
    }
  }
}
</script>
