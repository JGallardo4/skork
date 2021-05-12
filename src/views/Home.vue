<template>
  <main class="main">
    <!-- <pages :elements="inventoryItems"></pages> -->
    <!-- <pages></pages> -->

    <section class="main-buttons">
      <!-- <router-link class="main-button" to="/list" tag="button">
        List
      </router-link> -->

      <router-link class="main-button" to="/input-overstock" tag="button">
        Overstock
      </router-link>

      <router-link class="main-button pieces" to="/input-pieces" tag="button"
        >Pieces</router-link
      >
    </section>
  </main>
</template>

<script>
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
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_variables.scss" as *;
@use "../assets/css/_mixins.scss" as *;

.main-buttons {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .main-button {
    @include button();
    font-size: xx-large;
    margin: 0.5rem;
    padding: 3rem 0 3rem 0;
  }
}
</style>
