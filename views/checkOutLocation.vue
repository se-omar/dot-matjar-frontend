<template>
  <div>
    <v-app>
      <v-form v-model="valid">
        <v-container>
          <v-row justify="center">
            <p>{{ $t("checkoutLocation.productsDelivered") }}</p>
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
                class="arabic"
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
                class="arabic"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="12">
              <v-textarea
                outlined
                color="teal"
                :placeholder="$t('checkoutLocation.address')"
                v-model="address"
                class="arabic"
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

              <!-- <v-snackbar
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
                    ><span>{{ $t("checkoutLocation.close") }}</span></v-btn
                  >
                </template>
              </v-snackbar> -->
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
          <v-snackbar timeout="5000" v-model="snackbar">
            <v-row justify="center">
              <p v-if="orderMessage" style="font-size: 20px">
                {{ orderMessage }}
              </p>
              <p v-else style="font-size: 20px">
                Something went wrong , try again.
              </p>
            </v-row>
          </v-snackbar>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
// import { loadStripe } from "@stripe/stripe-js";

export default {
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    this.$store.dispatch("getGovernorate");
    this.address = this.currentUser.address;

    this.governorate = this.currentUser.governorate;
    await this.$store.dispatch("getRegions", this.governorate);
    this.region = this.currentUser.region;
  },

  data: () => ({
    region: "",
    governorate: "",
    valid: false,
    address: "",

    governorates: [],
    quantityArray: [],
    rules: [(v) => !!v || "Required"],
    snackbar: false,

    vertical: true,
  }),

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    cartItems() {
      return this.$store.state.Cart.cartItems;
    },

    regions() {
      return this.$store.state.Home.regions;
    },
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },
    orderMessage() {
      return this.$store.state.Orders.orderMessage;
    },
  },

  methods: {
    getSession() {
      var self = this;
      self.quantityArray = [];
      this.cartItems.forEach((element) => {
        self.quantityArray.push(element.quantity);
      });
    },

    getCountryRegions() {
      this.$store.dispatch("getRegions", this.governorate);
    },
    async createOrder() {
      await this.$store.dispatch("createOrder", {
        governorate: this.governorate,
        region: this.region,
        address: this.address,
      });

      await this.$store.dispatch("cleanCart");

      this.snackbar = true;
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
  },
};
</script>
<style scoped>
div {
  font-size: 17px;
}
</style>