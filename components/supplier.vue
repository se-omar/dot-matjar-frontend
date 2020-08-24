<template>
  <v-main>
    <v-card height="300" width="250" class="grey lighten-4">
      <v-img
        height="180"
        width="180"
        style="border-radius: 50%; display: block;
  margin-left: auto;
  margin-right: auto;"
        :src="supplier.profile_photo"
      ></v-img>
      <v-row justify="center">
        <v-card-title>{{supplier.full_arabic_name}}</v-card-title>
      </v-row>

      <v-card-text class="mt-n5" style="font-size: 16px">
        <v-icon class="mt-n1 mr-1">mdi-map-marker</v-icon>
        {{supplier.location}}
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
export default {
  created() {
    console.log(this.supplier);
  },

  props: {
    supplier: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    suppliers() {
      return this.$store.state.suppliers;
    },
  },
};
</script>