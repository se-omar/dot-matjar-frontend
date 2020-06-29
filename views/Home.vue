<template>
  <div class="home">
    <tool-bar></tool-bar>

    <v-container fluid>
      <v-row>
        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>

        <v-col>
          <product></product>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Product from "../components/product.vue";
import ToolBar from "../components/toolbar.vue";

export default {
  name: "Home",
  components: {
    Product,
    ToolBar
  }
};
</script>
