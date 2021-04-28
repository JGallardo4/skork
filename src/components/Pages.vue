<template>
  <inventory-grid :inventoryItems="displayedElements"></inventory-grid>

  <nav>
    <ul class="pagination">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          v-if="page != 1"
          @click="page--"
        >
          Previous
        </button>
      </li>

      <li class="page-item">
        <button
          type="button"
          class="page-link"
          v-for="{ pageNumber, index } in pages.slice(page - 1, page + 5)"
          :key="index"
          @click="page = pageNumber"
        >
          {{ pageNumber }}
        </button>
      </li>

      <li class="page-item">
        <button
          type="button"
          @click="page++"
          v-if="page < pages.length"
          class="page-link"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import InventoryGrid from "../components/InventoryGrid.vue";

export default {
  name: "Pages",

  components: {
    InventoryGrid,
  },

  props: ["elements"],

  data() {
    return {
      page: 1,
      perPage: 10,
      pages: [],
    };
  },

  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.elements.length / this.perPage);

      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    paginate(elements) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return elements.slice(from, to);
    },
  },

  computed: {
    displayedElements() {
      return this.paginate(this.elements);
    },
  },

  watch: {
    elements() {
      this.setPages();
    },
  },

  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style></style>
