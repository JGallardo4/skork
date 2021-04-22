<template>
  <main class="main">
    <!-- <div v-for="item in items" :key="item.id" id="demo">
      {{ item.Location }}
    </div> -->

    <section class="main-buttons">
      <button class="main-button" onclick="myFunction()">
        Input overstock
      </button>

      <button class="main-button" onclick="myFunction()">Input pieces</button>
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
import { GoogleSpreadsheet } from "google-spreadsheet";

export default {
  name: "Home",

  data() {
    return {
      items: [],
      isLoading: true,
    };
  },

  methods: {
    async getData() {
      const doc = new GoogleSpreadsheet(
        "1dp5vKTq9V5DfhpDsCq1XWpmuVDz7oiuTVy-rOO23I7w"
      );

      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      });

      await doc.loadInfo();

      console.log(doc.title);

      const sheet = doc.sheetsByTitle["InventoryData"];

      console.log(await sheet.getRows());
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style lang="sass" scoped>
.main
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 1fr auto
  height: 100vh

  &-buttons
    grid-row: 2
    display: flex
    flex-direction: column

  &-button
    padding: 2rem
</style>
