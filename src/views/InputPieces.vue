<template>
  <div class="page-container">
    <section class="header-buttons">
      <router-link to="/" class="button back-button" tag="button">
        Back
      </router-link>
    </section>

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

    <template v-if="selectedItem">
      <section class="buttons">
        <button
          class="button next-button"
          type="submit"
          value="submit"
          @click="save()"
        >
          Next
        </button>
      </section>

      <inventory-item
        v-if="selectedItem"
        class="selected-item"
        :item="selectedItem"
      ></inventory-item>

      <form
        class="form pieces-form"
        v-if="selectedItem"
        v-on:submit.prevent="save()"
      >
        <div class="form-field">
          <label for="pieces" class="field-label">
            <i class="fas fa-prescription-bottle icon"></i>
          </label>

          <input
            id="pieces"
            class="field-input"
            v-model="pieces"
            ref="pieces"
            type="number"
          />
        </div>
      </form>
    </template>
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
      barcode: "",

      selectedItem: undefined,

      pieces: "",
    };
  },

  mounted() {
    this.$refs.barcode.focus();
  },

  methods: {
    next() {
      this.$refs.barcode.focus();
      this.barcode = "";
    },

    parseNumber(x) {
      const parsed = parseInt(x, 10);

      if (isNaN(parsed)) {
        return 0;
      }

      return parsed;
    },

    async save() {
      var boxCapacity = await this.$store.getters.getBoxCapacity(
        this.selectedItem.BoxCapacity
      );

      this.selectedItem.Pieces = this.parseNumber(this.pieces);

      this.selectedItem.Total =
        boxCapacity * this.selectedItem.Overstock + this.selectedItem.Pieces;

      await this.selectedItem.save();

      this.next();
    },
  },

  watch: {
    barcode: async function (value) {
      this.$store.getters
        .getItemByBarcode(value)
        .then((item) => (this.selectedItem = item));

      if (this.item !== undefined) {
        this.$nextTick(() => {
          this.$refs.pieces.focus();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_mixins.scss" as *;

.page-container {
  height: 150vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto 1fr;
  align-items: center;

  .barcode-form {
    height: min-content;
    align-self: start !important;
  }

  .pieces-form {
    align-self: start !important;
  }

  .form {
    align-self: end;
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

label {
  display: grid;
  place-items: center;
}
</style>
