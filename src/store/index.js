import { createStore } from "vuex";
const { GoogleSpreadsheet } = require("google-spreadsheet");

export default createStore({
  state: { inventoryDoc: getInventoryDoc(), barcodes: [] },

  mutations: {
    SET_INVENTORY_SHEET(state, inventorySheet) {
      state.inventorySheet = inventorySheet;
    },

    ADD_BARCODE(state, barcode) {
      state.barcodes.push(barcode);
    },
  },

  getters: {
    getInventorySheet: async (state) => {
      var doc = await state.inventoryDoc;

      var sheet = doc.sheetsByTitle["Inventory"];

      return sheet;
    },

    getBoxAmountsSheet: async (state) => {
      var doc = await state.inventoryDoc;

      var sheet = doc.sheetsByTitle["Box Amounts"];

      return sheet;
    },

    getItemByBarcode: (state, getters) => async (barcode) => {
      if (barcode === "") return undefined;

      var sheet = await getters.getInventorySheet;
      var rows = await sheet.getRows();

      return rows.find(
        (item) => item.Barcode !== "" && item.Barcode === barcode
      );
    },

    getBoxCapacity: (state, getters) => async (code) => {
      var sheet = await getters.getBoxAmountsSheet;
      var rows = Array.from(await sheet.getRows());

      return rows.find((item) => item.Id === code).Amount;
    },

    getItemsByRange: (state, getters) => async (options) => {
      var sheet = await getters.getInventorySheet;
      var rows = await sheet.getRows(options);

      return rows;
    },

    getBarcodes(state) {
      return state.barcodes;
    },
  },

  actions: {
    async loadBarcodes({ getters, commit }) {
      var sheet = await getters.getInventorySheet;

      await sheet.loadCells("C:C");

      for (var i = 2; i < sheet.cellStats.loaded - 1; i++) {
        var cell = sheet.getCellByA1("C" + i);

        if (cell.value != undefined) {
          commit("ADD_BARCODE", cell.value);
        }
      }
    },
  },
});

async function getInventoryDoc() {
  const doc = new GoogleSpreadsheet(
    "1dp5vKTq9V5DfhpDsCq1XWpmuVDz7oiuTVy-rOO23I7w"
  );

  await doc.useServiceAccountAuth({
    client_email: process.env.VUE_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  await doc.loadInfo();

  return doc;
}
