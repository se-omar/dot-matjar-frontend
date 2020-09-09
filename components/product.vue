<template>
  <div>
    <v-card class="grey lighten-5" :elevation="7" max-width="280">
      <v-img height="250" :src="filteredProduct.main_picture"></v-img>

      <v-row class="mt-n5">
        <v-col cols="12">
          <v-card-title
            style="font-size: 19.5px;  overflow: hidden"
          >{{ add3Dots(filteredProduct.product_name, 45) }}</v-card-title>
          <v-card-text>
            <v-row style="height: 25%; ">
              <v-col lg="12" md="12" sm="12" cols="12">
                <span
                  :style="`color: ${siteColor} ; font-weight: 800; font-size:23px`"
                >{{ filteredProduct.unit_price }}</span>
                <span
                  class="ml-1"
                  :style="`color: ${siteColor} ; font-weight: 800; font-size:17px`"
                >EGP</span>
              </v-col>

              <v-col class="mt-n2" lg="12" md="12" sm="12" cols="12">
                <v-rating v-model="rating" color="amber" dense half-increments readonly size="20"></v-rating>
              </v-col>
            </v-row>
          </v-card-text>

          <v-row justify="center">
            <v-col cols="11" lg="10" sm="11" md="11">
              <v-btn outlined block @click="setCurrentRow" :color="siteColor" text>Details</v-btn>
            </v-col>
            <v-col cols="11" lg="10" sm="11" md="11">
              <v-btn
                v-if="currentuser"
                block
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

    add3Dots(string, limit) {
      var dots = "...";
      if (string.length > limit) {
        string = string.substring(0, limit) + dots;
      }

      return string;
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

<style scoped>
.overflow {
  display: block;
  /* white-space: nowrap; */
  height: 7em;
  overflow: hidden;
  text-overflow: ellipsis;
  color: red; /* This needs to match the color of the anchor tag */
}
</style>
