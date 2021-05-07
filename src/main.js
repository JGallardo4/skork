import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/main.scss";
import Toast from "vue-toastification";
import "./registerServiceWorker";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Toast, {
    position: "bottom-right",
    timeout: false,
  })
  .mount("#app");
