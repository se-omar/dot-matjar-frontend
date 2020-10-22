<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <v-img
            contain
            max-width="500"
            max-height="200"
            src="../assets/email-icon.png"
          ></v-img>
        </v-col>
      </v-row>

      <v-row justify="center">
        <p class="display-1">{{ $t("resetPasswordSent.messageSent") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col cols="5">
          <v-btn block @click="$router.push('/')" class="primary">
            <span>{{ $t("resetPasswordSent.backHome") }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
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
h2 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
h3 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
</style>