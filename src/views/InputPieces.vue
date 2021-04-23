<template>
  <form class="form" @submit.prevent="track(carrier)">
    <div class="form-field">
      <label for="barcode">Barcode</label>
      <input id="barcode" v-model="barcode" />
    </div>
    <button
      class="submit-button"
      type="submit"
      value="submit"
      @click="submit()"
    >
      Done
    </button>
  </form>

  <inventory-item
    v-if="selectedItem"
    class="inventory-item"
    :item="selectedItem"
  ></inventory-item>
</template>

<script>
import InventoryItem from "../components/InventoryItem.vue";

export default {
  name: "InputPieces",

  components: {
    InventoryItem,
  },

  data() {
    return {
      isLoading: true,
      barcode: "",
    };
  },

  computed: {
    selectedItem() {
      return this.$store.getters.getItemByBarcode(this.barcode);
    },
  },

  created() {
    this.$store.dispatch("refreshData");
  },

  methods: {
    submit() {},
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
