<template>
  <article :key="item.id" class="inventory-item">
    <label class="inventory-item-label">
      <span>SKU {{ item.SKU }}</span>
      <span class="inventory-item__title">
        {{ item.Brand + " " + item.Name }}
      </span>
    </label>

    <p>Overstock: {{ item.Overstock ? item.Overstock : 0 }}</p>
    <p>Pieces: {{ item.Pieces ? item.Pieces : 0 }}</p>
  </article>
</template>

<script>
export default {
  name: "InventoryListItem",

  props: ["item"],
};
</script>

<style lang="scss" scoped>
.inventory-item-label {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
}

.inventory-item {
  font-size: 0.85rem;
  padding: 1rem;

  .inventory-item__title {
    padding-bottom: 0.6rem;
  }

  p,
  h1 {
    line-height: 1.25;
  }
}
</style>
