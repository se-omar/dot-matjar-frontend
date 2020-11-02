<template>
  <v-app id="app">
    <ToolBar></ToolBar>
    <cartTable></cartTable>
    <router-view class="grey lighten-4" />
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
  created() {
    this.$vuetify.rtl = this.$i18n.locale == "ar" ? true : false;
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
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");

.padding-0 {
  padding-right: 0;
  padding-left: 0;
}
* {
  font-family: "Markazi Text", serif;
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
  font-size: 15px;
}
</style>
