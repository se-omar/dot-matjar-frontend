<template>
  <v-app>
    <v-container
      v-if="currentUser && currentUser.user_type == 'business' && (recievedRequests || sentRequests)"
      fluid
    >
      <v-row>
        <v-col class="light-blue lighten-5" cols="2">
          <v-list class="light-blue lighten-5">
            <v-list-item-group>
              <v-list-item @click="requestType = 'sent'; toggleRequestType()">
                <span style="font-size: 25px">الطلبات الصادرة</span>
              </v-list-item>
              <br />
              <v-list-item @click="requestType = 'recieved'; toggleRequestType()">
                <span style="font-size: 25px">الطلبات الواردة</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col
          v-if="requestType === 'recieved' && !viewRequestDetails"
          cols="10"
          class="scrollable"
        >
          <p class="display-1">الطلبات الواردة</p>
          <request-card
            :requestType="requestType"
            :request="request"
            :test="request"
            v-for="request in recievedRequests.recievedRequests"
            :key="request.requests_id"
            @click.native="openDetails"
          ></request-card>
        </v-col>

        <v-col
          v-else-if="requestType === 'sent' && !viewRequestDetails"
          cols="10"
          class="scrollable"
        >
          <p class="display-1">الطلبات الصادرة</p>
          <request-card
            :requestType="requestType"
            :request="request"
            :test="request"
            v-for="request in sentRequests.sentRequests"
            :key="request.requests_id"
            @click.native="openDetails"
          ></request-card>
        </v-col>

        <!-- <v-col v-else cols="5" class="scrollable"></v-col> -->

        <request-response-dialog></request-response-dialog>

        <v-col v-if="viewRequestDetails" cols="10 scrollable">
          <request-details :requestType="requestType" :requestClicked="toggle"></request-details>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else-if="!currentUser || currentUser.user_type != 'business'">
      <v-row justify="center">
        <p class="display-1">ليس لديك صلاحيات لإظهار هذه الصفحة</p>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row justify="center">
        <p class="display-1">لا يوجد طلبات</p>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import requestCard from "../components/requestCard.vue";
import requestDetails from "../components/requestDetails.vue";
import requestResponseDialog from "../components/requestResponseDialog";
export default {
  components: {
    
    requestCard,
    requestDetails,
    requestResponseDialog
  },
  data() {
    return {
      toggle: false,
      requestType: "recieved"
    };
  },

  computed: {
    recievedRequests() {
      return this.$store.state.recievedRequests;
    },
    sentRequests() {
      return this.$store.state.sentRequests;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    viewRequestDetails() {
      return this.$store.state.viewRequestDetails;
    }
  },

  created() {
    this.$store.dispatch("getRecievedRequests");
    this.$store.dispatch("getSentRequests");
  },
  methods: {
    openDetails() {
      this.toggle = true;
    },

    toggleRequestType() {
      this.toggle = false;
      this.$store.commit("viewRequestCard");
    }
  }
};
</script>

<style scoped>
.scrollable {
  height: 90vh;
  overflow-y: auto;
}
</style>
