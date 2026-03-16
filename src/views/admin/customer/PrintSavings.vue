<template>
  <div class="print-container">
    <div class="print-header">
      <h2 class="text-xl font-bold text-center mb-2">RIWAYAT TABUNGAN</h2>
      <div class="grid grid-cols-2 gap-4 mt-4 text-xs border-b border-black pb-2 mb-2">
        <div>
          <p>
            <span class="font-bold">Nama:</span> {{ name }} ({{
              nickname
            }})
          </p>
          <p>
            <span class="font-bold">No. HP:</span> {{ phone }}
          </p>
        </div>
        <div class="text-right">
          <p>
            <span class="font-bold">Periode:</span><br/>
            {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
          </p>
          <p>
            <span class="font-bold">Dicetak:</span><br/>
            {{ new Date().toLocaleString("id-ID") }}
          </p>
        </div>
      </div>
    </div>

    <table class="w-full text-xs">
      <thead>
        <tr class="border-b border-black text-left">
          <th class="py-1">Tanggal</th>
          <th class="py-1">Tipe</th>
          <th class="py-1">TB (Rp)</th>
          <th class="py-1">THR (Rp)</th>
          <th class="py-1">Tonase</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="5" class="text-center py-4">Loading...</td>
        </tr>
        <tr v-else-if="savings.length === 0">
          <td colspan="5" class="text-center py-4">Tidak ada data</td>
        </tr>
        <tr v-for="saving in savings" :key="saving.id" class="border-b border-gray-300">
          <td class="py-1">{{ formatDate(saving.created_at) }}</td>
          <td class="py-1">{{ saving.type }}</td>
          <td class="py-1">{{ formatNumber(saving.type === 'Setor' ? saving.tb : saving.total_tb) }}</td>
          <td class="py-1">{{ formatNumber(saving.type === 'Setor' ? saving.thr : saving.total_thr) }}</td>
          <td class="py-1">{{ formatNumber(saving.type === 'Setor' ? saving.tonnage : saving.total_tonnage) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
</script>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isLoading: true,
      savings: [],
    };
  },
  computed: {
    name() {
      return this.$route.query.name || "";
    },
    nickname() {
      return this.$route.query.nickname || "";
    },
    phone() {
      return this.$route.query.phone || "";
    },
    startDate() {
      return this.$route.query.start || new Date().toString();
    },
    endDate() {
      return this.$route.query.end || new Date().toString();
    },
  },
  created() {
    this.getSavings();
  },
  methods: {
    formatNumber(number) {
      if (!number) return 0;
      return new Intl.NumberFormat("id-ID").format(number);
    },
    formatDate(date) {
      if (!date) return "";
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
    printPage() {
      window.print();
    },
    getSavings() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url, // Assumes this.url is injected globally like in other components
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(
          "/admin/customer/" + this.id + "/get_customer_savings",
          {
            start_date: this.startDate,
            end_date: this.endDate,
          }
        )
        .then((data) => {
          this.savings = data.data.data.results;
          this.isLoading = false;
          setTimeout(() => {
            this.printPage();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.print-container {
  width: 105mm; /* A6 width */
  min-height: 148mm; /* A6 height */
  padding: 5mm;
  background: white;
  color: black;
  margin: 0 auto;
  box-sizing: border-box;
}

@media print {
  @page {
    size: A6 portrait;
    margin: 5mm;
  }
  
  body * {
    visibility: hidden;
  }
  
  .print-container, .print-container * {
    visibility: visible;
  }
  
  .print-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 105mm;
    margin: 0;
    padding: 0;
  }
}
</style>
