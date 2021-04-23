<template>
  <semipolar-spinner :animation-duration="2000" :size="65" color="#ff1d5e" />
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

<style></style>
