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
h2 {
  font-size: 25px;
}
h3 {
  font-size: 25px;
}
</style>