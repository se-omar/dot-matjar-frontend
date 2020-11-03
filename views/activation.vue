<template>
  <div>
    <h1>welcome to ditmatjar</h1>
  </div>
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
    await this.$store.dispatch(
      "activateUserAccount",
      this.$route.params.cryptoo
    );
    this.$router.push(`/${this.$i18n.locale}/reglogin`);
  },
};
</script>

