<template>
  <v-app>
    <tool-bar></tool-bar>
    <v-container fluid>
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
          <!-- <v-col class="mb-12" cols="12">
              <v-btn @click="toggleRequestType; " text>
                <span style="font-size: 25px">الطلبات الصادرة</span>
              </v-btn>
            </v-col>
 
            <v-col cols="12">
              <v-btn @click="toggleRequestType" text>
                <span style="font-size: 25px">الطلبات الواردة</span>
              </v-btn>
          </v-col>-->
        </v-col>

        <v-col v-if="requestType === 'recieved'" cols="5" class="scrollable">
          <request-card
            :requestType="requestType"
            :request="request"
            :test="request"
            v-for="request in recievedRequests.recievedRequests"
            :key="request.requests_id"
            class="light-blue lighten-5 mb-2"
            @click.native="openDetails"
          ></request-card>
        </v-col>

        <v-col v-else-if="requestType === 'sent'" cols="5" class="scrollable">
          <request-card
            :requestType="requestType"
            :request="request"
            :test="request"
            v-for="request in sentRequests.sentRequests"
            :key="request.requests_id"
            class="light-blue lighten-5 mb-2"
            @click.native="openDetails"
          ></request-card>
        </v-col>

        <v-col v-else cols="5" class="scrollable"></v-col>

        <request-response-dialog></request-response-dialog>

        <v-col cols="5 scrollable">
          <request-details :requestType="requestType" :requestClicked="toggle"></request-details>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ToolBar from "../components/toolbar.vue";
import requestCard from "../components/requestCard.vue";
import requestDetails from "../components/requestDetails.vue";
import requestResponseDialog from "../components/requestResponseDialog";
export default {
  components: {
    ToolBar,
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
    }
  },

  created() {
    this.$store.dispatch("getRecievedRequests");
    this.$store.dispatch("getSentRequests");
    console.log(this.sentRequests);
  },
  methods: {
    openDetails() {
      this.toggle = true;
    },

    toggleRequestType() {
      this.toggle = false;
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
