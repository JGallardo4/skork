<template>
  <main class="main">
    <!-- <spinner class="spinner" v-if="isLoading"></spinner> -->

    <!-- <pages :elements="inventoryItems"></pages> -->
    <!-- <pages></pages> -->

    <section class="main-buttons">
      <router-link
        class="main-button overstock"
        to="/input-overstock"
        tag="button"
        >Overstock</router-link
      >
      <router-link class="main-button pieces" to="/input-pieces" tag="button"
        >Pieces</router-link
      >
    </section>
  </main>
</template>

<script>
// import Spinner from "../components/Spinner.vue";
// import Pages from "../components/Pages.vue";

export default {
  name: "Home",

  data() {
    return {
      isLoading: true,
    };
  },

  components: {
    // Pages,
    // Spinner,
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_variables.scss" as *;
@use "../assets/css/_mixins.scss" as *;

.main-buttons {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr 1fr;

  .main-button {
    @include button();
    font-size: xx-large;
    margin: 0.5rem;
  }

  .overstock {
    grid-row: 2;
  }

  .pieces {
    grid-row: 3;
  }
}
</style>
