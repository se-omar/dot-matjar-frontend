
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
        .post(this.nodeHost + "/api/resetPassword", {
          email: this.email,
        })
        .then((response) => {
          if (response.data != "authentication succesfull") {
            alert(response.data);
          } else {
            this.$axios
              .post(this.nodeHost + "/api/sendResetPassword", {
                email: this.email,
              })
              // eslint-disable-next-line no-unused-vars
              .then((response) => {
                self.$router.push(`/${self.$i18n.locale}/resetPasswordSent`);
              });
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {});
    },
  },
  computed: {
    nodeHost() {
      return this.$store.state.nodeHost;
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

h2 {
  font-size: 25px;
}
h3 {
  font-size: 25px;
}
</style>