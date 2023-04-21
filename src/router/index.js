
import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/Login.vue";

//Barang
import BarangIndex from "/src/views/admin/barang/index.vue";

//Rit
import RitIndex from "/src/views/admin/rit/index.vue";
import RitJualBarang from "/src/views/admin/rit/jual_barang.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;