<template>
  <v-app>
    <v-container style="margin-top: 100px">
      <v-card v-for="request in categoryAndItemRequests" :key="request.id">
        <v-row justify="center">
          <v-col lg="2"></v-col>
          <v-col lg="4" class="mt-8">
            <supplier :supplier="request.user"></supplier>
          </v-col>
          <v-col lg="4" class="mt-8">
            <h4 style="font-size: 25px; color: orange">Request type :</h4>
            <span class="ml-3 mb-8" style="font-size: 25px; color: blue">{{
              request.request_type
            }}</span>
            <br />

            <v-divider class="divider"></v-divider>
            <h4
              v-if="request.new_category_name"
              style="font-size: 25px; color: orange"
            >
              New Category name :
            </h4>
            <span
              v-if="request.new_category_name"
              style="font-size: 25px; color: blue"
            >
              {{ request.new_category_name }}</span
            >
            <v-divider class="divider"></v-divider>
            <h4 style="font-size: 25px; color: orange">
              New Category Description :
            </h4>
            <span
              v-if="request.new_category_description"
              style="font-size: 25px; color: blue"
              >{{ request.new_category_description }}</span
            >
            <v-divider class="divider"></v-divider>
            <h4 style="font-size: 25px; color: orange">New Category Item :</h4>
            <span
              v-if="request.new_category_item"
              style="font-size: 25px; color: blue"
              >{{ request.new_category_item }}</span
            >
            <v-divider class="divider"></v-divider>
            <h4 style="font-size: 25px; color: orange">
              New Item Description:
            </h4>
            <span
              v-if="request.new_item_description"
              style="font-size: 25px; color: blue"
              >{{ request.new_item_description }}</span
            >
            <v-divider class="divider"></v-divider>
            <h4 style="font-size: 25px; color: orange">
              New Item Category name:
            </h4>
            <span
              v-if="request.new_item_category_name"
              style="font-size: 25px; color: blue"
              >{{ request.new_item_category_name }}</span
            >
            <v-divider class="divider"></v-divider>
            <h4 style="font-size: 25px; color: orange">Request Status:</h4>
            <span style="font-size: 25px; color: blue">{{
              request.status
            }}</span>

            <v-divider class="divider"></v-divider>
          </v-col>
          <v-col lg="1"></v-col>
        </v-row>
        <v-row>
          <v-col lg="3"></v-col>
          <v-col lg="3">
            <v-btn
              rounded
              class="white--text blue"
              @click="acceptRequest(request)"
              >Accept</v-btn
            >
          </v-col>
          <v-col lg="3">
            <v-btn
              rounded
              class="white--text red"
              @click="rejectRequest(request)"
              >Reject</v-btn
            >
          </v-col>
          <v-snackbar
            v-if="categoryRequestMessage"
            :timeout="3000"
            v-model="snackBar"
            shaped
          >
            <v-row justify="center">
              <h3>{{ categoryRequestMessage }}</h3>
            </v-row>
          </v-snackbar>

          <v-col lg="3"></v-col>
        </v-row>
      </v-card>

      <v-divider class="divider"></v-divider>
    </v-container>
  </v-app>
</template>


<script>
import supplier from "../components/supplier";

export default {
  data: () => ({
    dialog: false,
    snackBar: false,
  }),
  created() {
    this.$store.dispatch("getCategoryAndItemRequests");
    if (this.categoryAndItemRequests) {
      console.log("comeed", this.categoryAndItemRequests);
    }
  },
  methods: {
    acceptRequest(request) {
      console.log(request);
      this.$store.dispatch("categoryAndItemRequestStatus", {
        id: request.id,
        status: "Accepted",
        newCategoryName: request.new_category_name,
        newCategoryDescription: request.new_category_description,
        newCategoryItem: request.new_category_item,
        newItemCategoryName: request.new_item_category_name,
        requestType: request.request_type,
      });
      this.snackBar = true;
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    rejectRequest(request) {
      console.log(request);
      this.$store.dispatch("categoryAndItemRequestStatus", {
        id: request.id,
        status: "Rejected",
      });
      this.snackBar = true;

      setTimeout(() => {
        location.reload();
      }, 3000);
    },
  },
  computed: {
    categoryAndItemRequests() {
      return this.$store.state.Home.categoryAndItemRequests;
    },
    categoryRequestMessage() {
      return this.$store.state.Home.categoryRequestMessage;
    },
  },
  components: { supplier },
};
</script>
<style scoped>
.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0.12) !important;
}
.divider {
  width: 80%;
  height: 1px;
  margin: 10px auto;
  background: #434343;
  border-bottom: 1px solid black;
}
</style>