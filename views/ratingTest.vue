<template>
  <v-app>
    <p class="display-1">star rating test</p>
    <v-rating v-model="rating" :length="length" :hover="hover" :size="size" :color="siteColor"></v-rating>
    <v-text-field outlined v-model="textReview"></v-text-field>
    <v-btn @click="submitReview" class="primary">submit</v-btn>
  </v-app>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    console.log(this.siteColor);
  },
  data() {
    return {
      hover: true,
      length: 5,
      rating: 1,
      size: 64,
      textReview: "",
    };
  },

  computed: {
    siteColor() {
      return this.$store.state.siteColor;
    },

    currentUser() {
      return this.$store.state.currentUser;
    },
  },

  methods: {
    submitReview() {
      this.$axios
        .post("http://localhost:3000/api/reviewProduct", {
          product_id: localStorage.getItem("currentProduct").product_id,
          user_id: this.currentUser.user_id,
          rating: this.rating,
          review: this.textReview,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>