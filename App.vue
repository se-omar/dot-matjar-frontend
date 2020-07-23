<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  }
};
</script>
