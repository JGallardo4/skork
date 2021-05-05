<template>
  <div class="pagination-container">
    <button
      :disabled="isPreviousButtonDisabled"
      @click.prevent="previousPage"
      class="arrow-button"
    >
      <i class="fas fa-arrow-alt-circle-left icon"></i>
    </button>

    <p>{{ currentPage }}</p>

    <button
      :disabled="isNextButtonDisabled"
      @click.prevent="nextPage"
      class="arrow-button"
    >
      <i class="fas fa-arrow-alt-circle-right icon"></i>
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

<style lang="scss" scoped>
@use "../assets/css/_variables.scss" as *;

.arrow-button {
  border: none;
  background-color: inherit;
  color: white;
  font-size: 2.5rem;

  &:hover {
    color: $highlight3;
  }

  &:active {
    color: $highlight2;
  }

  &:disabled {
    color: gray;
  }
}
</style>
