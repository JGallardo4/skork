<template>
  <section class="inventory-grid">
    <inventory-item
      class="inventory-item"
      v-for="(item, id) in inventoryItems"
      :key="id"
      :item="item"
    >
    </inventory-item>
  </section>
</template>

<script>
import InventoryItem from "./InventoryItem.vue";

export default {
  components: { InventoryItem },
  name: "InventoryGrid",
  props: ["inventoryItems"],
};
</script>

<style lang="sass" scoped>
.inventory-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))
  grid-gap: 1rem
  overflow: scroll
</style>
