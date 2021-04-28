<template>
  <main class="main">
    <spinner class="spinner" v-if="isLoading"></spinner>

    <pages :elements="inventoryItems"></pages>

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
import Spinner from "../components/Spinner.vue";
import Pages from "../components/Pages.vue";

export default {
  name: "Home",

  data() {
    return {
      isLoading: true,
    };
  },

  components: {
    Pages,
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

<style sass scoped></style>
