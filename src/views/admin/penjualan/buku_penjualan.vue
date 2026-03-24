<template>
  <div
    id="loading-modal"
    class="fixed items-center justify-center min-w-full min-h-full z-50"
    :class="isLoading ? 'flex' : 'hidden'"
  >
    <div
      class="absolute z-50 min-w-full min-h-screen bg-black opacity-50"
    ></div>
    <div class="text-6xl animate-spin z-50 text-white">
      <Icon icon="fa:circle-o-notch" />
    </div>
  </div>
  <Admin>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 class="text-2xl font-semibold text-gray-900">Buku Penjualan</h1>
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <!-- Search Input -->
          <div class="relative rounded-md shadow-sm w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="fa:search" class="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              v-model="searchTransactionQuery"
              class="focus:ring-black focus:border-black block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Cari Transaksi..."
            />
          </div>
          <!-- Date Picker -->
          <div class="relative rounded-md shadow-sm w-full sm:w-64 text-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
            >
              <Icon icon="fa:calendar" class="h-4 w-4 text-gray-400" />
            </div>
            <VueDatePicker
              v-model="date"
              @update:model-value="getAllTransactions"
              locale="id"
              :start-time="[
                { hours: 0, minutes: 0, seconds: 0 },
                { hours: 23, minutes: 59, seconds: 59 },
              ]"
              range
              :enable-time-picker="false"
              class="w-full"
            />
          </div>
          <button
            @click="printPage"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            <Icon icon="uil:print" class="mr-2" />
            Print
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div v-if="transactions.length === 0 && !isLoading" class="text-center py-20 text-gray-500 bg-white rounded-lg shadow">
        Tidak ada transaksi pada tanggal {{ formattedDateDisplay }}.
      </div>
      <div v-else>
        <!-- Ledger Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 items-start min-h-[600px]">
          <div v-for="(column, colIndex) in paginatedTransactions" :key="colIndex" class="flex flex-col gap-4">
            <div 
              v-for="(transaction, transIndex) in column" 
              :key="transaction.id" 
              class="bg-white p-3 rounded shadow-sm border-l-4 border-black font-mono text-[13px] leading-tight print:shadow-none print:border-l-2"
            >
              <div class="flex justify-between items-start mb-1 border-b border-gray-100 pb-1">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[11px] font-bold">
                    {{ transaction.display_index }}
                  </span>
                  <span class="font-bold uppercase">{{ transaction.customer?.nickname || transaction.customer?.name || 'Customer' }}</span>
                </div>
                <span class="text-gray-500">{{ formatTime(transaction.created_at) }}</span>
              </div>

              <div class="space-y-1">
                <!-- Rit Items -->
                <div v-for="rit in transaction.rits" :key="rit.id" class="flex justify-between gap-2">
                  <div class="flex-1">
                    <span class="font-semibold">{{ formatNumber(rit.tonnage) }} x {{ formatNumber(rit.masak) }}</span>
                    <span class="text-[11px] text-gray-500 ml-1 italic">{{ rit.rit.item.code }}</span>
                  </div>
                  <div class="font-bold">
                    {{ formatNumber(rit.total_price) }}
                  </div>
                </div>

                <!-- Other Components -->
                <div v-if="transaction.tb > 0" class="flex justify-between text-gray-600">
                  <span>TB</span>
                  <span>{{ formatNumber(transaction.tb) }}</span>
                </div>
                <div v-if="transaction.thr > 0" class="flex justify-between text-gray-600">
                  <span>THR</span>
                  <span>{{ formatNumber(transaction.thr) }}</span>
                </div>
                <div v-if="transaction.sack > 0" class="flex justify-between text-gray-600">
                  <span>SAK ({{ transaction.sack }} x {{ formatNumber(transaction.sack_price) }})</span>
                  <span>{{ formatNumber(transaction.sack * transaction.sack_price) }}</span>
                </div>
                
                <!-- Discount -->
                <div v-if="transaction.discount > 0" class="flex justify-between text-red-600 font-bold border-t border-dashed border-gray-200 pt-1">
                  <span>DISKON</span>
                  <span>-{{ formatNumber(transaction.discount) }}</span>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-center border-t-2 border-black mt-2 pt-1 font-black text-sm">
                  <span>TOTAL</span>
                  <span class="underline decoration-double">{{ formatNumber(transaction.total_price) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-4 no-print">
          <button 
            @click="page_ledger--" 
            :disabled="page_ledger === 1"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <span class="text-sm text-gray-600 font-medium">
            Halaman {{ page_ledger }} dari {{ totalPages }}
          </span>
          <button 
            @click="page_ledger++" 
            :disabled="page_ledger === totalPages"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    VueDatePicker,
  },
  data() {
    return {
      transactions: [],
      isLoading: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      searchTransactionQuery: "",
      searchTimeout: null,
      page_ledger: 1,
      itemsPerPage: 40,
      rowsPerColumn: 10,
    };
  },
  watch: {
    searchTransactionQuery(newValue) {
      if (this.searchTimeout) clearTimeout(this.searchTimeout);

      if (!newValue || newValue.trim() === "") {
        this.getAllTransactions();
        return;
      }

      this.searchTimeout = setTimeout(() => {
        this.searchTransactions(newValue);
      }, 500);
    },
    date() {
      this.page_ledger = 1;
    }
  },
  computed: {
    formattedDateDisplay() {
      if (!this.date || !this.date[0]) return "";
      return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(this.date[0]));
    },
    totalPages() {
      return Math.ceil(this.transactions.length / this.itemsPerPage);
    },
    paginatedTransactions() {
      if (this.transactions.length === 0) return [];
      
      // Get items for current page
      const start = (this.page_ledger - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      
      // Enrich transactions with a display index based on overall position
      const enriched = this.transactions.slice(start, end).map((t, index) => ({
        ...t,
        display_index: start + index + 1
      }));

      const cols = [];
      for (let i = 0; i < 4; i++) {
        cols.push(enriched.slice(i * this.rowsPerColumn, (i + 1) * this.rowsPerColumn));
      }
      return cols;
    }
  },
  created() {
    this.getAllTransactions();
  },
  methods: {
    async getAllTransactions() {
      this.isLoading = true;
      this.transactions = [];
      let currentPage = 1;
      let hasMore = true;

      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });

      while (hasMore) {
        try {
          const response = await instance.post("/admin/transaction/get_completed_transactions", {
            start_date: this.date[0].toString(),
            end_date: this.date[1].toString(),
            page: currentPage,
            per_page: 50, // Slightly larger batch
          });

          const results = 
            response.data?.data?.data?.results || 
            response.data?.data?.results || 
            response.data?.results || [];
          
          this.transactions = [...this.transactions, ...results.filter(t => t !== null)];

          const pagination = response.data?.data?.data?.pagination || response.data?.data?.pagination;
          hasMore = pagination?.has_more;
          currentPage++;

          // Safety break to prevent infinite loops
          if (currentPage > 20) break; 
        } catch (err) {
          console.error("Error fetching transactions:", err);
          hasMore = false;
        }
      }
      this.isLoading = false;
    },
    searchTransactions(query) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });

      instance
        .post("/admin/transaction/get_completed_transaction_search", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
          search_query: query,
        })
        .then((data) => {
          this.transactions = 
            (data.data?.data?.data?.results || 
             data.data?.data?.results || 
             data.data?.results || []).filter(t => t !== null);
          this.isLoading = false;
        })
        .catch((err) => {
          console.error("Error searching transactions:", err);
          this.isLoading = false;
        });
    },
    printPage() {
      window.print();
    }
  },
};
</script>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
  body {
    background: white;
  }
  .grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 1rem !important;
  }
}
</style>
