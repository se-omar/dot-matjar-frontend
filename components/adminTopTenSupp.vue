<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <p class="display-1 mt-8">{{ $t("adminPage.top10Suppliers") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col
          class="ms-3"
          v-for="(sortedSupplier, index) in suppliersSortedBySales.slice(0, 10)"
          :key="index"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier :supplier="sortedSupplier"></supplier>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "top-ten-suppliers",
  async created() {
    await this.$store.dispatch("getAllSuppliersWithSales");
  },

  computed: {
    allSuppliersWithSales() {
      return this.$store.state.AdminPage.allSuppliersWithSales;
    },

    suppliersSortedBySales() {
      var allSuppliers = this.allSuppliersWithSales;
      var ar = allSuppliers.sort((a, b) =>
        a.total_sales < b.total_sales
          ? 1
          : b.total_sales < a.total_sales
          ? -1
          : 0
      );
      return ar;
    },
  },

  components: {
    supplier: () => import("./supplier"),
  },
};
</script>