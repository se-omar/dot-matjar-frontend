<template>
  <div>
    <v-card class="grey lighten-5" :elevation="7" :min-width="minWidth">
      <v-img height="250" :src="filteredProduct.main_picture"></v-img>

      <v-row class="mt-n5">
        <v-col cols="12">
          <v-card-title style="font-size: 19.5px; overflow: hidden">{{
            add3Dots(filteredProduct.product_name, 45)
          }}</v-card-title>
          <v-card-text>
            <v-row style="height: 25%">
              <v-col lg="12" md="12" sm="12" cols="12">
                <span
                  :style="`color: black ; font-weight: 800; font-size:23px`"
                  >{{ filteredProduct.unit_price }}</span
                >
                <span
                  class="ml-1"
                  :style="`color: black; font-weight: 800; font-size:17px`"
                  >{{ currentCurrency }}</span
                >
              </v-col>

              <v-col class="mt-n2" lg="12" md="12" sm="12" cols="12">
                <v-rating
                  v-model="filteredProduct.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="20"
                ></v-rating>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>{{ filteredProduct.product_id }}</v-card-text>

          <v-row justify="center">
            <v-col cols="11" lg="10" sm="11" md="11">
              <v-btn
                rounded
                class="font"
                @click="setCurrentRow"
                :color="siteColor.button_color"
                text
                >{{ $t("product.details") }}
              </v-btn>
            </v-col>
            <v-col
              cols="11"
              lg="10"
              sm="11"
              md="11"
              v-if="currentUser && currentUser.user_type == 'user'"
            >
              <v-btn
                block
                @click="add(filteredProduct)"
                variant="primary"
                :color="siteColor.button_color"
                class="white--text"
              >
                <span :style="`color:${siteColor.button_text_color}`">{{
                  $t("product.addToCart")
                }}</span>
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
  async created() {
    await this.$store.dispatch(
      "calculateProductRating",
      this.filteredProduct.product_id
    );
  },
  name: "product",
  data() {
    return {
      hundred: "100%",
      hundredten: "110%",
      currentCurrency: localStorage.getItem("currentCurrency"),
      i: 0,
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
    currentUser: {
      type: Object,
      default: () => {},
    },

    minWidth: {
      type: String,
      default: () => "100%",
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
      console.log(product.in_cart);
    },

    add3Dots(string, limit) {
      var dots = "...";
      if (string) {
        if (string.length > limit) {
          string = string.substring(0, limit) + dots;
        }
      }

      return string;
    },
  },
  computed: {
    filteredProducts() {
      return this.$store.state.Home.products;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },

    cart() {
      return this.$store.state.Cart.cart;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
        };
      }
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
