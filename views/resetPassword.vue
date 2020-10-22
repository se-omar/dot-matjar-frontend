<template>
  <v-app>
    <v-container mt-16>
      <v-row justify="center">
        <p class="display-1">{{ $t("resetPassword.forgotPassword") }}</p>
      </v-row>
      <br />
      <v-row justify="center">
        <p>{{ $t("resetPassword.enterEmail") }}</p>
      </v-row>
      <v-row justify="center">
        <v-col cols="7">
          <v-text-field
            :rules="emailRules"
            required
            v-model="email"
            :placeholder="$t('resetPassword.email')"
            class="arabic"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="3">
          <v-btn
            @click="validateResetPassword"
            :color="siteColor.button_color"
            dense
            block
          >
            <span :style="`color:${siteColor.button_text_color}`">{{
              $t("resetPassword.send")
            }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- all other page content -->
  </v-app>
</template>

<script>
//import updatePassword from "./updatePassword";

export default {
  name: "reset-password",
  components: {},
  data() {
    return {
      email: "",
      nationalNumber: "",
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validateResetPassword() {
      var self = this;
      this.$axios
        .post("http://localhost:3000/api/resetPassword", {
          email: this.email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data != "authentication succesfull") {
            alert(response.data);
          } else {
            this.$axios
              .post("http://localhost:3000/api/sendResetPassword", {
                email: this.email,
              })
              .then((response) => {
                console.log(response.data);
                console.log("ALL ROUTES", self.$router.options.routes);
                self.$router.push(`/${self.$i18n.locale}/resetPasswordSent`);
              });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  computed: {
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
};
</script>

<style scoped>
#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem;
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height: 2.5rem;            */
}
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
</style>