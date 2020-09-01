<template>
  <v-app class="grey lighten-4">
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    </div>
    <div class="display-1 mb-10 mt-6" style="margin: auto">Dashboard</div>

    <v-row justify="center">
      <p style="font-size: 28px">All Products</p>
    </v-row>

    <v-row justify="center" v-if="myProducts.length != 0">
      <v-col lg="2" md="4" sm="6" cols="6" v-for="myProduct in myProducts" :key="myProduct.id">
        <product :addToCartButton="false" :filteredProduct="myProduct"></product>
      </v-col>
    </v-row>

    <v-row class="mt-16" justify="center" v-else>
      <p style="font-size: 25px">No products available for this supplier</p>
    </v-row>

    <v-divider class="mt- mb-10"></v-divider>

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

    <v-row style="width: 92%; margin: auto">
      <v-col lg="4" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 5 : 3}` " class="mb-7">
              <apexchart
                class="mb-n2 grey lighten-5"
                id="barChart"
                width="400"
                type="bar"
                :options="chartOptions"
                :series="salesChartSeries"
              ></apexchart>
            </v-card>
          </v-hover>
          <v-row justify="center">
            <v-label for="barChart">
              <span style="font-size: 22px">Monthly Sales Bar Chart</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}` "
              class="mb-7 grey lighten-5"
            >
              <apexchart
                class="mb-n2"
                id="lineChart"
                width="400"
                type="line"
                :options="chartOptions"
                :series="salesChartSeries"
              ></apexchart>
            </v-card>
          </v-hover>
          <v-row justify="center">
            <v-label for="lineChart">
              <span style="font-size: 22px">Monthly Sales Line Chart</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <div>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}` "
              class="mb-5 grey lighten-5"
            >
              <apexchart
                class="mt-n3"
                id="pieChart"
                width="400"
                type="pie"
                :options="pieOptions"
                :lables="labels"
                :series="pieSeries"
              ></apexchart>
            </v-card>
          </v-hover>
          <v-row justify="center">
            <v-label for="pieChart">
              <span style="font-size: 22px">Category Sales Percentage</span>
            </v-label>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

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
                id="lineChart"
                height="300"
                type="line"
                :options="chartOptions"
                :series="revenueChartSeries"
              ></apexchart>
            </v-card>
          </v-hover>
          <v-row justify="center">
            <v-label for="lineChart">
              <span
                style="font-size: 22px"
              >Revenue This Month: {{revenueChartSeries[0].data[revenueChartSeries[0].data.length-1]}}</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="3">
        <div style="text-align: center">
          <v-hover>
            <v-card
              height="75"
              width="300"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}` "
              class="grey lighten-5 mb-11"
            >
              <span
                class="grey--text text--darken-1"
                style="font-size: 20px"
              >Total Revenue: {{currentUser.total_revenue}} EGP</span>
            </v-card>
          </v-hover>
        </div>

        <div style="text-align: center">
          <v-hover>
            <v-card
              height="75"
              width="300"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}` "
              class="grey lighten-5 mb-11"
            >
              <span
                class="grey--text text--darken-1"
                style="font-size: 20px"
              >Amount Recieved: {{currentUser.revenue_recieved || 0}} EGP</span>
            </v-card>
          </v-hover>
        </div>

        <div style="text-align: center">
          <v-hover>
            <v-card
              width="300"
              height="75"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}` "
              class="grey lighten-5 mb-11"
            >
              <span
                class="grey--text text--darken-1"
                style="font-size: 20px"
              >Amount Left: {{currentUser.total_revenue - currentUser.revenue_recieved || 0}} EGP</span>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row justify="center" style="width: 92%; margin: auto">
      <v-col lg="4">
        <dashboard-selling-product class="mb-5" id="mostSelling" :filteredProduct="topProduct" />
        <v-row justify="center">
          <v-label for="mostSelling">
            <span style="font-size: 22px">Most Selling Product</span>
          </v-label>
        </v-row>
      </v-col>

      <v-col lg="4">
        <dashboard-selling-product class="mb-5" id="leastSelling" :filteredProduct="leastProduct" />
        <v-row justify="center">
          <v-label for="leastSelling">
            <span style="font-size: 22px">least Selling Product</span>
          </v-label>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import product from "../components/product";
