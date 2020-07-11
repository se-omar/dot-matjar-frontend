<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <p class="display-1">update password page</p>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            label="كلمة السر"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min,rules.valid]"
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
            label="تاكيد كلمة السر "
            v-model="repeatPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, passwordMatch]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="5">
          <v-btn @click="updatePassword" class="primary" block>تجديد كلمة السر</v-btn>
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
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 7) || "Min 7 characters",
        valid: v =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            v
          ) ||
          "password must have at least one letter, one number and one special character"
      }
    };
  },

  computed: {
    passwordMatch() {
      return () =>
        this.password === this.repeatPassword || "Password must match";
    }
  },

  methods: {
    updatePassword() {
      var self = this;
      var route =
        "http://localhost:3000/api/sendResetPassword/" +
        this.$route.params.hash;
      this.$axios
        .post(route, {
          password: this.password
        })
        .then(response => {
          alert(response.data);
          if (response.data === "password updated successfully") {
            self.$router.push("/reglogin");
          }
        });
    }
  }
};
</script>