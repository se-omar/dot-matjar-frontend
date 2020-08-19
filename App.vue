<template>
  <v-app>
    <router-view />
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
