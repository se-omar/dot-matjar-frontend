<template>
  <div>
    <v-app>
      <v-form v-model="valid">
        <v-container>
          <v-row justify="center" class="mt-16">
            <h1>{{ $t("checkoutLocation.productsDelivered") }}</h1>
          </v-row>
          <v-row>
            <v-col lg="6" sm="6">
              <v-select
                :rules="rules"
                :items="egyptGovernorates"
                :placeholder="$t('checkoutLocation.governorate')"
                dense
                outlined
                v-model="governorate"
                @change="getCountryRegions()"
              ></v-select>
            </v-col>
            <v-col lg="6" sm="6">
              <v-select
                :rules="rules"
                :items="regions"
                :placeholder="$t('checkoutLocation.region')"
                dense
                outlined
                v-model="region"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="12">
              <v-textarea
                outlined
                color="teal"
                :label="$t('checkoutLocation.address')"
                v-model="address"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col lg="2">
              <v-btn
                :disabled="!valid"
                @click="createOrder"
                :color="siteColor.button_color"
                class="white--text"
                ><span :style="`color:${siteColor.button_text_color}`">{{
                  $t("checkoutLocation.payOnRecieving")
                }}</span></v-btn
              >

              <!-- =============== -->

              <v-snackbar
                v-model="snackbar"
                :vertical="vertical"
                :color="siteColor"
              >
                <span style="font-weight: bold; font-size: large">{{
                  text
                }}</span>

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="red white--text"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >{{ $t("checkoutLocation.close") }}</v-btn
                  >
                </template>
              </v-snackbar>
              <!-- ====================== -->
            </v-col>
            <v-col lg="2">
              <v-btn
                :disabled="!valid"
                :color="siteColor.button_color"
                class="white--text"
                @click="getSession"
                ><span :style="siteColor.button_text_color">{{
                  $t("checkoutLocation.visa")
                }}</span></v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
// import { loadStripe } from "@stripe/stripe-js";

export default {
  components: {},
  data: () => ({
    region: "",
    governorate: "",
    valid: true,
    address: "",

    governorates: [],
    quantityArray: [],
    rules: [(v) => !!v || "Required"],
    snackbar: false,
    text: this.$t("checkoutLocation.orderPlaced"),
    vertical: true,
  }),

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    items() {
      return this.$store.state.table;
    },

    regions() {
      return this.$store.state.Home.regions;
    },
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
        };
      }
    },
  },
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    this.$store.dispatch("getGovernorate");
    this.address = this.currentUser.address;
    console.log(this.currentUser.governorate);
    this.governorate = this.currentUser.governorate;
    await this.$store.dispatch("getRegions", this.governorate);
    this.region = this.currentUser.region;

    var d = new Date();
    console.log("d is", d);
  },
  methods: {
    getSession() {
      var self = this;
      self.quantityArray = [];
      this.items.forEach((element) => {
        self.quantityArray.push(element.quantity);
      });
      console.log(self.quantityArray);
      // loadStripe(
      //   "pk_test_51H97oICdSDXTIUwz70svxkIu08QM3jR0rB6E2njyq3fC7tLOODIipB8ppdjdPt32pteM8zHqsSF2mAo9Oyfw9Mvf00L3omXjql"
      // ).then((stripe) => {
      //   var sessionId = "";
      //   this.$axios
      //     .post("http://localhost:3000/api/checkout", {
      //       user_id: this.currentUser.user_id,
      //       quantityArray: self.quantityArray,
      //     })
      //     .then((response) => {
      //       console.log(self.quantityArray);
      //       sessionId = response.data.session_id;
      //       this.$store.commit("setPaymentToken", response.data.token);
      //       this.$store.commit("putTotalPriceInStore", self.total);
      //       this.$store.commit("putQuantityInStore", self.quantityArray);
      //     })
      //     .then(() => {
      //       stripe
      //         .redirectToCheckout({
      //           sessionId: sessionId,
      //         })
      //         .then(function (result) {
      //           console.log(result);
      //         });
      //     });
      // });
    },
    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    createOrder() {
      console.log("data che k", this.governorate, this.region, this.address);
      this.$store.dispatch("createOrder", {
        governorate: this.governorate,
        region: this.region,
        address: this.address,
      });
      console.log(this.$store.state.totalPrice);
      this.snackbar = true;
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
  },
};
</script>