import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import InputOverstock from "../views/InputOverstock.vue";
import InputPieces from "../views/InputPieces.vue";
import WorkerExample from "../views/WorkerExample.vue";
// import InventoryList from "../views/InventoryList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/input-overstock",
    name: "InputOverstock",
    component: InputOverstock,
  },

  {
    path: "/input-pieces",
    name: "InputPieces",
    component: InputPieces,
  },

  // This view is deactivated for performance reasons
  // {
  //   path: "/list",
  //   name: "List",
  //   component: InventoryList,
  // },

  {
    path: "/worker",
    name: "WorkerExample",
    component: WorkerExample,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
