<template>
  <Admin>
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Laba Rugi</h1>
      <div class="relative flex gap-2 text-left">
        <!-- //TODO - Add Data Logic -->
        <div class="relative rounded-md shadow-sm w-96">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon icon="fa:calendar" class="h-5 w-5 text-gray-400" />
          </div>
          <VueDatePicker
            v-model="date"
            @update:model-value="filterData"
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
      <div class="mt-8 flex flex-col">
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
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Kode - Tanggal Datang
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Harga Beli
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Terjual
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Sisa Tonase
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Harga Penjualan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Hasil Laba/Rugi
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="rit in filteredRits.filter(
                      (rit) => rit.sold_date != null
                    )"
                    :key="rit.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }} -
                          {{ formatDate(rit.arrival_date) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.buy_price) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(totalTonnage(rit)) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col gap-y-2">
                        <div class="font-medium text-gray-900">
                          Customer: {{ formatNumber(rit.customer_tonnage) }} kg
                        </div>
                        <div class="font-medium text-gray-900">
                          Cabang: {{ formatNumber(rit.branch_tonnage) }} kg
                        </div>
                        <div class="font-medium text-gray-900">
                          Pusat: {{ formatNumber(rit.main_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(totalRevenue(rit)) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(totalProfit(rit)) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="openRitDetail(rit)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:eye"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Detail</span>
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
      <!-- //SECTION Detail -->
      <TransitionRoot as="template" :show="showRitDetail">
        <Dialog
          as="div"
          class="fixed z-10 inset-0 overflow-y-auto"
          @close="showRitDetail = false"
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
                class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
              >
                <form class="space-y-8 divide-y divide-gray-200">
                  <div class="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                          Riwayat Penjualan
                        </h3>
                      </div>
                      <hr />
                      <div
                        class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                      >
                        <div class="mt-8 flex flex-col">
                          <div
                            class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"
                          >
                            <div
                              class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                            >
                              <div
                                class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                              >
                                <table
                                  class="min-w-full divide-y divide-gray-300"
                                >
                                  <thead class="bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                      >
                                        Tanggal
                                      </th>
                                      <th
                                        scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                      >
                                        Tonase (kg)
                                      </th>
                                      <th
                                        scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                      >
                                        Total Penjualan
                                      </th>
                                      <th
                                        scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                      >
                                        Sisa Tonase
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    class="divide-y divide-gray-200 bg-white"
                                  >
                                    <tr
                                      v-for="ritTransaction in selectedRit.transactions"
                                      :key="ritTransaction.id"
                                    >
                                      <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                      >
                                        <div class="flex items-center">
                                          <div
                                            class="font-medium text-gray-900"
                                          >
                                            {{
                                              formatDate(
                                                ritTransaction.created_at
                                              )
                                            }}
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                      >
                                        <div class="flex items-center">
                                          <div
                                            class="font-medium text-gray-900"
                                          >
                                            {{ formatNumber(ritTransaction.tonnage) }} kg
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                      >
                                        <div class="flex items-center">
                                          <div
                                            class="font-medium text-gray-900"
                                          >
                                            Rp.
                                            {{ formatNumber(ritTransaction.total_price) }}
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                      >
                                        <div class="flex items-center">
                                          <div
                                            class="font-medium text-gray-900"
                                          >
                                            {{
                                              formatNumber(ritTransaction.tonnage_left)
                                            }}
                                            kg
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
                      </div>
                    </div>
                  </div>

                  <div class="pt-5">
                    <div class="flex justify-end">
                      <button
                        type="button"
                        @click="showRitDetail = false"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        @click="showRitDetail = false"
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
      <!-- //!SECTION -->
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
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Switch,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";
export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  created() {
    this.getAllRits();
  },
  methods: {
    getAllRits: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/rit")
        .then((data) => {
          this.rits = data.data.data.results;
          this.filterData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    totalTonnage(rit) {
      var totalTonnage = 0;
      rit.transactions.forEach((element) => {
        totalTonnage += element.tonnage;
      });
      return totalTonnage;
    },
    totalRevenue(rit) {
      var totalRevenue = 0;
      rit.transactions.forEach((element) => {
        totalRevenue += element.total_price;
      });
      return totalRevenue;
    },
    totalProfit(rit) {
      //NOTE - mungkin perlu dipastiin lagi rumusnya
      var totalProfit = 0;
      rit.transactions.forEach((element) => {
        totalProfit += element.total_price;
        totalProfit -= element.tonnage * rit.buy_price;
        totalProfit -= element.tonnage * 200;
      });
      return totalProfit;
    },
    filterData() {
      let startDate = new Date(this.date[0]);
      let untilDate = new Date(this.date[1]);
      this.filteredRits = this.rits.filter((rit) => {
        let ritDate = new Date(rit.arrival_date);
        return ritDate >= startDate && ritDate <= untilDate;
      });
    },
    openRitDetail(rit) {
      this.selectedRit = rit;
      this.showRitDetail = true;
    },
  },
  data() {
    return {
      //ini buat cek detail
      showRitDetail: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      rits: null,
      filteredRits: [],
      selectedRit: null,
    };
  },
};
</script>

<style></style>
