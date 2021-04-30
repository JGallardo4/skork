<template>
  <div class="page-container">
    <section class="buttons">
      <router-link to="/" class="button back-button" tag="button">
        Back
      </router-link>
    </section>

    <form class="form overstock-form">
      <div class="form-field">
        <label for="overstock" class="field-label">
          <i class="fas fa-box icon"></i>
        </label>

        <input
          id="overstock"
          class="field-input"
          ref="overstock"
          v-model="barcodeInput"
          type="number"
          autofocus
        />
      </div>
    </form>

    <inventory-item
      v-if="selectedItem"
      class="selected-item"
      :item="selectedItem"
    ></inventory-item>

    <!-- <div class="alert" v-show="selectedItem && boxCapacity === '?'">
      <p>
        This item does not have a set number of pieces per box. Please input
        pieces directly.
      </p>
    </div> -->
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
      barcodeInput: "",
    };
  },

  computed: {
    selectedItem() {
      return this.$store.getters.getItemByBarcode(this.barcodeInput);
    },
  },

  created() {
    this.$store.dispatch("refreshData");
  },

  methods: {},

  watch: {
    barcodeInput: function () {
      if (this.selectedItem) {
        this.$nextTick(() => {
          this.$store.dispatch("addOneOverstock", this.selectedItem.SKU);

          this.$toast.show(
            this.selectedItem.Brand + " " + this.selectedItem.Name + " +1"
          );

          console.log(
            this.selectedItem.Brand + " " + this.selectedItem.Name + " +1"
          );
        });

        this.$nextTick(() => {
          this.barcodeInput = "";
        });
      }
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
  grid-template-rows: auto auto 1fr;
  align-items: center;
  gap: 0.5rem;

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

.back-button {
  border-radius: 0;
  border-bottom-right-radius: 5px;
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
}

.next-button {
  padding: 1.6rem;
  font-size: xx-large;
}
</style>
