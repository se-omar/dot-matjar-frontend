<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <p class="display-1">update password page</p>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field label="كلمة السر" v-model="password"></v-text-field>
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
  name: "update-password",
  data() {
    return {
      password: ""
    };
  },

  methods: {
    updatePassword() {
      //var self = this;
      var route =
        "http://localhost:3000/api/sendResetPassword/" +
        this.$route.params.hash;
      console.log(route);
      this.$axios
        .post(route, {
          password: this.password
        })
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>