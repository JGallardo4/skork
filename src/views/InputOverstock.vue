<template>
  <div class="page-container">
    <form class="barcode-form form">
      <div class="form-field">
        <label for="barcode" class="field-label">
          <i class="fas fa-barcode icon"></i>
        </label>
        <input
          id="barcode"
          class="field-input"
          v-model="barcode"
          autofocus
          ref="barcode"
        />
      </div>
    </form>

    <section class="buttons">
      <router-link to="/" class="button" tag="button"> Back </router-link>

      <button
        class="button next-button"
        type="submit"
        value="submit"
        @click="next()"
      >
        Next
      </button>
    </section>

    <inventory-item
      v-if="selectedItem"
      class="selected-item"
      :item="selectedItemData"
    ></inventory-item>

    <div class="overstock-count" v-show="selectedItem && boxCapacity !== '?'">
      <p>Boxes: {{ overstockCount }}</p>
    </div>

    <div class="alert" v-show="selectedItem && boxCapacity === '?'">
      <p>
        This item does not have a set number of pieces per box. Please input
        pieces directly.
      </p>
    </div>

    <form
      class="form overstock-form"
      v-show="selectedItem && boxCapacity !== '?'"
      v-on:submit.prevent="save()"
    >
      <div class="form-field">
        <label for="overstock" class="field-label">
          <i class="fas fa-box icon"></i>
        </label>

        <input
          id="overstock"
          class="field-input"
          ref="overstock"
          v-model="overstockInput"
          type="number"
        />
      </div>
    </form>
  </div>
</template>

<script>
import InventoryItem from "../components/InventoryItem.vue";

export default {
  name: "InputOverstock",

  components: {
    InventoryItem,
  },

  data() {
    return {
      isLoading: true,
      barcode: "",
      overstockInput: "",
      overstockCount: 1,
    };
  },

  computed: {
    selectedItem() {
      return this.$store.getters.getItemByBarcode(this.barcode);
    },

    overstock() {
      if (this.selectedItem) {
        return this.selectedItem.Overstock === ""
          ? 0
          : this.parseNumber(this.selectedItem.Overstock);
      } else {
        return 0;
      }
    },

    boxCapacity() {
      return this.$store.getters.getBoxAmount(
        this.selectedItem["Pieces per box"]
      );
    },

    selectedItemData() {
      return {
        Barcode: this.selectedItem.Barcode,
        SKU: this.selectedItem.SKU,
        Brand: this.selectedItem.Brand,
        Name: this.selectedItem.Name,
        MG: this.selectedItem.MG,
        Overstock: this.overstock,
        Pieces: this.selectedItem.Pieces,
        "Pieces per Box": this.boxCapacity,
        Total: this.selectedItem.Total,
      };
    },
  },

  created() {
    this.$store.dispatch("refreshData");
  },

  mounted() {
    this.$refs.barcode.focus();
  },

  methods: {
    next() {
      this.barcode = "";
      this.overstockCount = 0;
      this.$refs.barcode.focus();
    },

    parseNumber(x) {
      const parsed = parseInt(x, 10);

      if (isNaN(parsed)) {
        return 0;
      }

      return parsed;
    },

    save() {
      this.$store.dispatch("updateItem", {
        sku: this.selectedItem.SKU,
        overstock: this.parseNumber(this.overstockCount),
        boxCapacity: this.parseNumber(this.boxCapacity),
        pieces: this.parseNumber(this.selectedItem.Pieces),
      });

      this.next();
    },
  },

  watch: {
    selectedItem: function (value) {
      if (value !== undefined) {
        this.$nextTick(() => {
          this.$refs.overstock.focus();
        });
      }
    },

    overstockInput: function (value) {
      if (this.barcode === value) {
        this.overstockCount++;
      }

      this.overstockInput = "";
      this.$refs.overstock.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_mixins.scss" as *;
@use "../assets/css/_variables.scss" as *;

.page-container {
  height: 150vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto 1fr;
  align-items: center;

  .barcode-form {
    height: min-content;
    align-self: start !important;
  }

  .overstock-form {
    align-self: start !important;
  }

  .form {
    align-self: end;
  }

  .overstock-count {
    background-color: $highlight1;
    text-align: center;
    padding: 1rem;
    font-size: xx-large;
  }

  .alert {
    color: black;
    background-color: #fdfd96;
    align-self: start;
    padding: 1rem;
    font-size: xx-large;
  }
}

.form-field {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  gap: 0.3rem;

  .field-input {
    width: 100%;
    border-radius: 5px;
    text-align: center;
    font-size: 2rem;
  }

  .field-label {
    font-size: 3rem;
  }
}

.button {
  @include button();
  font-size: large;
  padding: 1rem;
}

.counter-button {
  padding: 0 1rem 0 1rem;
}

label {
  display: grid;
  place-items: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem 0 1rem;
}

.next-button {
  padding: 1.6rem;
  font-size: xx-large;
}
</style>
