<template>
  <v-row justify="center">
    <v-btn @click.stop="dialog = true" @click="table">
      <v-icon>mdi-cart</v-icon>
    </v-btn>

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
                  <v-btn x-small @click="increment(item.product_id)">+</v-btn>
                </v-col>
                <v-col cols="2">
                  <h4>{{item.quantity}}</h4>
                </v-col>
                <v-col cols="3">
                  <v-btn x-small @click="decrement(item.product_id)">-</v-btn>
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.remove="{ item }">
              <v-btn depressed small color="error" @click="remove(item.product_id)">X</v-btn>
            </template>
          </v-data-table>

          <v-row justify="center" class="white">
            <!-- <v-col cols="6">
              <v-btn @click="clean" v-if="cart.length > 0" depressed small color="error">Clean</v-btn>
            </v-col>-->
            <v-col cols="6">
              <h2>$ Total: {{ total }}.00</h2>
              <br />
              <v-btn
                class="ml-9 primary"
                :disabled="items.length < 1"
                @click="getSession"
              >go to Checkout</v-btn>
            </v-col>
          </v-row>
        </v-dialog>
      </v-col>
    </v-row>
  </v-row>
</template>


<script>
import { loadStripe } from "@stripe/stripe-js";

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
    remove(id) {
      for (var x = 0; x < this.items.length; x++) {
        if (this.items[x].product_id == id) {
          this.items.splice(x, 1);
          console.log(this.items);

          this.$store.dispatch("remove", id);
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
    table() {
      var self = this;
      this.$store.dispatch("localStorage");
      setTimeout(function() {
        console.log(self.$store.state.table);
        self.items = [];
        for (var i = 0; i < self.$store.state.table.length; i++) {
          self.items.push(self.$store.state.table[i]);
          console.log("store i :", self.$store.state.table[i]);
        }
      }, 100);
    },

    getSession() {
      var quantityArray = [];
      this.items.forEach(element => {
        quantityArray.push(element.quantity);
      });
      loadStripe(
        "pk_test_51H97oICdSDXTIUwz70svxkIu08QM3jR0rB6E2njyq3fC7tLOODIipB8ppdjdPt32pteM8zHqsSF2mAo9Oyfw9Mvf00L3omXjql"
      ).then(stripe => {
        var sessionId = "";

        this.$axios
          .post("http://localhost:3000/api/checkout", {
            user_id: this.currentUser.user_id,
            quantityArray: quantityArray
          })
          .then(response => {
            console.log(response.data.token);
            sessionId = response.data.session_id;
            this.$store.commit("setPaymentToken", response.data.token);
          })
          .then(() => {
            stripe
              .redirectToCheckout({
                sessionId: sessionId
              })
              .then(function(result) {
                console.log(result);
              });
          });
      });
    }
  },

  data() {
    return {
      dialog: false,
      cartTable: [
        {
          product_name: "abc",
          quantity: 1,
          unit_price: 1
        },
        {
          product_name: "efg",
          quantity: 1,
          unit_price: 1
        },
        {
          product_name: "hij",
          quantity: 1,
          unit_price: 1
        }
      ],
      ticket: {
        products: null,
        total: 0
      },
      counter: 0,
      products: [
        {
          id: 1,

          name: "car1",
          price: 1,
          quantaty: 1,
          cart: false
        },
        {
          id: 2,

          name: "car2",
          price: 2,
          quantaty: 1,
          cart: false
        },
        {
          id: 3,

          name: "car3",
          price: 3,
          quantaty: 1,
          cart: false
        }
      ],
      cart: [],
      headers: [
        { text: "حذف", value: "remove" },
        { text: "السعر", value: "unit_price" },
        { text: "الكميه", value: "quantity" },
        { text: "الاسم", value: "product_name" }
      ],
      items: []
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
    }
  }
};
</script>