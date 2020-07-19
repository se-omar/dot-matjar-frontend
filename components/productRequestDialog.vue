<template>
  <v-app>
    <v-dialog persistent max-width="700" v-model="productRequestDialog">
      <v-card>
        <v-card-title>وصف الطلب</v-card-title>
        <v-textarea v-model="requestDetails" class="mr-13" style="width: 85%" outlined></v-textarea>
        <v-btn @click="productToggleResponse" class="mb-5 mr-13 ml-5">اغلاق</v-btn>
        <v-btn @click="sendRequest" class="mb-5 primary">طلب الخدمة</v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      requestDetails: ""
    };
  },

  computed: {
    productRequestDialog() {
      return this.$store.state.productRequestDialog;
    }
  },

  methods: {
    productToggleResponse() {
      this.$store.commit("productToggleResponse");
    },

    sendRequest() {
      this.$store.commit("productToggleResponse");
      this.$store.dispatch("sendRequest", this.requestDetails);
    }
  }
};
</script>
