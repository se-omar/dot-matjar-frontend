<template>
  <v-app>
    <ToolBar></ToolBar>
    <CartTable class="grey lighten-4"></CartTable>
    <router-view />

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" />

    <Footer></Footer>
  </v-app>
</template>

<script>
import ToolBar from "./components/toolbar";
import Footer from "./components/footer";
import CartTable from "./components/cartTable";
export default {
  name: "App",
  components: { ToolBar, Footer, CartTable },
  data: () => ({}),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>
