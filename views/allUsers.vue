<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            :placeholder="$t('allUsers.searchUserByName')"
            outlined
            rounded
            v-model="searchUserByName"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn rounded :color="siteColor.button_color"
            ><span :style="`color:${siteColor.button_text_color}`">{{
              $t("allUsers.search")
            }}</span></v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="mb-15 ml-6 mr-6"
          v-for="user in allUsers"
          :key="user.user_id"
          lg="2"
          md="4"
          sm="6"
          cols="6"
        >
          <supplier :supplier="user"></supplier>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-btn rounded :color="siteColor.button_color" @click="loadmore"
        ><span :style="`color:${siteColor.button_text_color}`">{{
          $t("allUsers.loadmore")
        }}</span></v-btn
      >
    </v-row>
  </v-app>
</template>



<script>
export default {
  data: () => ({
    searchUserByName: "",
  }),
  methods: {
    loadmore() {
      this.$store.dispatch("getAllUsers");
    },
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    allUsers() {
      return this.$store.state.Home.allUsers;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
        };
      }
    },
  },
  components: {
    supplier: () => import("../components/supplier"),
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
  font-size: 25px;
}
</style>