<template>
  <v-app class="grey lighten-4">
   
    <v-container v-if="currentUser && currentUser.user_type == 'business'">
      <v-row justify="center">
        <p class="display-1">{{currentUser.full_arabic_name}}'s products</p>
      </v-row>
      <v-row><v-col></v-col></v-row>

      <v-row justify="center">
        <v-btn @click="$router.push('/addProduct').catch((err) => {})">
          <span style="font-size: 19px">Add product</span>
        </v-btn>
      </v-row>
<v-row><v-col></v-col></v-row>
      <v-row v-if="myProducts.length != 0">
        <v-col lg="3" md="4" sm="6" cols="6" v-for="myProduct in myProducts" :key="myProduct.id">
          <product :filteredProduct="myProduct"></product>
        </v-col>
      </v-row>

      <v-row class="mt-16" justify="center" v-else>
        <p class="display-1">No data available</p>
      </v-row>
    </v-container>

    <v-container v-else-if="!currentUser || currentUser.user_type != 'business'">
      <v-row justify="center">
        <p class="display-1">You cannot proceed to this page</p>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row justify="center">
        <p class="display-1">No products available </p>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Product from "../components/product.vue";
export default {
  mounted() {
    this.$store.dispatch("getMyProducts");
    console.log(this.myProducts);
  },

  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },

  components: {
    Product,
    
  }
};
</script>

