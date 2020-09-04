<template>
  <v-app>
    <ToolBar></ToolBar>
    <router-view />
    <!-- <link
      href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css"
      rel="stylesheet"
    /> -->
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css">

    <Footer></Footer>
  </v-app>
</template>

<script>
import ToolBar from './components/toolbar'
import Footer from './components/footer'
export default {
  name: "App",
  components: {ToolBar,Footer},
  data: () => ({
    
  }),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
 
};
</script>
