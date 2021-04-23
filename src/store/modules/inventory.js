// import axios from "axios";
const { GoogleSpreadsheet } = require("google-spreadsheet");

export const state = {
  inventoryItems: [],
};

export const getters = {};

export const mutations = {
  SET_INVENTORY(state, _inventoryItems) {
    state.inventoryItems = _inventoryItems;
  },
};

export const actions = {
  async refreshData({ commit }) {
    const doc = new GoogleSpreadsheet(
      "1dp5vKTq9V5DfhpDsCq1XWpmuVDz7oiuTVy-rOO23I7w"
    );

    await doc.useServiceAccountAuth({
      client_email: process.env.VUE_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["Inventory"];
    var inventoryItems = await sheet.getRows();

    commit("SET_INVENTORY", inventoryItems);
  },
};
