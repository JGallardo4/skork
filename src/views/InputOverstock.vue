// This view allows the user to count overstock boxes by scanning their
barcodes. No other input is required
<template>
  <div class="page-container">
    <section class="buttons">
      <router-link to="/" class="button back-button" tag="button">
        Back
      </router-link>
    </section>

    <form class="form overstock-form" autocomplete="off" @submit.prevent="">
      <div class="form-field">
        <label for="overstock" class="field-label">
          <i class="fas fa-box icon"></i>
        </label>

        <input
          id="barcode"
          class="field-input"
          ref="barcode"
          v-model="barcode"
          type="number"
          autofocus
          autocomplete="off"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ToastComponent from "../components/ToastComponent";
import { useToast } from "vue-toastification";

export default {
  name: "InputOverstock",

  setup() {
    const toast = useToast();
    const beep = new Audio(require("../assets/sounds/beep.mp3"));

    return { beep, toast };
  },

  data: function () {
    return {
      barcode: {
        type: Number,
      },
    };
  },

  mounted() {
    this.$refs.barcode.focus();
  },

  methods: {
    ...mapActions(["parseOverstockBarcode"]),

    parseNumber(x) {
      const parsed = parseInt(x, 10);

      if (isNaN(parsed)) {
        return 0;
      }

      return parsed;
    },

    // Reset overstock to ""
    async reset(barcode) {
      var item = await this.$store.getters.getItemByBarcode(
        this.parseNumber(barcode)
      );

      if (!item) return;

      item.Overstock = "";

      // var total = item.Pieces === "" ? "" : this.parseNumber(item.Pieces);

      // item.Total = total;

      item.Total =
        '=INDIRECT("H"&ROW())*VLOOKUP(G2, box_amounts_key, 3, false)+INDIRECT("I"&ROW())';

      item.save();
    },
  },

  watch: {
    // If item is found by barcode, update the overstock by +1
    barcode: async function (value) {
      if (value === "") return;

      var item = await this.$store.getters.getItemByBarcode(
        this.parseNumber(value)
      );

      if (!item) return;

      // var boxCapacity = await this.$store.getters.getBoxCapacity(
      //   item.BoxCapacity
      // );

      if (item.Overstock === undefined) item.Overstock = 0;
      item.Overstock++;

      // var total =
      //   this.parseNumber(boxCapacity) * this.parseNumber(item.Overstock) +
      //   this.parseNumber(item.Pieces);

      // item.Total = total;

      item.Total =
        '=INDIRECT("H"&ROW())*VLOOKUP(G2, box_amounts_key, 3, false)+INDIRECT("I"&ROW())';

      item.save();

      this.toast.clear();

      var toastContent = {
        component: ToastComponent,

        props: {
          content:
            item.Brand + " " + item.Name + "\nOverstock: " + item.Overstock,

          barcode: this.parseNumber(this.barcode),
        },

        listeners: {
          reset: this.reset,
        },
      };

      this.toast(toastContent);

      this.barcode = "";

      this.$refs.barcode.focus();

      this.beep.play();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/css/_mixins.scss" as *;
@use "../assets/css/_variables.scss" as *;

.page-container {
  height: 100vh;
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
