import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import InputOverstock from "../views/InputOverstock.vue";
import InputPieces from "../views/InputPieces.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
