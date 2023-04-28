<template>
  <div>
    <!-- Profile header -->
    <div>
      <div class="mx-auto px-4 sm:px-6 mb-2">
        <div class="sm:flex sm:items-end sm:space-x-5">
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div
              class="flex sm:hidden 2xl:flex min-w-0 flex-1 justify-between items-center"
            >
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                Laporan - 23/03/2023
              </h1>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex 2xl:hidden min-w-0 flex-1 gap-2">
          <h1
            class="text-2xl font-bold text-gray-900 truncate mr-auto flex flex-col"
          >
            Laporan - 23/03/2023
          </h1>
        </div>
      </div>
    </div>
    <hr />
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <!-- //NOTE - ini itu total pemasukan - total pengeluaran - transaksi yang belum bayar -->
          <dt class="text-sm font-medium text-gray-500">Total Penerimaan Uang</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 1.000.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Total Pemasukan</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 35.000.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Total Pengeluaran</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 34.000.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Penjualan</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 25.000.000 - 12.300 kg</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pengeluaran Gaji</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 24.000.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pemasukan TB</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 2.000.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pengeluaran TB</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 2.000.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pemasukan TW</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 350.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pengeluaran TW</dt>
          <dd class="mt-1 text-sm text-gray-900">Rp. 350.000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pemasukan THR</dt>
          <dd class="mt-1 text-sm text-gray-900">-</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Pengeluaran THR</dt>
          <dd class="mt-1 text-sm text-gray-900">-</dd>
        </div>
        <div class="sm:col-span-1"></div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Pengeluaran Operasional
          </dt>
          <dd class="mt-1 text-sm text-gray-900">-</dd>
        </div>
        <div class="w-full col-span-2 border-t">
          <div class="border-b border-gray-200">
            <div class="mx-auto">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <div
                  @click="changeTab(index)"
                  v-for="(tab, index) in tabs"
                  :key="tab.name"
                  :class="[
                    tab.current
                      ? 'border-indigo-700 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  {{ tab.name }}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div v-if="tabs[0].current" class="col-span-2">
          <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form>
          <div class="my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Kode - Tanggal Datang
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Sisa Tonase
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            K-ABC - 01/04/2023
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">4.200 kg</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabs[1].current" class="col-span-2">
          <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form>
          <div class="my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Kode - Tanggal
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tonase Penjualan
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total Penjualan Barang
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            K-ABC - 23/03/2023
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">200 kg</div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">2.200 kg</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabs[2].current" class="col-span-2">
          <form class="flex space-x-4" action="#">
            <div class="relative rounded-md shadow-sm w-full">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
              </div>
              <VueDatePicker
                v-model="date"
                locale="id"
                :start-time="[
                  { hours: 0, minutes: 0, seconds: 0 },
                  { hours: 23, minutes: 59, seconds: 59 },
                ]"
                range
                :enable-time-picker="false"
              />
            </div>
          </form>
          <div class="my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Jumlah (Rp.)
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tanggal Transaksi
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tanggal Lunas
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">Supardi</div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(10000) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            Belum dibayar
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            20/03/2023
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            20/03/2023
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">Supardi</div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            {{ formatNumber(10000) }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">Lunas</div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            20/03/2023
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                      >
                        <div class="flex items-center">
                          <div class="font-medium text-gray-900">
                            20/03/2023
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </dl>
    </div>
  </div>
  <TransitionRoot as="template" :show="showEditRitDailyReportForm">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="showEditRitDailyReportForm = false"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
          >
            <form class="space-y-8 divide-y divide-gray-200">
              <div class="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      {{ "Edit Jumlah Tonase Hari Ini" }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Pastikan data sudah benar.
                    </p>
                  </div>
                  <hr />
                  <div class="grid grid-cols-2 gap-x-4">
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Barang: {{ "K-ABC" }}
                    </h3>
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Kendaraan: Truk A
                    </h3>
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Tonase Awal: {{ "10.000" }} kg
                    </h3>
                    <h3 class="text-md leading-6 font-medium text-gray-900">
                      Tanggal Berangkat: 30/03/2023
                    </h3>
                  </div>
                  <hr />

                  <div
                    class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                  >
                    <div class="sm:col-span-6">
                      <label
                        for="original_weight"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Tonase Asli (kg)
                      </label>
                      <div class="mt-1">
                        <input
                          id="original_weight"
                          v-model="original_weight"
                          type="number"
                          class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-5">
                <div class="flex justify-end">
                  <button
                    type="button"
                    @click="showEditRitDailyReportForm = false"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="showEditRitDailyReportForm = false"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    {{ "Save" }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  components: {
    VueDatePicker,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  setup() {
    return {};
  },
  data() {
    return {
      showEditRitDailyReportForm: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      tabs: [
        { name: "Sisa Stok", current: true },
        { name: "Penjualan", current: false },
        { name: "Transaksi", current: false },
      ],
      rits: [
        {
          id: 1,
          product: {
            id: 1,
            code: "K-ABC",
            name: "Kedelai ABC",
          },
          buy_price: 10000,
          sell_price: 10100,
          original_weight: 10000,
          arrive_weight: 9990,
          current_weight: 0,
          branch_weight: 200,
          // branches: [
          //   {
          //     id: 1,
          //     rit_id: 1,
          //     weight: 50,
          //     sold: true,
          //     price: 10500,
          //     sold_date: "29/03/2023"
          //   },
          //   {
          //     id: 2,
          //     rit_id: 1,
          //     weight: 150,
          //     sold: false,
          //     price: null,
          //     sold_date: null
          //   },
          // ],
          at_customer: {
            id: 1,
            name: "Supardi",
            weight: 2000,
          },
          arrive_date: "29/03/2023",
          empty_date: "29/03/2023",
          hold: false,
          arrived: true,
          transaction: {
            id: 1,
            created_date: "29/03/2023",
            customer_id: 1,
            weight: 800,
          },
          status: {
            id: 3,
            name: "Arrived",
          },
          from_branch: false,
          vehicle: {
            id: 1,
            name: "Truk A",
            trip_count: 3,
            etoll: 100000,
          },
          trip: {
            id: 1,
            vehicle_id: 1,
            request_bbm: 0,
            request_etoll: 0,
            request_allowance: 0,
            customer_id: 1,
            shipping_fee: 25000,
          },
          departure_date: "30/03/2023",
        },
        {
          id: 2,
          product: {
            id: 1,
            code: "K-ABC",
            name: "Kedelai ABC",
          },
          buy_price: 10000,
          sell_price: null,
          original_weight: 10000,
          arrive_weight: null,
          current_weight: null,
          branch_weight: null,
          at_customer: null,
          arrive_date: null,
          empty_date: null,
          hold: false,
          arrived: false,
          transaction: null,
          status: {
            id: 2,
            name: "On Delivery",
          },
          from_branch: false,
          vehicle: {
            id: 1,
            name: "Truk A",
            trip_count: 3,
            etoll: 100000,
          },
          trip: {
            id: 2,
            vehicle_id: 1,
            request_bbm: 0,
            request_etoll: 0,
            request_allowance: 20000,
            customer_id: 1,
            shipping_fee: 25000,
          },
          departure_date: "30/03/2023",
        },
        {
          id: 3,
          product: {
            id: 1,
            code: "K-ABC",
            name: "Kedelai ABC",
          },
          buy_price: 10000,
          sell_price: null,
          original_weight: 10000,
          arrive_weight: null,
          current_weight: null,
          branch_weight: null,
          at_customer: null,
          arrive_date: null,
          empty_date: null,
          hold: false,
          arrived: false,
          transaction: null,
          status: {
            id: 1,
            name: "Needs Finance Approval",
          },
          from_branch: false,
          vehicle: {
            id: 1,
            name: "Truk A",
            trip_count: 3,
            etoll: 100000,
          },
          trip: {
            id: 3,
            vehicle_id: 1,
            request_bbm: 100000,
            request_etoll: 120000,
            request_allowance: 50000,
            customer_id: 1,
            shipping_fee: 25000,
          },
          departure_date: null,
        },
        {
          id: 4,
          product: {
            id: 1,
            code: "K-ABC",
            name: "Kedelai ABC",
          },
          buy_price: 10000,
          sell_price: 10100,
          original_weight: 10000,
          arrive_weight: 9990,
          current_weight: 5000,
          branch_weight: null,
          // branches: [
          //   {
          //     id: 1,
          //     rit_id: 1,
          //     weight: 50,
          //     sold: true,
          //     price: 10500,
          //     sold_date: "29/03/2023"
          //   },
          //   {
          //     id: 2,
          //     rit_id: 1,
          //     weight: 150,
          //     sold: false,
          //     price: null,
          //     sold_date: null
          //   },
          // ],
          at_customer: null,
          arrive_date: "29/03/2023",
          empty_date: null,
          hold: true,
          arrived: true,
          transaction: {
            id: 1,
            created_date: "29/03/2023",
            customer_id: 1,
            weight: 800,
          },
          status: {
            id: 3,
            name: "Arrived",
          },
          from_branch: false,
          vehicle: {
            id: 1,
            name: "Truk A",
            trip_count: 3,
            etoll: 100000,
          },
          trip: {
            id: 1,
            vehicle_id: 1,
            request_bbm: 0,
            request_etoll: 0,
            request_allowance: 0,
            customer_id: 1,
            shipping_fee: 25000,
          },
          departure_date: "30/03/2023",
        },
        {
          id: 4,
          product: {
            id: 1,
            code: "K-ABC",
            name: "Kedelai ABC",
          },
          buy_price: 10000,
          sell_price: null,
          original_weight: 10000,
          arrive_weight: 9990,
          current_weight: null,
          branch_weight: null,
          at_customer: null,
          arrive_date: "29/03/2023",
          empty_date: null,
          hold: true,
          arrived: true,
          status: {
            id: 3,
            name: "Arrived",
          },
          from_branch: false,
          vehicle: {
            id: 1,
            name: "Truk A",
            trip_count: 3,
            etoll: 100000,
          },
          trip: {
            id: 1,
            vehicle_id: 1,
            request_bbm: 0,
            request_etoll: 0,
            request_allowance: 0,
            customer_id: 1,
            shipping_fee: 25000,
          },
          departure_date: "30/03/2023",
        },
      ],
    };
  },
  methods: {
    changeTab(index) {
      this.tabs.forEach((tab) => {
        if (tab.current) {
          tab.current = false;
        }
      });
      this.tabs[index].current = true;
      this.currentTab = this.tabs[index].name;
    },
    formatNumber(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return "-";
      }
    },
  },
};
</script>
