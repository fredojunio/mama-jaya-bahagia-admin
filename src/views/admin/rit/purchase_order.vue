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
      class="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 md:px-8 mb-8"
    >
      <h1 class="text-2xl font-semibold text-gray-900">Purchase Order</h1>
      <button
        v-if="role_id == 1"
        @click="openAddForm"
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
      >
        Tambah Purchase Order
      </button>
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
                      PO Code
                    </th>
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
                      Jenis Barang
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Target Tonase
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tercapai
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
                      Status
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Histori Ambil
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="po in purchase_orders" :key="po.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      {{ po.po_code }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                    >
                      {{ formatDate(po.created_at) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                    >
                      {{ po.item ? po.item.name : "-" }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                    >
                      {{ formatNumber(po.tonnage) }} Kg
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                    >
                      {{ formatNumber(po.rits_sum_expected_tonnage || 0) }} Kg
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                    >
                      Rp. {{ formatNumber(po.buy_price) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
                    >
                      <span
                        :class="[
                          po.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800',
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase',
                        ]"
                      >
                        {{ po.status }}
                      </span>
                    </td>
                    <td
                      class="whitespace-normal py-4 pl-4 pr-3 text-sm sm:pl-6"
                    >
                      <ul class="list-decimal pl-4 space-y-3">
                        <li v-for="(grab, index) in po.grabs" :key="index" class="text-xs text-gray-600 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <div v-if="editingGrabId !== grab.id" class="flex flex-col">
                            <div class="flex items-center justify-between">
                              <span class="font-medium text-gray-900">{{ formatDate(grab.rit.delivery_date) }}</span>
                              <button 
                                v-if="role_id == 1"
                                @click="startEditGrab(grab)"
                                class="text-indigo-600 hover:text-indigo-900 font-medium ml-2"
                                title="Edit Tanggal & Keterangan"
                              >
                                Edit
                              </button>
                            </div>
                            <div class="text-[11px] text-gray-500 mt-0.5">
                              {{ grab.rit.trip && grab.rit.trip.vehicle ? grab.rit.trip.vehicle.name : '-' }} - 
                              {{ formatNumber(grab.rit.expected_tonnage) }} Kg
                            </div>
                            <div v-if="grab.description" class="text-[10px] text-gray-400 italic mt-0.5">
                              Ket: {{ grab.description }}
                            </div>
                          </div>
                          <div v-else class="space-y-2 bg-gray-50 p-2 rounded border border-gray-200">
                            <div>
                              <label class="block text-[10px] font-medium text-gray-700">Tanggal</label>
                              <input 
                                type="date" 
                                v-model="editGrabDate" 
                                class="mt-0.5 w-full text-xs border-gray-300 rounded px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label class="block text-[10px] font-medium text-gray-700">Keterangan</label>
                              <textarea 
                                v-model="editGrabDescription" 
                                rows="2"
                                class="mt-0.5 w-full text-xs border-gray-300 rounded px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Keterangan..."
                              ></textarea>
                            </div>
                            <div class="flex space-x-2 justify-end">
                              <button 
                                @click="saveGrabEdit(grab)"
                                class="text-[10px] bg-indigo-600 text-white rounded px-2 py-1 hover:bg-indigo-700 font-medium"
                              >
                                Simpan
                              </button>
                              <button 
                                @click="cancelEditGrab"
                                class="text-[10px] bg-white text-gray-700 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <span v-if="!po.grabs || po.grabs.length === 0" class="text-xs text-gray-400">Belum ada</span>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
                    >
                      <div class="flex space-x-2" v-if="role_id == 1">
                        <button
                          @click="openAmbilForm(po)"
                          v-if="po.status === 'pending'"
                          class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-2 py-1 rounded"
                        >
                          Ambil
                        </button>
                        <button
                          @click="openEditForm(po)"
                          class="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded"
                        >
                          Edit
                        </button>
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

    <!-- Modal Form Tambah/Edit PO -->
    <TransitionRoot as="template" :show="showForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showForm = false"
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
              <form class="space-y-6">
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{
                      formData.id
                        ? "Edit Purchase Order"
                        : "Tambah Purchase Order"
                    }}
                  </h3>
                </div>
                <div class="grid grid-cols-1 gap-y-4">
                  <div v-if="!formData.id">
                    <label class="block text-sm font-medium text-gray-700"
                      >Jenis Barang</label
                    >
                    <select
                      v-model="formData.item_id"
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                    >
                      <option
                        v-for="item in items"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.code }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Target Tonase (Kg)</label
                    >
                    <input
                      type="number"
                      v-model="formData.tonnage"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Harga Beli (Rp.)</label
                    >
                    <input
                      type="number"
                      v-model="formData.buy_price"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                >
                  <button
                    type="button"
                    @click="saveData"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:opacity-90 focus:outline-none sm:col-start-2 sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    @click="showForm = false"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Modal Form Ambil (Create Rit) -->
    <TransitionRoot as="template" :show="showAmbilForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showAmbilForm = false"
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
              <form class="space-y-6">
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Ambil Purchase Order: {{ selectedPo?.po_code }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    Sisa Kuota Tonase:
                    {{
                      formatNumber(
                        selectedPo?.tonnage -
                          (selectedPo?.rits_sum_expected_tonnage || 0),
                      )
                    }}
                    Kg
                  </p>
                </div>
                <div class="grid grid-cols-1 gap-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Kendaraan</label
                    >
                    <select
                      v-model="ambilData.vehicle_id"
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                    >
                      <option
                        v-for="vehicle in vehicles"
                        :key="vehicle.id"
                        :value="vehicle.id"
                      >
                        {{ vehicle.name }} -
                        {{ vehicle.type }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Tanggal Ambil (Delivery Date)</label
                    >
                    <input
                      type="date"
                      v-model="ambilData.delivery_date"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Kode DO</label
                    >
                    <input
                      type="text"
                      v-model="ambilData.do_code"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Tonase Ambil (Kg)</label
                    >
                    <input
                      type="number"
                      v-model="ambilData.expected_tonnage"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Keterangan</label
                    >
                    <textarea
                      v-model="ambilData.description"
                      rows="3"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                      placeholder="Masukkan keterangan tambahan jika ada..."
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Sangu (Rp.)</label
                    >
                    <input
                      type="number"
                      v-model="ambilData.allowance"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Bensin (Rp.)</label
                    >
                    <input
                      type="number"
                      v-model="ambilData.gas"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Tol (Rp.)</label
                    >
                    <input
                      type="number"
                      v-model="ambilData.toll"
                      class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div class="flex items-center">
                    <input
                      id="send_to_customer"
                      type="checkbox"
                      v-model="ambilData.send_to_customer"
                      class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label
                      for="send_to_customer"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      Kirim Langsung Ke Customer
                    </label>
                  </div>
                  <div v-if="ambilData.send_to_customer" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Customer</label
                      >
                      <select
                        v-model="ambilData.customer_id"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                      >
                        <option
                          v-for="customer in customers"
                          :key="customer.id"
                          :value="customer.id"
                        >
                          {{ customer.name }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Tonase Customer (Kg)</label
                      >
                      <input
                        type="number"
                        v-model="ambilData.customer.tonnage"
                        class="mt-1 shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                >
                  <button
                    type="button"
                    @click="submitAmbil"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"
                  >
                    Ambil
                  </button>
                  <button
                    type="button"
                    @click="showAmbilForm = false"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>

<script>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      isLoading: false,
      purchase_orders: [],
      items: [],
      showForm: false,
      showAmbilForm: false,
      formData: {
        id: null,
        item_id: null,
        tonnage: null,
        buy_price: null,
      },
      selectedPo: null,
      ambilData: {
        vehicle_id: null,
        do_code: null,
        expected_tonnage: null,
        delivery_date: null,
        description: null,
        allowance: 0,
        gas: 0,
        toll: 0,
        send_to_customer: false,
        customer_id: null,
        customer: {
          tonnage: null,
        },
      },
      vehicles: [],
      customers: [],
      editingGrabId: null,
      editGrabDate: null,
      editGrabDescription: null,
    };
  },
  created() {
    this.getAllData();
    this.getItems();
    this.getAllVehicles();
    this.getAllCustomers();

    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    this.ambilData.delivery_date = formattedDate;
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat("id-ID").format(number);
    },
    formatDate(date) {
      if (!date) return "-";
      return new Intl.DateTimeFormat("id-ID").format(new Date(date));
    },
    getItems() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/item")
        .then((res) => {
          this.items = res.data.data.results;
        })
        .catch((err) => console.log(err));
    },
    getAllVehicles() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/vehicle")
        .then((res) => {
          this.vehicles = res.data.data.results;
        })
        .catch((err) => console.log(err));
    },
    getAllCustomers() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/customer/only_get_owner")
        .then((res) => {
          this.customers = res.data.data.results;
        })
        .catch((err) => console.log(err));
    },
    getAllData() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/purchase_order")
        .then((res) => {
          this.purchase_orders = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    openAddForm() {
      this.formData = {
        id: null,
        item_id: this.items.length > 0 ? this.items[0].id : null,
        tonnage: null,
        buy_price: null,
      };
      this.showForm = true;
    },
    openEditForm(po) {
      this.formData = {
        id: po.id,
        item_id: po.item_id,
        tonnage: po.tonnage,
        buy_price: po.buy_price,
      };
      this.showForm = true;
    },
    saveData() {
      if (!this.formData.tonnage || !this.formData.buy_price) {
        alert("Mohon lengkapi data");
        return;
      }
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      if (this.formData.id) {
        instance
          .put(`/admin/purchase_order/${this.formData.id}`, this.formData)
          .then(() => {
            this.showForm = false;
            this.getAllData();
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      } else {
        instance
          .post("/admin/purchase_order", this.formData)
          .then(() => {
            this.showForm = false;
            this.getAllData();
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      }
    },
    openAmbilForm(po) {
      this.selectedPo = po;
      this.ambilData = {
        vehicle_id: this.vehicles.length > 0 ? this.vehicles[0].id : null,
        do_code: null,
        expected_tonnage: null,
        delivery_date: this.ambilData.delivery_date, // keep today's date
        description: null,
        allowance: 0,
        gas: 0,
        toll: 0,
        send_to_customer: false,
        customer_id: this.customers.length > 0 ? this.customers[0].id : null,
        customer: {
          tonnage: null,
        },
      };
      this.showAmbilForm = true;
    },
    submitAmbil() {
      if (
        !this.ambilData.do_code ||
        !this.ambilData.expected_tonnage ||
        !this.ambilData.delivery_date ||
        !this.ambilData.vehicle_id
      ) {
        alert("Mohon lengkapi data");
        return;
      }
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          `/admin/purchase_order/${this.selectedPo.id}/ambil`,
          this.ambilData,
        )
        .then(() => {
          this.showAmbilForm = false;
          this.getAllData();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    startEditGrab(grab) {
      this.editingGrabId = grab.id;
      if (grab.rit && grab.rit.delivery_date) {
        const d = new Date(grab.rit.delivery_date);
        this.editGrabDate = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      } else {
        this.editGrabDate = '';
      }
      this.editGrabDescription = grab.description || '';
    },
    cancelEditGrab() {
      this.editingGrabId = null;
      this.editGrabDate = null;
      this.editGrabDescription = null;
    },
    saveGrabEdit(grab) {
      if (!this.editGrabDate) {
        alert("Tanggal wajib diisi");
        return;
      }
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .put(`/admin/purchase_order_grab/${grab.id}`, {
          delivery_date: this.editGrabDate,
          description: this.editGrabDescription,
        })
        .then(() => {
          this.cancelEditGrab();
          this.getAllData();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          alert("Gagal memperbarui data histori");
        });
    },
  },
};
</script>
