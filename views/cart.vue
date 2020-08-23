<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <h2>Products</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="product in products" :key="product.id">
          <b-card
            :title="product.name"
            :img-src="require(`@/assets/images/car${product.id}.jpg`)"
            img-top
            tag="article"
            style="max-width : 20 rem"
            class="mb-2"
          >
            <b-card-text>Price:{{product.price}}</b-card-text>

            <b-button
              @click="add(product)"
              href="#"
              v-if="!product.cart"
              variant="primary"
            >Add to shopping cart</b-button>
            <b-button
              v-if="product.cart"
              :disabled="product.cart"
              @click="add(product)"
              variant="warning"
            >product is added to cart</b-button>
          </b-card>
        </b-col>
      </b-row>

      <v-data-table bordered hover :items="cart" item-key="name" :headers="headers">
        <template v-slot:item.quantaty="{ item }">
          <v-row>
            <v-col cols="2">
              <v-btn x-small @click="increment(item.id)">+</v-btn>
            </v-col>
            <v-col cols="1">
              <h4>{{item.quantaty}}</h4>
            </v-col>
            <v-col cols="2">
              <v-btn x-small @click="decrement(item.id)">-</v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.remove="{ item }">
          <v-btn depressed small color="error" @click="remove(item.id)">X</v-btn>
        </template>
      </v-data-table>
      <!-- ============================= -->

      <v-row justify="center">
        <v-btn color="primary" dark @click.stop="dialog = true" @click="table">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </v-btn>

        <v-row>
          <v-col cols="12" sm="6" md="6" lg="12">
            <v-dialog v-model="dialog" max-width="600px">
              <v-data-table bordered hover :items="cart" item-key="name" :headers="headers">
                <template v-slot:item.quantaty="{ item }">
                  <v-row>
                    <v-col cols="3">
                      <v-btn x-small @click="increment(item.id)">+</v-btn>
                    </v-col>
                    <v-col cols="1">
                      <h4>{{item.quantaty}}</h4>
                    </v-col>
                    <v-col cols="3">
                      <v-btn x-small @click="decrement(item.id)">-</v-btn>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.remove="{ item }">
                  <v-btn depressed small color="error" @click="remove(item.id)">X</v-btn>
                </template>
              </v-data-table>

              <v-row>
                <v-col cols="4">
                  <v-btn @click="clean" v-if="cart.length > 0" depressed small color="error">Clean</v-btn>
                </v-col>
                <v-col cols="6">
                  <h2>$ Total: {{ total }}.00</h2>
                </v-col>
                <v-btn @click="showProduct">show product</v-btn>
              </v-row>
            </v-dialog>
          </v-col>
        </v-row>
      </v-row>

      <!-- ================================= -->
    </b-container>
  </div>
</template>
<script>
export default {
  name: "cart",
  created() {
    this.$store.dispatch("refreshCurrentUser");
  },

  props: {
    msg: String,
    pressedProduct: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      dialog: false,
      ticket: {
        products: null,
        total: 0,
      },
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
        { text: "حذف", value: "remove" },
        { text: "السعر", value: "price" },
        { text: "الكميه", value: "quantaty" },
        { text: "الاسم", value: "name" },
      ],
      items: [
        {
          name: "car1",
          quantaty: 1,
          price: 1,
        },
        {
          name: "car2",
          quantaty: 1,
          price: 2,
        },
        {
          name: "car3",
          quantaty: 1,
          price: 3,
        },
      ],
    };
  },

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
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id) {
          this.products[i].cart = false;
          this.products[i].quantaty = 1;
        }
      }
      for (var x = 0; x < this.cart.length; x++) {
        if (this.cart[x].id == id) {
          this.cart.splice(x, 1);
        }
      }
    },
    increment(id) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == id) {
          this.cart[i].quantaty++;
        }
      }
    },
    decrement(id) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == id) {
          if (this.cart[i].quantaty < 1) {
            this.cart.quantaty = 0;
          } else {
            this.cart[i].quantaty--;
          }
        }
      }
    },
    numbers() {
      return this.cart.length + 1;
    },
    table() {
      this.$store.dispatch("table");
      console.log(this.$store.state.currentUser.user_id);
    },
  },
  computed: {
    total() {
      var t = 0;
      for (var i = 0; i < this.cart.length; i++) {
        t += this.cart[i].price * this.cart[i].quantaty;
      }
      return t;
    },
  },
};
</script>