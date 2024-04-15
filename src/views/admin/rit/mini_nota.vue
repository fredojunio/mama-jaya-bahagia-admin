<template>
  <div class="flex items-center justify-center">
    <table class="text-2xl w-1/2">
      <tr>
        <td class="text-2xl text-center" colspan="3">SURAT TIMBANG</td>
      </tr>
      <tr>
        <td colspan="3" class="text-center">TOKO KEDELAI MAMA JAYA BAHAGIA</td>
      </tr>
      <tr>
        <td colspan="1">TANGGAL:</td>
        <td colspan="2">{{ currentDate }}</td>
      </tr>
      <tr>
        <td colspan="1">NAMA:</td>
        <td colspan="2">{{ transaction.customer.name }}</td>
      </tr>
      <tr>
        <td>Nama</td>
        <td>Banyak</td>
        <td>Masak</td>
      </tr>
      <tr v-for="rit in transaction.rits" :key="rit.id">
        <td>{{ rit.rit.item.code }}</td>
        <td>{{ formatNumber(rit.tonnage) }}</td>
        <td>{{ formatNumber(rit.masak) }}</td>
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
