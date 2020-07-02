<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col v-for="filteredProduct in filteredProducts" :key="filteredProduct.id">
          <product :filteredProduct="filteredProduct"></product>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Product from "../components/product.vue";

//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  created() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    row() {
      return this.$store.state.row;
    },
    products() {
      return this.$store.state.products;
    },
    filteredProducts() {
      return this.$store.state.filteredProducts;
    }
  },
  components: {
    Product
  }
};
</script>
