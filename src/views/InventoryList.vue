<template>
  <div class="inventory-items">
    <inventory-item v-for="(item, index) in items" :key="index" :item="item" />
  </div>

  <pagination
    :current-page="currentPage"
    :page-count="pageCount"
    @nextPage="pageChangeHandle('next')"
    @previousPage="pageChangeHandle('previous')"
  ></pagination>
</template>

<script>
import InventoryItem from "../components/InventoryItem.vue";
import Pagination from "../components/Pagination.vue";

export default {
  components: { InventoryItem, Pagination },

  name: "InventoryList",

  static: {
    visibleItemsPerPageCount: 2,
  },

  data() {
    return {
      items: [],
      currentPage: 1,
      pageCount: 0,
    };
  },

  mounted() {
    // var offset = this.currentPage;

    this.$store.getters
      .getItemsByRange({
        offset: 0,
        limit: 2,
      })
      .then((result) => (this.items = result));
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

<style></style>
