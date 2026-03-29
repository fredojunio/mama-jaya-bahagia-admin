<template>
  <div class="print-book">
    <div v-if="isLoading" class="p-10 text-center">Loading...</div>
    <div v-else-if="savings.length === 0" class="p-10 text-center">Tidak ada data</div>
    
    <div 
      v-else 
      v-for="(pageData, pageIndex) in paginatedSavings" 
      :key="pageIndex"
      class="print-container"
      :class="{ 'page-break': pageIndex < paginatedSavings.length - 1 }"
    >
      <div class="page-number no-print">
        Halaman {{ pageIndex + 1 }} dari {{ paginatedSavings.length }}
      </div>
      
      <div class="print-header">
        <h2 class="text-xl font-bold text-center mb-2">RIWAYAT TABUNGAN</h2>
        <div class="grid grid-cols-2 gap-4 mt-4 text-[10px] border-b border-black pb-2 mb-2">
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

      <table class="w-full text-[10px]">
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
          <tr v-for="saving in pageData" :key="saving.id" class="border-b border-gray-200">
            <td class="py-0.5">{{ formatDate(saving.created_at) }}</td>
            <td class="py-0.5">{{ saving.type }}</td>
            <td class="py-0.5">{{ formatNumber(saving.type === 'Setor' ? saving.tb : saving.total_tb) }}</td>
            <td class="py-0.5">{{ formatNumber(saving.type === 'Setor' ? saving.thr : saving.total_thr) }}</td>
            <td class="py-0.5">{{ formatNumber(saving.type === 'Setor' ? saving.tonnage : saving.total_tonnage) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Footer for page info - visible only in print if needed, or web -->
      <div class="text-[9px] text-right mt-2 italic">
        Halaman {{ pageIndex + 1 }} / {{ paginatedSavings.length }}
      </div>
    </div>
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
      rowsPerPage: 22, // Adjust this based on A6 space
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
    paginatedSavings() {
      const chunks = [];
      if (!this.savings) return [];
      for (let i = 0; i < this.savings.length; i += this.rowsPerPage) {
        chunks.push(this.savings.slice(i, i + this.rowsPerPage));
      }
      return chunks;
    }
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
        baseURL: this.url,
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
.print-book {
  padding: 20px;
  background: #f0f0f0;
  min-height: 100vh;
}

.print-container {
  width: 105mm; /* A6 width */
  height: 148mm; /* A6 height */
  padding: 5mm;
  background: white;
  color: black;
  margin: 0 auto 20px auto;
  box-sizing: border-box;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
}

.page-number {
  position: absolute;
  top: -25px;
  left: 0;
  font-size: 12px;
  font-weight: bold;
  color: #666;
}

@media print {
  .print-book {
    padding: 0;
    background: transparent;
  }
  
  .print-container {
    margin: 0;
    box-shadow: none;
    width: 105mm;
    height: 148mm;
    page-break-after: always;
  }

  .no-print {
    display: none;
  }
  
  @page {
    size: A6 portrait;
    margin: 0;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
