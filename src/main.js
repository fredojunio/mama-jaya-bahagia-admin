import { createApp } from "vue";
import router from "./router/index";
import "./style.css";
import App from "./App.vue";
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);
app.use(VueAxios, axios)
app.use(router);
app.mixin({
  methods: {
    checkLogin: function () {
      if (!localStorage["access_token"]) {
        router.push("/");
      }
    },
  },
});
app.config.globalProperties.url = "https://api.mamajayabahagia.com/api/";
app.mount("#app");
