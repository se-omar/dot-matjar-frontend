<template>
  <div id="app">
    <v-app>
      <v-container v-if="!currentUser" style="width: 60%">
        <div>
          <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
            <v-tabs-slider></v-tabs-slider>
            <v-tab class="red darken-4" v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
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
                          class="red darken-4 white--text"
                          @click="login"
                        >Login</v-btn>
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="12" xsm="12">
                        <v-btn
                          @click="$router.push('/resetPassword')"
                          text
                        >Do yo forget you Password ?</v-btn>
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
                        <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
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

                      <!-- register as a business owner  -->

                      <!-- <v-row justify="center">
                        <v-btn
                          color="primary"
                          class="ma-2"
                          dark
                          @click="BusinessOwnerDialog = true"
                        >Register as a Business Owner</v-btn>

                        <v-dialog
                          v-model="BusinessOwnerDialog"
                          fullscreen
                          hide-overlay
                          transition="dialog-bottom-transition"
                          scrollable
                        >
                          <v-card>
                            <v-row>
                              <v-toolbar flat dark color="primary">
                                <v-btn icon @click="BusinessOwnerDialog = false">
                                  <i class="fa fa-times-circle"></i>
                                </v-btn>
                                <v-toolbar-title>Settings</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                  <v-btn dark text @click="BusinessOwnerDialog = false">Save</v-btn>
                                </v-toolbar-items>
                              </v-toolbar>
                            </v-row>

                            <v-row justify="center">
                              <v-col cols="4">
                                <v-text-field
                                  v-model="fullArabicName"
                                  :rules="[rules.required]"
                                  label="Full Name"
                                  maxlength="20"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  v-model="mobileNumber"
                                  :rules="[rules.mobilenumber]"
                                  label="Mobile number"
                                  maxlength="11"
                                  required
                                ></v-text-field>
                              </v-col>

                              <v-col cols="4">
                                <v-select
                                  :items="governorates"
                                  placeholder="Governorate"
                                  dense
                                  outlined
                                  v-model="governorate"
                                  @change="getCountryRegions()"
                                ></v-select>
                              </v-col>

                              <v-col cols="4">
                                <v-select
                                  :items="regions"
                                  placeholder="Region"
                                  dense
                                  outlined
                                  v-model="region"
                                ></v-select>
                              </v-col>

                              <v-col cols="4">
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
                              <v-col cols="4">
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
                            </v-row>
                            <div style="flex: 1 1 auto;"></div>
                          </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialog2" max-width="500px">
                          <v-card>
                            <v-card-title>Dialog 2</v-card-title>
                            <v-card-text>
                              <v-btn color="primary" dark @click="dialog3 = !dialog3">Open Dialog 3</v-btn>
                              <v-select :items="select" label="A Select List" item-value="text"></v-select>
                            </v-card-text>
                            <v-card-actions>
                              <v-btn color="primary" text @click="dialog2 = false">Close</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialog3" max-width="500px">
                          <v-card>
                            <v-card-title>
                              <span>Dialog 3</span>
                              <v-spacer></v-spacer>
                              <v-menu bottom left>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                  </v-btn>
                                </template>
                                <v-list>
                                  <v-list-item
                                    v-for="(item, i) in items"
                                    :key="i"
                                    @click="() => {}"
                                  >
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-card-title>
                            <v-card-actions>
                              <v-btn color="primary" text @click="dialog3 = false">Close</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row>-->

                      <!-- register as a business owner  -->

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
                                  >terms and conditions</a>
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
                          class="red darken-4 white--text"
                          @click="validateSignup"
                        >Sign up</v-btn>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid || !checkbox"
                          class="red darken-4 white--text"
                          @click="$router.push('/')"
                        >Cancel</v-btn>
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
    <facebook-login class="button" appId="752933488821050"></facebook-login>
    <v-facebook-login app-id="752933488821050"></v-facebook-login>
  </div>
</template>

<script>
import facebookLogin from "facebook-login-vuejs";
// import VFacebookLogin from "vue-facebook-login-component";

export default {
  name: "reglogin",
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    row() {
      return this.$store.state.row;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    governorates() {
      return this.$store.state.governorates;
    },
    regions() {
      return this.$store.state.regions;
    },
    siteColor() {
      if (this.$store.state.siteColor) {
        return this.$store.state.siteColor;
      } else {
        return "red darken-4";
      }
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
  }),

  components: { facebookLogin },
};
</script>
<style scoped>
#app {
  background-color: white;
}
</style>
