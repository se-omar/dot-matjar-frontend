<template>
  <div class="grey lighten-4">
    <toolBar></toolBar>
    <v-app class="grey lighten-4">
      <div class="mx-10">
        <cartTable></cartTable>

        <v-radio-group mandatory v-model="radioGroup">
          <v-row class="mb-n5" justify="center">
            <v-col lg="4">
              <v-radio label="Search for Products" value="1"></v-radio>
            </v-col>

            <v-col lg="4">
              <v-radio label="Search for suppliers" value="2"></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>

        <v-row justify="center">
          <v-col lg="4">
            <v-text-field
              :disabled="radioGroup === '2'"
              items="items"
              @keyup="emptySearchBox"
              dense
              outlined
              v-model="toolbarSearch"
              placeholder="Search for your Product"
            ></v-text-field>
          </v-col>

          <v-col lg="4">
            <v-text-field
              :disabled="radioGroup === '1'"
              @keyup="emptySupplierName"
              dense
              outlined
              v-model="supplierName"
              placeholder="Search Suppliers by Name"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col lg="4">
            <v-select
              @keyup="emptySelectBox"
              :disabled="radioGroup === '2'"
              placeholder="Search By category"
              dense
              outlined
              v-model="categoryName"
              :items="category"
              @click="categoriesDB"
            ></v-select>
          </v-col>

          <v-col lg="4">
            <v-select
              :items="egyptGovernorates"
              
              placeholder="Governorate"
              dense
              outlined
              v-model="governorate"
              @change="getCountryRegions()"
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col lg="4"></v-col>

          <v-col lg="4">
            <v-select
              :items="regions"
              
              placeholder="Region"
              dense
              outlined
              v-model="region"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="mt-n3" justify="center">
          <v-col lg="1">
            <v-text-field :disabled="radioGroup === '2'" dense type="number" label="Price From"></v-text-field>
          </v-col>

          <v-col lg="1  ">
            <v-text-field :disabled="radioGroup === '2'" dense type="number" label="Price TO"></v-text-field>
          </v-col>

          <v-col lg="1"></v-col>

          <v-col lg="1">
            <v-btn
              :disabled="radioGroup === '2'"
              class="red darken-4 white--text"
              @click="filterProducts"
            >Search</v-btn>
          </v-col>

          <v-col lg="2">
            <v-btn class="red darken-4 white--text" @click="All">All</v-btn>
          </v-col>

          <v-col lg="2">
            <v-btn
              :disabled="radioGroup === '1'"
              class="red darken-4 white--text"
              @click="filterSuppliers"
            >Search</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="radioGroup === '1'">
          <v-col
            lg="2"
            md="4"
            sm="6"
            cols="6"
            v-for="filteredProduct in filteredProducts"
            :key="filteredProduct.id"
          >
            <v-hover>
              <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 4}`" width="280">
                <product :filteredProduct="filteredProduct"></product>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <v-row v-if="radioGroup === '2'">
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
      </div>

      <v-card>
        <Footer></Footer>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import Product from "../components/product.vue";
import Footer from "../components/footer.vue";
import toolBar from "../components/toolbar";
import supplier from "../components/supplier";
import cartTable from "../components/cartTable";
//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  data() {
    return {
      toolbarSearch: "",
      categoryName: "",
      supplierName: "",
      supplierLocation: "",
      items: [],
      productFilterFlag: false,
      supplierFilterFlag: false,
      // egyptGovernorates: [
      //   "الإسكندرية",
      //   "الإسماعيلية",
      //   "أسوان",
      //   "أسيوط",
      //   "الأقصر",
      //   "البحر الأحمر",
      //   "البحيرة",
      //   "بني سويف",
      //   "بورسعيد",
      //   "جنوب سيناء",
      //   "الجيزة",
      //   "الدقهلية",
      //   "دمياط",
      //   "سوهاج",
      //   "السويس",
      //   "الشرقية",
      //   "شمال سيناء",
      //   "الغربية",
      //   "الفيوم",
      //   "القاهرة",
      //   "القليوبية",
      //   "قنا",
      //   "كفر الشيخ",
      //   "مطروح",
      //   "المنوفية",
      //   "المنيا",
      //   "الوادي الجديد",
      // ],
      category: [],
      radioGroup: 1,
      governorate: "",
      region: "",
    };
  },
  async created() {
    if (this.loginToken) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    this.$store.dispatch("getGovernorate");
    this.$store.dispatch("getProducts", {
      productFilterFlagss: this.productFilterFlag,
      productName: this.toolbarSearch,
      categoryName: this.categoryName,
    });
    this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
      supplierName: this.supplierName,
      governorate: this.governorate,
      region: this.region,
    });
    console.log(this.$store.state.filteredProducts);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.$store.dispatch("categoriesDB");
        resolve();
      });
    });
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
    suppliers() {
      return this.$store.state.suppliers;
    },
    regions() {
      return this.$store.state.regions;
    },
    egyptGovernorates() {
      return this.$store.state.governorates;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
  },

  methods: {
    filterProducts() {
      this.productFilterFlag = true;
      console.log(this.toolbarSearch, this.categoryName);
      this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
        governorate:this.governorate,
        region:this.region
      });
    },

    filterSuppliers() {
      this.supplierFilterFlag = true;
      this.$store.dispatch("filterSuppliers", {
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });
    },

    emptySearchBox() {
      if (!this.toolbarSearch) {
        this.$store.commit("emptySearch");
      }
    },

    emptySupplierName() {
      if (!this.supplierName) {
        this.$store.commit("emptySupplierName");
      }
    },

    // emptySupplierLocation() {
    //   if (!this.supplierLocation) {
    //     this.$store.commit("emptySupplierLocation");
    //   }
    // },

    emptySelectBox() {
      if (this.categoryName == "All") {
        this.$store.commit("emptySearch");
      }
    },
    categoriesDB() {
      this.category = this.$store.state.category;
    },

    loadMore() {
      var self = this;
      if (this.radioGroup === "1") {
        console.log("filter products condition");
        this.$store.dispatch("getProducts", {
          productFilterFlag: this.productFilterFlag,
          productName: this.toolbarSearch,
          categoryName: this.categoryName,
        });
      } else {
        self.$store.dispatch("getSuppliers", {
          supplierFilterFlag: this.supplierFilterFlag,
          supplierName: this.supplierName,
          governorate: this.governorate,
          region: this.region,
        });
      }
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
      console.log("current supplier id", supplier.user_id);
      this.$store.commit("supplierPage", supplier);
      this.$router.push("/supplierPage/" + supplier.user_id);
    },

    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    All() {
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
    },
  },
  components: {
    Product,
    Footer,
    toolBar,
    supplier,
    cartTable,
  },
};
</script>
<style scoped>
.container {
  max-width: 960px;
}
</style>
