<template>
  <div class="spinner-container">
    <semipolar-spinner :animation-duration="2000" :size="65" color="#ff1d5e" />
  </div>
</template>

<script>
import { SemipolarSpinner } from "epic-spinners";

export default {
  name: "Spinner",

  components: {
    SemipolarSpinner,
  },
};
</script>

<style sass scoped>
.spinner-container {
  display: grid;
  place-items: center;
}
</style>
