<template>
  <article :key="item.id" class="inventory-item">
    <label class="inventory-item-label">
      <p>SKU {{ item.SKU }}</p>
      <h1 class="inventory-item__title">
        {{ item.Brand + " " + item.Name }}
      </h1>
    </label>

    <p>Overstock: {{ item.Overstock }}</p>
    <p>Pieces: {{ item.Pieces }}</p>
    <p>Pieces per box: {{ item["Pieces per Box"] }}</p>
    <p>Total: {{ item.Total }}</p>
  </article>
</template>

<script>
export default {
  name: "InventoryItem",

  props: ["item"],
};
</script>

<style lang="scss" scoped>
.inventory-item-label {
  display: flex;
  justify-content: center;
  gap: 1rem;
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
