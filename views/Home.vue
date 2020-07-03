<template>
  <div class="home">
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
    <v-btn route to="/editeaccount">editeaccount</v-btn>
  </div>
  
</template>

<script>
import Product from "../components/product.vue";

//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  created() {
    // this.$axios.get("http://localhost:3000/api/users").then(response => {
    //   this.$store.commit("addRowData", usersModel.fromDbRow(response.data));
    //   console.log(response.data[0]);
    // });
  },
  computed: {
    row() {
      return this.$store.state.row;
    }
  },
  components: {
    Product
  }
};
</script>
