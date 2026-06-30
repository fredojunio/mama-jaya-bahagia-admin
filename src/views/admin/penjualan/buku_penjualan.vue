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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8 no-print">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 class="text-2xl font-semibold text-gray-900">Buku Penjualan</h1>
        <div
          class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
        >
          <!-- Search Input -->
          <div class="relative rounded-md shadow-sm w-full sm:w-64">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
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
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model="printStartIndex"
              class="focus:ring-black focus:border-black block w-16 sm:text-sm border-gray-300 rounded-md py-1.5"
              placeholder="Dari"
              min="1"
            />
            <span class="text-sm text-gray-500">-</span>
            <input
              type="number"
              v-model="printEndIndex"
              class="focus:ring-black focus:border-black block w-16 sm:text-sm border-gray-300 rounded-md py-1.5"
              placeholder="Sampai"
              min="1"
            />
          </div>
          <button
            @click="exportExcel"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto"
          >
            Export Excel
          </button>
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

    <div
      class="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 print:pb-0 print:px-0"
    >
      <div
        v-if="transactions.length === 0 && !isLoading"
        class="text-center py-20 text-gray-500 bg-white rounded-lg shadow"
      >
        Tidak ada transaksi pada tanggal {{ formattedDateDisplay }}.
      </div>
      <div v-else>
        <!-- Ledger Grid -->
        <div
          class="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4 min-h-[600px]"
          id="print-ledger"
        >
          <div
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            class="bg-white p-3 rounded shadow-sm border-l-4 border-black font-mono text-[14px] leading-tight print:shadow-none print:border-l-2 break-inside-avoid inline-block w-full"
          >
            <div
              class="flex justify-between items-start mb-1 border-b border-gray-100 pb-1"
            >
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[11px] font-bold"
                >
                  {{ transaction.display_index }}
                </span>
                <span class="font-bold uppercase">{{
                  transaction.customer?.nickname ||
                  transaction.customer?.name ||
                  "Customer"
                }}</span>
              </div>
              <span class="font-bold text-black">{{
                formatTime(transaction.updated_at)
              }}</span>
            </div>

            <div class="space-y-1">
              <!-- Rit Items -->
              <div
                v-for="rit in transaction.rits"
                :key="rit.id"
                class="flex justify-between gap-2"
              >
                <div class="flex-1">
                  <span class="font-semibold"
                    >{{ formatNumber(rit.tonnage) }} x
                    {{ formatNumber(rit.masak) }}</span
                  >
                  <span class="text-[11px] ml-1 italic font-bold text-black">{{
                    rit.rit.item.code
                  }}</span>
                </div>
                <div class="font-bold">
                  {{ formatNumber(rit.total_price) }}
                </div>
              </div>

              <!-- Other Components -->
              <div
                v-if="transaction.tb > 0"
                class="flex justify-between text-gray-600"
              >
                <span>TB</span>
                <span>{{ formatNumber(transaction.tb) }}</span>
              </div>
              <div
                v-if="transaction.thr > 0"
                class="flex justify-between text-gray-600"
              >
                <span>THR</span>
                <span>{{ formatNumber(transaction.thr) }}</span>
              </div>
              <div
                v-if="transaction.sack > 0"
                class="flex justify-between text-gray-600"
              >
                <span>SAK</span>
                <span>{{ formatNumber(transaction.sack_price) }}</span>
              </div>
              <div
                v-if="transaction.other > 0"
                class="flex justify-between text-gray-600"
              >
                <span>LAIN-LAIN</span>
                <span>{{ formatNumber(transaction.other) }}</span>
              </div>

              <!-- Discount -->
              <div
                v-if="transaction.discount > 0"
                class="flex justify-between text-red-600 font-bold border-t border-dashed border-gray-200 pt-1"
              >
                <span>DISKON</span>
                <span>-{{ formatNumber(transaction.discount) }}</span>
              </div>

              <!-- Total -->
              <div
                class="flex justify-between items-center border-t-2 border-black mt-2 pt-1 font-black text-sm"
              >
                <span>TOTAL</span>
                <span class="underline decoration-double">{{
                  formatNumber(transaction.total_price)
                }}</span>
              </div>

              <!-- Payment Info -->
              <div
                class="flex justify-between items-start mt-2 pt-1 border-t border-dashed border-gray-200 text-[11px] font-bold"
              >
                <div class="flex flex-col">
                  <span
                    v-if="transaction.finance_approved == 0"
                    class="text-red-600 uppercase border border-red-600 px-1 rounded-[2px] mb-1 inline-block w-fit"
                    >Kurang Bayar ({{
                      formatNumber(
                        transaction.total_price - getTotalPayments(transaction),
                      )
                    }})</span
                  >
                  <span
                    v-else-if="transaction.finance_approved == 2"
                    class="text-blue-600 uppercase border border-blue-600 px-1 rounded-[2px] mb-1 inline-block w-fit"
                    >Retur</span
                  >
                  <template v-else>
                    <div
                      v-if="getPelunasanInfo(transaction)"
                      class="text-[10px] text-green-600 mb-1 italic leading-tight"
                    >
                      + pelunasan {{ getPelunasanInfo(transaction).date }}
                      {{ formatNumber(getPelunasanInfo(transaction).amount) }}
                    </div>
                    <span
                      class="text-green-600 uppercase border border-green-600 px-1 rounded-[2px] mb-1 inline-block w-fit"
                      >Lunas</span
                    >
                  </template>
                </div>

                <div class="text-right ml-auto">
                  <template
                    v-if="getPaymentSummary(transaction).type === 'mixed'"
                  >
                    <div class="flex flex-col leading-tight">
                      <span class="text-gray-500"
                        >Trf:
                        <span class="text-black">{{
                          formatNumber(getPaymentSummary(transaction).transfer)
                        }}</span></span
                      >
                      <span class="text-gray-500"
                        >Tni:
                        <span class="text-black">{{
                          formatNumber(getPaymentSummary(transaction).cash)
                        }}</span></span
                      >
                    </div>
                  </template>
                  <template v-else>
                    <span class="text-gray-500"
                      ><span class="text-black uppercase">{{
                        getPaymentSummary(transaction).label
                      }}</span></span
                    >
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="totalPages > 1"
          class="mt-8 flex justify-center items-center gap-4 no-print"
        >
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
import * as XLSX from "xlsx";
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
      itemsPerPage: 24,
      printStartIndex: null,
      printEndIndex: null,
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
    },
  },
  computed: {
    formattedDateDisplay() {
      if (!this.date || !this.date[0]) return "";
      return new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
        new Date(this.date[0]),
      );
    },
    totalPages() {
      // If filtering by range, it's effectively 1 page containing those items
      if (this.printStartIndex || this.printEndIndex) {
        return 1;
      }
      return Math.ceil(this.transactions.length / this.itemsPerPage);
    },
    paginatedTransactions() {
      if (this.transactions.length === 0) return [];

      // Enrich transactions with a display index based on overall position
      const enriched = this.transactions.map((t, index) => ({
        ...t,
        display_index: index + 1,
      }));

      // Filter for print range if specified
      let finalTransactions = enriched;
      if (this.printStartIndex || this.printEndIndex) {
        const start = this.printStartIndex ? parseInt(this.printStartIndex) : 1;
        const end = this.printEndIndex
          ? parseInt(this.printEndIndex)
          : enriched.length;
        finalTransactions = enriched.slice(start - 1, end);
        // When printing range, we show them all on one page and ignore pagination
        return finalTransactions;
      }

      // Normal pagination logic
      const start = (this.page_ledger - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      return finalTransactions.slice(start, end);
    },
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
          const response = await instance.post(
            "/admin/transaction/get_completed_transactions_buku",
            {
              start_date: this.date[0].toString(),
              end_date: this.date[1].toString(),
              page: currentPage,
              per_page: 50, // Slightly larger batch
            },
          );

          const results =
            response.data?.data?.data?.results ||
            response.data?.data?.results ||
            response.data?.results ||
            [];

          this.transactions = [
            ...this.transactions,
            ...results.filter((t) => t !== null),
          ];

          const pagination =
            response.data?.data?.data?.pagination ||
            response.data?.data?.pagination;
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
        .post("/admin/transaction/get_completed_transaction_search_buku", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
          search_query: query,
        })
        .then((data) => {
          this.transactions = (
            data.data?.data?.data?.results ||
            data.data?.data?.results ||
            data.data?.results ||
            []
          ).filter((t) => t !== null);
          this.isLoading = false;
        })
        .catch((err) => {
          console.error("Error searching transactions:", err);
          this.isLoading = false;
        });
    },
    printPage() {
      window.print();
    },
    getPaymentSummary(transaction) {
      if (!transaction.payments || transaction.payments.length === 0) {
        return { type: "none", label: "-" };
      }

      let cashSum = 0;
      let transferSum = 0;
      if (
        transaction.transfer_amount > 0 &&
        transaction.cash_amount > 0 &&
        transaction.transfer_amount + transaction.cash_amount ===
          transaction.total_price
      ) {
        return {
          type: "mixed",
          transfer: transaction.transfer_amount,
          cash: transaction.cash_amount,
        };
      } else if (transaction.payment_method === 1) {
        return { type: "transfer", label: "Transfer" };
      } else {
        return { type: "cash", label: "Tunai" };
      }
    },
    exportExcel() {
      if (!this.transactions || this.transactions.length === 0) {
        alert("Tidak ada data untuk dieksport");
        return;
      }

      const aoa = [
        [
          "Waktu",
          "Customer",
          "Item (Rit)",
          "Tonnage",
          "Masak",
          "Harga Item",
          "TB",
          "THR",
          "SAK",
          "Lain-Lain",
          "Diskon",
          "Total Transaksi",
          "Status Bayar"
        ]
      ];

      const merges = [];
      let currentRow = 1;

      this.transactions.forEach((t) => {
        const startRow = currentRow;

        let statusText = "Lunas";
        if (t.finance_approved == 0) {
          statusText = "Kurang Bayar";
        } else if (t.finance_approved == 2) {
          statusText = "Retur";
        }
        
        const paymentSum = this.getPaymentSummary(t);
        const paymentText =
          paymentSum.type === "mixed"
            ? `Trf: ${this.formatNumber(paymentSum.transfer)}, Tni: ${this.formatNumber(paymentSum.cash)}`
            : paymentSum.label;

        let totalRits = t.rits ? t.rits.length : 0;

        let timeStr = this.formatTime(t.updated_at);
        let custName = t.customer?.nickname || t.customer?.name || "Customer";

        if (totalRits === 0) {
          aoa.push([
            timeStr,
            custName,
            "-",
            "-",
            "-",
            0,
            Number(t.tb) || 0,
            Number(t.thr) || 0,
            Number(t.sack_price) || 0,
            Number(t.other) || 0,
            Number(t.discount) || 0,
            Number(t.total_price),
            `${statusText} - ${paymentText}`
          ]);
          currentRow++;
        } else {
          t.rits.forEach((rit, index) => {
            let ritCode = rit.rit?.item?.code || "-";
            if (index === 0) {
              aoa.push([
                timeStr,
                custName,
                ritCode,
                Number(rit.tonnage),
                Number(rit.masak),
                Number(rit.total_price),
                Number(t.tb) || 0,
                Number(t.thr) || 0,
                Number(t.sack_price) || 0,
                Number(t.other) || 0,
                Number(t.discount) || 0,
                Number(t.total_price),
                `${statusText} - ${paymentText}`
              ]);
            } else {
              aoa.push([
                "",
                "",
                ritCode,
                Number(rit.tonnage),
                Number(rit.masak),
                Number(rit.total_price),
                "",
                "",
                "",
                "",
                "",
                "",
                ""
              ]);
            }
            currentRow++;
          });

          if (totalRits > 1) {
            merges.push({ s: { r: startRow, c: 0 }, e: { r: currentRow - 1, c: 0 } }); // Waktu
            merges.push({ s: { r: startRow, c: 1 }, e: { r: currentRow - 1, c: 1 } }); // Customer
            merges.push({ s: { r: startRow, c: 6 }, e: { r: currentRow - 1, c: 6 } }); // TB
            merges.push({ s: { r: startRow, c: 7 }, e: { r: currentRow - 1, c: 7 } }); // THR
            merges.push({ s: { r: startRow, c: 8 }, e: { r: currentRow - 1, c: 8 } }); // SAK
            merges.push({ s: { r: startRow, c: 9 }, e: { r: currentRow - 1, c: 9 } }); // Lain-Lain
            merges.push({ s: { r: startRow, c: 10 }, e: { r: currentRow - 1, c: 10 } }); // Diskon
            merges.push({ s: { r: startRow, c: 11 }, e: { r: currentRow - 1, c: 11 } }); // Total Transaksi
            merges.push({ s: { r: startRow, c: 12 }, e: { r: currentRow - 1, c: 12 } }); // Status Bayar
          }
        }
      });

      const worksheet = XLSX.utils.aoa_to_sheet(aoa);
      worksheet["!merges"] = merges;
      
      const wscols = [
        { wch: 10 }, // Waktu
        { wch: 15 }, // Customer
        { wch: 12 }, // Item
        { wch: 10 }, // Tonnage
        { wch: 10 }, // Masak
        { wch: 15 }, // Harga Item
        { wch: 10 }, // TB
        { wch: 10 }, // THR
        { wch: 10 }, // SAK
        { wch: 12 }, // Lain-Lain
        { wch: 10 }, // Diskon
        { wch: 15 }, // Total
        { wch: 25 }, // Status
      ];
      worksheet["!cols"] = wscols;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Buku Penjualan");
      
      let dateString = "Export";
      if (this.date && this.date[0]) {
         dateString = new Date(this.date[0]).toISOString().split('T')[0];
      }
      XLSX.writeFile(workbook, `Buku_Penjualan_${dateString}.xlsx`);
    },
    getTotalPayments(transaction) {
      return (transaction.payments || []).reduce((total, pay) => {
        return total + pay.amount;
      }, 0);
    },
    getPelunasanInfo(transaction) {
      if (
        transaction.finance_approved !== 1 ||
        !transaction.payments ||
        transaction.payments.length === 0
      ) {
        return null;
      }

      const lastPayment = transaction.payments[transaction.payments.length - 1];
      const transDate = new Date(transaction.created_at);
      const payDate = new Date(lastPayment.created_at);

      // Compare dates (day, month, year)
      if (
        transDate.getDate() !== payDate.getDate() ||
        transDate.getMonth() !== payDate.getMonth() ||
        transDate.getFullYear() !== payDate.getFullYear()
      ) {
        return {
          date: `${payDate.getDate()}/${payDate.getMonth() + 1}`,
          amount: lastPayment.amount,
        };
      }
      return null;
    },
  },
};
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
  body {
    background: white;
    margin: 0;
    padding: 0;
    font-size: 11px;
  }
  @page {
    size: A4 portrait;
    margin: 0.5cm;
  }
  .max-w-\[1800px\] {
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  #print-ledger {
    display: block !important;
    column-count: 4 !important;
    column-gap: 0.4rem !important;
  }
  .break-inside-avoid {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 0.4rem !important;
  }
  .bg-white {
    background-color: white !important;
    border-width: 1px !important;
    border-color: #000 !important;
    padding: 0.4rem !important;
  }
  .text-\[13px\] {
    font-size: 11px !important;
  }
  .text-sm {
    font-size: 11px !important;
  }
  .text-\[11px\] {
    font-size: 9px !important;
  }
  .mt-2 {
    margin-top: 0.25rem !important;
  }
  .mb-1 {
    margin-bottom: 0.1rem !important;
  }
}
</style>
