<template>
  <v-card :elevation="7" max-width="280">
    <v-img height="200" :src="nodeHost + filteredProduct.main_picture"></v-img>

    <v-card-title>{{ filteredProduct.product_name }}</v-card-title>
    <v-card-text>
      <div>كود المنتج: {{ filteredProduct.product_code }}</div>
      <div>
        سعر القطعة:
        <span style="color: red;">{{ filteredProduct.unit_price }}</span>
        <br />
        الحد الادني للطلب: {{ filteredProduct.min_units_per_order }}
      </div>
      <div>المشروع: {{ filteredProduct.bussiness.bussiness_name }}</div>
      <v-row align="center" class="mx-0">
        <v-rating v-model="rating" color="amber" dense half-increments readonly size="15"></v-rating>

        <div class="grey--text ml-4">4</div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-col lg="12" sm="12" md="12">
      <v-btn @click="setCurrentRow" color="primary" text>Details</v-btn>
    </v-col>
    <v-col lg="12" sm="12" md="12">
      <b-button
        v-if="currentuser && addToCartButton"
        @click="add(filteredProduct)"
        variant="primary"
        class="red darken-4"
      >Add to shopping cart</b-button>
      <!-- <b-button
           v-if="this.inCart.in_cart==1"
          @click="add(product)"
          variant="warning"
      >product is added to cart</b-button>-->
    </v-col>
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
    this.$store.dispatch("getProducts");
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
    addToCartButton: {
      type: Object,
      default: () => true,
    },
  },

  methods: {
    setCurrentRow() {
      this.$store.dispatch("setCurrentProduct", this.filteredProduct);
      this.$router.push("/productDetails");
    },
    add(product) {
      this.$store.dispatch("table", product);
      // this.$store.commit("cart",product)
      // this.$store.dispatch("cart",product.product_id)
      this.cart = this.cartt;
      console.log(product.in_cart);
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },

    filteredProducts() {
      return this.$store.state.products;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },
    currentuser() {
      return this.$store.state.currentUser;
    },
    cartt() {
      return this.$store.state.cart;
    },
  },
};
</script>
