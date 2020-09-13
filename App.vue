<template>
  <v-app>
    <ToolBar></ToolBar>
    <cartTable></cartTable>
    <router-view class="grey lighten-4" />
    <!-- <link
      href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css"
      rel="stylesheet"
    />-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" />

    <Footer></Footer>
  </v-app>
</template>

<script>
import ToolBar from "./components/toolbar";
import Footer from "./components/footer";
import cartTable from "./components/cartTable";
export default {
  name: "App",
  components: { ToolBar, Footer, cartTable },
  data: () => ({}),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>
