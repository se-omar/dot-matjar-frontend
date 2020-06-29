<template>
  <div class="home">
    <tool-bar></tool-bar>

    <v-container fluid>
      <v-row>
        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Product from "../components/product.vue";
import ToolBar from "../components/toolbar.vue";
import usersModel from "../models/usersModel";

export default {
  name: "Home",
  created() {
    this.$axios.get("http://localhost:3000/api/users").then(response => {
      this.$store.commit("addRowData", usersModel.fromDbRow(response.data));
      console.log(response.data);
    });
  },
  computed: {
    row() {
      return this.$store.state.row;
    }
  },
  components: {
    Product,
    ToolBar
  }
};
</script>
