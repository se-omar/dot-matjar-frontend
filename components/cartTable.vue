<template>
  <div>
    <v-row justify="start">
      <v-col cols="12">
        <v-btn
          color="red lighten-1"
          dark
          @click.stop="dialog = true"
          @click="table"
          v-if="currentUser"
          large
          rounded
          
        >
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </v-btn>
      </v-col>
      <!-- =============== -->

      <v-row>
        <v-col cols="12" sm="6" md="6" lg="12">
          <v-dialog v-model="dialog" max-width="600px">
            <v-data-table
              hide-default-footer
              @click:row="rowclicked"
              bordered
              hover
              :items="items"
              :headers="headers"
            >
              <template v-slot:item.quantity="{ item }">
                <v-row>
                  <v-col cols="3">
                    <v-btn x-small @click="decrement(item.product_id)">-</v-btn>
                  </v-col>
                  <v-col cols="1">
                    <h4>{{item.quantity}}</h4>
                  </v-col>
                  <v-col cols="1">
                    <v-btn x-small @click="increment(item.product_id)">+</v-btn>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.remove="{ item }">
                <v-btn depressed small color="error" @click="removeCartItem(item.product_id)">X</v-btn>
              </template>
              <!-- =============== -->

              <!-- =================== -->
            </v-data-table>

            <v-card>
              <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="6">
                  <h2>Total: {{ total }}.00$</h2>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col lg="3" sm="3" cols="3">
                  <v-btn v-if="intable.length>0" dark large @click="getSession">Checkout</v-btn>
                </v-col>

                <v-col lg="3" sm="3" cols="3">
                  <v-btn
                    dark
                    large
                    @click="cleanCart"
                    v-if="intable.length>0"
                    depressed
                    small
                    color="error"
                  >Clean</v-btn>
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
    showProduct() {
      console.log(this.pressedProduct);
    },
    add(product) {
      this.products[product.id - 1].cart = true;
      this.cart.push(product);
      this.counter++;
    },
    clean() {
      this.cart = [];
      for (const key in this.product) {
        this.products[key].cart = false;
        this.products[key].quantaty = 1;
      }
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].cart = false;
      }
    },
    async removeCartItem(id) {
      for (var x = 0; x < this.items.length; x++) {
        if (this.items[x].product_id == id) {
          this.items.splice(x, 1);
          console.log(this.items);

          await this.$store.dispatch("removeProductFromCart", id);
        }
      }
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

    rowclicked(event) {
      console.log("event is :", event);
    },
    async table() {
      var self = this;
      await this.$store.dispatch("localStorage");

      console.log(self.intable);
      self.items = [];
      self.items.push(...self.intable);
      // for (var i = 0; i < self.intable.length; i++) {
      //   self.items.push(self.intable[i]);
      //   console.log("store i :", self.intable[i]);
      // }
    },

    getSession() {
      this.$router.push('/checkOutLocation')
      
      // var self = this;
      // self.quantityArray = [];
      // this.items.forEach((element) => {
      //   self.quantityArray.push(element.quantity);
      // });
      // console.log(self.quantityArray);
      // loadStripe(
      //   "pk_test_51H97oICdSDXTIUwz70svxkIu08QM3jR0rB6E2njyq3fC7tLOODIipB8ppdjdPt32pteM8zHqsSF2mAo9Oyfw9Mvf00L3omXjql"
      // ).then((stripe) => {
      //   var sessionId = "";
      //   this.$axios
      //     .post("http://localhost:3000/api/checkout", {
      //       user_id: this.currentUser.user_id,
      //       quantityArray: self.quantityArray,
      //     })
      //     .then((response) => {
      //       console.log(self.quantityArray);
      //       sessionId = response.data.session_id;
      //       this.$store.commit("setPaymentToken", response.data.token);
      //       this.$store.commit("putTotalPriceInStore", self.total);
      //       this.$store.commit("putQuantityInStore", self.quantityArray);
      //     })
      //     .then(() => {
      //       stripe
      //         .redirectToCheckout({
      //           sessionId: sessionId,
      //         })
      //         .then(function (result) {
      //           console.log(result);
      //         });
      //     });
      // });
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
      products: [
        {
          id: 1,

          name: "car1",
          price: 1,
          quantaty: 1,
          cart: false,
        },
        {
          id: 2,

          name: "car2",
          price: 2,
          quantaty: 1,
          cart: false,
        },
        {
          id: 3,

          name: "car3",
          price: 3,
          quantaty: 1,
          cart: false,
        },
      ],
      cart: [],
      headers: [
        { text: "Remove", value: "remove" },
        { text: "Price", value: "unit_price" },
        { text: "Quantity", value: "quantity" },
        { text: "Product name", value: "product_name" },
      ],
      items: [],
      inTable: [],
    };
  },
  computed: {
    total() {
      var t = 0;
      for (var i = 0; i < this.items.length; i++) {
        console.log(this.items[i].unit_price);
        t += this.items[i].unit_price * this.items[i].quantity;
        console.log(this.items[0].quantity);
      }
      return t;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },

    intable() {
      return this.$store.state.table;
    },
  },
};
</script>