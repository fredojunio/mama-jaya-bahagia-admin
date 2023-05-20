import { createApp } from "vue";
import router from "./router/index";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.mixin({
  methods: {
    checkLogin: function () {
      if (!localStorage["access_token"]) {
        router.push("/");
      }
    },
    formatDate(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
      } else {
        return "-";
      }
    },
    formatNumber(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return "-";
      }
    },
  },
  data() {
    return {
      role_id: localStorage["role_id"],
    };
  },
});
app.config.globalProperties.url = "https://api.mamajayabahagia.com/api/";
app.config.globalProperties.devUrl = "http://mama-jaya-bahagia-api.test/api/";
app.config.globalProperties.prodUrl = "https://api.mamajayabahagia.com/api/";
app.mount("#app");
