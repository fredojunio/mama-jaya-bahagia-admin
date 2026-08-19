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
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Laba Rugi</h1>
      <div class="relative flex gap-2 text-left">
        <div class="relative">
          <input
            id="month"
            v-model="month"
            type="month"
            @change="getAllData"
            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-4"
          />
        </div>
        <button
          @click="exportExcel"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
        >
          Export Excel
        </button>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
      <div v-if="summary" class="mt-8 border border-gray-400 p-6 bg-white w-full max-w-sm shadow-sm">
        <h2 class="text-md font-medium text-gray-900 mb-4">{{ monthName }},</h2>
        <table class="w-full text-right text-sm">
          <tbody>
            <tr>
              <td class="py-1 pr-4 text-left font-semibold">Laba/Rugi Jual</td>
              <td class="py-1 font-semibold">{{ formatNumberCustom(summary.labaRugiJual) }}</td>
            </tr>
            <tr class="border-b border-black">
              <td class="py-1 pr-4 text-left">Pengeluaran Operasional</td>
              <td class="py-1">{{ formatNumberCustom(summary.pengeluaranOperasional) }}</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 text-left font-bold text-base">Laba Kotor =</td>
              <td class="py-2 font-bold text-base">{{ formatNumberCustom(summary.labaKotor) }}</td>
            </tr>
          </tbody>
        </table>
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
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      isLoading: false,
      month: new Date().toISOString().slice(0, 7),
      date: [],
      summary: null,
      monthName: "",
    };
  },
  created() {
    this.getAllData();
  },
  methods: {
    formatNumberCustom(value) {
      if (value === 0 || value === "0") return "-";
      let parts = Number(value).toFixed(2).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return parts.join(",");
    },
    exportExcel() {
      if (!this.summary) {
        alert("Tidak ada data untuk diexport");
        return;
      }

      const dataToExport = [
        { Kolom1: "Laba/Rugi Jual", Kolom2: this.summary.labaRugiJual },
        { Kolom1: "Pengeluaran Operasional", Kolom2: this.summary.pengeluaranOperasional },
        { Kolom1: "Laba Kotor =", Kolom2: this.summary.labaKotor },
      ];

      const worksheet = XLSX.utils.json_to_sheet(dataToExport, { skipHeader: true });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laba Rugi");
      
      let dateString = this.month;
      const fileName = `Laba_Rugi_${dateString}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    },
    async getAllData() {
      if (!this.month) return;
      const [year, m] = this.month.split('-');
      this.date = [
        new Date(year, m - 1, 1),
        new Date(year, m, 0, 23, 59, 59, 999)
      ];
      this.monthName = new Date(year, m - 1, 1).toLocaleString('id-ID', { month: 'long' });

      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });

      try {
        const [ritRes, expenseRes] = await Promise.all([
          instance.post("/admin/rit/get_empty_stock", {
            start_date: this.date[0].toString(),
            end_date: this.date[1].toString(),
          }),
          instance.post("/admin/expense/filter", {
            start_date: this.date[0].toString(),
            end_date: this.date[1].toString(),
            filter: "All",
          })
        ]);

        const rits = ritRes.data.data.results;
        const expenses = expenseRes.data.data.results;

        let labaRugiJual = 0;
        let pengeluaranOperasional = 0;

        expenses.forEach(e => {
          if (['Kendaraan', 'Operasional', 'Gaji'].includes(e.type)) {
            if (e.type === 'Kendaraan') {
              pengeluaranOperasional += (parseFloat(e.trip?.gas) || 0) + (parseFloat(e.trip?.toll) || 0) + (parseFloat(e.trip?.allowance) || 0);
            } else {
              pengeluaranOperasional += parseFloat(e.amount) || 0;
            }
          }
        });

        rits.forEach(rit => {
          let ritRevenue = 0;
          rit.transactions?.forEach(t => {
            ritRevenue += parseFloat(t.total_price) || 0;
          });
          labaRugiJual += (ritRevenue - (parseFloat(rit.arrived_tonnage || 0) * parseFloat(rit.buy_price || 0)));
        });

        const labaKotor = labaRugiJual - pengeluaranOperasional;

        this.summary = {
          labaRugiJual,
          pengeluaranOperasional,
          labaKotor
        };

        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    }
  }
};
</script>
