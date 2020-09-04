<template>
<div>
 
  <v-card :elevation="7" max-width="280">
     <v-row>
    <v-col cols="12">
    <v-img height="200" :src="filteredProduct.main_picture"></v-img>

    <v-card-title>{{ filteredProduct.product_name }}</v-card-title>
    <v-card-text>
      <div>Code {{ filteredProduct.product_code }}</div>
      <div>category id: {{ filteredProduct.category_id }}</div>
      <div>
       Price:
        <span style="color: red;">{{ filteredProduct.unit_price }}</span>
        <br />
       Min requests :{{ filteredProduct.min_units_per_order }} 
      </div>
      <!-- <div>المشروع: {{ filteredProduct.bussiness.bussiness_name }}</div> -->
      <v-row align="center" class="mx-0">
        <v-rating v-model="rating" color="amber" dense half-increments readonly size="15"></v-rating>

        <div class="grey--text ml-4">4</div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
<v-row>
    <v-col cols="12" lg="12" sm="12" md="12">
      <v-btn @click="setCurrentRow" :color="siteColor" text>Details</v-btn>
    </v-col>
    <v-col cols="12"  lg="12" sm="12" md="12" >
      <v-btn
      max-width="100"
        v-if="currentuser"
        @click="add(filteredProduct)"
        variant="primary"
       :color="siteColor"
       class="white--text"
       rounded
      >Add to<br/> cart</v-btn>
      <!-- <b-button
           v-if="this.inCart.in_cart==1"
          @click="add(product)"
          variant="warning"
      >product is added to cart</b-button>-->
    </v-col>
    </v-row>
     </v-col>
  </v-row>
  </v-card>

   
  </div>
</template>

<script>
// import cart from '../views/cart'
export default {
  components: {},
  name: "product",
  data() {
    return {
      i: 0,
      rating: 4,
    };
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
      type: Boolean,
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
    cart() {
      return this.$store.state.cart;
    },
    siteColor(){
      return this.$store.state.siteColor;
    }
  },
};
</script>
