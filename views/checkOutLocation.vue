<template>
  <div>
    <v-app>
      <toolbar></toolbar>
      <v-form>
        <v-container>
          <v-row justify="center" class="mt-16">
            <h1>Products will be delivered to this location</h1>
          </v-row>

          <v-row>
            <v-col lg="6" sm="6">
              <v-text-field dense outlined v-model="governorate" label="Governorate" disabled></v-text-field>
            </v-col>
            <v-col lg="6" sm="6">
              <v-text-field dense outlined v-model="region" label="Region" disabled></v-text-field>
            </v-col>
            <v-col cols="12" lg="12">
              <v-textarea outlined color="teal" label="Address" v-model="address"></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col lg="2">
              <v-btn color="red darken-4" class="white--text" @click="getSession">Proceed</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-app>
    <Footer></Footer>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

import toolbar from "../components/toolbar";
import Footer from "../components/footer";
export default {
  components: {
    toolbar,
    Footer,
  },
  data: () => ({
    governorate: "",
    region: "",
    address: "",
    regions: [],
    governorates: [],
    quantityArray: [],
  }),

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    items() {
      return this.$store.state.table;
    },
  },
  created() {
    this.governorate = this.currentUser.governorate;
    this.region = this.currentUser.region;
    this.address = this.currentUser.address;
    console.log(this.currentUser.governorate);
  },
  methods: {
    getSession() {
      var self = this;
      self.quantityArray = [];
      this.items.forEach((element) => {
        self.quantityArray.push(element.quantity);
      });
      console.log(self.quantityArray);
      loadStripe(
        "pk_test_51H97oICdSDXTIUwz70svxkIu08QM3jR0rB6E2njyq3fC7tLOODIipB8ppdjdPt32pteM8zHqsSF2mAo9Oyfw9Mvf00L3omXjql"
      ).then((stripe) => {
        var sessionId = "";
        this.$axios
          .post("http://localhost:3000/api/checkout", {
            user_id: this.currentUser.user_id,
            quantityArray: self.quantityArray,
          })
          .then((response) => {
            console.log(self.quantityArray);
            sessionId = response.data.session_id;
            this.$store.commit("setPaymentToken", response.data.token);
            this.$store.commit("putTotalPriceInStore", self.total);
            this.$store.commit("putQuantityInStore", self.quantityArray);
          })
          .then(() => {
            stripe
              .redirectToCheckout({
                sessionId: sessionId,
              })
              .then(function (result) {
                console.log(result);
              });
          });
      });
    },
  },
};
</script>