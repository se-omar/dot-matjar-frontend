<template>
  <div id="app">
    <v-app>
      <v-container style="width: 60%">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="deep-purple accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
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
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validateLogin"
                        >
                          Login
                        </v-btn>
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
                      <v-col cols="6">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="البريد الالكتروني"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          v-model="nationalNumber"
                          :rules="[rules.national, rules.must]"
                          label="الرقم القومي"
                          maxlength="14"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          v-model="fullArabicName"
                          :rules="[rules.required]"
                          label="الاسم بلكامل عربي"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          v-model="mobileNumber"
                          :rules="[rules.mobilenumber]"
                          label="الموبايل"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>

                      <!-- National NUMBER  -->

                      <v-col cols="6">
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min, rules.valid]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="كلمه المرور"
                          hint="At least 7 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="تاكيد كلمه المرور"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12">
                        <v-checkbox v-model="checkbox">
                          <template v-slot:label>
                            <div>
                              لقد قرات و وافقت علي
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <a
                                    href="http://vuetifyjs.com"
                                    @click.stop
                                    v-on="on"
                                  >
                                    سياسه التسجيل
                                  </a>
                                </template>
                                Opens in new window
                              </v-tooltip>
                            </div>
                          </template>
                        </v-checkbox>
                      </v-col>

                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!valid || !checkbox"
                          id="btn"
                          color="success"
                          @click="validateSignup"
                          >تسجيل</v-btn
                        >
                        <v-btn
                          x-large
                          block
                          :disabled="!valid || !checkbox"
                          color="success"
                          @click="$router.push('/')"
                          >الغاء</v-btn
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
    </v-app>
  </div>
</template>

<script>
//import usersModel from "../models/usersModel";
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
  },
  methods: {
    validateSignup() {
      alert("Please Verify your account , a message has been sent");
      var self = this;
      self.$store.dispatch("register", {
        email: this.email,
        password: this.password,
        full_arabic_name: this.fullArabicName,
        national_number: this.nationalNumber,
        mobile_number: this.mobileNumber,
      });
    },

    validateLogin() {
      var self = this;
      this.$axios
        .post("http://localhost:3000/api/login", {
          email: this.loginEmail,
          password: this.loginPassword,
        })
        .then((response) => {
          if (response.data.message !== "authentication successful") {
            alert(response.data.message);
          } else {
            self.$store.commit("setCurrentUser", response.data.data);
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
  }),
};
</script>
<style scoped>
#app {
  background-color: white;
}
</style>