import dashboardSellingProduct from "../components/dashboardSellingProduct";
export default {
  async mounted() {
    this.doLoading(2000);

    await this.$store.dispatch("refreshCurrentUser");
    this.$store.dispatch("getTopSellingProduct", this.currentUser.user_id);
    this.$store.dispatch("getLeastSellingProduct", this.currentUser.user_id);
    await this.$store.dispatch("getMyProducts", this.currentUser.user_id);
    await this.$store.dispatch("getMonthlySales", this.currentUser.user_id);

    this.yearlySortedOrders[this.selectedYear].forEach((element) => {
      this.myYearlyProducts.push(...element.products);
    });
    //this.pieOptions.labels = this.labels;
    this.calculateMonthlySales();
    this.calculateCategoryPercentage();
    //console.log(this.pieOptions.labels);
    //console.log(this.monthlySalesArray);
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    topProduct() {
      return this.$store.state.topProduct;
    },
    leastProduct() {
      return this.$store.state.leastProduct;
    },
    myProducts() {
      return this.$store.state.myProducts;
    },
    pieSeries() {
      return this.categoryPercentageArray;
    },
    labels() {
      return this.categoryNames;
    },
    pieOptions() {
      return {
        labels: this.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
    },
    notSortedDashboardOrders() {
      return this.$store.state.notSortedDashboardOrders;
    },
    salesChartSeries() {
      return [
        {
          name: "asdasd",
          data: this.monthlySalesArray,
        },
      ];
    },
    revenueChartSeries() {
      return [
        {
          name: "asdasd",
          data: this.monthlyRevenueArray,
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "jan",
            "feb",
            "mar",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec",
          ],
        },
        colors: ["#F44336"],
      };
    },
    years() {
      var year = [];
      this.notSortedDashboardOrders.forEach((element) => {
        year.push(element.order_year);
      });
      return year.sort(function (a, b) {
        return b - a;
      });
    },

    yearlySortedOrders() {
      return this.groupBy(this.notSortedDashboardOrders, (c) => c.order_year);
    },
    monthlySortedOrders() {
      return this.groupBy(
        this.yearlySortedOrders[this.selectedYear],
        (c) => c.order_month
      );
    },
    categoryArray() {
      return this.groupBy(this.myYearlyProducts, (c) => c.category_id);
    },
  },

  data: function () {
    return {
      topSellingProduct: {},
      leastSellingProduct: {},
      categoryPercentageArray: [],
      categoryNames: [],
      monthlySalesArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monthlyRevenueArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      totalRevenue: 0,
      selectedYear: new Date().getFullYear(),
      myYearlyProducts: [],
      isLoading: false,
    };
  },

  methods: {
    doLoading(time) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, time);
    },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },

    calculateCategoryPercentage() {
      //console.log("calculateCategoryPercentage");
      var categorySales, i, j;
      var categorySalesArray = [];
      var totalCategorySales = 0;
      var categoryName = [];

      for (i in this.categoryArray) {
        categorySales = 0;
        // console.log("in category function", this.categoryArray[i][1]);
        for (j = 0; j < this.categoryArray[i].length; j++) {
          categorySales += this.categoryArray[i][j].buy_counter;
          totalCategorySales += this.categoryArray[i][j].buy_counter;

          categoryName = this.categoryArray[i][j].product_category
            .category_name;
          if (!this.categoryNames.includes(categoryName)) {
            this.categoryNames.push(
              this.categoryArray[i][j].product_category.category_name
            );
          }
          //console.log("category of i of j", this.categoryArray[i][j]);
        }

        categorySalesArray.push(categorySales);
        // console.log("category sales array", categorySalesArray);
        // console.log("total category sales", totalCategorySales);
        // console.log("category names", this.categoryNames);
      }

      for (i = 0; i < categorySalesArray.length; i++) {
        this.categoryPercentageArray.push(
          (categorySalesArray[i] / totalCategorySales) * 100
        );
        // console.log(this.categoryPercentageArray);
      }
    },

    calculateMonthlySales() {
      // console.log("entered function");

      var i, j, totalMonthSales, totalMonthRevenue;

      for (i in this.monthlySortedOrders) {
        //console.log("entered first loop");
        totalMonthSales = 0;
        totalMonthRevenue = 0;

        for (j = 0; j < this.monthlySortedOrders[i].length; j++) {
          //console.log("entered second loop");
          this.monthlySortedOrders[i][j].products.forEach((element) => {
            totalMonthSales += element.buy_counter;
            totalMonthRevenue += element.unit_price * element.buy_counter;
            this.totalRevenue += element.unit_price * element.buy_counter;
            // console.log(this.totalRevenue);
          });
        }
        this.monthlySalesArray.splice(i - 1, 1, totalMonthSales);
        this.monthlyRevenueArray.splice(i - 1, 1, totalMonthRevenue);
        // console.log("monthly sales array", this.monthlySalesArray);
      }
      // localStorage.setItem(
      //   "monthlySalesArray",
      //   JSON.stringify(this.monthlySalesArray)
      // );
    },

    changeYear() {
      console.log(this.yearlySortedOrders);
      console.log(this.selectedYear);
      console.log("my products", this.myProducts);
      console.log("my yearly products 1", this.myYearlyProducts);
      console.log("category array 1", this.categoryArray);
      this.monthlySalesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.monthlyRevenueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.myYearlyProducts = [];
      this.categoryPercentageArray = [];
      console.log("my yearly products 2", this.myYearlyProducts);
      this.yearlySortedOrders[this.selectedYear].forEach((element) => {
        this.myYearlyProducts.push(...element.products);
      });
      console.log("my yearly products 3", this.myYearlyProducts);
      this.calculateMonthlySales();
      this.calculateCategoryPercentage();
    },
  },

  components: {
    dashboardSellingProduct,
    product,
  },
};
</script>