<template>
  <section class="list-container">
    <nav class="filter-buttons">
      <button @click="selectedItems = items" class="filter-button">All</button>
      <button @click="selectedItems = uncountedOverstock" class="filter-button">
        Overstock
      </button>
      <button @click="selectedItems = uncountedPieces" class="filter-button">
        Pieces
      </button>
    </nav>

    <div class="inventory-items">
      <inventory-list-item
        v-for="(item, index) in selectedItems"
        :key="index"
        :item="item"
      />
    </div>

    <pagination
      :current-page="currentPage"
      :page-count="pageCount"
      @nextPage="pageChangeHandle('next')"
      @previousPage="pageChangeHandle('previous')"
      class="pagination-navigation"
    ></pagination>
  </section>
</template>

<script>
import InventoryListItem from "../components/InventoryListItem.vue";
import Pagination from "../components/Pagination.vue";

export default {
  components: { InventoryListItem, Pagination },

  name: "InventoryList",

  static: {
    visibleItemsPerPageCount: 2,
  },

  data() {
    return {
      items: [],
      selectedItems: [],
      currentPage: 1,
      pageCount: 0,
    };
  },

  mounted() {
    // Initialize items
    this.$store.getters
      .getItemsByRange({ offset: 0, limit: 10 })
      .then((result) => (this.items = result));
  },

  computed: {
    uncountedOverstock() {
      return this.items.filter((item) => item.Overstock === undefined);
    },

    uncountedPieces() {
      return this.items.filter((item) => item.Pieces === undefined);
    },
  },

  methods: {
    async pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.currentPage += 1;
          break;
        case "previous":
          this.currentPage -= 1;
          break;
        default:
          this.currentPage = value;
      }

      this.loadItems();
    },

    loadItems() {
      this.$store.getters
        .getItemsByRange({
          offset: this.currentPage,
          limit: 2,
        })
        .then((result) => (this.items = result));
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_mixins.scss" as *;

.list-container {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}

.pagination-navigation {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.inventory-items {
  overflow: scroll;
}

.filter-buttons {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;

  .filter-button {
    @include button();
    font-size: x-large;
  }
}
</style>
