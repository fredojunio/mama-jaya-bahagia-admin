
import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/Login.vue";
import BarangIndex from "/src/views/admin/barang/index.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;