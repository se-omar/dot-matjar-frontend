<template>
  <v-main>
    <v-card width="250" class="grey lighten-4">
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
        {{supplier.governorate}}, {{supplier.region}}
      </v-card-text>

      <v-card-text class="mt-n5" style="font-size: 16px">total sales: {{supplier.total_sales}}</v-card-text>

      <v-card-text
        v-if="supplier.monthSales"
        style="font-size: 16px"
        class="mt-n5"
      >{{moment().subtract(1, 'month').format('MMMM')}} sales: {{supplier.monthSales}}</v-card-text>

      <v-card-text
        v-if="supplier.monthRevenue"
        style="font-size: 16px"
        class="mt-n5"
      >{{moment().subtract(1, 'month').format('MMMM')}} Revenue: {{supplier.monthRevenue}}</v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import moment from "moment";
export default {
  props: {
    supplier: {
      type: Object,
      default: () => null,
    },
  },

  methods: {
    moment() {
      return new moment();
    },
  },
  computed: {
    suppliers() {
      return this.$store.state.suppliers;
    },
  },
};
</script>