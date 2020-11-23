<template>
  <div>
    <v-row
      justify="end"
      v-if="currentUser.user_type == 'user'"
      class="grey lighten-3"
    >
      <v-col cols="12">
        <v-btn
          color="white"
          @click.stop="dialog = true"
          @click="openCartTable"
          v-if="currentUser"
          fixed
          fab
          :style="
            $vuetify.breakpoint.lg || $vuetify.breakpoint.md
              ? 'margin-top: 0px; margin-left: 85%'
              : 'margin-top: 10px; margin-left: 70%'
          "
        >
          <!-- <i class="fa fa-2x fa-shopping-cart" aria-hidden="true"></i> -->
          <v-img
            max-height="50"
            max-width="40"
            src="../assets/images/cart-logo.png"
          ></v-img>
        </v-btn>
      </v-col>
      <!-- =============== -->

      <v-row justify="end">
        <v-col cols="12" sm="6" md="6" lg="12">
          <v-dialog style="overflow: hidden" v-model="dialog" max-width="600px">
            <v-data-table
              hide-default-footer
              bordered
              hover
              :items="items"
              :headers="headers"
            >
              <template #[`item.quantity`]="{ item }">
                <v-row>
                  <v-col cols="3">
                    <v-btn x-small @click="decrement(item.product_id)">-</v-btn>
                  </v-col>
                  <v-col cols="1">
                    <h4>{{ item.quantity }}</h4>
                  </v-col>
                  <v-col cols="1">
                    <v-btn x-small @click="increment(item.product_id)">+</v-btn>
                  </v-col>
                </v-row>
              </template>
              <template #[`item.remove`]="{ item }">
                <v-btn
                  depressed
                  small
                  color="error"
                  @click="removeCartItem(item)"
                  >X</v-btn
                >
              </template>

              <template #[`item.product_color`]="{ item }">
                <v-swatches disabled v-model="item.product_color"></v-swatches>
              </template>
              <!-- =============== -->

              <!-- =================== -->
            </v-data-table>

            <v-card style="overflow: hidden">
              <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="6">
                  <h2>{{ $t("cartTable.total") }}{{ totalPrice }}.00$</h2>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col lg="3" sm="3" cols="4">
                  <v-btn
                    v-if="cartItems.length > 0"
                    dark
                    large
                    @click="getSession"
                  >
                    {{ $t("cartTable.checkout") }}</v-btn
                  >
                </v-col>

                <v-col lg="3" sm="3" cols="4">
                  <v-btn
                    dark
                    large
                    @click="cleanCart"
                    v-if="cartItems.length > 0"
                    depressed
                    small
                    color="error"
                    >{{ $t("cartTable.clean") }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>


<script>
// import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "cartTable",
  methods: {
    add(product) {
      this.products[product.id - 1].cart = true;
      this.cart.push(product);
      this.counter++;
    },
    // clean() {
    //   this.cart = [];
    //   for (const key in this.product) {
    //     this.products[key].cart = false;
    //     this.products[key].quantaty = 1;
    //   }
    //   for (var i = 0; i < this.products.length; i++) {
    //     this.products[i].cart = false;
    //   }
    // },
    async removeCartItem(item) {
      var itemIndex = this.items.indexOf(item);
      this.items.splice(itemIndex, 1);
      await this.$store.dispatch("removeProductFromCart", item);
    },

    increment(id) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].product_id == id) {
          this.items[i].quantity++;
        }
      }
    },
    decrement(id) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].product_id == id) {
          if (this.items[i].quantity < 1) {
            this.items[i].quantity = 0;
          } else {
            this.items[i].quantity--;
          }
        }
      }
    },
    numbers() {
      return this.cart.length + 1;
    },

    // eslint-disable-next-line no-unused-vars

    async openCartTable() {
      var self = this;
      await this.$store.dispatch("getCartProducts");
      console.log("cartItems var", self.cartItems);
      self.items = [];
      self.items.push(...self.cartItems);
    },

    getSession() {
      this.dialog = false;
      this.$router.push(`/${this.$i18n.locale}/checkOutLocation`);
      this.$store.commit("putTotalPriceInStore", this.totalPrice);
    },

    cleanCart() {
      this.items = [];
      this.$store.dispatch("cleanCart");
    },
  },

  data() {
    return {
      dialog: false,

      counter: 0,

      cart: [],
      headers: [
        { text: "Remove", value: "remove" },
        { text: "Price", value: "product.unit_price" },
        { text: "Quantity", value: "product.quantity" },
        { text: "Product name", value: "product.product_name" },
        { text: "Color", value: "product_color" },
      ],
      items: [],
    };
  },
  computed: {
    totalPrice() {
      var t = 0;
      for (var i = 0; i < this.items.length; i++) {
        t += this.items[i].product.unit_price * this.items[i].product.quantity;
      }
      return t;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    cartItems() {
      return this.$store.state.Cart.cartItems;
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
  },

  components: {
    VSwatches: () => import("vue-swatches"),
  },
};
</script>