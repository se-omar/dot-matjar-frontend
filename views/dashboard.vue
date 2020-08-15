<template>
  <v-app>
    <div class="display-1 mb-10 mt-6" style="margin: auto">Dashboard</div>
    <v-row>
      <v-col lg="4" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <apexchart
            class="mb-n2"
            id="barChart"
            width="400"
            type="bar"
            :options="chartOptions"
            :series="chartSeries"
          ></apexchart>
          <v-row justify="center">
            <v-label for="barChart">
              <span style="font-size: 22px">Monthly Sales Bar Chart</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <apexchart
            class="mb-n2"
            id="lineChart"
            width="400"
            type="line"
            :options="chartOptions"
            :series="chartSeries"
          ></apexchart>
          <v-row justify="center">
            <v-label for="lineChart">
              <span style="font-size: 22px">Monthly Sales Line Chart</span>
            </v-label>
          </v-row>
        </div>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <div>
          <apexchart
            class="mt-n5"
            id="pieChart"
            width="400"
            type="pie"
            :options="pieOptions"
            :series="pieSeries"
          ></apexchart>
          <v-row class="ml-5">
            <v-label for="pieChart">
              <span style="font-size: 22px">Category Sales Percentage</span>
            </v-label>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data: () => ({
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

    pieOptions: {
      labels: ["Electronics", "Clothing", "Furniture", "Watches"],
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
    },

    chartSeries: [
      {
        name: "asdasd",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 49, 60, 70, 91]
      }
    ],

    pieSeries: [35, 30, 20, 15]
  })
};
</script>