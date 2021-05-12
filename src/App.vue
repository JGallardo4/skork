<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  mounted() {
    var loader = this.$loading.show();

    this.$store.dispatch("initializeStore").then(() => {
      loader.hide();
    });
  },
};
</script>

<style scoped></style>
