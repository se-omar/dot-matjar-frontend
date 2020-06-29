<template>
  <v-app>
    <v-form v-model="valid">
      <v-container class="container">
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>
        <br />
        <v-btn block :disabled="!valid" color="primary">Validate</v-btn>
        <br />
        <h4>
          don't have and account
          <a @click="$router.push('/sign-up')">Sign up</a>
        </h4>
      </v-container>
    </v-form>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      v => !!v || "password is required",
      v => v.length > 8 || "password must be more than 8"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>


<style>
.container {
  width: 70%;
}
</style>
