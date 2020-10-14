<template>
  <div id="app">
    <v-app>
      <v-container class="mt-16" v-if="!currentUser" style="width: 60%">
        <div>
          <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              :color="siteColor.toolbar_color"
              v-for="i in tabs"
              :key="i.name"
            >
              <v-icon large>{{ i.icon }}</v-icon>
              <div
                :style="`color:${siteColor.toolbar_text_color}`"
                class="caption py-1"
              >
                {{ i.name }}
              </div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          :color="siteColor.button_color"
                          @click="login"
                          ><span :style="`color:${siteColor.button_text_color}`"
                            >Login</span
                          ></v-btn
                        >
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="12" xsm="12">
                        <v-btn
                          @click="
                            $router.push(`/${$i18n.locale}/resetPassword`)
                          "
                          text
                          ><span :style="`color:${siteColor.button_text_color}`"
                            >Do yo forget you Password ?</span
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="6" sm="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="fullArabicName"
                          :rules="[rules.required]"
                          label="Full Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="mobileNumber"
                          :rules="[rules.mobilenumber]"
                          label="Mobile number"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="governorates"
                          placeholder="Governorate"
                          dense
                          outlined
                          v-model="governorate"
                          @change="getCountryRegions()"
                        ></v-select>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="regions"
                          placeholder="Region"
                          dense
                          outlined
                          v-model="region"
                        ></v-select>
                      </v-col>

                      <v-col cols="6" sm="12">
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min, rules.valid]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 7 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirm you Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12">
                        <v-checkbox v-model="checkbox">
                          <template v-slot:label>
                            <div>
                              I have read the
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <a
                                    href="http://vuetifyjs.com"
                                    @click.stop
                                    v-on="on"
                                    >terms and conditions</a
                                  >
                                </template>
                                Opens in new window
                              </v-tooltip>
                            </div>
                          </template>
                        </v-checkbox>
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!valid || !checkbox"
                          id="btn"
                          :color="siteColor.button_color"
                          @click="validateSignup"
                          ><span :style="`color:${siteColor.button_text_color}`"
                            >Sign up</span
                          ></v-btn
                        >
                        <v-btn
                          x-large
                          block
                          :disabled="!valid || !checkbox"
                          class="red darken-4 white--text"
                          @click="$router.push('/')"
                          >Cancel</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- Busiiness owner register -->
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form
                    ref="businessOwnerregisterForm"
                    v-model="businessOwnerValidation"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="6" sm="12">
                        <v-text-field
                          v-model="businessOwnerEmail"
                          :rules="emailRules"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="businessOwnerFullArabicName"
                          :rules="[rules.required]"
                          label="Full Name"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="businessOwnerMobileNumber"
                          :rules="[rules.mobilenumber]"
                          label="Mobile number"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="governorates"
                          placeholder="Governorate"
                          dense
                          outlined
                          v-model="governorate"
                          @change="getCountryRegions()"
                        ></v-select>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="regions"
                          placeholder="Region"
                          dense
                          outlined
                          v-model="region"
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          outlined
                          label="Store Name"
                          v-model="storeName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12">
                        <v-text-field
                          v-model="businessOwnerPassword"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min, rules.valid]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 7 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12">
                        <v-text-field
                          block
                          v-model="businessOwnerVerifyPass"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, businessOwnerPasswordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirm you Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12">
                        <v-checkbox v-model="businessOwnerCheckbox">
                          <template v-slot:label>
                            <div>
                              I have read the
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <a
                                    href="http://vuetifyjs.com"
                                    @click.stop
                                    v-on="on"
                                    >terms and conditions</a
                                  >
                                </template>
                                Opens in new window
                              </v-tooltip>
                            </div>
                          </template>
                        </v-checkbox>
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="
                            !businessOwnerValidation || !businessOwnerCheckbox
                          "
                          id="btn"
                          :color="siteColor.button_color"
                          @click="businessOwnerRegistration"
                          ><span :style="`color:${siteColor.button_text_color}`"
                            >Register as a Business Owner</span
                          ></v-btn
                        >
                        <v-btn
                          x-large
                          block
                          :disabled="
                            !businessOwnerValidation || !businessOwnerCheckbox
                          "
                          class="red darken-4 white--text"
                          @click="$router.push('/')"
                          >Cancel</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-container>

      <v-container v-else>
        <v-row justify="center">
          <p class="display-1">You have already Login</p>
        </v-row>
      </v-container>
    </v-app>
    <!-- <facebook-login class="button" appId="752933488821050"></facebook-login>
    <v-facebook-login app-id="752933488821050"></v-facebook-login>-->
  </div>
