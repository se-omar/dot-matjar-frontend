<template>
  <v-app>
    <v-dialog persistent max-width="700" v-model="productRequestDialog">
      <v-card>
        <v-card-title>{{
          $t("productRequestDialog.productDescription")
        }}</v-card-title>
        <v-textarea
          v-model="requestDetails"
          class="mr-13"
          style="width: 85%"
          outlined
        ></v-textarea>
        <v-btn @click="productToggleResponse" class="mb-5 mr-13 ml-5">{{
          $t("productRequestDialog.close")
        }}</v-btn>
        <v-btn @click="sendRequest" class="mb-5 primary">{{
          $t("productRequestDialog.serviceRequest")
        }}</v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      requestDetails: "",
    };
  },

  computed: {
    productRequestDialog() {
      return this.$store.state.ProductDetails.productRequestDialog;
    },
  },

  methods: {
    productToggleResponse() {
      this.$store.commit("productToggleResponse");
    },

    sendRequest() {
      this.$store.commit("productToggleResponse");
      this.$store.dispatch("sendRequest", this.requestDetails);
    },
  },
};
</script>
