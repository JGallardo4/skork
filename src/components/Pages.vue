<template>
  <!-- <inventory-grid :inventoryItems="displayedElements"></inventory-grid> -->

  <div
    v-for="{ element, index } in Object.values(displayedElements)"
    :key="index"
  >
    HELLO {{ element }} {{ Object.values(displayedElements) }}
    {{ typeof displayedElements }}
  </div>

  <nav>
    <ul class="pagination">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          v-if="page != 1"
          @click="() => page--"
        >
          Previous
        </button>
      </li>

      <li class="page-item">
        <button
          type="button"
          class="page-link"
          v-for="{ pageNumber, index } in availablePages"
          :key="index"
          @click="displayPage(pageNumber)"
        >
          hello {{ pageNumber }} {{ index }}
        </button>
      </li>

      <li class="page-item">
        <button
          type="button"
          @click="() => page++"
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
// import InventoryGrid from "../components/InventoryGrid.vue";

export default {
  name: "Pages",

  components: {
    // InventoryGrid,
  },

  // props: ["elements"],

  data() {
    return {
      page: 1,
      perPage: 10,
      pages: [],
      elements: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ],
    };
  },

  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.elements.length / this.perPage);

      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    displayPage(newPage) {
      this.page = newPage;
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

    availablePages() {
      return this.pages.slice(this.page - 1, this.page + 5);
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
