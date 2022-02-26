<template>
  <v-app>
    <v-main>
      <v-row justify="center" v-if="selectedMonth !== 'all'">
        <p class="display-1 mt-8">
          {{ $t("adminPage.topYearMonthSuppliers") }} {{ selectedMonth }}
        </p>
      </v-row>

      <v-row justify="center" v-if="selectedMonth === 'all'">
        <p class="display-1 mt-8">
          {{ $t("adminPage.topYearMonthSuppliers") }} {{ selectedYear }}
        </p>
      </v-row>

      <v-row class="mb-n7" style="width: 92%; margin: auto">
        <v-col lg="3">
          <v-select
            v-model="selectedYear"
            filled
            rounded
            :items="years"
            :label="$t('adminPage.selectYear')"
          ></v-select>
        </v-col>

        <v-col lg="3">
          <v-select
            v-model="selectedMonth"
            filled
            rounded
            :items="months"
            :label="$t('adminPage.selectMonth')"
          ></v-select>
        </v-col>

        <v-col class="mt-2" lg="2">
          <v-btn
            :color="siteColor.button_color"
            large
            @click="
              getTopMonthlySuppliers();
              isLoading = true;
            "
            ><span :style="`color:${siteColor.button_text_color}`">{{
              $t("adminPage.filter")
            }}</span></v-btn
          >
        </v-col>
      </v-row>

      <v-row
        justify="center"
        v-if="topYearSuppliers.length < 1 && topMonthSuppliers.length < 1"
      >
        <v-col lg="7">
          <p class="text-h4">No Data available</p>
        </v-col>
      </v-row>

      <v-row justify="center" v-if="selectedMonth === 'all'">
        <v-col
          class="ms-3"
          v-for="topSupplier in topYearSuppliers"
          :key="topSupplier.user_id"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :supplier="topSupplier"
          ></supplier>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          class="ms-3"
          v-for="topSupplier in topMonthSuppliers"
          :key="topSupplier.user_id"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :supplier="topSupplier"
          ></supplier>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "top-year-suppliers",
  async created() {
    await this.$store.dispatch("getAllSuppliersWithSales");
    await this.getTopMonthlySuppliers();
  },

  data() {
    return {
      selectedMonth: "all",
      selectedYear: new Date().getFullYear(),
      topMonthSuppliers: [],
      topYearSuppliers: [],
      months: [
        "all",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },

  methods: {
    getYearsArray(back) {
      const year = new Date().getFullYear();
      return Array.from({ length: back }, (v, i) => year - back + i + 1);
    },

    async getTopMonthlySuppliers() {
      //this.isLoading = true;
      var self = this;
      self.topMonthSuppliers = [];
      self.topYearSuppliers = [];
      var monthlySortedOrders = [];
      var totalMonthSales;
      var totalYearSales;
      var totalMonthRevenue;
      var totalYearRevenue;
      var yearlySortedOrders;

      for (var i = 0; i < this.allSuppliersWithSales.length; i++) {
        totalMonthSales = 0;
        totalYearSales = 0;
        totalMonthRevenue = 0;
        totalYearRevenue = 0;
        await self.$axios
          .post(this.nodeHost + "/api/monthlySales", {
            user_id: self.allSuppliersWithSales[i].user_id,
          })
          .then((response) => {
            if (response.data.length > 0) {
              yearlySortedOrders = self.groupBy(
                response.data,
                (c) => c.order_year
              );

              if (yearlySortedOrders[self.selectedYear]) {
                monthlySortedOrders = self.groupBy(
                  yearlySortedOrders[self.selectedYear],
                  (c) => c.order_month
                );
                var currentSupplier;
                var currentYearOrders = yearlySortedOrders[self.selectedYear];

                if (self.selectedMonth === "all") {
                  currentSupplier = currentYearOrders[0].products[0].user;
                  for (var h = 0; h < currentYearOrders.length; h++) {
                    currentYearOrders[h].products.forEach((element) => {
                      totalYearSales += element.buy_counter;
                      totalYearRevenue +=
                        element.buy_counter * element.unit_price;
                    });
                  }

                  if (totalYearSales > 0) {
                    currentSupplier.yearSales = totalYearSales;
                    currentSupplier.yearRevenue = totalYearRevenue;
                    self.topYearSuppliers.push(currentSupplier);
                  }
                } else {
                  var currentMonthIndex = self.months.indexOf(
                    self.selectedMonth
                  );
                  if (monthlySortedOrders[currentMonthIndex]) {
                    for (
                      var j = 0;
                      j < monthlySortedOrders[currentMonthIndex].length;
                      j++
                    ) {
                      currentSupplier =
                        monthlySortedOrders[currentMonthIndex][j].products[0]
                          .user;
                      monthlySortedOrders[currentMonthIndex][
                        j
                      ].products.forEach((element) => {
                        totalMonthSales += element.buy_counter;
                        totalMonthRevenue +=
                          element.buy_counter * element.unit_price;
                      });
                    }
                  }
                  if (totalMonthSales > 0) {
                    currentSupplier.monthSales = totalMonthSales;
                    currentSupplier.monthRevenue = totalMonthRevenue;
                    self.topMonthSuppliers.push(currentSupplier);
                  }
                }
              }
            }
          });
      }

      self.topMonthSuppliers.sort(function (a, b) {
        return b.monthSales - a.monthSales;
      });

      self.topYearSuppliers.sort(function (a, b) {
        return b.yearSales - a.yearSales;
      });
      this.isLoading = false;
    },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },
  },

  computed: {
    years() {
      return this.getYearsArray(10);
    },

    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },

    allSuppliersWithSales() {
      return this.$store.state.AdminPage.allSuppliersWithSales;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },
  },

  components: {
    supplier: () => import("./supplier"),
  },
};
</script>