</template>

<script>
// import facebookLogin from "facebook-login-vuejs";
// import VFacebookLogin from "vue-facebook-login-component";

export default {
  name: "reglogin",
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    governorates() {
      return this.$store.state.Home.governorates;
    },
    regions() {
      return this.$store.state.Home.regions;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
          footer_color: "white",
          footer_text_color: "black",
        };
      }
    },
    businessOwnerPasswordMatch() {
      return () =>
        this.businessOwnerPassword === this.businessOwnerVerifyPass ||
        "Password must match";
    },
  },
  created() {
    this.$store.dispatch("getGovernorate");
    console.log(this.siteColor);
  },
  methods: {
    validateSignup() {
      var self = this;
      self.$store.dispatch("register", {
        email: this.email,
        password: this.password,
        full_arabic_name: this.fullArabicName,
        national_number: this.nationalNumber,
        mobile_number: this.mobileNumber,
        governorate: this.governorate,
        region: this.region,
      });
    },
    async businessOwnerRegistration() {
      await this.$store.dispatch("businessOwnerRegistration", {
        email: this.businessOwnerEmail,
        password: this.businessOwnerPassword,
        full_arabic_name: this.businessOwnerFullArabicName,
        mobile_number: this.businessOwnerMobileNumber,
        governorate: this.governorate,
        region: this.region,
        store_name: this.storeName,
      });
    },
    async login() {
      await this.$store.dispatch("login", {
        email: this.loginEmail,
        password: this.loginPassword,
      });

      await this.$store.dispatch("refreshCurrentUser");
      console.log(this.currentUser);
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    changeRoute() {
      document.getElementById("btn").disapled();
    },
    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email" },
        (userInformation) => {
          console.warn("get data from facebook", userInformation);
          this.presonalId = userInformation.id;
          this.facbookEmail = userInformation.email;
          this.name = userInformation.name;
          console.log("user info", userInformation);
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
  },

  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
      { name: "Register as a Business owner" },
    ],
    valid: true,

    fullArabicName: "",
    email: "",
    nationalNumber: "",
    password: "",
    verify: "",
    mobileNumber: "",
    loginPassword: "",
    loginEmail: "",
    businessOwnerFullArabicName: "",
    businessOwnerEmail: "",
    businessOwnerPassword: "",
    businessOwnerCheckbox: false,
    businessOwnerMobileNumber: "",
    bussinessOwnerCompany: "",
    storeName: "",
    businessOwnerVerifyPass: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 7) || "Min 7 characters",
      valid: (v) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          v
        ) ||
        "password must have at least one letter, one number and one special character",
      national: (v) => /\d+/.test(v) || "ID must be numbers only",
      must: (v) => (v && v.length == 14) || "ID must be 14 NUMBERS",
      mobilenumber: (v) => /\d+/.test(v) || "Enter numbers",
    },
    checkbox: false,
    governorate: "",
    region: "",
    // name: "",
    // FB: undefined,
    // facebookEmail: "",
    // isConnected: false,
    BusinessOwnerDialog: false,
    businessOwnerValidation: true,
  }),

  components: {
    // facebookLogin
  },
};
</script>
<style scoped>
#app {
  background-color: white;
}
</style>
