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
      class="max-w-7xl flex justify-end mx-auto px-4 sm:px-6 md:px-8 gap-x-4"
    >
      <h1 class="text-2xl font-semibold text-gray-900 mr-auto">
        Daftar Pengeluaran
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
        <button
          @click="exportExcel"
          class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto"
        >
          Export Excel
        </button>
        <button
          v-if="showAddButton"
          @click="openAddExpenseForm"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
        >
          Tambah Pengeluaran
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
          <option
            v-for="tab in tabs"
            :key="tab.name"
            :value="tab.name"
            :selected="tab.current"
          >
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav
            class="-mb-px flex space-x-8 overflow-x-auto"
            aria-label="Tabs"
          >
            <div
              @click="changeTab(tab.name)"
              v-for="tab in tabs"
              :key="tab.name"
              :class="[
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'cursor-pointer whitespace-nowrap flex-shrink-0 py-4 px-1 border-b-2 font-medium text-sm',
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
      <div class="mt-6">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ currentTabData.title }}
        </h2>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- //SECTION - Tab Kendaraan -->
      <div v-if="currentTabData.kind === 'kendaraan'" class="mt-8 flex flex-col">
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
                      Kendaraan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      BBM <br/><span class="text-xs font-normal whitespace-nowrap">(Rp. {{ formatNumber(totalBbmSum) }})</span>
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      E-Toll <br/><span class="text-xs font-normal whitespace-nowrap">(Rp. {{ formatNumber(totalEtollSum) }})</span>
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Sangu <br/><span class="text-xs font-normal whitespace-nowrap">(Rp. {{ formatNumber(totalSanguSum) }})</span>
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
                      Note
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      COA
                    </th>
                    <th
                      v-if="role_id == 1"
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="expense in expenses" :key="expense.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.trip.vehicle.name }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.trip.gas) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.trip.toll) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.trip.allowance) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(expense.time) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.note }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.coa ? expense.coa.code : "-" }}
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="role_id == 1"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showEdit(expense.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
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
      <!-- //SECTION - Tab Tabungan  -->
      <div v-if="currentTabData.kind === 'tabungan'" class="mt-8 flex flex-col">
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
                      Customer
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Jumlah <br/><span class="text-xs font-normal whitespace-nowrap">(Rp. {{ formatNumber(totalAmountSum) }})</span>
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tipe
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
                      COA
                    </th>
                    <th
                      v-if="role_id == 1"
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="expense in expenses" :key="expense.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.name }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.amount) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.type }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(expense.time) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.coa ? expense.coa.code : "-" }}
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="role_id == 1"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showEdit(expense.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
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
      <!-- //SECTION - Tab Cashback  -->
      <div v-if="currentTabData.kind === 'cashback'" class="mt-8 flex flex-col">
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
                      Customer
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Jumlah <br/><span class="text-xs font-normal whitespace-nowrap">(Rp. {{ formatNumber(totalAmountSum) }})</span>
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
                      COA
                    </th>
                    <th
                      v-if="role_id == 1"
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="expense in expenses" :key="expense.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.name }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.amount) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(expense.time) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.coa ? expense.coa.code : "-" }}
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="role_id == 1"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showEdit(expense.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
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
      <!-- //SECTION - Tab Operasional  -->
      <div v-if="currentTabData.kind === 'coa'" class="mt-8 flex flex-col">
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
                      Jumlah <br/><span class="text-xs font-normal whitespace-nowrap">(Rp. {{ formatNumber(totalAmountSum) }})</span>
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
                      Waktu
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      COA
                    </th>
                    <th
                      v-if="role_id == 1"
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="expense in expenses" :key="expense.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.amount) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.note }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.time }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.coa ? expense.coa.code : "-" }}
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="role_id == 1"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showEdit(expense.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
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
      <!-- //SECTION - Tab Gaji  -->
      <div v-if="currentTabData.kind === 'gaji'" class="mt-8 flex flex-col">
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
                      Nama
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Jumlah
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
                      Keterangan
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      COA
                    </th>
                    <th
                      v-if="role_id == 1"
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="expense in expenses" :key="expense.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.name }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(expense.amount) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatDate(expense.time) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.note }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ expense.coa ? expense.coa.code : "-" }}
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="role_id == 1"
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                    >
                      <div class="flex flex-col items-start">
                        <div
                          @click="showEdit(expense.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:edit"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">Edit</span>
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
    <!-- //SECTION - Form Tambah Pengeluaran  -->
    <TransitionRoot as="template" :show="showAddExpenseForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showAddExpenseForm = false"
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
              class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            >
              <form class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {{ "Tambah Pengeluaran" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>

                    <div
                      class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div v-if="showCoaField" class="sm:col-span-6">
                        <label
                          class="block text-sm font-medium text-gray-700"
                        >
                          COA
                        </label>
                        <div class="mt-1">
                          <Combobox
                            as="div"
                            v-model="selectedCoa"
                            @update:modelValue="selectCoa"
                          >
                            <div class="relative mt-1">
                              <ComboboxInput
                                autocomplete="off"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                                placeholder="Cari kode / nama COA"
                                @input="
                                  coaQuery = $event.target.value;
                                  filterCoa();
                                "
                                :display-value="
                                  (coa) =>
                                    coa ? `${coa.code} - ${coa.name}` : ''
                                "
                              />
                              <ComboboxOptions
                                v-if="filteredCoas.length > 0"
                                class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                <ComboboxOption
                                  v-for="coa in filteredCoas"
                                  :key="coa.id"
                                  :value="coa"
                                  as="template"
                                  v-slot="{ active, selected }"
                                >
                                  <li
                                    :class="[
                                      'relative cursor-default select-none py-2 pl-3 pr-9',
                                      active
                                        ? 'bg-black text-white'
                                        : 'text-gray-900',
                                    ]"
                                  >
                                    <span
                                      :class="[
                                        'block truncate',
                                        selected && 'font-semibold',
                                      ]"
                                    >
                                      {{ coa.code }} - {{ coa.name }}
                                    </span>
                                  </li>
                                </ComboboxOption>
                              </ComboboxOptions>
                            </div>
                          </Combobox>
                        </div>
                      </div>
                      <div
                        v-if="currentTabData.kind === 'tabungan'"
                        class="sm:col-span-6"
                      >
                        <label
                          class="block text-sm font-medium text-gray-700"
                        >
                          Tipe Tabungan
                        </label>
                        <div class="mt-1">
                          <select
                            v-model="savingType"
                            @change="expense.type = savingType"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          >
                            <option value="TB">TB</option>
                            <option value="TW">TW</option>
                            <option value="THR">THR</option>
                          </select>
                        </div>
                      </div>
                      <div v-if="showNameField" class="sm:col-span-6">
                        <label
                          class="block text-sm font-medium text-gray-700"
                        >
                          Nama
                        </label>
                        <div class="mt-1">
                          <input
                            v-model="expense.name"
                            type="text"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="amount"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Jumlah (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="amount"
                            v-model="expense.amount"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="note"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Keterangan
                        </label>
                        <div class="mt-1">
                          <input
                            id="note"
                            v-model="expense.note"
                            type="text"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="time"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Waktu
                        </label>
                        <div class="mt-1">
                          <input
                            id="time"
                            v-model="expense.time"
                            type="datetime-local"
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
                      @click="showAddExpenseForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click.once="createExpense()"
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
    <!-- //!SECTION  -->
    <!-- //SECTION - Form Edit Pengeluaran  -->
    <TransitionRoot as="template" :show="showEditExpenseForm">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="showEditExpenseForm = false"
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
                        {{ "Edit Pengeluaran" }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Pastikan data sudah benar.
                      </p>
                    </div>

                    <div
                      v-if="selectedExpense.type == 'Kendaraan'"
                      class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
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
                                id="allowance_fee"
                                v-model="selectedExpense.trip.allowance"
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
                                id="gas_fee"
                                v-model="selectedExpense.trip.gas"
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
                                id="etoll_fee"
                                v-model="selectedExpense.trip.toll"
                                type="number"
                                class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="note"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Keterangan
                        </label>
                        <div class="mt-1">
                          <input
                            id="note"
                            v-model="selectedExpense.note"
                            type="text"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="time"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Waktu
                        </label>
                        <div class="mt-1">
                          <input
                            id="time"
                            v-model="selectedExpense.time"
                            type="datetime-local"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      v-else
                      class="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
                        <label
                          for="amount"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Jumlah (Rp.)
                        </label>
                        <div class="mt-1">
                          <input
                            id="amount"
                            v-model="selectedExpense.amount"
                            type="number"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="note"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Keterangan
                        </label>
                        <div class="mt-1">
                          <input
                            id="note"
                            v-model="selectedExpense.note"
                            type="text"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div
                        v-if="
                          selectedExpense.type == 'Cashback' ||
                          selectedExpense.type == 'Gaji'
                        "
                        class="sm:col-span-6"
                      >
                        <label
                          for="note"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Nama
                        </label>
                        <div class="mt-1">
                          <input
                            id="name"
                            v-model="selectedExpense.name"
                            type="text"
                            class="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-gray-300 rounded-md py-1 px-2"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="time"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Waktu
                        </label>
                        <div class="mt-1">
                          <input
                            id="time"
                            v-model="selectedExpense.time"
                            type="datetime-local"
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
                      @click="showEditExpenseForm = false"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click.once="updateExpense()"
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
    <!-- //!SECTION  -->
  </Admin>
</template>

<script setup>
import Admin from "../../../layouts/Admin.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
</script>
<script>
import * as XLSX from "xlsx";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
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
    VueDatePicker,
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
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
  data() {
    return {
      isLoading: false,
      //ini buat tambah rit
      showAddExpenseForm: false,
      showEditExpenseForm: false,
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      tabs: [],
      currentTab: "",
      coas: [],
      filteredCoas: [],
      coaQuery: "",
      selectedCoa: null,
      savingType: "TB",
      expense: {
        amount: null,
        note: null,
        name: null,
        time: null,
        type: "Operasional",
        coa_id: null,
      },
      selectedExpense: null,
      expenses: [],
      filteredExpenses: [],
    };
  },
  async created() {
    await this.getCoas();
  },
  computed: {
    currentTabData() {
      return (
        this.tabs.find((tab) => tab.name === this.currentTab) ||
        this.tabs[0] || {
          name: "",
          title: "",
          kind: "coa",
          coaCode: null,
          coaId: null,
        }
      );
    },
    showAddButton() {
      return this.role_id != 4 && this.currentTabData.kind !== "kendaraan";
    },
    showCoaField() {
      return ["coa", "gaji"].includes(this.currentTabData.kind);
    },
    showNameField() {
      return ["gaji", "cashback", "tabungan"].includes(
        this.currentTabData.kind
      );
    },
    totalBbmSum() {
      if (!this.expenses) return 0;
      return this.expenses.reduce((acc, expense) => acc + (expense.trip ? parseFloat(expense.trip.gas) || 0 : 0), 0);
    },
    totalEtollSum() {
      if (!this.expenses) return 0;
      return this.expenses.reduce((acc, expense) => acc + (expense.trip ? parseFloat(expense.trip.toll) || 0 : 0), 0);
    },
    totalSanguSum() {
      if (!this.expenses) return 0;
      return this.expenses.reduce((acc, expense) => acc + (expense.trip ? parseFloat(expense.trip.allowance) || 0 : 0), 0);
    },
    totalAmountSum() {
      if (!this.expenses) return 0;
      return this.expenses.reduce((acc, expense) => acc + (parseFloat(expense.amount) || 0), 0);
    }
  },
  methods: {
    async getCoas() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      try {
        const data = await instance.get("/admin/coa?leaves_only=1");
        this.coas = data.data.data.results || [];
      } catch (err) {
        console.log(err);
        this.coas = [];
      }
      this.buildTabs();
      this.getAllData();
    },
    makeCoaTab(code, kind) {
      const coa = this.coas.find((item) => item.code === code);
      return {
        name: code,
        title: coa ? coa.name : code,
        kind,
        coaCode: code,
        coaId: coa ? coa.id : null,
      };
    },
    buildTabs() {
      const baseDefinitions = [
        { code: "4.2.00.04", kind: "kendaraan" },
        { name: "Tabungan", kind: "tabungan" },
        { name: "Cashback", kind: "cashback" },
        { code: "4.2.00.09", kind: "coa" },
        { code: "4.2.00.01", kind: "gaji" },
      ];
      const baseTabs = baseDefinitions.map((definition) =>
        definition.code
          ? this.makeCoaTab(definition.code, definition.kind)
          : {
              name: definition.name,
              title: definition.name,
              kind: definition.kind,
              coaCode: null,
              coaId: null,
            }
      );
      const mappedCodes = baseDefinitions
        .filter((definition) => definition.code)
        .map((definition) => definition.code);
      const restTabs = this.coas
        .filter((coa) => !mappedCodes.includes(coa.code))
        .map((coa) => this.makeCoaTab(coa.code, "coa"));

      this.tabs = [...baseTabs, ...restTabs].map((tab, index) => ({
        ...tab,
        current: index === 0,
      }));
      this.currentTab = this.tabs.length > 0 ? this.tabs[0].name : "";
    },
    changeTab(tabName) {
      this.tabs.forEach((tab) => {
        tab.current = tab.name === tabName;
      });
      this.currentTab = tabName;
      this.getAllData();
    },
    changeTabMobile(event) {
      this.changeTab(event.target.value);
    },
    makeEmptyExpense() {
      return {
        amount: null,
        note: null,
        name: null,
        time: null,
        type: "Operasional",
        coa_id: null,
      };
    },
    openAddExpenseForm() {
      this.expense = this.makeEmptyExpense();
      this.selectedCoa = null;
      this.savingType = "TB";
      this.coaQuery = "";
      this.filteredCoas = [];

      if (this.currentTabData.kind === "tabungan") {
        this.expense.type = this.savingType;
      } else if (this.currentTabData.kind === "cashback") {
        this.expense.type = "Cashback";
      } else if (this.currentTabData.coaCode) {
        this.selectCoa(
          this.coas.find((coa) => coa.code === this.currentTabData.coaCode) ||
            null
        );
      }

      this.showAddExpenseForm = true;
    },
    selectCoa(coa) {
      this.selectedCoa = coa;
      this.expense.coa_id = coa ? coa.id : null;
      this.expense.type =
        coa && coa.expense_type ? coa.expense_type : "Operasional";
    },
    filterCoa() {
      const query = (this.coaQuery || "").toLowerCase();
      if (!query) {
        this.filteredCoas = this.coas;
        return;
      }
      this.filteredCoas = this.coas.filter(
        (coa) =>
          coa.code.toLowerCase().includes(query) ||
          coa.name.toLowerCase().includes(query)
      );
    },
    getAllData: function () {
      if (!this.currentTab) {
        this.isLoading = false;
        return;
      }
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      const payload = {
        start_date: this.date[0].toString(),
        end_date: this.date[1].toString(),
      };
      if (this.currentTabData.coaId) {
        payload.coa_id = this.currentTabData.coaId;
      } else if (this.currentTabData.kind === "tabungan") {
        payload.filter = "Tabungan";
      } else if (this.currentTabData.kind === "cashback") {
        payload.filter = "Cashback";
      } else if (this.currentTabData.kind === "kendaraan") {
        payload.filter = "Kendaraan";
      } else if (this.currentTabData.kind === "gaji") {
        payload.filter = "Gaji";
      } else if (this.currentTabData.coaCode === "4.2.00.09") {
        payload.filter = "Operasional";
      } else {
        // Without a resolved COA we cannot filter this tab reliably.
        this.expenses = [];
        this.isLoading = false;
        return;
      }
      instance
        .post("/admin/expense/filter", payload)
        .then((data) => {
          this.expenses = data.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    createExpense() {
      if (this.showCoaField && !this.expense.coa_id) {
        alert("Pilih COA terlebih dahulu");
        return;
      }
      if (this.currentTabData.kind === "tabungan") {
        this.expense.type = this.savingType;
      }
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/expense`, this.expense)
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEdit(id) {
      this.selectedExpense = this.expenses.find((obj) => {
        return obj.id === id;
      });
      this.showEditExpenseForm = true;
      console.log(this.selectedExpense);
    },
    updateExpense() {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/expense/` + this.selectedExpense.id, {
          _method: "PATCH",
          expense: this.selectedExpense,
        })
        .then((data) => {
          this.$router.go(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exportExcel() {
      if (!this.expenses || this.expenses.length === 0) {
        alert("Tidak ada data untuk dieksport");
        return;
      }

      let data = [];
      const coaCode = (e) => (e.coa ? e.coa.code : "-");
      if (this.currentTabData.kind === "kendaraan") {
        data = this.expenses.map((e) => ({
          "Kendaraan": e.trip && e.trip.vehicle ? e.trip.vehicle.name : "-",
          "BBM (Rp.)": e.trip ? e.trip.gas : 0,
          "E-Toll (Rp.)": e.trip ? e.trip.toll : 0,
          "Sangu (Rp.)": e.trip ? e.trip.allowance : 0,
          "Tanggal": this.formatDate(e.time),
          "Note": e.note || "-",
          "COA": coaCode(e),
        }));
      } else if (["tabungan", "cashback"].includes(this.currentTabData.kind)) {
        data = this.expenses.map((e) => ({
          "Customer": e.name || "-",
          "Jumlah (Rp.)": e.amount || 0,
          "Tipe/Keterangan": e.type || "-",
          "Tanggal": this.formatDate(e.time),
          "COA": coaCode(e),
        }));
      } else if (this.currentTabData.kind === "gaji") {
        data = this.expenses.map((e) => ({
          "Nama": e.name || "-",
          "Jumlah (Rp.)": e.amount || 0,
          "Tanggal": this.formatDate(e.time),
          "Keterangan": e.note || "-",
          "COA": coaCode(e),
        }));
      } else {
        data = this.expenses.map((e) => ({
          "Jumlah (Rp.)": e.amount || 0,
          "Keterangan": e.note || "-",
          "Waktu": e.time ? this.formatDate(e.time) : "-",
          "COA": coaCode(e),
        }));
      }

      if (data.length === 0) return;

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Pengeluaran");
      XLSX.writeFile(
        workbook,
        `Pengeluaran_${this.currentTab.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    },
  },
};
</script>

<style></style>
