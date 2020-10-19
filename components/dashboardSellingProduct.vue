<template>
  <v-card
    v-if="filteredProduct.message !== 'product not found'"
    class="grey lighten-4"
    :elevation="7"
    max-width="430"
  >
    <v-img height="150" :src="nodeHost + filteredProduct.main_picture"></v-img>

    <v-row justify="center" class="mb-n3">
      <v-card-title class="grey--text text--darken-2" style="font-size: 25px">{{
        filteredProduct.product_name
      }}</v-card-title>
    </v-row>
    <v-card-text>
      <div class="mb-1">
        <span style="font-size: 17px"
          >{{ $t("dashboardSellingProduct.productCode") }}
          {{ filteredProduct.product_code }}</span
        >
      </div>
      <div>
        <span style="font-size: 17px">
          {{ $t("dashboardSellingProduct.unitPrice") }}
          <span style="color: red">{{ filteredProduct.unit_price }}</span>
        </span>
      </div>
      <div>
        <v-row class="mt-n2">
          <v-col cols="8">
            <span style="font-size: 17px"
              >{{ $t("dashboardSellingProduct.numberOfTimesSold")
              }}{{ filteredProduct.buy_counter }}</span
            >
          </v-col>

          <v-col class="mt-n2" cols="4">
            <v-btn @click="setCurrentRow" class="primary">{{
              $t("dashboardSellingProduct.details")
            }}</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>

  <v-card class="grey lighten-4" height="200" v-else>
    <v-card-title class="display-1 ml-16">{{
      $t("dashboardSellingProduct.noProductFound")
    }}</v-card-title>
  </v-card>
</template>

<script>
// import cart from '../views/cart'
export default {
  components: {},
  name: "product",
  data() {
    return {
      i: 0,
      cart: [],
      rating: 4,
    };
  },
  created() {
    this.$store.dispatch("getProducts", {
      productFilterFlag: false,
    });
    console.log("Product is :", this.filteredProducts);
  },

  props: {
    product: {
      type: Object,
      default: () => null,
    },
    filteredProduct: {
      type: Object,
      default: () => null,
    },
  },

  methods: {
    setCurrentRow() {
      this.$store.dispatch("setCurrentProduct", this.filteredProduct);
      this.$router.push(`/${this.$i18n.locale}/productDetails`);
    },
    add(product) {
      this.$store.dispatch("table", product);
      // this.$store.commit("cart",product)
      // this.$store.dispatch("cart",product.product_id)
      this.cart = this.$store.state.cart;
      console.log(product.in_cart);
    },
  },
  computed: {
    filteredProducts() {
      return this.$store.state.Home.products;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },
    currentuser() {
      return this.$store.state.Home.currentUser;
    },
  },
};
</script>
