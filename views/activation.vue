<template>
  <div></div>
</template>

<script>
export default {
  name: "activation",
  data: () => ({
    snackbar: false,
    timeout: 3000,
  }),
  methods: {},
  async created() {
    await this.$store.dispatch("getSiteColor");
    console.log(this.$route.params.cryptoo);
    this.$store.dispatch("activateUserAccount", this.$route.params.cryptoo);
  },
};
</script>

<style scoped>
</style>