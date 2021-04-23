<template>
  <main class="main">
    <spinner></spinner>

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
import InventoryGrid from "../components/InventoryGrid.vue";
import Spinner from "../components/Spinner.vue";

export default {
  name: "Home",

  components: {
    InventoryGrid,
    Spinner,
  },

  data() {
    return {
      isLoading: true,
    };
  },

  computed: {
    inventoryItems() {
      return this.$store.state.inventoryItems;
    },
  },

  created() {
    this.$store.dispatch("refreshData");
  },
};
</script>

<style lang="sass" scoped>
.main
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 1fr auto
  height: 100vh

  &-buttons
    grid-row: 2
    display: flex
    flex-direction: column

  &-button
    padding: 2rem
</style>
