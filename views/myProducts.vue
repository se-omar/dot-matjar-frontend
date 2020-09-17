<template>
  <v-app class="grey lighten-4">
    <v-row>
      <v-col>
        <v-card height="120">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="ml-2">
      <v-col lg="2" style="max-width: 12%">
        <v-card height="95%">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col lg="9">
        <v-container
          v-if="currentUser && currentUser.user_type == 'business' || currentUser.user_type == 'admin'"
        >
          <v-row justify="center">
            <p class="display-1">{{currentUser.full_arabic_name}}'s products</p>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>

          <v-row justify="center">
            <v-btn
              :color="siteColor"
              fab
              large
              @click="$router.push('/addProduct').catch((err) => {})"
            >
              <i class="fa fa-plus fa-2x"></i>
            </v-btn>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>
          <v-row v-if="myProducts.length != 0">
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="6"
              v-for="myProduct in myProducts"
              :key="myProduct.id"
            >
              <product class="ml-n2 mr-n2" :addToCartButton="false" :filteredProduct="myProduct"></product>
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
            <p class="display-1">No products available</p>
          </v-row>
        </v-container>
        <v-divider class="mx-15"></v-divider>
      </v-col>

      <v-col lg="2" style="max-width: 12%">
        <v-card height="95%">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-container>
      <ordersChart />
    </v-container>-->
  </v-app>
</template>

<script>
// import ordersChart from "../components/ordersChart";
import Product from "../components/product.vue";

export default {
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    await this.$store.dispatch("getMyProducts", this.currentUser.user_id);
  },

  computed: {
    myProducts() {
      return this.$store.state.Dashboard.myProducts;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    siteColor() {
      return this.$store.state.Home.siteColor;
    },
  },

  components: {
    Product,
  },
};
</script>

