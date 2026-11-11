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
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            @click="currentTab = tab.key"
            :class="[
              currentTab === tab.key
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'cursor-pointer whitespace-nowrap flex-shrink-0 py-4 px-1 border-b-2 font-medium text-sm',
            ]"
          >
            {{ tab.name }}
          </div>
        </nav>
      </div>
    </div>
    <div
      v-if="currentTab === 'rincian'"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle md:px-6 lg:px-8">
            <div
              class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="sticky left-0 bg-gray-50 z-10 border-r border-gray-200 py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Kode - Tanggal Datang
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Awal
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Harga Beli
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Nominal Beli <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(totalNominalBeliSum) }})</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Awal Bulan <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >({{ formatNumber(totalTonaseAkhirBulanSum) }} kg)</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Nominal Awal Bulan <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp.
                        {{ formatNumber(totalNominalAkhirBulanSum) }})</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Terjual <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >({{ formatNumber(totalTonaseTerjualSum) }} kg)</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tunai <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(totalTunaiSum) }})</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Transfer <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(totalTransferSum) }})</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Total Penjualan <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(totalTotalPenjualanSum) }})</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Hasil Laba/Rugi Jual <br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(totalHasilLabaRugiSum) }})</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="rit in rits" :key="rit.id">
                    <td
                      class="sticky left-0 bg-white z-10 border-r border-gray-200 whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ rit.item.code }} -
                          {{ formatDate(rit.delivery_date) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex flex-col gap-y-0.5">
                        <div class="font-medium text-gray-900">
                          Customer: {{ formatNumber(rit.customer_tonnage) }} kg
                        </div>
                        <div class="font-medium text-gray-900">
                          Cabang: {{ formatNumber(rit.branch_tonnage) }} kg
                        </div>
                        <div class="font-medium text-gray-900">
                          Pusat: {{ formatNumber(rit.arrived_tonnage) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(rit.buy_price) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp.
                          {{
                            formatNumber(rit.buy_price * rit.arrived_tonnage)
                          }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(calculateTonaseAkhirBulan(rit)) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp.
                          {{
                            formatNumber(
                              Math.round(calculateNominalAkhirBulan(rit)),
                            )
                          }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          {{ formatNumber(totalTonnage(rit)) }} kg
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(totalTunai(rit)) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(totalTransfer(rit)) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(totalRevenue(rit)) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="flex items-center">
                        <div class="font-medium text-gray-900">
                          Rp. {{ formatNumber(totalProfit(rit)) }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
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
                      <div
                        v-if="role_id == 1"
                        class="flex flex-col items-start"
                      >
                        <div
                          @click="openRitHistory(rit.id)"
                          class="cursor-pointer relative flex-1 inline-flex items-center justify-between text-sm text-gray-500 font-medium border border-transparent rounded-bl-lg hover:text-black group/edit"
                        >
                          <Icon
                            icon="uil:history"
                            class="w-5 h-5 text-gray-400 group-hover/edit:text-black"
                          ></Icon>
                          <span class="ml-3">History</span>
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
    <!-- //SECTION Stok Awal -->
    <div
      v-if="currentTab === 'stok_awal'"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle md:px-6 lg:px-8">
            <div
              class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="sticky left-0 bg-gray-50 z-10 border-r border-gray-200 py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Kode Item
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tanggal Datang
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Akhir Bulan<br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >({{ formatNumber(totalTonaseStokAwal) }} kg)</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Harga Beli
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Nominal<br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(stokAwalTotal) }})</span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="row in stokAwalRows" :key="row.rit_id">
                    <td
                      class="sticky left-0 bg-white z-10 border-r border-gray-200 whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ row.item_code || "-" }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ formatDate(row.arrival_date) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ formatNumber(row.tonnage) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        Rp. {{ formatNumber(row.buy_price) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        Rp. {{ formatNumber(row.nominal) }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="stokAwalRows.length === 0">
                    <td
                      colspan="5"
                      class="py-4 pl-4 pr-3 text-center text-xs text-gray-500 sm:pl-6"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td
                      colspan="2"
                      class="py-2 pl-4 pr-3 text-right text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Total
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      {{ formatNumber(totalTonaseStokAwal) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6"
                    ></td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Rp. {{ formatNumber(stokAwalTotal) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //SECTION Stok Akhir -->
    <div
      v-if="currentTab === 'stok_akhir'"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle md:px-6 lg:px-8">
            <div
              class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="sticky left-0 bg-gray-50 z-10 border-r border-gray-200 py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Kode Item
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tanggal Datang
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Akhir Bulan<br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >({{ formatNumber(totalTonaseStokAkhir) }} kg)</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Harga Beli
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Nominal<br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(stokAkhirTotal) }})</span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="row in stokAkhirRows" :key="row.rit_id">
                    <td
                      class="sticky left-0 bg-white z-10 border-r border-gray-200 whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ row.item_code || "-" }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ formatDate(row.arrival_date) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ formatNumber(row.tonnage) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        Rp. {{ formatNumber(row.buy_price) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        Rp. {{ formatNumber(row.nominal) }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="stokAkhirRows.length === 0">
                    <td
                      colspan="5"
                      class="py-4 pl-4 pr-3 text-center text-xs text-gray-500 sm:pl-6"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td
                      colspan="2"
                      class="py-2 pl-4 pr-3 text-right text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Total
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      {{ formatNumber(totalTonaseStokAkhir) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6"
                    ></td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Rp. {{ formatNumber(stokAkhirTotal) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //SECTION Pembelian -->
    <div
      v-if="currentTab === 'beli_barang'"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle md:px-6 lg:px-8">
            <div
              class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="sticky left-0 bg-gray-50 z-10 border-r border-gray-200 py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Kode Item
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tanggal Datang
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Tonase Datang<br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >({{ formatNumber(totalTonaseBeliBarang) }} kg)</span
                      >
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Harga Beli
                    </th>
                    <th
                      scope="col"
                      class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Nominal<br /><span
                        class="text-[10px] font-normal whitespace-nowrap"
                        >(Rp. {{ formatNumber(beliBarangTotal) }})</span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="row in beliBarangRows" :key="row.rit_id">
                    <td
                      class="sticky left-0 bg-white z-10 border-r border-gray-200 whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ row.item_code || "-" }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ formatDate(row.arrival_date) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        {{ formatNumber(row.tonnage) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        Rp. {{ formatNumber(row.buy_price) }}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6 grow"
                    >
                      <div class="font-medium text-gray-900">
                        Rp. {{ formatNumber(row.nominal) }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="beliBarangRows.length === 0">
                    <td
                      colspan="5"
                      class="py-4 pl-4 pr-3 text-center text-xs text-gray-500 sm:pl-6"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td
                      colspan="2"
                      class="py-2 pl-4 pr-3 text-right text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Total
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      {{ formatNumber(totalTonaseBeliBarang) }}
                    </td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs sm:pl-6"
                    ></td>
                    <td
                      class="whitespace-nowrap py-2 pl-4 pr-3 text-xs font-semibold text-gray-900 sm:pl-6"
                    >
                      Rp. {{ formatNumber(beliBarangTotal) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
                                                ritTransaction.created_at,
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
                                            {{
                                              formatNumber(
                                                ritTransaction.tonnage,
                                              )
                                            }}
                                            kg
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
                                            {{
                                              formatNumber(
                                                ritTransaction.total_price,
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
                                            {{
                                              formatNumber(
                                                ritTransaction.tonnage_left,
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

      <!-- Section rit history -->
      <TransitionRoot as="template" :show="showRitHistory">
        <Dialog
          as="div"
          class="fixed z-10 inset-0 overflow-y-auto"
          @close="showRitHistory = false"
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
                          Riwayat Rit
                        </h3>
                      </div>
                      <div
                        class="max-w-7xl grid grid-cols-1 mx-auto mb-8 gap-x-4"
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
                                        Info
                                      </th>
                                      <th
                                        scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                      >
                                        Tanggal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    class="divide-y divide-gray-200 bg-white"
                                  >
                                    <tr
                                      v-for="ritHistory in selectedRit.histories"
                                      :key="ritHistory.id"
                                    >
                                      <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 grow"
                                      >
                                        <div class="flex items-center">
                                          <div
                                            class="font-medium text-gray-900"
                                          >
                                            {{ ritHistory.info }}
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
                                              formatDate(ritHistory.created_at)
                                            }}
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
                        @click="showRitHistory = false"
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
  created() {
    if (
      this.role_id != 1 &&
      this.role_id != 4 &&
      this.email !== "adminutama@gmail.com"
    ) {
      this.$router.push("/admin");
      return;
    }
    this.getAllData();
  },
  computed: {
    stokAwalRows() {
      return this.report ? this.report.stok_awal.rows : [];
    },
    stokAkhirRows() {
      return this.report ? this.report.stok_akhir.rows : [];
    },
    beliBarangRows() {
      return this.report ? this.report.beli_barang.rows : [];
    },
    stokAwalTotal() {
      return this.report ? this.report.stok_awal.total : 0;
    },
    stokAkhirTotal() {
      return this.report ? this.report.stok_akhir.total : 0;
    },
    beliBarangTotal() {
      return this.report ? this.report.beli_barang.total : 0;
    },
    totalTonaseStokAwal() {
      return this.stokAwalRows.reduce(
        (acc, row) => acc + (parseFloat(row.tonnage) || 0),
        0,
      );
    },
    totalTonaseStokAkhir() {
      return this.stokAkhirRows.reduce(
        (acc, row) => acc + (parseFloat(row.tonnage) || 0),
        0,
      );
    },
    totalTonaseBeliBarang() {
      return this.beliBarangRows.reduce(
        (acc, row) => acc + (parseFloat(row.tonnage) || 0),
        0,
      );
    },
    totalNominalBeliSum() {
      if (!this.rits) return 0;
      return this.rits.reduce(
        (acc, rit) => acc + rit.buy_price * rit.arrived_tonnage,
        0,
      );
    },
    totalTonaseAkhirBulanSum() {
      if (!this.rits) return 0;
      return this.rits.reduce(
        (acc, rit) => acc + this.calculateTonaseAkhirBulan(rit),
        0,
      );
    },
    totalNominalAkhirBulanSum() {
      if (!this.rits) return 0;
      return this.rits.reduce(
        (acc, rit) => acc + Math.round(this.calculateNominalAkhirBulan(rit)),
        0,
      );
    },
    totalTonaseTerjualSum() {
      if (!this.rits) return 0;
      return this.rits.reduce((acc, rit) => acc + this.totalTonnage(rit), 0);
    },
    totalTunaiSum() {
      if (!this.rits) return 0;
      return this.rits.reduce((acc, rit) => acc + this.totalTunai(rit), 0);
    },
    totalTransferSum() {
      if (!this.rits) return 0;
      return this.rits.reduce((acc, rit) => acc + this.totalTransfer(rit), 0);
    },
    totalTotalPenjualanSum() {
      if (!this.rits) return 0;
      return this.rits.reduce((acc, rit) => acc + this.totalRevenue(rit), 0);
    },
    totalHasilLabaRugiSum() {
      if (!this.rits) return 0;
      return this.rits.reduce((acc, rit) => acc + this.totalProfit(rit), 0);
    },
  },
  methods: {
    getAllData: function () {
      if (!this.month) return;

      const [year, m] = this.month.split("-");
      this.date = [
        new Date(year, m - 1, 1),
        new Date(year, m, 0, 23, 59, 59, 999),
      ];

      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });

      Promise.all([
        instance.post("/admin/rit/get_empty_stock", {
          start_date: this.date[0].toString(),
          end_date: this.date[1].toString(),
          filter_transactions: true,
        }),
        instance.post("/admin/laba_rugi/get_report", {
          month: this.month,
        }),
      ])
        .then(([ritResponse, reportResponse]) => {
          this.rits = ritResponse.data.data.results;
          this.report = reportResponse.data.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    totalTonnage(rit) {
      var totalTonnage = 0;
      // rit.transactions.forEach((element) => {
      //   totalTonnage += element.tonnage;
      // });
      rit.transactions.forEach((element) => {
        totalTonnage += element.tonnage;
      });
      return totalTonnage;
    },
    totalRevenue(rit) {
      var totalRevenue = 0;
      // rit.transactions.forEach((element) => {
      //   totalRevenue += element.total_price;
      // });
      rit.transactions.forEach((element) => {
        totalRevenue += element.total_price;
      });
      return totalRevenue;
    },
    totalProfit(rit) {
      // var totalProfit = 0;
      // rit.transactions.forEach((element) => {
      //   totalProfit += parseInt(element.total_price);
      //   totalProfit -= parseInt(element.tonnage) * parseInt(rit.buy_price);
      // totalProfit -= parseInt(element.tonnage) * 200;
      // });

      return this.totalRevenue(rit) - rit.arrived_tonnage * rit.buy_price;

      // return totalProfit;
    },
    totalTunai(rit) {
      var total = 0;
      rit.transactions?.forEach((transaction) => {
        transaction.transaction.payments?.forEach((payment) => {
          if (payment.type?.toLowerCase().trim() === "cash") {
            total += parseInt(payment.amount);
          }
        });
      });
      return total;
    },
    totalTransfer(rit) {
      var total = 0;
      rit.transactions?.forEach((transaction) => {
        transaction.transaction.payments?.forEach((payment) => {
          if (payment.type?.toLowerCase().trim() === "transfer") {
            total += parseInt(payment.amount);
          }
        });
      });
      return total;
    },
    calculateNominalAkhirBulan(rit) {
      if (!this.date || !this.date[0] || !rit.reports) return 0;

      const startDate = new Date(
        this.date[0].getFullYear(),
        this.date[0].getMonth(),
        0,
        23,
        59,
        59,
        999,
      );

      // Find the latest report that is strictly before the selected start date
      const prevReports = rit.reports.filter((report) => {
        return new Date(report.created_at) < startDate;
      });

      if (prevReports.length > 0) {
        // Sort by date descending and take the most recent one
        prevReports.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        return rit.buy_price * prevReports[0].tonnage_left;
      }

      // Fallback: If no report exists before the selected date,
      // check if the rit arrived during the selected period or before searching.
      // If it arrived and there's no prior monthly snapshot, we use the arrival tonnage.
      // const arrivalDate = new Date(rit.delivery_date);
      // if (arrivalDate <= new Date(this.date[1])) {
      //    return rit.buy_price * rit.arrived_tonnage;
      // }

      return 0;
    },
    calculateTonaseAkhirBulan(rit) {
      if (!this.date || !this.date[0] || !rit.reports) return 0;

      const startDate = new Date(
        this.date[0].getFullYear(),
        this.date[0].getMonth(),
        0,
        23,
        59,
        59,
        999,
      );

      const prevReports = rit.reports.filter((report) => {
        return new Date(report.created_at) < startDate;
      });

      let tonnage = 0;
      if (prevReports.length > 0) {
        prevReports.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        tonnage = prevReports[0].tonnage_left;
        return Math.round((parseFloat(tonnage) + Number.EPSILON) * 100) / 100;
      } else {
        // const arrivalDate = new Date(rit.delivery_date);
        // if (arrivalDate <= new Date(this.date[1])) {
        //    tonnage = rit.arrived_tonnage;
        // }
        return 0;
      }
    },
    openRitDetail(rit) {
      this.selectedRit = rit;
      this.showRitDetail = true;
    },
    openRitHistory(id) {
      this.showRitHistory = true;
      this.selectedRit = this.rits.find((obj) => {
        return obj.id === id;
      });
    },
  },
  data() {
    return {
      isLoading: false,
      //ini buat cek detail
      showRitDetail: false,
      showRitHistory: false,
      month: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}`,
      tabs: [
        { key: "rincian", name: "Rincian RIT" },
        { key: "stok_awal", name: "Stok Awal" },
        { key: "stok_akhir", name: "Stok Akhir" },
        { key: "beli_barang", name: "Pembelian" },
      ],
      currentTab: "rincian",
      date: [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 59)),
      ],
      rits: null,
      report: null,
      selectedRit: null,
    };
  },
};
</script>

<style></style>
