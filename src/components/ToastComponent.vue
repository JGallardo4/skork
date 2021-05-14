<template>
  <div class="content-container">
    <button
      class="button reset-button"
      type="submit"
      value="submit"
      @click.stop="$emit('reset', barcode)"
    >
      Reset
    </button>

    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "ToastComponent",

  props: ["content", "barcode"],
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_mixins.scss" as *;
@use "../assets/css/_variables.scss" as *;

.content-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.reset-button {
  @include button();
  padding: 1rem;
  background-color: $highlight1;
  font-family: inherit;
  font-size: large;

  &:hover {
    background-color: $base;
  }
}
</style>
