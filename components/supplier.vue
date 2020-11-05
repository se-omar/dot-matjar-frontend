<template>
  <div>
    <v-card
      @click="supplierClicked(supplier)"
      :min-width="minWidth"
      class="grey lighten-5"
    >
      <v-img
        :height="$vuetify.breakpoint.smAndDown ? '100' : '140'"
        :width="$vuetify.breakpoint.smAndDown ? '100' : '140'"
        style="border-radius: 50%; margin-left: auto; margin-right: auto"
        :src="supplier && supplier.profile_photo ? supplier.profile_photo : ''"
      ></v-img>

      <v-row justify="center">
        <v-card-title v-if="supplier" class="arabic">{{
          supplier.full_arabic_name
        }}</v-card-title>
      </v-row>

      <v-card-text v-if="supplier" class="mt-n5 smallerText">
        <v-icon class="mt-n1 mr-1">mdi-map-marker</v-icon>
        {{ supplier.governorate }}, {{ supplier.region }}
      </v-card-text>

      <v-card-text
        v-if="supplier"
        class="mt-n5 smallerText"
        style="font-size: 16px"
        >{{ $t("supplier.totalSales") }} {{ supplier.total_sales }}</v-card-text
      >

      <v-card-text
        v-if="supplier && supplier.monthSales"
        class="mt-n5 smallerText"
        >{{ selectedMonth }} {{ $t("supplier.sales") }}
        {{ supplier.monthSales }}</v-card-text
      >

      <v-card-text
        v-if="supplier && supplier.yearSales"
        class="mt-n5 smallerText"
        >{{ selectedYear }} {{ $t("supplier.sales") }}:
        {{ supplier.yearSales }}</v-card-text
      >

      <v-card-text
        v-if="supplier && supplier.monthRevenue"
        class="mt-n5 smallerText"
        >{{ selectedMonth }} {{ $t("supplier.revenue") }}
        {{ supplier.monthRevenue }}</v-card-text
      >

      <v-card-text
        v-if="supplier && supplier.yearRevenue"
        class="mt-n5 smallerText"
        >{{ selectedYear }} {{ $t("supplier.revenue") }}:
        {{ supplier.yearRevenue }}</v-card-text
      >

      <v-card-text v-if="supplier">
        <v-rating
          v-model="supplier.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="20"
        ></v-rating>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
//import moment from "moment";
export default {
  async created() {
    await this.$store.dispatch(
      "calculateSupplierRating",
      this.supplier.user_id
    );
  },
  props: {
    supplier: {
      type: Object,
      default: () => null,
    },

    selectedMonth: {
      type: String,
    },
    selectedYear: {
      type: Number,
    },
    show_right_banner: {
      type: Number,
      default: () => {},
    },
    minWidth: {
      type: String,
      default: () => "110%",
    },
  },

  methods: {
    // moment() {
    //   return new moment();
    // },

    supplierClicked(supplier) {
      if (this.$route.name == "adminPage") {
        localStorage.setItem("clickedSupplier", JSON.stringify(supplier));
        this.$router.push(`/${this.$i18n.locale}/suppliersDashboard`);
      }
      if (this.$route.name == "allUsers") {
        this.$router.push(
          `/${this.$i18n.locale}/updateUserData/` + supplier.user_id
        );
      } else {
        this.$store.commit("supplierPage", supplier);
        this.$router.push(
          `/${this.$i18n.locale}/supplierPage/` + supplier.user_id
        );
      }
    },
  },
  computed: {
    suppliers() {
      return this.$store.state.Home.suppliers;
    },
    averageSupplierRating() {
      return this.$store.state.averageSupplierRating;
    },
  },
};
</script>
<style scoped>
</style>