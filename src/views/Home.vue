<template>
  <main class="main">
    <section></section>
    <div v-for="item in inventoryItems" :key="item.id" id="demo">
      {{ item.Location }}
    </div>

    <section class="main-buttons">
      <button class="main-button" onclick="myFunction()">
        Input overstock
      </button>

      <button class="main-button" onclick="myFunction()">Input pieces</button>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",

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
