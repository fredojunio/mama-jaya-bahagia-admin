<template>
  <Admin>
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Daftar Rit</h1>
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
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Kendaraan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Barang
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Sangu
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      BBM
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      E-Toll
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Approve
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">23/03/2023</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">Truk A</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">K-ABC</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">Rp. 10.000</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">Rp. 10.000</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">Rp. 10.000</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showRitApprovalForm = true"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="fa:check"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Approve</span>
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
    <!-- //SECTION - Form Approve Rit -->
    <TransitionRoot as="template" :show="showRitApprovalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showRitApprovalForm = false"
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
                        Approve Perjalanan Rit
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        <!-- Kosong -->
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        BBM: -
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Kendaraan: Truk A
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        E-Toll: -
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        <!-- Kosong -->
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Sangu: Rp. 10.000
                      </h3>
                    </div>
                    <hr />

                    <div
                      class="mt-2 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
                        <label
                          for="money"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Total (Rp.)
                        </label>
                        <div class="mt-1">Rp. 10.000</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showRitApprovalForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="showRitApprovalForm = false"
                      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {{ "Submit" }}
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
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
</script>
<script>
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
    changeTabMobile(event) {
      this.tabs.forEach((tab) => {
        if (tab.name == event.target.value) {
          tab.current = true;
          this.currentTab = tab.name;
        } else {
          tab.current = false;
        }
      });
    },
  },
  data() {
    return {
      showRitApprovalForm: false,
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
};
</script>

<style></style>
