<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <p class="display-1 mt-8">{{ $t("adminPage.suppliersChart") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col lg="6" md="6" sm="12" cols="12">
          <div style="text-align: center">
            <v-hover>
              <v-card
                width="900"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 5 : 3}`"
                class="mb-7 grey lighten-5"
              >
                <apexchart
                  dir="ltr"
                  class="mb-n2"
                  :height="
                    suppliersSortedBySales.length > 0
                      ? suppliersSortedBySales.length * 20
                      : 250
                  "
                  id="lineChart"
                  type="bar"
                  :options="chartOptions"
                  :series="salesChartSeries"
                ></apexchart>
              </v-card>
            </v-hover>
          </div>
        </v-col>

        <v-col class="ms-3" lg="2" md="2" cols="5">
          <supplier :supplier="suppliersSortedBySales[0]"></supplier>

          <v-row class="mt-4" justify="center">
            <v-label>
              <span style="font-size: 22px; text-align: center">{{
                $t("adminPage.topSellingSupplier")
              }}</span>
            </v-label>
          </v-row>
        </v-col>

        <v-col class="ms-3" lg="2" md="2" cols="5">
          <supplier
            :supplier="
              suppliersSortedBySales[suppliersSortedBySales.length - 1]
            "
          ></supplier>

          <v-row class="mt-4" justify="center">
            <v-label>
              <span style="font-size: 22px; text-align: center">{{
                $t("adminPage.leastSellingSupplier")
              }}</span>
            </v-label>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "supp-ranking-chart",
  async created() {
    await this.$store.dispatch("getAllSuppliersWithSales");
  },

  computed: {
    chartOptions() {
      return {
        chart: {
          id: "vuechart-example",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: this.sellingSuppliersNameArray,
        },
        colors: ["#F44336"],
      };
    },

    salesChartSeries() {
      return [
        {
          name: "asdasd",
          data: this.suppliersTotalSalesArray,
        },
      ];
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

    sellingSuppliersNameArray() {
      var ar = [];
      this.suppliersSortedBySales.forEach((element) => {
        ar.push(element.full_arabic_name);
      });
      return ar;
    },

    suppliersTotalSalesArray() {
      var ar = [];
      this.suppliersSortedBySales.forEach((element) => {
        ar.push(element.total_sales);
      });
      return ar;
    },

    allSuppliersWithSales() {
      return this.$store.state.AdminPage.allSuppliersWithSales;
    },
  },

  components: {
    Apexchart: () => import("vue-apexcharts"),
    Supplier: () => import("./supplier"),
  },
};
</script>
