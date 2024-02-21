<template>
    <div class="relative overflow-x-auto shadow-md">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-600 table-fixed">
      
        <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-800">
          <tr>
            <th scope="col" class="px-6 py-3">SKU</th>
            <th scope="col" class="px-6 py-3">Product Name</th>
            <th scope="col" class="px-6 py-3">{{ barData.selectedDate }}</th>
            <th scope="col" class="px-6 py-3">{{ barData.selectedDate2 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="odd:bg-white odd:dark:bg-gray-300 even:bg-gray-100 border-b dark:border-gray-700"
            v-for="(item, index) in displayedItems" :key="index"
          >
            <td class="px-6 h-16">{{ item.sku }}</td>
            <td class="px-6">{{ truncatedProductName[index] }}</td>
            <td class="px-6">{{ item.amount }}</td>
            <td class="px-6" v-if="barData.selectedDate2 !== 0">{{ item.amount2 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center bg-gray-500 py-2">
        <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="goToPage(pageNumber)"
          class="mx-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('barInfo', ['getBarData']),
      barData() {
        return this.getBarData;
      },
      truncatedProductName() {
        return this.getBarData.skuList.map(item => {
          const maxLength = 80;
          return item.productName.length > maxLength
            ? item.productName.substring(0, maxLength) + '...'
            : item.productName;
        });
      },
      totalPages() {
        return Math.ceil(this.getBarData.skuList.length / 10);
      },
      displayedItems() {
        const start = (this.currentPage - 1) * 10;
        const end = start + 10;
        return this.getBarData.skuList.slice(start, end);
      }
    },
    data() {
      return {
        currentPage: 1
      };
    },
    methods: {
      goToPage(pageNumber) {
        this.currentPage = pageNumber;
      }
    },
  };
  </script>
  