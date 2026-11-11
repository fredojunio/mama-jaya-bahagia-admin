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
      <div
        v-if="report"
        class="mt-8 border border-gray-400 p-6 bg-white w-full max-w-2xl"
      >
        <h2 class="text-md font-medium text-gray-900 mb-4">{{ monthName }},</h2>
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th
                class="pb-2 text-left text-xs font-normal text-gray-500"
              ></th>
              <th
                class="pb-2 text-right text-xs font-normal text-gray-500"
              ></th>
              <th
                class="pb-2 pl-6 text-right text-xs font-normal text-gray-500"
              >
                Tonase (kg)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-1 pr-4 text-left">Stok Awal</td>
              <td class="py-1 text-right">
                {{ formatNumberCustom(report.stok_awal.total) }}
              </td>
              <td class="py-1 pl-6 text-right">
                {{ formatNumberCustom(report.stok_awal.total_tonnage) }}
              </td>
            </tr>
            <tr>
              <td class="py-1 pr-4 text-left">Pembelian</td>
              <td class="py-1 text-right">
                {{ formatNumberCustom(report.beli_barang.total) }}
              </td>
              <td class="py-1 pl-6 text-right">
                {{ formatNumberCustom(report.beli_barang.total_tonnage) }}
              </td>
            </tr>
            <tr class="border-b border-black">
              <td class="py-1 pr-4 text-left">Stok Akhir</td>
              <td class="py-1 text-right">
                {{ formatNumberCustom(report.stok_akhir.total) }}
              </td>
              <td class="py-1 pl-6 text-right">
                {{ formatNumberCustom(report.stok_akhir.total_tonnage) }}
              </td>
            </tr>
            <tr>
              <td class="py-1 pr-8 text-right font-semibold">HPP =</td>
              <td class="py-1 text-right font-semibold">
                {{ formatNumberCustom(report.hpp) }}
              </td>
              <td class="py-1 pl-6 text-right font-semibold">-</td>
            </tr>
            <tr>
              <td class="pt-6 pr-8 text-right">Omset =</td>
              <td class="pt-6 text-right">
                {{ formatNumberCustom(report.omset) }}
              </td>
              <td class="pt-6 pl-6 text-right">
                {{ formatNumberCustom(report.omset_tonnage) }}
              </td>
            </tr>
            <tr>
              <td class="py-1 pr-8 text-right">Biaya =</td>
              <td class="py-1 text-right">
                {{ formatNumberCustom(report.biaya) }}
              </td>
              <td class="py-1 pl-6 text-right">-</td>
            </tr>
            <tr class="border-t border-black">
              <td class="py-2 pr-8 text-right font-bold text-base">Laba =</td>
              <td
                class="py-2 text-right font-bold text-base underline decoration-double decoration-2"
              >
                {{ formatNumberCustom(report.laba) }}
              </td>
              <td class="py-2 pl-6 text-right">-</td>
            </tr>
          </tbody>
        </table>
        <p class="mt-4 text-xs text-gray-500">
          Penyusutan (info):
          {{ formatNumberCustom(report.stok_akhir.penyusutan?.tonnage || 0) }} kg
          / Rp.
          {{ formatNumberCustom(report.stok_akhir.penyusutan?.nominal || 0) }} —
          sudah tercermin di HPP.
        </p>
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
  created() {
    if (this.role_id != 1 && this.role_id != 4) {
      this.$router.push("/admin");
      return;
    }
    this.getAllData();
  },
  data() {
    return {
      isLoading: false,
      month: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}`,
      monthName: "",
      report: null,
    };
  },
  methods: {
    async getAllData() {
      if (!this.month) return;

      const [year, m] = this.month.split("-");
      this.monthName = new Date(year, m - 1, 1).toLocaleString("id-ID", {
        month: "long",
      });

      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });

      try {
        const response = await instance.post("/admin/laba_rugi/get_report", {
          month: this.month,
        });
        this.report = response.data.data.results;
      } catch (err) {
        console.log(err);
        this.report = null;
      }

      this.isLoading = false;
    },
    formatNumberCustom(value) {
      if (value === 0 || value === "0" || value === null || value === undefined) {
        return "-";
      }
      let parts = Number(value).toFixed(2).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return parts.join(",");
    },
    exportExcel() {
      if (!this.report) {
        alert("Tidak ada data untuk diexport");
        return;
      }

      const dataToExport = [
        {
          Keterangan: "Stok Awal",
          Nominal: this.report.stok_awal.total,
          "Tonase (kg)": this.report.stok_awal.total_tonnage,
        },
        {
          Keterangan: "Pembelian",
          Nominal: this.report.beli_barang.total,
          "Tonase (kg)": this.report.beli_barang.total_tonnage,
        },
        {
          Keterangan: "Stok Akhir",
          Nominal: this.report.stok_akhir.total,
          "Tonase (kg)": this.report.stok_akhir.total_tonnage,
        },
        { Keterangan: "HPP", Nominal: this.report.hpp, "Tonase (kg)": "-" },
        {
          Keterangan: "Omset",
          Nominal: this.report.omset,
          "Tonase (kg)": this.report.omset_tonnage,
        },
        { Keterangan: "Biaya", Nominal: this.report.biaya, "Tonase (kg)": "-" },
        { Keterangan: "Laba", Nominal: this.report.laba, "Tonase (kg)": "-" },
      ];

      const worksheet = XLSX.utils.json_to_sheet(dataToExport, {
        skipHeader: true,
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laba Rugi");
      XLSX.writeFile(workbook, `Laba_Rugi_${this.month}.xlsx`);
    },
  },
};
</script>

<style></style>
