<template>
  <div class="home">
    <v-app>
      <v-container fluid>
        <v-row>
          <v-text-field
            @keyup="filterProducts"
            dense
            v-model="toolbarSearch"
            placeholder="البحث عن المنتجات"
          ></v-text-field>
          <v-btn style="margin-right: 20px" @click="filterProducts"
            >البحث</v-btn
          >
        </v-row>

        <v-row>
          <v-col class="d-flex">
            <v-select dense :items="items" label="القطاع" outlined></v-select>
          </v-col>

          <v-col class="d-flex">
            <v-select
              dense
              :items="items"
              label="القطاع الفرعي"
              outlined
            ></v-select>
          </v-col>

          <v-col class="d-flex">
            <v-select
              dense
              :items="items"
              label="محافظة المشروع"
              outlined
            ></v-select>
          </v-col>

          <v-col class="d-flex">
            <v-text-field dense type="number" label="السعر الي"></v-text-field>
          </v-col>

          <v-col class="d-flex">
            <v-text-field dense type="number" label="السعر من"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="filteredProduct in filteredProducts"
            :key="filteredProduct.id"
          >
            <product :filteredProduct="filteredProduct"></product>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
  
</template>

<script>
import Product from "../components/product.vue";

//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  data() {
    return {
      toolbarSearch: "",
      items: [],
    };
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    row() {
      return this.$store.state.row;
    },
    products() {
      return this.$store.state.products;
    },
    filteredProducts() {
      return this.$store.state.filteredProducts;
    },
  },

  methods: {
    filterProducts() {
      this.$store.dispatch("filterProducts", this.toolbarSearch);
    },
  },
  components: {
    Product,
  },
};
</script>
