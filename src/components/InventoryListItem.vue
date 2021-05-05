<template>
  <article :key="item.id" class="inventory-item">
    <label class="inventory-item-label">
      <span>SKU {{ item.SKU }}</span>
      <span class="inventory-item__title">
        {{ item.Brand + " " + item.Name }}
      </span>
    </label>

    <p>Overstock: {{ item.Overstock }}</p>
    <p>Pieces: {{ item.Pieces }}</p>
  </article>
</template>

<script>
export default {
  name: "InventoryListItem",

  props: ["item"],

  data() {
    return {
      boxCapacity: "",
    };
  },

  mounted() {
    this.$store.getters
      .getBoxCapacity(this.item.BoxCapacity)
      .then((boxCapacity) => (this.boxCapacity = boxCapacity));
  },
};
</script>

<style lang="scss" scoped>
.inventory-item-label {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
}

.inventory-item {
  padding: 1rem;

  .inventory-item__title {
    padding-bottom: 1rem;
  }

  p,
  h1 {
    line-height: 1.25;
  }
}
</style>
