<template>
  <v-app class="grey lighten-4">
    <div class="display-1 mb-10 mt-6" style="margin: auto">Dashboard</div>

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
                :series="chartSeries"
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
                :series="chartSeries"
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
                :series="chartSeries"
              ></apexchart>
            </v-card>
          </v-hover>
          <v-row justify="center">
            <v-label for="lineChart">
              <span
                style="font-size: 22px"
              >Revenue This Month: {{chartSeries[0].data[chartSeries[0].data.length-1]}}</span>
            </v-label>
          </v-row>
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
import dashboardSellingProduct from "../components/dashboardSellingProduct";
export default {
  mounted() {
    //console.log(this.currentUser);
    this.$store.dispatch("getTopSellingProduct");
    this.$store.dispatch("getLeastSellingProduct");
    this.$store.dispatch("getMyProducts");

    const result = this.groupBy(this.myProducts, c => c.category_id);
    this.categoryArray = result;
    this.calculateCategoryPercentage();
    this.pieOptions.labels = this.labels;
    //console.log(this.pieOptions.labels);
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
        labels: [this.labels],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    }
  },

  data: function() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example"
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
            "dec"
          ]
        },
        colors: ["#F44336"]
      },

      chartSeries: [
        {
          name: "asdasd",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 49, 60, 70, 91]
        }
      ],

      topSellingProduct: {},
      leastSellingProduct: {},

      categoryArray: [],
      categoryPercentageArray: [],
      categoryNames: [],
      testCategories: ["asdf", "asdf", "asdf"]
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
        categorySales = 0;
        //console.log(this.categoryArray[i][1]);
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
    }
  },

  components: {
    dashboardSellingProduct
  }
};
</script>