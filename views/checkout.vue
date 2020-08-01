<template>
  <v-app>
    <p class="display-1">this is the checkout page</p>
    <v-btn id="checkout-button" @click="getSession">checkout</v-btn>
  </v-app>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
export default {
  methods: {
    async getSession() {
      var stripe = await loadStripe(
        "pk_test_51H97oICdSDXTIUwz70svxkIu08QM3jR0rB6E2njyq3fC7tLOODIipB8ppdjdPt32pteM8zHqsSF2mAo9Oyfw9Mvf00L3omXjql"
      );
      console.log(stripe);
      var sessionId = "";

      this.$axios
        .post("http://localhost:3000/api/checkout", {
          product_id: 53,
        })
        .then((response) => {
          console.log(response.data.session_id);
          sessionId = response.data.session_id;
        })
        .then(() => {
          stripe
            .redirectToCheckout({
              sessionId: sessionId,
            })
            .then(function(result) {
              console.log(result);
            });
        });
    },
  },
};
</script>
