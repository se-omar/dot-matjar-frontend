<template>
  <div id="app">
    <v-app>
      <v-container class="mt-16" v-if="!currentUser" style="width: 60%">
        <div>
          <v-tabs v-model="tab" show-arrows icons-and-text grow>
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div
                :style="`color:${siteColor.toolbar_text_color}`"
                class="caption py-1"
              >
                <span> {{ i.name }}</span>
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
                          :placeholder="$t('registerLogin.email')"
                          required
                          class="arabic"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          :placeholder="$t('registerLogin.password')"
                          :hint="$t('registerLogin.minCharacters')"
                          counter
                          class="arabic"
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
                          ><span
                            :style="`color:${siteColor.button_text_color}`"
                            >{{ $t("registerLogin.login") }}</span
                          ></v-btn
                        >
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="12" xsm="12">
                        <v-btn
                          @click="
                            $router.push(`/${$i18n.locale}/resetPassword`)
                          "
                          text
                          ><span
                            :style="`color:${siteColor.button_text_color}`"
                            >{{ $t("registerLogin.forgotPassword") }}</span
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
                  <v-form
                    ref="registerForm"
                    v-model="signUpValidation"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="6" sm="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          :label="$t('registerLogin.email')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="fullArabicName"
                          :rules="[rules.required]"
                          :label="$t('registerLogin.fullName')"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="mobileNumber"
                          :rules="[rules.mobilenumber]"
                          :label="$t('registerLogin.mobileNumber')"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="governorates"
                          :placeholder="$t('registerLogin.governorate')"
                          dense
                          outlined
                          v-model="governorate"
                          @change="getCountryRegions()"
                        ></v-select>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="regions"
                          :placeholder="$t('registerLogin.region')"
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
                          :label="$t('registerLogin.password')"
                          :hint="$t('registerLogin.minCharacters')"
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
                          :label="$t('registerLogin.confirmPassword')"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12">
                        <v-checkbox v-model="checkbox">
                          <!-- <div>
                            <span v-html="$t('registerLogin.termsAndCond')"></span>
                          </div> -->
                        </v-checkbox>
                        <span v-html="$t('registerLogin.termsAndCond')"></span>
                      </v-col>

                      <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!signUpValidation || !checkbox"
                          id="btn"
                          :color="siteColor.button_color"
                          @click="validateSignup"
                          ><span
                            :style="`color:${siteColor.button_text_color}`"
                            >{{ $t("registerLogin.signup") }}</span
                          ></v-btn
                        >
                        <v-btn
                          x-large
                          block
                          :disabled="!signUpValidation || !checkbox"
                          class="red darken-4 white--text"
                          @click="$router.push('/')"
                          >{{ $t("registerLogin.cancel") }}</v-btn
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
                          :label="$t('registerLogin.email')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="businessOwnerFullArabicName"
                          :rules="[rules.required]"
                          :label="$t('registerLogin.fullName')"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="12" md="6">
                        <v-text-field
                          v-model="businessOwnerMobileNumber"
                          :rules="[rules.mobilenumber]"
                          :label="$t('registerLogin.mobileNumber')"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="governorates"
                          :placeholder="$t('registerLogin.governorate')"
                          dense
                          outlined
                          v-model="governorate"
                          @change="getCountryRegions()"
                        ></v-select>
                      </v-col>

                      <v-col cols="6" sm="12" md="6">
                        <v-select
                          :items="regions"
                          :placeholder="$t('registerLogin.region')"
                          dense
                          outlined
                          v-model="region"
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          outlined
                          :label="$t('registerLogin.storeName')"
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
                          :label="$t('registerLogin.password')"
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
                          :label="$t('registerLogin.confirmPassword')"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12">
                        <v-checkbox v-model="checkbox"> </v-checkbox>
                        <span v-html="$t('registerLogin.termsAndCond')"></span>
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
                          ><span
                            :style="`color:${siteColor.button_text_color}`"
                            >{{ $t("registerLogin.registerBusiOwner") }}</span
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
                          >{{ $t("registerLogin.cancel") }}</v-btn
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
          <p class="display-1">{{ $t("registerLogin.alreadyLogged") }}</p>
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
        return this.$store.state.Home.siteColor;
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
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
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
        siteLanguage: this.siteLanguage,
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

  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: this.$t("registerLogin.login"), icon: "mdi-account" },
        {
          name: this.$t("registerLogin.register"),
          icon: "mdi-account-outline",
        },
        { name: this.$t("registerLogin.registerBusiOwner") },
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
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/.test(v) ||
          "password must have at least one letter, one number and one Upper case Letter",
        national: (v) => /\d+/.test(v) || "ID must be numbers only",
        must: (v) => (v && v.length == 14) || "ID must be 14 NUMBERS",
        mobilenumber: (v) => /\d+/.test(v) || "Enter numbers",
      },
      checkbox: false,
      governorate: "",
      region: "",

      BusinessOwnerDialog: false,
      businessOwnerValidation: false,
      signUpValidation: false,
    };
  },

  components: {
    // facebookLogin
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
.smallerText {
  font-size: 20px;
}
h2 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
h3 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
#app {
  background-color: white;
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
</style>
