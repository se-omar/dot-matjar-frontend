<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <p class="display-1">
          {{ $t("updateForgottenPassword.updatePasswordPage") }}
        </p>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            :placeholder="$t('updateForgottenPassword.password')"
            v-model="password"
            class="arabic"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.valid]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 7 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            :placeholder="$t('updateForgottenPassword.confirmPassword')"
            v-model="repeatPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, passwordMatch]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
            class="arabic"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="5">
          <v-btn @click="updatePassword" :color="siteColor.button_color" block>
            <span :style="`color:${siteColor.button_text_color}`">{{
              $t("updateForgottenPassword.updatePassword")
            }}</span></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "update-forgotten-password",
  data() {
    return {
      password: "",
      repeatPassword: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 7) || "Min 7 characters",
        valid: (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) ||
          "password must have at least one letter, one number and one special character",
      },
    };
  },

  computed: {
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    passwordMatch() {
      return () =>
        this.password === this.repeatPassword || "Password must match";
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
  },

  methods: {
    updatePassword() {
      var self = this;
      var route =
        this.nodeHost + "/api/sendResetPassword/" + this.$route.params.hash;
      this.$axios
        .post(route, {
          password: this.password,
        })
        .then((response) => {
          alert(response.data);
          if (response.data === "password updated successfully") {
            self.$router.push(`/${self.$i18n.locale}/reglogin`);
          }
        });
    },
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
</style>