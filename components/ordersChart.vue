<template>
  <v-card class="mt-3 mx-auto" max-width="1000">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="red darken-4"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-bold mb-2">Most selling products</div>
      <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ordersChart",
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
  }),
};
</script>


<style  scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>