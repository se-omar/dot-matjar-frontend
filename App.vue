<template>
  <v-app>
    <router-view />
    <link
      href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css"
      rel="stylesheet"
    />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    pageColor: "yellow",
  }),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
 
};
</script>
