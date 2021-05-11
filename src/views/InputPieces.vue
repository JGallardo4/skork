<template>
  <div class="page-container">
    <section class="header-buttons">
      <router-link to="/" class="button" id="back-button" tag="button">
        Back
      </router-link>
    </section>

    <form class="barcode-form form" autocomplete="off">
      <div class="form-field">
        <label for="barcode" class="field-label">
          <i class="fas fa-barcode icon"></i>
        </label>
        <input
          id="barcode"
          class="field-input"
          v-model="barcode"
          ref="barcode"
          autocomplete="off"
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
        v-show="selectedItem"
        class="selected-item"
        :item="selectedItem"
      ></inventory-item>

      <form
        class="form pieces-form"
        v-show="selectedItem"
        v-on:submit.prevent="save()"
        autocomplete="off"
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
            type="search"
            autocomplete="off"
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
      this.barcode = "";
      this.pieces = "";
      this.selectedItem = undefined;

      this.$nextTick(() => {
        this.$refs.barcode.focus();
      });
    },

    parseNumber(x) {
      const parsed = parseInt(x, 10);

      if (isNaN(parsed)) {
        return 0;
      }

      return parsed;
    },

    async save() {
      var boxCapacity = this.parseNumber(
        await this.$store.getters.getBoxCapacity(this.selectedItem.BoxCapacity)
      );

      if (this.pieces === "") {
        this.selectedItem.Pieces = "";

        this.selectedItem.Total =
          this.selectedItem.Overstock === ""
            ? ""
            : boxCapacity * this.parseNumber(this.selectedItem.Overstock);
      } else {
        this.selectedItem.Pieces = this.parseNumber(this.pieces);

        this.selectedItem.Total =
          boxCapacity * this.parseNumber(this.selectedItem.Overstock) +
          this.selectedItem.Pieces;
      }

      await this.selectedItem.save();

      this.next();
    },
  },

  watch: {
    barcode: async function (value) {
      if (value === "") return;

      this.$nextTick(() => {
        this.$refs.pieces.focus();
      });

      var item = await this.$store.getters.getItemByBarcode(
        this.parseNumber(value)
      );

      this.selectedItem = item;
    },

    selectedItem: function (value) {
      if (value !== undefined) {
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
  grid-template-rows: auto auto auto auto 1fr;
  align-items: center;

  .header-buttons {
    display: flex;
    justify-items: left;
  }

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

.buttons {
  display: flex;
  justify-content: right;
  .next-button {
    padding: 2rem;
    font-size: x-large;
  }
}

.button {
  @include button();
  font-size: large;
  padding: 1rem;
}

#back-button {
  border-radius: 0;
  border-bottom-right-radius: 5px;
}

label {
  display: grid;
  place-items: center;
}
</style>
