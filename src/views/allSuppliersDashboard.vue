<template>
  <v-app class="grey lighten-4">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></loading>
    </div>
    <div class="display-1 mb-10 mt-6" style="margin: auto">
      {{ supplier.full_arabic_name }} {{ $t("suppliersDashboard.dashboard") }}
    </div>
    <v-row justify="center">
      <p style="font-size: 28px">{{ $t("suppliersDashboard.allProducts") }}</p>
    </v-row>

    <v-row justify="center" v-if="supplierProducts.length != 0">
      <v-col
        class="mr-4 ml-4"
        lg="2"
        md="3"
        sm="5"
        cols="6"
        v-for="supplierProduct in supplierProducts"
        :key="supplierProduct.id"
      >
        <product
          minWidth="115%"
          :addToCartButton="false"
          :filteredProduct="supplierProduct"
        ></product>
      </v-col>
    </v-row>

    <v-row class="mt-16" justify="center" v-else>
      <p style="font-size: 25px">
        {{ $t("suppliersDashboard.noAvailableProducts") }}
      </p>
    </v-row>

    <v-divider class="mt- mb-10"></v-divider>

    <v-row class="mb-n7" style="width: 92%; margin: auto">
      <v-col lg="3">
        <v-select
          @change="changeYear"
          v-model="selectedYear"
          outlined
          :items="years"
          :label="$t('suppliersDashboard.selectYear')"
        ></v-select>
      </v-col>
    </v-row>

    <v-row style="width: 92%; margin: auto">
      <v-col lg="4" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}`"
              class="mb-7"
            >
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
              <span style="font-size: 22px">{{
                $t("suppliersDashboard.monthlySalesBar")
              }}</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}`"
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
              <span style="font-size: 22px">{{
                $t("suppliersDashboard.monthlySalesLine")
              }}</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <div>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}`"
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
              <span style="font-size: 22px">{{
                $t("suppliersDashboard.categoryChart")
              }}</span>
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
              :class="`elevation-${hover ? 5 : 3}`"
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
              <span style="font-size: 22px"
                >{{ $t("suppliersDashboard.monthlyRevenue") }}:
                {{
                  revenueChartSeries[0].data[
                    revenueChartSeries[0].data.length - 1
                  ]
                }}</span
              >
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
              :class="`elevation-${hover ? 5 : 3}`"
              class="grey lighten-5 mb-11"
            >
              <v-row justify="center">
                <span class="grey--text text--darken-1" style="font-size: 20px"
                  >{{ $t("suppliersDashboard.totalRevenue") }}:
                  {{ supplier.total_revenue }} EGP</span
                >
                <v-btn
                  v-if="currentUser.user_type == 'admin'"
                  icon
                  @click="totalRevenueDialog = true"
                  ><i class="fa fa-edit"></i
                ></v-btn>
              </v-row>
            </v-card>
          </v-hover>
        </div>
        <v-dialog width="300" v-model="totalRevenueDialog">
          <v-card style="overflow: hidden">
            <v-row justify="center">
              <v-col cols="6">
                <v-form v-model="totalRevenueValidation">
                  <v-text-field
                    height="30"
                    outlined
                    shaped
                    v-model="supplierTotalRevenue"
                    :label="$t('suppliersDashboard.totalRevenue')"
                    :rules="[rules.required, rules.numbersOnly]"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn
                :disabled="!totalRevenueValidation"
                @click="updateSupplierTotalRevenue"
                icon
                ><i class="fa fa-sync-alt"> </i
              ></v-btn>
            </v-row>
          </v-card>
        </v-dialog>
        <div style="text-align: center">
          <v-hover>
            <v-card
              height="75"
              width="300"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}`"
              class="grey lighten-5 mb-11"
            >
              <v-row justify="center">
                <span class="grey--text text--darken-1" style="font-size: 20px"
                  >{{ $t("suppliersDashboard.amountRecieved") }}:
                  {{ supplier.revenue_recieved || 0 }} EGP</span
                >
                <v-btn
                  v-if="currentUser.user_type == 'admin'"
                  @click="amountRecievedDialog = true"
                  icon
                  ><i class="fa fa-edit"></i
                ></v-btn>
              </v-row>
            </v-card>
          </v-hover>
        </div>
        <v-dialog width="300" v-model="amountRecievedDialog">
          <v-card style="overflow: hidden">
            <v-row justify="center">
              <v-col cols="6">
                <v-form v-model="amountRecievedValidation">
                  <v-text-field
                    height="30"
                    outlined
                    :rules="[rules.required, rules.numbersOnly]"
                    shaped
                    v-model="supplierAmountRecieved"
                    :label="$t('suppliersDashboard.amountRecieved')"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn
                :disabled="!amountRecievedValidation"
                @click="updateSupplierAmountRecieved"
                icon
                ><i class="fa fa-sync-alt"> </i
              ></v-btn>
            </v-row>
          </v-card>
        </v-dialog>
        <div style="text-align: center">
          <v-hover>
            <v-card
              width="300"
              height="75"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}`"
              class="grey lighten-5 mb-11"
            >
              <v-row justify="center">
                <span class="grey--text text--darken-1" style="font-size: 20px"
                  >{{ $t("suppliersDashboard.amountLeft") }}:
                  {{ supplier.total_revenue - supplier.revenue_recieved || 0 }}
                  EGP</span
                >
                <!-- <v-btn
                  v-if="currentUser.user_type == 'admin'"
                  icon
                  @click="amountLeftDialog = true"
                >
                  <i class="fa fa-edit"></i
                ></v-btn> -->
              </v-row>
            </v-card>
          </v-hover>
        </div>
        <!-- <v-dialog width="300" v-model="amountLeftDialog">
          <v-card style="overflow: hidden">
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field
                  height="30"
                  outlined
                  shaped
                  v-model="supplierAmountLeft"
                  :label="$t('suppliersDashboard.amountLeft')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-btn @click="updateSupplierAmountLeft" icon
                ><i class="fa fa-sync-alt"> </i
              ></v-btn>
            </v-row>
          </v-card>
        </v-dialog> -->
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row justify="center" style="width: 92%; margin: auto">
      <v-col lg="4">
        <dashboard-selling-product
          class="mb-5"
          id="mostSelling"
          :filteredProduct="topProduct"
        />
        <v-row justify="center">
          <v-label for="mostSelling">
            <span style="font-size: 22px">{{
              $t("suppliersDashboard.mostSellingProduct")
            }}</span>
          </v-label>
        </v-row>
      </v-col>

      <v-col lg="4">
        <dashboard-selling-product
          class="mb-5"
          id="leastSelling"
          :filteredProduct="leastProduct"
        />
        <v-row justify="center">
          <v-label for="leastSelling">
            <span style="font-size: 22px">{{
              $t("suppliersDashboard.leastSellingProduct")
            }}</span>
          </v-label>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// import product from "../components/product";
// import dashboardSellingProduct from "../components/dashboardSellingProduct";
export default {
  async mounted() {
    await this.$store.dispatch("getSiteColor");
    //this.isloading = true;
    this.$store.dispatch("getMyProducts", this.supplier.user_id);

    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    this.$store.commit("supplierPage", this.supplier);
    // await this.$store.dispatch("getMyProducts", this.supplier.user_id);
    await this.$store.dispatch("getTopSellingProduct", this.supplier.user_id);
    await this.$store.dispatch("getLeastSellingProduct", this.supplier.user_id);

    await this.$store.dispatch("getMonthlySales", this.supplier.user_id);

    if (this.yearlySortedOrders[this.selectedYear]) {
      this.yearlySortedOrders[this.selectedYear].forEach((element) => {
        this.myYearlyProducts.push(...element.products);
      });
    }

    //this.pieOptions.labels = this.labels;
    await this.calculateMonthlySales();
    await this.calculateCategoryPercentage();
    this.isloading = false;
    //
  },

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    supplier() {
      return JSON.parse(localStorage.getItem("clickedSupplier"));
    },

    topProduct() {
      return this.$store.state.Dashboard.topProduct;
    },

    leastProduct() {
      return this.$store.state.Dashboard.leastProduct;
    },

    supplierProducts() {
      return this.$store.state.Dashboard.myProducts;
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
      return this.$store.state.Dashboard.notSortedDashboardOrders;
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
      if (this.yearlySortedOrders[this.selectedYear]) {
        return this.groupBy(
          this.yearlySortedOrders[this.selectedYear],
          (c) => c.order_month
        );
      } else {
        return [];
      }
    },
    categoryArray() {
      return this.groupBy(this.myYearlyProducts, (c) => c.category_id);
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
    // supplierTotalRevenue() {
    //   if (this.supplier) {
    //     return this.supplier.total_revenue;
    //   } else {
    //     return 0;
    //   }
    // },
    // supplierAmountRecieved() {
    //   if (this.supplier) {
    //     return this.supplier.revenue_recieved;
    //   } else {
    //     return 0;
    //   }
    // },
  },
  created() {
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }

    if (this.supplier) {
      this.supplierTotalRevenue = this.supplier.total_revenue;
      this.supplierAmountRecieved = this.supplier.revenue_recieved;
    }
    setTimeout(() => {
      localStorage.removeItem("reloaded");
    }, 50);
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
      editAmountRecieved: false,
      editTotalRevenue: false,
      editAmountLeft: false,
      totalRevenueDialog: false,
      amountRecievedDialog: false,
      amountLeftDialog: false,
      supplierAmountRecieved: "",
      supplierTotalRevenue: "",
      supplierAmountLeft: "",
      rules: {
        numbersOnly: (v) => /\d+/.test(v) || "Enter numbers",
        required: (v) => !!v || "Required",
      },
      amountRecievedValidation: false,
      totalRevenueValidation: false,
    };
  },

  methods: {
    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },

    calculateCategoryPercentage() {
      var categorySales, i, j;
      var categorySalesArray = [];
      var totalCategorySales = 0;
      var categoryName = [];

      for (i in this.categoryArray) {
        //
        categorySales = 0;
        //
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
          //
        }

        categorySalesArray.push(categorySales);
        //
        //
        //
      }

      for (i = 0; i < categorySalesArray.length; i++) {
        this.categoryPercentageArray.push(
          (categorySalesArray[i] / totalCategorySales) * 100
        );
        //
      }
      this.isloading = false;
    },

    calculateMonthlySales() {
      var i, j, totalMonthSales, totalMonthRevenue;

      for (i in this.monthlySortedOrders) {
        //
        totalMonthSales = 0;
        totalMonthRevenue = 0;

        for (j = 0; j < this.monthlySortedOrders[i].length; j++) {
          //

          this.monthlySortedOrders[i][j].products.forEach((element) => {
            totalMonthSales += element.buy_counter;
            totalMonthRevenue += element.unit_price * element.buy_counter;
            this.totalRevenue += element.unit_price * element.buy_counter;
            //
          });
        }
        this.monthlySalesArray.splice(i - 1, 1, totalMonthSales);
        this.monthlyRevenueArray.splice(i - 1, 1, totalMonthRevenue);
        //
      }
      // localStorage.setItem(
      //   "monthlySalesArray",
      //   JSON.stringify(this.monthlySalesArray)
      // );
      this.isloading = false;
    },

    changeYear() {
      this.monthlySalesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.monthlyRevenueArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.myYearlyProducts = [];
      this.categoryPercentageArray = [];

      this.yearlySortedOrders[this.selectedYear].forEach((element) => {
        this.myYearlyProducts.push(...element.products);
      });

      this.calculateMonthlySales();
      this.calculateCategoryPercentage();
    },
    async updateSupplierTotalRevenue() {
      console.log("test");
      await this.$store.dispatch("updateSupplierTotalRevenue", {
        user_id: this.supplier.user_id,
        totalRevenue: this.supplierTotalRevenue,
      });
      await this.$store.dispatch("getSupplierNewData", {
        user_id: this.supplier.user_id,
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    // updateSupplierAmountLeft() {
    //   console.log("test");
    //   this.$store.dispatch("updateSupplierAmmountLeft", {
    //     user_id: this.supplier.user_id,
    //     amountLeft: this.supplierAmountLeft,
    //   });
    // },
    async updateSupplierAmountRecieved() {
      console.log("test");
      await this.$store.dispatch("updateSupplierAmountRecieved", {
        user_id: this.supplier.user_id,
        amountRecieved: this.supplierAmountRecieved,
      });
      await this.$store.dispatch("getSupplierNewData", {
        user_id: this.supplier.user_id,
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
  },

  components: {
    dashboardSellingProduct: () =>
      import("../components/dashboardSellingProduct"),
    product: () => import("../components/product"),
    apexchart: () => import("vue-apexcharts"),
  },
};
</script>
<style scoped>
div {
  font-size: 25px;
}
</style>