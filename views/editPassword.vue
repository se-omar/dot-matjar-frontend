<template>
  <v-app>
    <v-container v-if="currentUser">
      <v-row justify="center">
        <p class="display-1">{{ $t("editPassword.changePassword") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            :placeholder="$t('editPassword.currentPassword')"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.valid]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            :hint="$t('editPassword.minCharacters')"
            counter
            @click:append="show1 = !show1"
            class="arabic"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            :placeholder="$t('editPassword.newPassword')"
            v-model="newPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.valid]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            :hint="$t('editPassword.minCharacters')"
            counter
            @click:append="show1 = !show1"
            class="arabic"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            :placeholder="$t('editPassword.confirmPassword')"
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
        <v-col cols="2" lg="2">
          <v-btn
            rounded
            @click="updatePassword"
            :color="siteColor.button_color"
            class="white--text"
            block
          >
            <span :style="`color:${siteColor.button_text_color} `"
              >{{ $t("editPassword.updatePassword") }}
            </span></v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row justify="center">
        <p class="display-1">{{ $t("editPassword.cantLoad") }}</p>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "update-forgotten-password",
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
  },

  components: {},
  data() {
    return {
      password: "",
      newPassword: "",
      repeatPassword: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) =>
          (v && v.length >= 7) || this.$t("editPassword.minCharacters"),
        valid: (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) || this.$t("editPassword.passwordReq"),
      },
    };
  },

  computed: {
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    passwordMatch() {
      return () =>
        this.newPassword === this.repeatPassword || "Password must match";
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
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
  },

  methods: {
    updatePassword() {
      var self = this;
      var route = this.nodeHost + "/api/updatePassword";
      if (this.currentUser.password !== this.password) {
        alert(this.$t("editPassword.incorrectCurrentPassword"));
        return;
      }

      if (this.newPassword === this.password) {
        alert(this.$t("editPassword.newEqualOld"));
        return;
      }
      this.$axios
        .post(route, {
          email: self.currentUser.email,
          password: self.password,
          newPassword: self.newPassword,
        })
        .then((response) => {
          alert(response.data);
          if (response.data === "password updated successfully") {
            self.$router.push("/");
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
div {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
</style>