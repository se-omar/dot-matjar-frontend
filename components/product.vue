<template>
  <div>
    <v-card class="grey lighten-5" :elevation="7" max-width="280">
      <v-row>
        <v-col cols="12">
          <v-img height="200" :src="filteredProduct.main_picture"></v-img>

          <v-card-title style="font-size: 19.5px">{{ filteredProduct.product_name }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col lg="6" md="12" sm="12" cols="12">
                <span
                  :style="`color: ${siteColor} ; font-weight: 800; font-size:22px`"
                >{{ filteredProduct.unit_price }}</span>
                <span
                  class="ml-1"
                  :style="`color: ${siteColor} ; font-weight: 800; font-size:17px`"
                >EGP</span>
              </v-col>

              <v-col lg="6" md="12" sm="12" cols="12">
                <v-rating v-model="rating" color="amber" dense half-increments readonly size="20"></v-rating>
              </v-col>
            </v-row>
          </v-card-text>

          <v-row justify="center">
            <v-col cols="11" lg="11" sm="11" md="11">
              <v-btn rounded outlined block @click="setCurrentRow" :color="siteColor" text>Details</v-btn>
            </v-col>
            <v-col cols="11" lg="11" sm="11" md="11">
              <v-btn
                block
                rounded
                v-if="currentuser"
                @click="add(filteredProduct)"
                variant="primary"
                :color="siteColor"
                class="white--text"
              >
                Add to
                cart
              </v-btn>

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
  created() {
    console.log(this.$route);
  },
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
    siteColor() {
      return this.$store.state.siteColor;
    },
  },
};
</script>
