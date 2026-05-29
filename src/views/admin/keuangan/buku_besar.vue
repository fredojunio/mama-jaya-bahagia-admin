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
      class="max-w-7xl flex justify-between items-center mx-auto px-4 sm:px-6 md:px-8 gap-x-4 mb-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">
        Buku Besar - Penjualan
      </h1>
      <div class="relative flex gap-2 text-left">
        <div class="relative rounded-md shadow-sm w-96">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
          </div>
          <VueDatePicker
            v-model="date"
            @update:model-value="getAllData"
            locale="id"
            :start-time="[
              { hours: 0, minutes: 0, seconds: 0 },
              { hours: 23, minutes: 59, seconds: 59 },
            ]"
            range
            :enable-time-picker="false"
          />
        </div>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-4 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                      rowspan="2"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                      rowspan="2"
                    >
                      Akun
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                      rowspan="2"
                    >
                      Ref
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                      rowspan="2"
                    >
                      Debit (Rp.)
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                      rowspan="2"
                    >
                      Kredit (Rp.)
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                      colspan="2"
                    >
                      Saldo (Rp.)
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                    >
                      Debit
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 border-b border-gray-200"
                    >
                      Kredit
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="record in processedRecords" :key="record.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
                    >
                      {{ formatDate(record.tanggal) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
                    >
                      {{ record.akun }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
                    >
                      {{ record.ref }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-right"
                    >
                      {{ formatNumber(record.debit) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-right"
                    >
                      {{ formatNumber(record.kredit) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-right"
                    >
                      {{ formatNumber(record.saldo_debit) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-right"
                    >
                      {{ formatNumber(record.saldo_kredit) }}
                    </td>
                  </tr>
                  <tr v-if="records.length === 0">
                    <td colspan="7" class="text-center py-4 text-sm text-gray-500">
                      Tidak ada data untuk periode ini.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Admin>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import Admin from "../../../layouts/Admin.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
</script>

<script>
export default {
  data() {
    return {
      isLoading: false,
      date: null,
      records: [],
    };
  },
  computed: {
    processedRecords() {
      let runningBalance = 0;
      return this.records.map(record => {
        runningBalance += (record.debit - record.kredit);
        return {
          ...record,
          saldo_debit: runningBalance > 0 ? runningBalance : 0,
          saldo_kredit: runningBalance < 0 ? Math.abs(runningBalance) : 0,
        };
      });
    }
  },
  methods: {
    getAllData() {
      if (!this.date || !this.date[0] || !this.date[1]) {
        return;
      }
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });

      instance
        .get("/buku_besar", {
          params: {
            type: "penjualan",
            start_date: this.date[0],
            end_date: this.date[1]
          }
        })
        .then((response) => {
          this.records = response.data.api_results;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
    setDefaultDate() {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      this.date = [firstDay, today];
    }
  },
  mounted() {
    this.setDefaultDate();
    this.getAllData();
  },
};
</script>
