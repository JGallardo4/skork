<template>
  <section class="list-container">
    <nav class="filter-buttons">
      <button @click.prevent="filter = 'all'" class="filter-button">All</button>
      <button @click.prevent="filter = 'overstock'" class="filter-button">
        Overstock
      </button>
      <button @click.prevent="filter = 'pieces'" class="filter-button">
        Pieces
      </button>
    </nav>

    <form class="form overstock-form">
      <div class="form-field">
        <label for="filter-brand" class="field-label"> Filter </label>

        <input
          id="filter-brand"
          class="field-input"
          ref="filter-brand"
          v-model="filterBrand"
          type="text"
          autofocus
        />
      </div>
    </form>

    <div class="inventory-items">
      <inventory-list-item
        v-for="(item, index) in filteredItems"
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

  data() {
    return {
      items: [],
      filter: "all",
      currentPage: 1,
      visibleItemsPerPageCount: 10,
      filterBrand: "",
    };
  },

  mounted() {
    this.loadItems();
  },

  computed: {
    pageCount() {
      return Math.floor(this.shownItems.length / this.visibleItemsPerPageCount);
    },

    shownItems() {
      var filtered = [];

      switch (this.filter) {
        case "all":
          filtered = this.items;
          break;
        case "overstock":
          filtered = this.items.filter(
            (item) => item.Overstock === undefined || item.Overstock === ""
          );
          break;
        case "pieces":
          filtered = this.items.filter(
            (item) => item.Pieces === undefined || item.Pieces === ""
          );
          break;
      }

      return filtered;
    },

    filteredItems() {
      var filtered = [];

      if (this.filterBrand == "") {
        filtered = this.shownItems;
      } else {
        filtered = this.shownItems.filter((item) =>
          item.Brand.includes(this.filterBrand.toUpperCase())
        );
      }

      var start =
        this.currentPage * this.visibleItemsPerPageCount -
        this.visibleItemsPerPageCount;

      var end = start + this.visibleItemsPerPageCount;

      return filtered.slice(start, end);
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
    },

    loadItems() {
      this.$store.getters
        .getItemsByRange({})
        .then((result) => (this.items = result));
    },
  },

  watch: {
    filterBrand: function () {
      this.currentPage = 1;
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
  grid-template-rows: auto 1fr auto;
}

.pagination-navigation {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.form-field {
  display: flex;
  padding: 0.5rem;

  label {
    padding: 0.5rem;
    flex-grow: 0;
  }

  input {
    flex-grow: 3;
    padding: 0.5rem;
  }
}
</style>
