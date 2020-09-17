<template>
  <v-card
    :class="request.request_response === null ? 'light-blue lighten-5 mb-2' : 'light-green mb-2'"
    width="100%"
    @click.native="setCurrentRequest"
  >
    <v-card-title style="font-size: 25px" class="mr-1">
      {{
      request.product.product_name
      }}
    </v-card-title>

    <v-row justify="space-between" class="mt-n8 mb-n5">
      <v-col cols="6">
        <v-card-text>{{ request.request_date }}</v-card-text>
      </v-col>

      <v-col cols="3">
        <v-card-text>رقم الطلب: {{ request.requests_id }}</v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-n2" justify="space-between">
      <v-col v-if="requestType === 'recieved'" cols="6">
        <v-card-text>
          <span style="font-size: 20px">اسم المرسل: {{ request.sendingUser.full_arabic_name }}</span>
        </v-card-text>
      </v-col>

      <v-col v-else-if="requestType === 'sent'" cols="6">
        <v-card-text>
          <span
            style="font-size: 20px"
          >اسم المرسل اليه: {{ request.recievingUser.full_arabic_name }}</span>
        </v-card-text>
      </v-col>

      <v-col class="mt-2" cols="3">
        <p
          style="font-size: 20px"
          v-if="requestType === 'recieved' && request.request_response != null"
        >تم الرد</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  created() {
    console.log(this.request);
  },

  props: {
    request: {
      type: Object,
      default: () => null,
    },

    requestType: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    setCurrentRequest() {
      this.$store.commit("viewRequestDetails");
      this.$store.dispatch("getCurrentRequest", this.request);
    },
  },
};
</script>
