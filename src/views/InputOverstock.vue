<template>
  <div class="input-pieces-container">
    <form class="form">
      <div class="form-field">
        <label for="barcode" class="field-label">
          <i class="fas fa-barcode icon"></i>
        </label>
        <input id="barcode" class="field-input" v-model="barcode" />
      </div>
    </form>

    <inventory-item
      v-if="selectedItem"
      class="selected-item"
      :item="selectedItemData"
      :style="'INPUT_PIECES'"
    ></inventory-item>

    <form class="form" @submit.prevent="track(carrier)">
      <div class="form-field">
        <label for="pieces" class="field-label">
          <i class="fas fa-prescription-bottle icon"></i>
        </label>

        <input id="pieces" class="field-input" v-model="pieces" />

        <button
          class="button counter-button"
          type="submit"
          value="submit"
          @click="pieces--"
        >
          -
        </button>

        <button
          class="button counter-button"
          type="submit"
          value="submit"
          @click="pieces++"
        >
          +
        </button>
      </div>
    </form>

    <section class="buttons">
      <router-link to="/" class="button" tag="button"> Back </router-link>

      <button class="button" type="submit" value="submit" @click="submit()">
        Input overstock
      </button>

      <button class="button" type="submit" value="submit" @click="submit()">
        Next
      </button>
    </section>
  </div>
</template>

<script>
import InventoryItem from "../components/InventoryItem.vue";

export default {
  name: "InputPieces",

  components: {
    InventoryItem,
  },

  data() {
    return {
      isLoading: true,
      barcode: "",
      pieces: 0,
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
          : this.selectedItem.Pieces;
      } else {
        return 0;
      }
    },

    boxCapacity() {
      if (this.selectedItem["Pieces per box"] === "A") {
        return 250;
      } else if (this.selectedItem["Pieces per box"] === "B") {
        return 160;
      } else if (this.selectedItem["Pieces per box"] === "C") {
        return 80;
      } else if (this.selectedItem["Pieces per box"] === "D") {
        return 114;
      } else if (this.selectedItem["Pieces per box"] === "E") {
        return 56;
      } else {
        return 0;
      }
    },

    total() {
      return (
        this.parseNumber(this.selectedItem.Pieces) +
        this.parseNumber(this.selectedItem.Overstock) *
          this.parseNumber(this.boxCapacity)
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
        Pieces: this.pieces,
        "Pieces per Box": this.boxCapacity,
        Total: this.total,
      };
    },
  },

  created() {
    this.$store.dispatch("refreshData");
  },

  methods: {
    submit() {},

    parseNumber(x) {
      const parsed = parseInt(x, 10);

      if (isNaN(parsed)) {
        return 0;
      }

      return parsed;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_mixins.scss" as *;

/* 628550153306 */

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
  }
}

.button {
  @include button();
  font-size: large;
}

.counter-button {
  padding: 0 1rem 0 1rem;
}

label {
  display: grid;
  place-items: center;
}
</style>
