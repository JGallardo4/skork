<template>
  <article class="inventory-item" :key="item.id" id="demo">
    <h1>Barcode: {{ item.Barcode }}</h1>
    <h1>Brand: {{ item.Brand }}</h1>
    <h1>MG: {{ item.MG }}</h1>
    <h1>Name: {{ item.Name }}</h1>
    <h1>Overstock: {{ item.Overstock }}</h1>
    <h1>Pieces: {{ item.Pieces }}</h1>
    <h1>Pieces per box: {{ item["Pieces per box"] }}</h1>
    <h1>SKU: {{ item.SKU }}</h1>
    <h1>Total: {{ item.Total }}</h1>
  </article>
</template>

<script>
export default {
  name: "InventoryItem",
  props: ["item"],
};
</script>

<style lang="sass" scoped>
.inventory-item
    padding: 0.5rem
</style>
