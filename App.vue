<template>
  <v-app>
    <router-view />
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">

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
