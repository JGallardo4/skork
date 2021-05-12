import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueWorker from "simple-web-worker";
import "./assets/css/main.scss";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

var app = createApp(App)
  .use(store)
  .use(router)
  .use(Toast, {
    position: "bottom-right",
    timeout: false,
  })
  .use(VueLoading);

app.config.globalProperties.$worker = VueWorker;

app.mount("#app");
