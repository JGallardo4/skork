<template>
  <article :key="item.id">
    <template v-if="style === 'INPUT_PIECES'">
      <label class="inventory-item-label">
        <h1>SKU: {{ item.SKU }}</h1>
        <h1>{{ item.Brand + " " + item.Name + " " + item.MG }}</h1>
      </label>

      <h1>Overstock: {{ item.Overstock }}</h1>
      <h1>Pieces: {{ item.Pieces }}</h1>
      <h1>Pieces per box: {{ item["Pieces per Box"] }}</h1>
      <h1>Total: {{ item.Total }}</h1>
    </template>

    <template v-if="style !== 'INPUT_PIECES'">
      <h1>Barcode: {{ item.Barcode }}</h1>
      <h1>Brand: {{ item.Brand }}</h1>
      <h1>MG: {{ item.MG }}</h1>
      <h1>Name: {{ item.Name }}</h1>
      <h1>Overstock: {{ item.Overstock }}</h1>
      <h1>Pieces: {{ item.Pieces }}</h1>
      <h1>Pieces per box: {{ item["Pieces per box"] }}</h1>
      <h1>SKU: {{ item.SKU }}</h1>
      <h1>Total: {{ item.Total }}</h1>
    </template>
  </article>
</template>

<script>
export default {
  name: "InventoryItem",

  props: ["item", "style"],
};
</script>

<style lang="scss" scoped>
.inventory-item-label {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
