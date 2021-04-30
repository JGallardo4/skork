import { createStore } from "vuex";
const { GoogleSpreadsheet } = require("google-spreadsheet");

export default createStore({
  state: { inventoryItems: [], boxAmounts: [] },

  mutations: {
    SET_INVENTORY(state, _inventoryItems) {
      state.inventoryItems = _inventoryItems;
    },

    SET_BOX_AMOUNTS(state, _boxAmounts) {
      state.boxAmounts = _boxAmounts;
    },
  },

  getters: {
    getItemByBarcode: (state) => (barcode) => {
      return state.inventoryItems.find(
        (item) => item.Barcode !== "" && item.Barcode === barcode
      );
    },

    getItemBySku: (state) => (sku) => {
      return state.inventoryItems.find((item) => item.SKU === sku);
    },

    getBoxCapacity: (state) => (code) => {
      var amount = state.boxAmounts.find((item) => item.Id === code).Amount;

      return amount;
    },
  },

  actions: {
    async refreshData({ commit }) {
      const doc = new GoogleSpreadsheet(
        "1dp5vKTq9V5DfhpDsCq1XWpmuVDz7oiuTVy-rOO23I7w"
      );

      await doc.useServiceAccountAuth({
        client_email: process.env.VUE_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
      });

      await doc.loadInfo();

      const inventorySheet = doc.sheetsByTitle["Inventory"];
      const boxAmountsSheet = doc.sheetsByTitle["Box Amounts"];

      var inventoryItems = await Object.freeze(inventorySheet.getRows());
      var boxAmounts = await Object.freeze(boxAmountsSheet.getRows());

      commit("SET_INVENTORY", inventoryItems);
      commit("SET_BOX_AMOUNTS", boxAmounts);
    },

    // async updateItem({ getters }, item) {
    //   var row = getters.getItemBySku(item.sku);

    //   row.Overstock = item.overstock;
    //   row.Pieces = item.pieces;
    //   row.Total = item.overstock * item.boxCapacity + item.pieces;

    //   await row.save();
    // },

    async addOneOverstock({ getters }, sku) {
      var item = getters.getItemBySku(sku);

      if (item.Overstock === undefined) item.Overstock = 0;

      item.Overstock++;

      await item.save();
    },
  },

  modules: {},
});

// function parseNumber(x) {
//   const parsed = parseInt(x, 10);

//   if (isNaN(parsed)) {
//     return 0;
//   }

//   return parsed;
// }
