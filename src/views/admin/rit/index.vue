<template>
  <Admin>
    <div
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 mb-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">Rit</h1>
      <div class="relative flex gap-2 text-left">
        <!-- //TODO - Add Data Logic -->
        <button
          @click="showTransferToBranch = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
        >
          Kirim ke Cabang
        </button>
        <button
          @click="showAddRitForm = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
        >
          Tambah Rit
        </button>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          @change="changeTabMobile($event)"
          id="tabs"
          name="tabs"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <div
              @click="changeTab(index)"
              v-for="(tab, index) in tabs"
              :key="tab.name"
              :class="[
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
              :aria-current="tab.current ? 'page' : undefined"
            >
              {{ tab.name }}
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- //SECTION Tab Stok -->
      <div v-if="currentTab == tabs[0].name" class="mt-8 flex flex-col">
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
                      Tonase Total
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Keterangan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Penjualan Harian
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
                      Harga Jual
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tanggal Habis
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
                  <tr
                    v-for="rit in rits.filter(
                      (rit) =>
                        rit.arrival_date != null &&
                        rit.sell_price > 0 &&
                        rit.is_hold == 0
                    )"
                    :key="rit.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }} - {{ rit.arrival_date }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(rit.expected_tonnage) }} kg
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
                        <div class="font-medium text-gray-900">-</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(rit.tonnage_left) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.sell_price) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(rit.sold_date) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="openEditRitPriceForm(rit.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
                        </div>
                      </div>
                      <div class="flex flex-col items-start">
                        <div
                          @click="openRitBranchDetail(rit.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:home"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Cabang</span>
                        </div>
                      </div>
                      <div class="flex flex-col items-start">
                        <div
                          @click="openReturnRitForm(rit.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:truck"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Retur</span>
                        </div>
                      </div>
                      <div class="flex flex-col items-start">
                        <div
                          @click="openRitDetail(rit.id)"
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
      <!-- //!SECTION -->
      <!-- //SECTION - Tab Dalam Perjalanan  -->
      <div v-else-if="currentTab == tabs[1].name" class="mt-8 flex flex-col">
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
                      Tanggal Berangkat
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
                      Tonase Total
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      DO
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Keterangan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="rit in rits.filter(
                      (rit) =>
                        rit.arrival_date == null && rit.finance_approved == 1
                    )"
                    :key="rit.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(rit.delivery_date) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.trip.vehicle.name }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(rit.expected_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.do_code }}
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
                      <div class="flex flex-col items-start">
                        <div
                          @click="openEditRitArrivalForm(rit.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit Status</span>
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
      <!-- //!SECTION -->
      <!-- //SECTION - Tab Hold  -->
      <div v-else-if="currentTab == tabs[2].name" class="mt-8 flex flex-col">
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
                      Tonase Total
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Keterangan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Penjualan Harian
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
                      Harga Jual
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="rit in rits.filter(
                      (rit) => rit.is_hold == 1 && sold_date == null
                    )"
                    :key="rit.id"
                  >
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }} - {{ rit.arrival_date }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(rit.expected_tonnage) }} kg
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
                        <div class="font-medium text-gray-900">-</div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(rit.tonnage_left) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.sell_price) }}
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
      <!-- //!SECTION  -->
    </div>
    <!-- //SECTION Tambah Rit -->
    <TransitionRoot as="template" :show="showAddRitForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showAddRitForm = false"
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
                        {{ "Tambah Rit" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>

                    <div
                      class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
                        <label
                          for="vehicle"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Kendaraan
                        </label>
                        <div class="mt-1">
                          <select
                            v-model="newRit.vehicle_id"
                            id="vehicle"
                            name="vehicle"
                            class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option
                              v-for="vehicle in vehicles"
                              :key="vehicle.id"
                              :value="vehicle.id"
                            >
                              {{ vehicle.name }} - ({{ vehicle.trip_count }}
                              Trip)
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label
                          for="do_code"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Kode DO
                        </label>
                        <div class="mt-1">
                          <input
                            id="do_code"
                            v-model="newRit.do_code"
                            type="text"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label
                          for="product"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Jenis Barang
                        </label>
                        <div class="mt-1">
                          <select
                            id="product"
                            v-model="newRit.item_id"
                            name="product"
                            class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
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
                      </div>

                      <div class="sm:col-span-6">
                        <label
                          for="tonnage"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Total Tonase (kg)
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newRit.tonnage"
                            id="tonnage"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label
                          for="sak"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Sak
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newRit.sack"
                            id="sak"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6 mt-1">
                        <SwitchGroup as="div" class="flex items-center">
                          <Switch
                            v-model="newRit.send_to_customer"
                            :class="[
                              newRit.send_to_customer
                                ? 'bg-indigo-600'
                                : 'bg-gray-200',
                              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                            ]"
                          >
                            <span
                              aria-hidden="true"
                              :class="[
                                newRit.send_to_customer
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                              ]"
                            />
                          </Switch>
                          <SwitchLabel as="span" class="ml-3">
                            <span class="text-sm font-medium text-gray-900"
                              >Kirim ke Customer
                            </span>
                          </SwitchLabel>
                        </SwitchGroup>
                      </div>

                      <div class="sm:col-span-6" v-if="newRit.send_to_customer">
                        <label
                          for="customer"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Customer
                        </label>
                        <div class="mt-1">
                          <select
                            v-model="newRit.customer_id"
                            id="customer"
                            name="customer"
                            class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option
                              v-for="customer in customers.filter(
                                (customer) => customer.type == 'Owner'
                              )"
                              :key="customer.id"
                              :value="customer.id"
                            >
                              {{ customer.name }} ({{ customer.nickname }})
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="sm:col-span-6" v-if="newRit.send_to_customer">
                        <label
                          for="customer_weight"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Tonase ke Customer (kg)
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newRit.customer.tonnage"
                            id="customer_weight"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-6">
                        <label
                          for="allowance_fee"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Uang Sangu (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newRit.allowance"
                            id="allowance_fee"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="gas_fee"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Uang BBM (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newRit.gas"
                            id="gas_fee"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="etoll_fee"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Uang E-Toll (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="newRit.toll"
                            id="etoll_fee"
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
                      @click="showAddRitForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        newRit.vehicle_id == null ||
                        newRit.do_code == null ||
                        newRit.item_id == null ||
                        newRit.tonnage == null ||
                        newRit.sack == null
                      "
                      @click.once="createData()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
    <!-- //SECTION Edit Rit Datang  -->
    <TransitionRoot as="template" :show="showEditRitArrivalForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showEditRitArrivalForm = false"
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
                        {{ "Masukan Jumlah Tonase Yang Datang" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-x-4">
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Barang: {{ selectedData.item.code }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Kendaraan: {{ selectedData.trip.vehicle.name }}
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Tonase Awal:
                        {{ formatNumber(selectedData.main_tonnage) }} kg
                      </h3>
                      <h3 class="text-md leading-6 font-medium text-gray-900">
                        Tanggal Berangkat:
                        {{ formatDate(selectedData.delivery_date) }}
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
                            v-model="arrivedRit.tonnage"
                            id="original_weight"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="etoll_fee"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Uang E-Toll Yang Digunakan (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="arrivedRit.toll_used"
                            id="etoll_fee"
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
                      @click="showEditRitArrivalForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="
                        arrivedRit.tonnage <= 0 ||
                        arrivedRit.tonnage > selectedData.main_tonnage
                      "
                      type="button"
                      @click.once="ritHasArrived()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
    <!-- //SECTION Edit Rit  -->
    <TransitionRoot as="template" :show="showEditRitPriceForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showEditRitPriceForm = false"
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
                        Edit Harga Jual
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-6 gap-x-4">
                      <h3
                        class="col-span-6 text-md leading-6 font-medium text-gray-900"
                      >
                        Barang: {{ selectedData.item.code }}
                      </h3>
                      <h3
                        class="col-span-2 text-md leading-6 font-medium text-gray-900"
                      >
                        Customer:
                        {{ formatNumber(selectedData.customer_tonnage) }} kg
                      </h3>
                      <h3
                        class="col-span-2 text-md leading-6 font-medium text-gray-900"
                      >
                        Cabang:
                        {{ formatNumber(selectedData.branch_tonnage) }} kg
                      </h3>
                      <h3
                        class="col-span-2 text-md leading-6 font-medium text-gray-900"
                      >
                        Pusat: {{ formatNumber(selectedData.main_tonnage) }} kg
                      </h3>
                    </div>
                    <hr />

                    <div
                      class="mt-2 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6 mt-1">
                        <SwitchGroup as="div" class="flex items-center">
                          <Switch
                            v-model="pricedRit.is_hold"
                            :class="[
                              pricedRit.is_hold
                                ? 'bg-indigo-600'
                                : 'bg-gray-200',
                              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                            ]"
                          >
                            <span
                              aria-hidden="true"
                              :class="[
                                pricedRit.is_hold
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                              ]"
                            />
                          </Switch>
                          <SwitchLabel as="span" class="ml-3">
                            <span class="text-sm font-medium text-gray-900"
                              >Hold Rit (Tidak bisa dijual)
                            </span>
                          </SwitchLabel>
                        </SwitchGroup>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="sell_price"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Harga Jual (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="sell_price"
                            v-model="pricedRit.sell_price"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="buy_price"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Harga Beli (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="buy_price"
                            v-model="pricedRit.buy_price"
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
                      @click="showEditRitPriceForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        pricedRit.sell_price <= 0 || pricedRit.buy_price <= 0
                      "
                      @click.once="ritHasBeenPriced()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
    <!-- //SECTION Kirim ke Cabang -->
    <TransitionRoot as="template" :show="showTransferToBranch">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showTransferToBranch = false"
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
                        Pengiriman ke cabang
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="flex flex-col col-span-1 h-full gap-y-2">
                        <div class="sm:col-span-6">
                          <label
                            for="branch_name"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Cabang
                          </label>
                          <div class="mt-1">
                            <input
                              v-model="transferBranchRit.branch_name"
                              id="branch_name"
                              type="text"
                              class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                            />
                          </div>
                        </div>
                        <div class="sm:col-span-6">
                          <label
                            for="vehicle"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Kendaraan
                          </label>
                          <div class="mt-1">
                            <select
                              v-model="transferBranchRit.vehicle_id"
                              id="vehicle"
                              name="vehicle"
                              class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option
                                v-for="vehicle in vehicles"
                                :key="vehicle.id"
                                :value="vehicle.id"
                              >
                                {{ vehicle.name }} - ({{ vehicle.trip_count }}
                                Trip)
                              </option>
                            </select>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-3 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="allowance_fee"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Uang Sangu (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="transferBranchRit.allowance"
                                id="allowance_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
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
                                v-model="transferBranchRit.gas"
                                id="gas_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
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
                                v-model="transferBranchRit.toll"
                                id="etoll_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                        </div>
                        <hr class="border-2" />
                        <div
                          class="flex justify-between items-center gap-2 mb-2"
                        >
                          <div class="text-md font-medium">Daftar Barang</div>
                          <button
                            type="button"
                            @click="addNewBranchRit"
                            class="inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-black p-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                          >
                            <Icon
                              icon="uil:plus"
                              class="w-6 h-6 text-white"
                            ></Icon>
                            Tambah Barang
                          </button>
                        </div>
                        <div
                          v-for="(rit, index) in transferBranchRit.rits"
                          :key="index"
                          class="grid grid-cols-7 gap-x-2 justify-center items-center"
                        >
                          <div class="col-span-3">
                            <label
                              for="product_id"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Rit {{ index + 1 }}
                            </label>
                            <div class="mt-1">
                              <select
                                v-model="rit.id"
                                id="product_id"
                                name="product_id"
                                class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option
                                  v-for="rite in rits.filter(
                                    (rite) =>
                                      rite.arrival_date != null &&
                                      rite.tonnage_left > 0 &&
                                      rite.is_hold == 0
                                  )"
                                  :key="rite.id"
                                  :value="rite.id"
                                >
                                  {{ rite.item.code }} -
                                  {{ formatDate(rite.arrival_date) }} ({{
                                    formatNumber(rite.tonnage_left)
                                  }}
                                  kg)
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-span-3">
                            <label
                              for="amount"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Tonase (kg)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="rit.amount"
                                id="amount"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div class="col-span-1">
                            <div
                              @click="removeRit(index)"
                              class="cursor-pointer inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-red-600 p-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
                            >
                              <Icon icon="uil:times" class="w-4 h-4"></Icon>
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
                      @click="showTransferToBranch = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      :disabled="
                        transferBranchRit.branch_name == null ||
                        transferBranchRit.vehicle_id == null ||
                        transferBranchRit.rits.some(
                          (rit) => rit.id == null || rit.amount <= 0
                        ) ||
                        transferBranchRit.rits.some(
                          (rit) =>
                            rits.find((oRit) => oRit.id === rit.id) &&
                            rit.amount >
                              rits.find((oRit) => oRit.id === rit.id)
                                .tonnage_left
                        )
                      "
                      @click.once="transferRitsToBranch()"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
    <!-- //SECTION Cabang -->
    <TransitionRoot as="template" :show="showRitBranchDetail">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showRitBranchDetail = false"
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
                        Riwayat Pengiriman ke Cabang
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
                                      Tanggal Pengiriman
                                    </th>
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
                                      Tonase (kg)
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  class="divide-y divide-gray-200 bg-white"
                                >
                                  <tr
                                    v-for="ritBranch in selectedData.branches"
                                    :key="ritBranch.id"
                                  >
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ formatDate(ritBranch.created_at) }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ selectedData.item.code }} -
                                          {{ selectedData.arrival_date }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{
                                            formatNumber(ritBranch.sent_tonnage)
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
                      @click="showRitBranchDetail = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Close
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
    <!-- //SECTION Retur -->
    <TransitionRoot as="template" :show="showReturnRitForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showReturnRitForm = false"
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
              v-if="selectedData.retur_tonnage <= 0"
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            >
              <!-- //NOTE - ini kalo belum di retur -->
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Retur Barang
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="flex flex-col col-span-1 h-full gap-y-2">
                        <div class="sm:col-span-6">
                          <label
                            for="vehicle"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Kendaraan
                          </label>
                          <div class="mt-1">
                            <select
                              v-model="returnRit.vehicle_id"
                              id="vehicle"
                              name="vehicle"
                              class="shadow-sm focus:ring-black focus:borderring-black block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option
                                v-for="vehicle in vehicles"
                                :key="vehicle.id"
                                :value="vehicle.id"
                              >
                                {{ vehicle.name }} - ({{ vehicle.trip_count }}
                                Trip)
                              </option>
                            </select>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-3 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="allowance_fee"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Uang Sangu (Rp.)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="returnRit.allowance"
                                id="allowance_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
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
                                v-model="returnRit.gas"
                                id="gas_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
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
                                v-model="returnRit.toll"
                                id="etoll_fee"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-1 gap-x-2 justify-center items-center"
                        >
                          <div>
                            <label
                              for="tonnage"
                              class="block text-sm font-medium text-gray-700"
                            >
                              Tonase (kg)
                            </label>
                            <div class="mt-1">
                              <input
                                v-model="returnRit.tonnage"
                                id="tonnage"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
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
                      @click="showReturnRitForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="
                        returnRit.vehicle_id == null ||
                        returnRit.tonnage > selectedData.tonnage_left ||
                        returnRit.tonnage <= 0
                      "
                      type="button"
                      @click.once="returningRit(selectedData.id)"
                      class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              v-else
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            >
              <!-- //NOTE - ini kalo udah di retur -->
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Riwayat Retur Barang
                      </h3>
                    </div>
                    <hr />
                    <div
                      class="max-w-7xl mt-2 grid grid-cols-1 mx-auto mb-8 gap-x-4"
                    >
                      <div class="grid grid-cols-2 gap-x-4">
                        <h3 class="text-md leading-6 font-medium text-gray-900">
                          Jumlah Tonase:
                          {{ formatNumber(selectedData.retur_tonnage) }} kg
                        </h3>
                        <h3 class="text-md leading-6 font-medium text-gray-900">
                          Tanggal Pengiriman:
                          {{ formatDate(selectedData.retur_trip.created_at) }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="showReturnRitForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Close
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
                                      Customer
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
                                    v-for="ritTransaction in selectedData.transactions.filter(
                                      (transaction) =>
                                        transaction.owner_approved == 1
                                    )"
                                    :key="ritTransaction.id"
                                  >
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{ ritTransaction.customer_name }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
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
                                        <div class="font-medium text-gray-900">
                                          {{
                                            formatNumber(ritTransaction.tonnage)
                                          }}
                                          kg
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          Rp.
                                          {{
                                            formatNumber(
                                              ritTransaction.total_price
                                            )
                                          }}
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                    >
                                      <div class="flex items-center">
                                        <div class="font-medium text-gray-900">
                                          {{
                                            formatNumber(
                                              ritTransaction.tonnage_left
                                            )
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
                      Close
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
import axios from "axios";
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
    getAllCustomers: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/customer")
        .then((data) => {
          this.customers = data.data.data.results.map((item) => {
            return {
              id: item.id,
              nik: item.nik,
              name: item.name,
              nickname: item.nickname,
              address: item.address,
              ongkir: item.ongkir,
              birthdate: item.birthdate,
              type: item.type,
              tb: item.tb,
              tw: item.tw,
              thr: item.thr,
              tonnage: item.tonnage,
              cashback_approved: item.cashback_approved,
              savings: item.savings,
              transactions: item.transactions,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllItems: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/item")
        .then((data) => {
          this.items = data.data.data.results.map((item) => {
            return {
              id: item.id,
              code: item.code,
              brand: item.brand,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllVehicles: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/vehicle")
        .then((data) => {
          this.vehicles = data.data.data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              type: item.type,
              trip_count: item.trip_count,
              trips: item.trips,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllData: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/rit")
        .then((data) => {
          this.rits = data.data.data.results.map((item) => {
            return {
              id: item.id,
              do_code: item.do_code,
              expected_tonnage: item.expected_tonnage,
              customer_tonnage: item.customer_tonnage,
              branch_tonnage: item.branch_tonnage,
              main_tonnage: item.main_tonnage,
              retur_tonnage: item.retur_tonnage,
              arrived_tonnage: item.arrived_tonnage,
              tonnage_left: item.tonnage_left,
              delivery_date: item.delivery_date,
              arrival_date: item.arrival_date,
              sold_date: item.sold_date,
              sell_price: item.sell_price,
              buy_price: item.buy_price,
              sack: item.sack,
              finance_approved: item.finance_approved,
              is_hold: item.is_hold,
              item: item.item,
              trip: item.trip,
              retur_trip: item.retur_trip,
              customer: item.customer,
              branches: item.branches,
              transactions: item.transactions,
              created_at: item.created_at,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createData() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post("admin/rit", this.newRit)
        .then((data) => {
          this.showAddRitForm = false;
          this.getAllData();
          this.resetNewRit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetNewRit() {
      this.newRit = {
        vehicle_id: null,
        do_code: null,
        item_id: null,
        tonnage: null,
        sack: null,
        send_to_customer: false,
        customer: {
          id: null,
          tonnage: null,
        },
        allowance: 0,
        gas: 0,
        toll: 0,
      };
    },
    ritHasArrived() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/rit/${this.selectedData.id}/arrived`, this.arrivedRit)
        .then((data) => {
          this.showEditRitArrivalForm = false;
          this.getAllData();
          this.resetArrivedRit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetArrivedRit() {
      this.arrivedRit = {
        tonnage: null,
        toll_used: null,
      };
    },
    ritHasBeenPriced() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/rit/${this.selectedData.id}/priced`, this.pricedRit)
        .then((data) => {
          this.showEditRitPriceForm = false;
          this.getAllData();
          this.resetPricedRit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetPricedRit() {
      this.pricedRit = {
        sell_price: null,
        buy_price: null,
        is_hold: false,
      };
    },
    addNewBranchRit() {
      var newRit = { product_id: "", amount: 0 };
      this.transferBranchRit.rits.push(newRit);
    },
    removeRit(index) {
      this.transferBranchRit.rits.splice(index, 1);
    },
    transferRitsToBranch() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/rit/transfer_to_branch`, this.transferBranchRit)
        .then((data) => {
          this.showTransferToBranch = false;
          this.getAllData();
          this.resetTransferToBranchRit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetTransferToBranchRit() {
      this.transferBranchRit = {
        rits: [{ id: null, amount: 0 }],
        branch_name: null,
        vehicle_id: null,
        allowance: null,
        gas: null,
        toll: null,
      };
    },
    returningRit() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/rit/${this.selectedData.id}/return`, this.returnRit)
        .then((data) => {
          this.showReturnRitForm = false;
          this.getAllData();
          this.resetReturnRit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetReturnRit() {
      this.returnRit = {
        vehicle_id: null,
        allowance: null,
        gas: null,
        toll: null,
        tonnage: null,
      };
    },
    openSendToCustomer(id) {
      this.sendToCustomer = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
    openEditRitArrivalForm(id) {
      this.showEditRitArrivalForm = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
    openEditRitPriceForm(id) {
      this.showEditRitPriceForm = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
      this.pricedRit.sell_price = this.selectedData.sell_price;
      this.pricedRit.buy_price = this.selectedData.buy_price;
      this.pricedRit.is_hold = this.selectedData.is_hold == 1 ? true : false;
    },
    openRitBranchDetail(id) {
      this.showRitBranchDetail = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
    openReturnRitForm(id) {
      this.showReturnRitForm = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
    openRitDetail(id) {
      this.showRitDetail = true;
      this.selectedData = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
  },
  created() {
    this.getAllCustomers();
    this.getAllItems();
    this.getAllVehicles();
    this.getAllData();
  },
  data() {
    return {
      //ini buat tambah rit
      showAddRitForm: false,
      sendToCustomer: false,
      //ini edit rit 1x dari si admin ketika barang datang
      showEditRitArrivalForm: false,
      //ini buat owner kalo mau edit harga
      showEditRitPriceForm: false,
      //ini buat ngirim ke cabang
      showTransferToBranch: false,
      //ini buat ngeretur barang
      showReturnRitForm: false,
      //ini buat cek detail
      showRitDetail: false,
      //ini buat cek pengiriman ke cabang
      showRitBranchDetail: false,
      toggleRetur: false,
      tabs: [
        { name: "Stok", current: true },
        { name: "Dalam Perjalanan", current: false },
        { name: "Hold", current: false },
      ],
      currentTab: "Stok",
      products: [{ product_id: "", amount: "0", masak: 1, is_new: false }],
      customers: [],
      items: [],
      vehicles: [],
      rits: [],
      selectedData: null,
      newRit: {
        vehicle_id: null,
        do_code: null,
        item_id: null,
        tonnage: null,
        sack: null,
        send_to_customer: false,
        customer: {
          id: null,
          tonnage: null,
        },
        allowance: 0,
        gas: 0,
        toll: 0,
      },
      arrivedRit: {
        tonnage: null,
        toll_used: null,
      },
      pricedRit: {
        sell_price: null,
        buy_price: null,
        is_hold: false,
      },
      transferBranchRit: {
        rits: [{ id: null, amount: 0 }],
        branch_name: null,
        vehicle_id: null,
        allowance: null,
        gas: null,
        toll: null,
      },
      returnRit: {
        vehicle_id: null,
        allowance: null,
        gas: null,
        toll: null,
        tonnage: null,
      },
    };
  },
};
</script>

<style></style>
