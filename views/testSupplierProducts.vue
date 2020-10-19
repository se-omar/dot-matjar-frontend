<template>
  <v-app>
    <p>asdflasdfjal</p>

    <product
      :addToCartButton="false"
      :filteredProduct="supplierProduct"
    ></product>
  </v-app>
</template>

<script>
import product from "../components/product";
export default {
  components: { product },
  computed: {
    supplierProducts() {
      return this.$store.state.SupplierPage.supplierProducts;
    },
  },
};
</script>