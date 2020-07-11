<template>
  <v-app>
    <tool-bar></tool-bar>
    <v-container fluid>
      <v-row>
        <v-col class="light-blue lighten-5" cols="2">
          <v-row>
            <v-col class="mb-12" cols="12">
              <v-btn text>
                <span style="font-size: 25px">الطلبات الصادرة</span>
              </v-btn>
            </v-col>

            <v-col cols="12">
              <v-btn text>
                <span style="font-size: 25px">الطلبات الواردة</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5">
          <request-card
            :request="request"
            :test="request"
            v-for="request in requests.recievedRequests"
            :key="request.requests_id"
            class="light-blue lighten-5 mb-2"
            @click.native="openDetails"
          ></request-card>
        </v-col>

        <v-col cols="5">
          <request-details :requestClicked="toggle"></request-details>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ToolBar from "../components/toolbar.vue";
import requestCard from "../components/requestCard.vue";
import requestDetails from "../components/requestDetails.vue";
export default {
  components: {
    ToolBar,
    requestCard,
    requestDetails
  },
  data() {
    return {
      toggle: false
    };
  },

  computed: {
    requests() {
      return this.$store.state.requests;
    }
  },

  created() {
    this.$store.dispatch("getRequests");
    console.log(this.requests);
  },
  methods: {
    openDetails() {
      this.toggle = true;
    }
  }
};
</script>