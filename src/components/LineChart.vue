<template>
  <div>
    <canvas ref="chartCanvas" width="800" height="400"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { mapGetters } from 'vuex';

export default {
  extends: Line,
  computed: {
    ...mapGetters('chartDataModule', [
      'getChartData',
      'getProfitData',
      'getFbaAmountData',
      'getFbmAmountData'
    ])
  },
 mounted() {
  if (this.getChartData && this.getProfitData && this.getFbaAmountData && this.getFbmAmountData) {
    // Veriler mevcutsa grafik oluşturma işlemini gerçekleştir
    this.renderChart({
      labels: this.getChartData.map(item => item.date),
      datasets: [
        {
          label: 'Total Sales',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: this.getFbaAmountData.map((fbaAmount, index) => fbaAmount + this.getFbmAmountData[index])
        },
        {
          label: 'Profit',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          data: this.getProfitData
        }
      ]
    }, { responsive: true, maintainAspectRatio: false });
  }
}

};
</script>
