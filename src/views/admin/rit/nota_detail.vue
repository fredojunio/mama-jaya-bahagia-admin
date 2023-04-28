<template>
  <div class="flex items-center justify-center">
    <table>
      <tr>
        <td></td>
        <td class="text-2xl">NOTA PENJUALAN</td>
        <td></td>
      </tr>
      <tr>
        <td>TOKO KEDELAI MAMA JAYA</td>
        <td></td>
        <td></td>
        <td>HARI :</td>
        <td>SABTU</td>
      </tr>
      <tr>
        <td>KALIJATEN Gg. II/12 SEPANJANG</td>
        <td></td>
        <td></td>
        <td>TANGGAL :</td>
        <td>22/04/2023</td>
      </tr>
      <tr>
        <td>SIDOARJO .</td>
        <td></td>
        <td></td>
        <td>NAMA :</td>
        <td>NARDI</td>
      </tr>
      <tr>
        <td>TELP : 081281371762</td>
        <td></td>
        <td></td>
        <td>ALAMAT :</td>
        <td>BEBEKAN</td>
      </tr>
      <tr class="border-y-2 border-black">
        <td>NO</td>
        <td>NAMA BARANG</td>
        <td>BANYAK</td>
        <td>HARGA</td>
        <td>JUMLAH</td>
      </tr>
      <tr>
        <td>1</td>
        <td>PAGODA</td>
        <td>2.000,00</td>
        <td>12.500</td>
        <td>25.000.000,00</td>
      </tr>
      <tr>
        <td>2</td>
        <td>TABUNGAN</td>
        <td>1,00</td>
        <td>100.000</td>
        <td>100.000,00</td>
      </tr>
      <tr>
        <td>3</td>
        <td>ONGKOS KIRIM</td>
        <td>1,00</td>
        <td>100.000</td>
        <td>100.000,00</td>
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
      <tr>
        <td>TANDA TERIMA</td>
        <td>HORMAT KAMI</td>
        <td></td>
        <td>TOTAL</td>
        <td>25.200.000,00</td>
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
        <td>25.200.000,00</td>
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
import { Icon } from "@iconify/vue";
</script>
<script>
export default {
  mounted() {
    this.printPage();
  },
  methods:{
    printPage(){
      window.print();
    }
  }
};
</script>
