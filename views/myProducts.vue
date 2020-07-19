<template>
  <v-app>
    <tool-bar></tool-bar>

    <v-row justify="center">
      <p class="display-1">منتجاتي</p>
    </v-row>

    <v-row class="ml-7 mr-13" v-if="myProducts.length != 0">
      <v-col cols="3" v-for="myProduct in myProducts" :key="myProduct.id">
        <product :filteredProduct="myProduct"></product>
      </v-col>
    </v-row>

    <v-row class="mt-16" justify="center" v-else>
      <p class="display-1">لا يوجد منتجات</p>
    </v-row>

    <v-row justify="center">
      <v-btn @click="$router.push('/addProduct').catch((err) => {})">
        <span style="font-size: 19px">اضافة منتح</span>
      </v-btn>
    </v-row>
  </v-app>
</template>

<script>
import Product from "../components/product.vue";
import ToolBar from "../components/toolbar.vue";
export default {
  created() {
    this.$store.dispatch("getMyProducts");
    console.log(this.myProducts);
  },

  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    }
  },

  components: {
    Product,
    ToolBar
  }
};
</script>

