
<template>
  <v-app id="app">
    <ToolBar :imageKey="imageKey"></ToolBar>
    <cartTable></cartTable>
    <router-view class="grey lighten-3" />
    <!-- <link
      href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css"
      rel="stylesheet"
    />-->
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
    />

    <Footer></Footer>
  </v-app>
</template>

<script>
// import ToolBar from "./components/toolbar";
// import Footer from "./components/footer";
// import cartTable from "./components/cartTable";

export default {
  name: "App",

  async created() {
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }

    this.$vuetify.rtl = this.$i18n.locale == "ar" ? true : false;
    if (!localStorage.getItem("language"))
      localStorage.setItem("language", this.$i18n.locale);

    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch("getCurrencies");
  },
  components: {
    ToolBar: () => import("./components/toolbar"),
    Footer: () => import("./components/footer"),
    cartTable: () => import("./components/cartTable"),
  },
  data: () => ({}),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    imageKey() {
      var x = 0;
      return x++;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Vesper+Libre:wght@500&display=swap");

.padding-0 {
  padding-right: 0;
  padding-left: 0;
}
* {
  /* font-family: "Markazi Text", serif; */
  /* font-family: "Vesper Libre", serif; */
  font-family: "Tajawal", sans-serif;
}
.arabic {
  font-size: 50px;
}
span {
  font-size: 17px;
}
p {
  font-size: 25px;
}
.smallerText {
  font-size: 12px;
}
</style>
