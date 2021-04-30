import { createStore } from "vuex";
const { GoogleSpreadsheet } = require("google-spreadsheet");

export default createStore({
  state: { inventoryDoc: getInventoryDoc() },

  mutations: {
    SET_INVENTORY_SHEET(state, inventorySheet) {
      state.inventorySheet = inventorySheet;
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

      console.log(rows);

      return rows.find((item) => item.Id === code).Amount;
    },
  },

  actions: {
    // parseOverstockBarcode(barcode) {
    // },
    // parseOverstockBarcode: (state, getters) => async (barcode) => {
    //   console.log(barcode);
    //   var item = getters.getItemByBarcode(barcode);
    //   console.log(item);
    //   if (item) {
    //     if (item.Overstock === undefined) item.Overstock = 0;
    //     item.Overstock++;
    //     await item.save();
    //     this.$toast.show(item.Brand + " " + item.Name + " +1");
    //   }
    // },
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
