<template>
  <div class="base-pagination">
    <button :disabled="isPreviousButtonDisabled" @click.prevent="previousPage">
      ←
    </button>

    <button :disabled="isNextButtonDisabled" @click.prevent="nextPage">
      →
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    currentPage: {
      type: Number,
      required: true,
    },

    pageCount: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount;
    },
  },

  methods: {
    nextPage() {
      this.$emit("nextPage");
    },
    previousPage() {
      this.$emit("previousPage");
    },
  },
};
</script>

<style></style>
