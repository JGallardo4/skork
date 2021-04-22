import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import GoogleSpreadsheet from "google-spreadsheet";

// Object.defineProperty(App.prototype, "$gs", { value: GoogleSpreadsheet });

createApp(App).use(store).use(router).mount("#app");
