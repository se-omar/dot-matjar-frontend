<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <p class="display-1">هل نسيت كلمة المرور</p>
      </v-row>
      <br />
      <v-row justify="center">
        <p style="font-size: 30px;">ادخال البريد الالكتروني و الرقم القومي لاعادة تعيين كلمة المرور</p>
      </v-row>
      <v-row justify="center">
        <v-col cols="7">
          <v-text-field :rules="emailRules" required v-model="email" label="البريد الالكتروني"></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field type="number" v-model="nationalNumber" required label="الرقم القومي"></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="7">
          <v-btn @click="validateResetPassword" class="primary" dense block>
            <span style="font-size: 18">ارسال</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
//import updatePassword from "./updatePassword";
export default {
  name: "reset-password",
  data() {
    return {
      email: "",
      nationalNumber: "",
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    validateResetPassword() {
      var self = this;
      this.$axios
        .post("http://localhost:3000/api/resetPassword", {
          email: this.email,
          national_number: this.nationalNumber
        })
        .then(response => {
          console.log(response.data);
          if (response.data != "authentication succesfull") {
            alert(response.data);
          } else {
            this.$axios
              .post("http://localhost:3000/api/sendResetPassword", {
                email: this.email
              })
              .then(response => {
                console.log(response.data);
                console.log("ALL ROUTES", self.$router.options.routes);
                self.$router.push("/resetPasswordSent");
              });
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>