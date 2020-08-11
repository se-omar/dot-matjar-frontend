<template>
  <v-app>
    <div v-if="paymentToken === $route.params.hash">
      <h3
        class="mb-10 mt-10"
        style="text-align: center"
      >the payment was successful and the order is placed, you can check on it from the my orders page</h3>

      <v-row justify="center">
        <v-btn class="primary ml-6">orders page</v-btn>

        <v-btn :to="'/home'" class="secondary">home page</v-btn>
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
  beforeCreate() {
    console.log("connected");
    console.log(this.paymentToken);
    console.log(this.$route.params.hash);
    localStorage.removeItem("paymentToken");
  },

  computed: {
    paymentToken() {
      return this.$store.state.paymentToken;
    }
  }
};
</script>