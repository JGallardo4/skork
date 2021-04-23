<template>
  <main class="main">
    <spinner class="spinner" v-if="isLoading"></spinner>

    <inventory-grid :inventoryItems="inventoryItems"></inventory-grid>

    <section class="main-buttons">
      <router-link class="main-button" to="/input-overstock" tag="button"
        >Input overstock</router-link
      >
      <router-link class="main-button" to="/input-pieces" tag="button"
        >Input pieces</router-link
      >
    </section>
  </main>
</template>

<script>
// import { defineAsyncComponent } from "vue";
import Spinner from "../components/Spinner.vue";
import InventoryGrid from "../components/InventoryGrid";

export default {
  name: "Home",

  data() {
    return {
      isLoading: true,
    };
  },

  components: {
    // InventoryGrid: defineAsyncComponent({
    //   loader: () => import("../components/InventoryGrid.vue"),
    //   timeout: 3000,
    //   errorComponent: "Error loading",
    //   loadingComponent: Spinner,
    // }),
    InventoryGrid,
    Spinner,
  },

  computed: {
    inventoryItems() {
      return this.$store.state.inventoryItems;
    },
  },

  created() {
    this.$store.dispatch("refreshData").then(() => (this.isLoading = false));
  },
};
</script>

<style sass scoped>
.main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}
.main-buttons {
  grid-row: 2;
  display: flex;
  flex-direction: column;
}
.main-button {
  padding: 2rem;
}
</style>
