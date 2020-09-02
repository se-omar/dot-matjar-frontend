<template>
  <v-app>
    <toolbar />
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    </div>
    <v-row justify="center">
      <p class="display-1 mt-8">Top 10 Selling Suppliers</p>
    </v-row>

    <v-row>
      <v-col
        class="mb-15"
        v-for="sortedSupplier in suppliersSortedBySales.slice(0, 10)"
        :key="sortedSupplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(sortedSupplier)">
          <supplier :supplier="sortedSupplier"></supplier>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <p class="display-1 mt-8">Top Selling Suppliers in August</p>
    </v-row>

    <v-row>
      <v-col
        class="mb-15"
        v-for="topSupplier in topMonthSuppliers"
        :key="topSupplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(sortedSupplier)">
          <supplier :supplier="topSupplier"></supplier>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-n7" style="width: 92%; margin: auto">
      <v-col lg="3">
        <v-select
          @change="changeYear"
          v-model="selectedYear"
          outlined
          :items="years"
          label="Select Year"
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <p class="display-1 mt-8">Suppliers Ranking Chart</p>
    </v-row>

    <v-row justify="center">
      <v-col lg="7" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <v-hover>
            <v-card
              width="900"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}` "
              class="mb-7 grey lighten-5"
            >
              <apexchart
                class="mb-n2"
                :height="suppliersSortedBySales.length > 0 ? suppliersSortedBySales.length *20 : 250"
                id="lineChart"
                type="bar"
                :options="chartOptions"
                :series="salesChartSeries"
              ></apexchart>
            </v-card>
          </v-hover>
        </div>
      </v-col>

      <v-col style="max-width: 18%" lg="3">
        <v-card @click="supplierClicked(suppliersSortedBySales[0])">
          <supplier height="100" :supplier="suppliersSortedBySales[0]"></supplier>
        </v-card>
        <v-row class="mt-4" justify="center">
          <v-label>
            <span style="font-size: 22px; text-align: center">top selling supplier</span>
          </v-label>
        </v-row>
      </v-col>

      <v-col style="max-width: 18%" lg="3">
        <v-card @click="supplierClicked(suppliersSortedBySales[suppliersSortedBySales.length-1])">
          <supplier
            height="100"
            :supplier="suppliersSortedBySales[suppliersSortedBySales.length-1]"
          ></supplier>
        </v-card>
        <v-row class="mt-4" justify="center">
          <v-label>
            <span style="font-size: 22px; text-align: center">least selling supplier</span>
          </v-label>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <p class="display-1 mt-8">All Suppliers</p>
    </v-row>

    <v-row>
      <v-col
        class="mb-15"
        v-for="supplier in suppliers"
        :key="supplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(supplier)">
          <supplier :supplier="supplier"></supplier>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn large class="red darken-4 mb-15 white--text" @click="loadMore">load more</v-btn>
    </v-row>
  </v-app>
</template>

<script>
import toolbar from "../components/toolbar";
import supplier from "../components/supplier";
export default {
  async created() {
    this.doLoading(5000);
    await this.$store.dispatch("refreshCurrentUser");
    await this.$store.dispatch("getAllSuppliersWithSales");
    console.log(this.currentMonth);
    this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
    });
    console.log("all suppliers", this.suppliers);

    console.log(
      "all suppliers with sales from admin page",
      this.allSuppliersWithSales
    );
    this.getTopMonthlySuppliers();

    console.log("suppliers sorted by sales", this.suppliersSortedBySales);
  },

  data: () => {
    return {
      supplierFilterFlag: false,
      isLoading: false,
      notSortedOrders: [],
      selectedYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      topMonthlySalesArray: [],
      topMonthlyRevenueArray: [],
      topMonthSuppliers: [],
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    suppliers() {
      return this.$store.state.suppliers;
    },

    allSuppliersWithSales() {
      return this.$store.state.allSuppliersWithSales;
    },

    supplier() {
      return this.$store.state.supplier;
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
    years() {
      // var year = [];
      // this.notSortedOrders.forEach((element) => {
      //   year.push(element.order_year);
      // });
      // return year.sort(function (a, b) {
      //   return b - a;
      // });
      return [2020, 2015, 2016];
    },
  },

  methods: {
    doLoading(time) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, time);
    },

    loadMore() {
      this.doLoading(800);
      var self = this;
      self.$store.dispatch("getSuppliers", this.supplierFilterFlag);
      // window.onscroll = function () {
      //   console.log(this.suppliers);
      //   // let bottomOfWindow =
      //   //   document.documentElement.scrollTop + window.innerHeight ===
      //   //   document.documentElement.offsetHeight;
      //   // console.log(bottomOfWindow);
      //   console.log("false");
      //   if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      //     console.log(this.suppliers);
      //     console.log("true");
      //     self.$store.dispatch("getSuppliers");
      //   }
      // };
    },

    supplierClicked(supplier) {
      this.$store.commit("supplierPage", supplier);
      this.$router.push("/suppliersDashboard");
      console.log(this.supplier);
    },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },

    async getTopMonthlySuppliers() {
      var self = this;
      var monthlySortedOrders = [];
      var totalMonthSales;
      var totalMonthRevenue;
      var yearlySortedOrders;
      for (var i = 0; i < this.allSuppliersWithSales.length; i++) {
        totalMonthSales = 0;
        totalMonthRevenue = 0;
        await self.$axios
          .post("http://localhost:3000/api/monthlySales", {
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
                for (
                  var j = 0;
                  j < monthlySortedOrders[self.currentMonth].length;
                  j++
                ) {
                  currentSupplier =
                    monthlySortedOrders[self.currentMonth][j].products[0].user;
                  monthlySortedOrders[self.currentMonth][j].products.forEach(
                    (element) => {
                      totalMonthSales += element.buy_counter;
                      totalMonthRevenue +=
                        element.buy_counter * element.unit_price;
                    }
                  );
                }
              }
              if (totalMonthSales > 0) {
                currentSupplier.monthSales = totalMonthSales;
                currentSupplier.monthRevenue = totalMonthRevenue;
                console.log(totalMonthRevenue);
                self.topMonthSuppliers.push(currentSupplier);
              }
            }
          });
      }

      self.topMonthSuppliers.sort(function (a, b) {
        return b.monthSales - a.monthSales;
      });

      console.log("top month suppliers", self.topMonthSuppliers);
    },

    changeYear() {
      console.log(this.selectedYear);
    },
  },

  components: {
    toolbar,
    supplier,
  },
};
</script>