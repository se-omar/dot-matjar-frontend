<template>
  <div>
    <v-card
      :min-height="$vuetify.breakpoint.smAndDown ? '300' : '456'"
      @click="setCurrentRow"
      class="grey lighten-5"
      :elevation="7"
      :min-width="minWidth"
    >
      <v-img
        :height="$vuetify.breakpoint.smAndDown ? '170' : '250'"
        :src="filteredProduct.main_picture"
      ></v-img>

      <v-row class="mt-n5">
        <v-col cols="12">
          <v-card-title style="overflow: hidden" class="arabic">{{
            add3Dots(filteredProduct.product_name, 45)
          }}</v-card-title>
          <v-card-text>
            <v-row :class="overflowText">
              <v-col lg="12" md="12" sm="12" cols="12">
                <span :style="`color: black;font-size:23px `">{{
                  filteredProduct.unit_price
                }}</span>
                <span
                  class="ml-1"
                  :style="`color: black; font-weight: bold; `"
                  >{{ currentCurrency }}</span
                >
              </v-col>

              <div>
                <h2>{{ filteredProduct.category_id }}</h2>
              </div>

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

          <v-row justify="center" :class="overflowText">
            <v-col
              cols="11"
              lg="10"
              sm="11"
              md="11"
              v-if="currentUser && currentUser.user_type == 'user'"
            >
              <v-btn
                block
                @click.stop="add(filteredProduct)"
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
      default: () => "",
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
      console.log("filtered product in componetents", this.filteredProduct);
    },
    add(product) {
      this.$store.dispatch("table", product);
      // this.$store.commit("cart",product)
      // this.$store.dispatch("cart",product.product_id)
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
        return this.$store.state.Home.siteColor;
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },
    overflowText() {
      if (
        this.filteredProduct.product_name &&
        this.filteredProduct.product_name.length > 23
      )
        return "mt-n4";
      else return "";
    },
  },
};
</script>

<style scoped>
.smallerText {
  font-size: 15px;
}
.overflow {
  display: block;
  /* white-space: nowrap; */
  height: 7em;
  overflow: hidden;
  text-overflow: ellipsis;
  color: red; /* This needs to match the color of the anchor tag */
}
</style>
