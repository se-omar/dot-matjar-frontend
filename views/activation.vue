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
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 19px;
}
.smallerText {
  font-size: 15px;
}
</style>