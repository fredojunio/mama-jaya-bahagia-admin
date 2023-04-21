<template>
  <Admin>
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Jual Barang</h1>
    </div>
    <div
      class="max-w-7xl grid grid-cols-1 sm:grid-cols-5 mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <div
        class="flex flex-col col-span-3 sm:border-r-2 h-full sm:pr-2 gap-y-2"
      >
        <div class="sm:col-span-6">
          <label for="customer" class="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <div class="mt-1">
            <select
              id="customer"
              name="customer"
              class="shadow-sm focus:ring-tukim-black focus:border-tukimring-tukim-black block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="long" selected>Supardi</option>
              <option value="short">Paimin</option>
            </select>
          </div>
        </div>
        <div class="sm:col-span-6">
          <label for="vehicle" class="block text-sm font-medium text-gray-700">
            Kendaraan *hanya muncul kalau bukan eceran
          </label>
          <div class="mt-1">
            <select
              v-model="vehicle"
              id="vehicle"
              name="vehicle"
              class="shadow-sm focus:ring-tukim-black focus:border-tukimring-tukim-black block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="long" selected>Truk A - (3 Trip)</option>
              <option value="short">Truk B - (7 Trip)</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div>
            <label
              for="allowance_fee"
              class="block text-sm font-medium text-gray-700"
            >
              Uang Sangu (Rp.)
            </label>
            <div class="mt-1">
              <!-- //NOTE - ini ngga ada kalau kiriman -->
              <input
                id="allowance_fee"
                v-model="allowance_fee"
                type="number"
                class="shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div>
            <label
              for="gas_fee"
              class="block text-sm font-medium text-gray-700"
            >
              Uang BBM (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="gas_fee"
                v-model="gas_fee"
                type="number"
                class="shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div>
            <label
              for="etoll_fee"
              class="block text-sm font-medium text-gray-700"
            >
              Uang E-Toll (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="etoll_fee"
                v-model="etoll_fee"
                type="number"
                class="shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
        </div>
        <hr class="border-2" />
        <div class="flex justify-between items-center gap-2 mb-2">
          <div class="text-md font-medium">Daftar Barang</div>
          <button
            @click="addNewProduct"
            class="inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-black p-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
          >
            <Icon icon="fa-plus"></Icon>
            Tambah Barang
          </button>
        </div>
        <div
          v-for="(product, index) in products"
          :key="index"
          class="grid grid-cols-11 gap-x-2 justify-center items-center"
        >
          <div class="col-span-2">
            <label
              for="product_id"
              class="block text-sm font-medium text-gray-700"
            >
              Rit {{ index + 1 }}
            </label>
            <div class="mt-1">
              <select
                v-model="product.product_id"
                id="product_id"
                name="product_id"
                class="shadow-sm focus:ring-tukim-black focus:border-tukimring-tukim-black block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="1" selected>K-ABC</option>
                <option value="2">K-DEF</option>
              </select>
            </div>
          </div>
          <div class="col-span-2">
            <label for="amount" class="block text-sm font-medium text-gray-700">
              Tonase (kg)
            </label>
            <div class="mt-1">
              <input
                id="amount"
                v-model="product.amount"
                type="number"
                class="shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="masak" class="block text-sm font-medium text-gray-700">
              Masak
            </label>
            <div class="mt-1">
              <input
                id="masak"
                v-model="product.masak"
                type="number"
                class="shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="price" class="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <div class="mt-1">
              <input
                id="price"
                v-model="product.price"
                type="number"
                disabled
                class="disabled:bg-gray-100 shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label for="price" class="block text-sm font-medium text-gray-700">
              Total
            </label>
            <div class="mt-1">
              <input
                id="price"
                v-model="product.price"
                type="number"
                disabled
                class="disabled:bg-gray-100 shadow-sm focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="col-span-1">
            <button
              @click="removeProduct(index)"
              class="inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-red-600 p-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
            >
              <Icon icon="uil:times" class="w-4 h-4"></Icon>
            </button>
          </div>
        </div>
        <hr class="border-2" />
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div class="col-span-1">
            <label for="tb" class="block text-sm font-medium text-gray-700">
              TB (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="tb"
                v-model="tb"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div class="col-span-1">
            <label for="tw" class="block text-sm font-medium text-gray-700">
              TW (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="tw"
                v-model="tw"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div class="col-span-1">
            <label for="thr" class="block text-sm font-medium text-gray-700">
              THR (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="thr"
                v-model="thr"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-6">
          <label for="discount" class="block text-sm font-medium text-gray-700">
            Discount (Rp.)
          </label>
          <div class="mt-1">
            <input
              id="discount"
              v-model="discount"
              type="number"
              class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
            />
          </div>
        </div>
        <hr class="border-2" />
        <div class="text-md font-medium">Total</div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div class="col-span-1">Harga Barang:</div>
          <div class="col-span-2">Rp. 2.000.000</div>
          <div class="col-span-1">Harga Ongkir:</div>
          <div class="col-span-2">Rp. 20.000</div>
          <hr class="col-span-3 border" />
          <div class="col-span-1">Harga Total:</div>
          <div class="col-span-2">Rp. 2.020.000</div>
        </div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div class="col-span-1">
            <label for="tb" class="block text-sm font-medium text-gray-700">
              Uang yang dibawa (Rp.)
            </label>
            <div class="mt-1">
              <input
                id="tb"
                v-model="tb"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="money_kurang"
              class="block text-sm font-medium text-gray-700"
            >
              Kurang Bayar *nanti auto dihitung juga
            </label>
            <div class="mt-1">
              <input
                disabled
                id="money_kurang"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="button"
              @click="showConfirmationPopup = true"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tukim-black"
            >
              {{ "Submit" }}
            </button>
          </div>
        </div>
        <hr class="border-2" />
        <div class="text-md font-medium">
          Kalkulator *akan di hitung auto nantinya
        </div>
        <div class="grid grid-cols-3 gap-x-2 justify-center items-center">
          <div class="col-span-1">
            <label
              for="product_id"
              class="block text-sm font-medium text-gray-700"
            >
              Produk
            </label>
            <div class="mt-1">
              <select
                id="product_id"
                name="product_id"
                class="shadow-sm focus:ring-tukim-black focus:border-tukimring-tukim-black block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="1" selected>K-ABC</option>
                <option value="2">K-DEF</option>
              </select>
            </div>
          </div>
          <div class="col-span-1">
            <label for="tonase" class="block text-sm font-medium text-gray-700">
              Tonase (kg)
            </label>
            <div class="mt-1">
              <input
                id="tonase"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
          <div class="col-span-1">
            <label for="money" class="block text-sm font-medium text-gray-700">
              Uang (Rp.)
            </label>
            <div class="mt-1">
              <input
                disabled
                id="money"
                type="number"
                class="shadow-sm disabled:bg-gray-100 focus:ring-tukim-black focus:border-tukim-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col col-span-2 border-t-4 mt-12 sm:border-t-0 sm:mt-0"
      >
        <!-- //ANCHOR - Customer Detail  -->
        <CustomerDetail />
      </div>
    </div>

    <!-- //SECTION - Popup Confirmation  -->
    <TransitionRoot as="template" :show="showConfirmationPopup">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showConfirmationPopup = false"
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
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <Icon
                    icon="fa:exclamation-triangle"
                    class="h-6 w-6 text-yellow-400"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Submit Data
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Pastikan data sudah benar ketika mensubmit penjualan!
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                  @click="showConfirmationPopup = false"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tukim-black sm:mt-0 sm:w-auto sm:text-sm"
                  @click="showConfirmationPopup = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- //!SECTION  -->
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import CustomerDetail from "../../../components/CustomerDetail.vue";
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
    formatNumber(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return "-";
      }
    },
    addNewProduct() {
      var newProduct = { product_id: "", amount: "0", masak: 1, is_new: false };
      this.products.push(newProduct);
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
  },
  data() {
    return {
      //ini buat confirmation
      showConfirmationPopup: false,
      products: [{ product_id: "", amount: "0", masak: 1, is_new: false }],
    };
  },
};
</script>

<style></style>
