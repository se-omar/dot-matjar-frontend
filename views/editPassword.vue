<template>
  <v-app>
    
    <v-container v-if="currentUser">
      <v-row justify="center">
        <p class="display-1">Change password</p>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            label="Current password"
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
            label=" New password"
            v-model="newPassword"
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
            label=" Confirm password"
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
          <v-btn @click="updatePassword" class="primary" block>Update password</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row justify="center">
        <p class="display-1">Cureent page cant be loaded</p>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "update-forgotten-password",
  components: {  
  },
  data() {
    return {
      password: "",
      newPassword: "",
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
        this.newPassword === this.repeatPassword || "Password must match";
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },

  methods: {
    updatePassword() {
      var self = this;
      var route = "http://localhost:3000/api/updatePassword";

      if (this.currentUser.password !== this.password) {
        alert("كلمة السر الحالية غير صحيحة");
        return;
      }

      if (this.newPassword === this.password) {
        alert(" كلمة السر الجديدة لا يمكن ان تساوي كلمة السر الحالية ");
        return;
      }
      this.$axios
        .post(route, {
          email: self.currentUser.email,
          password: self.password,
          newPassword: self.newPassword
        })
        .then(response => {
          alert(response.data);
          if (response.data === "password updated successfully") {
            self.$router.push("/");
          }
        });
    }
  }
};
</script>