<template>
  <v-app>
    <tool-bar></tool-bar>
    <router-view />

    <!-- <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Sign-up</router-link> -->
  </v-app>
</template>

<script>
import ToolBar from "./components/toolbar.vue";
export default {
  name: "App",

  components: {
    ToolBar
  },

  data: () => ({
    //
  })
};
</script>
