<template>
  <div class="flex items-center justify-center">
    <table class="text-xs">
      <tr>
        <td class="text-lg text-center" colspan="5">NOTA PENJUALAN</td>
      </tr>
      <tr>
        <td colspan="2">TOKO KEDELAI MAMA JAYA BAHAGIA</td>
        <td></td>
        <td>HARI:</td>
        <td>{{ dayOfWeek }}</td>
      </tr>
      <tr>
        <td colspan="2">KALIJATEN Gg. II/12 SEPANJANG</td>
        <td></td>
        <td>TANGGAL:</td>
        <td>{{ currentDate }}</td>
      </tr>
      <tr>
        <td>SIDOARJO .</td>
        <td></td>
        <td></td>
        <td>NAMA:</td>
        <td>{{ transaction.customer.name }}</td>
      </tr>
      <tr>
        <td>TELP: 081281371762</td>
        <td></td>
        <td></td>
        <td>ALAMAT:</td>
        <td>{{ transaction.customer.address }}</td>
      </tr>
      <tr class="border-y-2 border-black">
        <td>NO</td>
        <td width="150">NAMA BARANG</td>
        <td width="100">BANYAK</td>
        <td>HARGA</td>
        <td>JUMLAH</td>
      </tr>
      <tr v-for="(rit, index) in transaction.rits" :key="rit.id">
        <td>{{ index + 1 }}</td>
        <td>{{ rit.rit.item.code }}</td>
        <td>{{ formatNumber(rit.tonnage) }}</td>
        <td>{{ formatNumber(rit.item_price) }}</td>
        <td>{{ formatNumber(rit.total_price) }}</td>
      </tr>
      <tr>
        <td>{{ transaction.rits.length + 1 }}</td>
        <td>TABUNGAN</td>
        <td>1</td>
        <td>
          {{ formatNumber(transaction.tw + transaction.tb + transaction.thr) }}
        </td>
        <td>
          {{ formatNumber(transaction.tw + transaction.tb + transaction.thr) }}
        </td>
      </tr>
      <tr>
        <td>{{ transaction.rits.length + 2 }}</td>
        <td>ONGKOS KIRIM</td>
        <td>1</td>
        <td>{{ formatNumber(transaction.ongkir) }}</td>
        <td>{{ formatNumber(transaction.ongkir) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr class="border-t-2 border-black">
        <td>TANDA TERIMA</td>
        <td>HORMAT KAMI</td>
        <td></td>
        <td>TOTAL</td>
        <td>{{ formatNumber(transaction.total_price) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>DISKON</td>
        <td>{{ formatNumber(transaction.discount) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>BAYAR</td>
        <td>-</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>KURANG</td>
        <td>{{ formatNumber(transaction.total_price) }}</td>
      </tr>
    </table>
  </div>
  <!-- <div class="flex items-center justify-center mt-12">
    <button
    @click="printPage()"
      class="gap-x-2 inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:opacity-90 focus:ring-offset-2 sm:w-auto"
    >
      <Icon icon="uil:print" class="w-6 h-6 text-white" />
      Print
    </button>
  </div> -->
</template>

<script setup>
import axios from "axios";
</script>
<script>
export default {
  props: ["id"],
  created() {
    this.getTransaction();
  },
  computed: {
    dayOfWeek() {
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const today = new Date();
      return days[today.getDay()];
    },
    currentDate() {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return new Date().toLocaleDateString("id-ID", options);
    },
  },
  methods: {
    printPage() {
      window.print();
    },
    getTransaction: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/transaction/" + this.id)
        .then((data) => {
          this.transaction = data.data.data.results;
          setTimeout(() => {
            this.printPage();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      transaction: null,
    };
  },
};
</script>
