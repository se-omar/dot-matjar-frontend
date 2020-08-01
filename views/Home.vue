<template>
  <div class="home">
    <v-app>
      <!-- cart -->
    
       <!-- cart -->
      <tool-bar></tool-bar>
      <cartTable/>
      <v-container>
        <v-row>
          <v-col lg="11">
            <v-text-field
              @keyup="filterProducts"
              dense
              v-model="toolbarSearch"
              placeholder="البحث عن المنتجات"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col lg="3">
            <v-select dense :items="egyptGovernorates" label="محافظة المشروع" outlined></v-select>
          </v-col>

          <v-col lg="3">
            <v-text-field dense type="number" label="السعر الي"></v-text-field>
          </v-col>

          <v-col lg="3">
            <v-text-field dense type="number" label="السعر من"></v-text-field>
          </v-col>

          <v-col lg="3">
            <v-btn @click="filterProducts">البحث</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            lg="3"
            md="4"
            sm="6"
            cols="6"
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
import ToolBar from "../components/toolbar.vue";
import cartTable from "../components/cartTable"
//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  data() {
    return {
      toolbarSearch: "",
      items: [],
      egyptGovernorates: [
        "الإسكندرية",
        "الإسماعيلية",
        "أسوان",
        "أسيوط",
        "الأقصر",
        "البحر الأحمر",
        "البحيرة",
        "بني سويف",
        "بورسعيد",
        "جنوب سيناء",
        "الجيزة",
        "الدقهلية",
        "دمياط",
        "سوهاج",
        "السويس",
        "الشرقية",
        "شمال سيناء",
        "الغربية",
        "الفيوم",
        "القاهرة",
        "القليوبية",
        "قنا",
        "كفر الشيخ",
        "مطروح",
        "المنوفية",
        "المنيا",
        "الوادي الجديد"
      ]
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
    }
  },

  methods: {
    filterProducts() {
      this.$store.dispatch("filterProducts", this.toolbarSearch);
    }
  },
  components: {
    Product,
    ToolBar,
    cartTable
  }
};
</script>
