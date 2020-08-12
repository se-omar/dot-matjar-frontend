<template>
  <v-app>
    <div v-if="paymentToken === $route.params.hash">
      <h3
        class="mb-10 mt-10"
        style="text-align: center"
      >the payment was successful and the order is placed, you can check on it from the my orders page</h3>

      <v-row justify="center">
        <v-btn :to="'/home'" class="secondary">home page</v-btn>
        <v-btn :to="'/userorders'" class="primary ml-6">orders page</v-btn>
      </v-row>
    </div>

    <div v-else>
      <v-row justify="center">
        <h2>you dont have access to this page</h2>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  mounted() {
    if (this.paymentToken === this.$route.params.hash) {
      var self = this;
      console.log("connected");
      console.log(this.paymentToken);
      console.log(this.$route.params.hash);
      localStorage.removeItem("paymentToken");
      console.log(self.productsQuantityArray);

      this.$axios
        .post("http://localhost:3000/api/placeOrder", {
          user_id: self.currentUser.user_id,
          total_price: self.totalPrice,
          products: self.table,
          quantity: self.productsQuantityArray
        })
        .then(response => {
          console.log(response);
        });

      this.$axios
        .put("http://localhost:3000/api/cleanCart", {
          user_id: self.currentUser.user_id
        })
        .then(response => {
          console.log(response);
        });
    } else {
      console.log("order is already placed");
    }
  },

  computed: {
    paymentToken() {
      return this.$store.state.paymentToken;
    },

    table() {
      return this.$store.state.table;
    },

    currentUser() {
      return this.$store.state.currentUser;
    },

    totalPrice() {
      return this.$store.state.totalPrice;
    },

    productsQuantityArray() {
      return this.$store.state.productsQuantityArray;
    }
  }
};
</script>