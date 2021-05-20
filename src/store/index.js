import { createStore } from "vuex";
const { GoogleSpreadsheet } = require("google-spreadsheet");

export default createStore({
  state: { inventorySheet: "", boxAmountsSheet: "", barcodes: [] },

  mutations: {
    SET_INVENTORY_SHEET(state, inventorySheet) {
      state.inventorySheet = inventorySheet;
    },

    SET_BOX_AMOUNTS_SHEET(state, boxAmountsSheet) {
      state.boxAmountsSheet = boxAmountsSheet;
    },

    ADD_BARCODE(state, barcode) {
      state.barcodes.push(barcode);
    },
  },

  getters: {
    // Find item in index and use the row # to get the row from the spreadsheet
    getItemByBarcode: (state) => async (barcode) => {
      if (barcode === "") return undefined;

      var itemRow = Array.from(state.barcodes).find(
        (item) => item.barcode === barcode
      ).row;

      var rows = await state.inventorySheet.getRows({
        offset: itemRow - 1,
        limit: 1,
      });

      var item = rows[0];

      return item;
    },

    // Pull all rows from the box amounts sheet and find the corresponding number to the letter code
    getBoxCapacity: (state) => async (code) => {
      var rows = Array.from(await state.boxAmountsSheet.getRows());

      return rows.find((item) => item.Id === code).Amount;
    },

    // Used by the list view that is currently not used
    getItemsByRange: (state) => async (options) => {
      var rows = await state.inventorySheet.getRows(options);

      return rows;
    },

    getBarcodes(state) {
      return state.barcodes;
    },
  },

  // Set sheets and initialize the barcodes index
  actions: {
    async initializeStore({ commit }) {
      var doc = new GoogleSpreadsheet(
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

      var inventorySheet = doc.sheetsByTitle["Inventory"];
      commit("SET_INVENTORY_SHEET", inventorySheet);

      var boxAmountsSheet = doc.sheetsByTitle["Box Amounts"];
      commit("SET_BOX_AMOUNTS_SHEET", boxAmountsSheet);

      await inventorySheet.loadHeaderRow();

      var barcodeColumnNumber = inventorySheet.headerValues.findIndex(
        (v) => v === "Barcode"
      );

      var barcodeColumnLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
        barcodeColumnNumber
      );

      await inventorySheet.loadCells(
        barcodeColumnLetter + ":" + barcodeColumnLetter
      );

      for (var i = 2; i < inventorySheet.cellStats.loaded - 1; i++) {
        var cell = inventorySheet.getCellByA1(barcodeColumnLetter + i);

        if (cell.value != undefined) {
          commit("ADD_BARCODE", { barcode: cell.value, row: cell._row });
        }
      }
    },
  },
});
