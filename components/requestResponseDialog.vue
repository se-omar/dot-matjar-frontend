<template>
  <v-app>
    <v-dialog persistent max-width="700" v-model="responseDialog">
      <v-card>
        <v-card-title>الرد علي الطلب</v-card-title>
        <v-textarea class="mr-13" style="width: 85%" outlined></v-textarea>
        <v-btn @click="toggleResponse" class="mb-5 mr-13 ml-5">اغلاق</v-btn>
        <v-btn class="mb-5 primary">ارسال</v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  computed: {
    responseDialog() {
      return this.$store.state.responseDialog;
    },
  },

  methods: {
    toggleResponse() {
      this.$store.commit("toggleResponse");
    },
  },
};
</script>
