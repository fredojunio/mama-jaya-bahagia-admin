
import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/Login.vue";

//Barang
import BarangIndex from "/src/views/admin/barang/index.vue";

//Rit
import RitIndex from "/src/views/admin/rit/index.vue";
import RitJualBarang from "/src/views/admin/rit/jual_barang.vue";

//Customer
import CustomerIndex from "/src/views/admin/customer/index.vue";

//Finance
import FinanceIndex from "/src/views/admin/finance/index.vue";
import FinanceRit from "/src/views/admin/finance/rit.vue";
import FinancePenjualan from "/src/views/admin/finance/penjualan.vue";

//Kendaraan
import KendaraanIndex from "/src/views/admin/kendaraan/index.vue";

//Laporan
import LaporanIndex from "/src/views/admin/laporan/index.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/admin/barang",
    name: "BarangIndex",
    component: BarangIndex,
    meta: {
      title: "Barang - Index",
    },
  },
  {
    path: "/admin/rit",
    name: "RitIndex",
    component: RitIndex,
    meta: {
      title: "Rit - Index",
    },
  },
  {
    path: "/admin/rit/jual_barang",
    name: "RitJualBarang",
    component: RitJualBarang,
    meta: {
      title: "Rit - Jual Barang",
    },
  },
  {
    path: "/admin/customer",
    name: "CustomerIndex",
    component: CustomerIndex,
    meta: {
      title: "Customer - Index",
    },
  },
  {
    path: "/admin/finance",
    name: "FinanceIndex",
    component: FinanceIndex,
    meta: {
      title: "Finance - Index",
    },
  },
  {
    path: "/admin/finance/rit",
    name: "FinanceRit",
    component: FinanceRit,
    meta: {
      title: "Finance - Rit",
    },
  },
  {
    path: "/admin/finance/penjualan",
    name: "FinancePenjualan",
    component: FinancePenjualan,
    meta: {
      title: "Finance - Penjualan",
    },
  },
  {
    path: "/admin/kendaraan",
    name: "KendaraanIndex",
    component: KendaraanIndex,
    meta: {
      title: "Kendaraan - Index",
    },
  },
  {
    path: "/admin/laporan",
    name: "LaporanIndex",
    component: LaporanIndex,
    meta: {
      title: "Laporan - Index",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;