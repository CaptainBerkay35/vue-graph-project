<template>
  <div>
    <!-- Burada sayfa içeriği yer alabilir -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  mounted() {
    this.fetchChartData();
  },
  methods: {
    ...mapActions('chartDataModule', ['fetchDataForChart']),
    fetchChartData() {
      const marketplace = this.$store.getters['auth/getMarketplace'];
      const sellerId = this.$store.getters['auth/getSellerId'];
      this.$store.dispatch('chartDataModule/fetchDataForChart', { marketplace, sellerId });
    }
  }
}
</script>

