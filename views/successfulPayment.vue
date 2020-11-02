/* eslint-disable no-unused-vars */
<template>
  <v-app>
    <div v-if="paymentToken === $route.params.hash">
      <h3 class="mb-10 mt-10" style="text-align: center">
        {{ $t("successfulPayment.paymentSuccessful") }}
      </h3>

      <v-row justify="center">
        <v-btn :to="'/home'" :color="siteColor.button_color">
          <span :style="`color:${siteColor.button_text_color}`">
            {{ $t("successfulPayment.homePage") }}</span
          ></v-btn
        >
        <v-btn :to="'/userorders'" class="ml-6" :color="siteColoe.button_color">
          <span :style="`color:${siteColor.button_text_color};`">
            {{ $t("successfulPayment.ordersPage") }}</span
          ></v-btn
        >
      </v-row>
    </div>

    <div v-else>
      <v-row justify="center">
        <h2>{{ $t("successfulPayment.noAccess") }}</h2>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("refreshCurrentUser");
    if (this.paymentToken === this.$route.params.hash) {
      var self = this;

      localStorage.removeItem("paymentToken");

      this.$axios
        .put(this.nodeHost + "/api/cleanCart", {
          user_id: self.currentUser.user_id,
        })
        // eslint-disable-next-line no-unused-vars
        .then((response) => {});

      // this.$axios
      //   .post("http://localhost:3000/api/placeOrder", {
      //     user_id: self.currentUser.user_id,
      //     total_price: self.totalPrice,
      //     products: self.table,
      //     quantity: self.productsQuantityArray,
      //   })
      //   .then((response) => {
      //
      //   });
    }
  },

  computed: {
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    paymentToken() {
      return this.$store.state.Orders.paymentToken;
    },

    table() {
      return this.$store.state.table;
    },

    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    totalPrice() {
      return this.$store.state.totalPrice;
    },

    productsQuantityArray() {
      return this.$store.state.Orders.productsQuantityArray;
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
          footer_color: "white",
          footer_text_color: "black",
        };
      }
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 25px;
}
h3 {
  font-size: 25px;
}
</style>