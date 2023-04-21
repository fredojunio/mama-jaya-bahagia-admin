
import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/Login.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;