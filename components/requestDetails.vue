<template>
  <v-card href width="100%" v-if="requestClicked">
    <v-btn class="primary" @click="$store.commit('viewRequestCard')">
      <v-icon>mdi-arrow-right</v-icon>الرجوع للطلبات
    </v-btn>

    <v-row justify="space-between">
      <v-col cols="9">
        <v-card-title style="font-size: 25px">{{ currentRequest.product.product_name }}</v-card-title>
      </v-col>
      <v-col class="mt-n5" lg="3" md="3" sm="12" cols="12">
        <span style="font-size: 17px">
          {{
          currentRequest.request_status
          }}
        </span>
      </v-col>
    </v-row>

    <v-row justify="space-between">
      <v-col class="mt-n7" cols="6">
        <v-card-text>{{ currentRequest.request_date }}</v-card-text>
      </v-col>

      <v-col lg="3" md="3" sm="12" cols="12">
        <v-btn
          v-if="requestType === 'recieved' && !currentRequest.request_response"
          @click="toggleResponse"
          class="primary mt-n10"
        >الرد علي الطلب</v-btn>
      </v-col>

      <v-col class="mt-n9" cols="6">
        <v-card-text>رقم الطلب: {{ currentRequest.requests_id }}</v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-n2" justify="space-between">
      <v-col>
        <v-card-text v-if="requestType === 'recieved'">
          <span
            style="font-size: 19px"
          >اسم المرسل: {{ currentRequest.sendingUser.full_arabic_name }}</span>
        </v-card-text>

        <v-card-text v-else-if="requestType === 'sent'">
          <span
            style="font-size: 19px"
          >اسم المرسل اليه: {{ currentRequest.recievingUser.full_arabic_name }}</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row class="mt-n5">
      <v-col>
        <v-card-text v-if="requestType === 'recieved'">
          <span style="font-size: 19px">البريد الالكتروني: {{ currentRequest.sendingUser.email }}</span>
        </v-card-text>

        <v-card-text v-else-if="requestType === 'sent'">
          <span style="font-size: 19px">البريد الالكتروني: {{ currentRequest.recievingUser.email }}</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row class="mt-n5">
      <v-col>
        <v-card-text v-if="requestType === 'recieved'">
          <span style="font-size: 19px">رقم الموبايل: {{ currentRequest.sendingUser.mobile_number }}</span>
        </v-card-text>

        <v-card-text v-else-if="requestType === 'sent'">
          <span
            style="font-size: 19px"
          >رقم الموبايل: {{ currentRequest.recievingUser.mobile_number }}</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-card-text>
          <span style="font-size: 30px">وصف الطلب</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row class="mt-n9">
      <v-col>
        <v-card-text>
          <span style="font-size: 16px">
            {{
            currentRequest.request_details
            }}
          </span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row v-if="currentRequest.request_response !== null">
      <v-col>
        <v-card-text>
          <span style="font-size: 30px">الرد علي الطلب</span>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row v-if="currentRequest.request_response !== null" class="mt-n9">
      <v-col>
        <v-card-text>
          <span style="font-size: 16px">
            {{
            currentRequest.request_response
            }}
          </span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    requestClicked: {
      type: Boolean,
      default: false
    },
    requestType: {
      type: String,
      default: ""
    }
  },
  computed: {
    currentRequest() {
      return this.$store.state.currentRequest;
    }
  },
  methods: {
    toggleResponse() {
      this.$store.commit("toggleResponse");
      console.log(this.requestType);
    }
  },
  mounted() {
    console.log(this.currentRequest);
  }
};
</script>
