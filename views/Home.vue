<template>
  <div class="grey lighten-4">
    <toolBar></toolBar>
    <div v-if="currentUser.user_type == 'admin'">
      <SiteColor></SiteColor>
    </div>

    <v-app class="grey lighten-4">
      <div class="vld-parent">
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
      </div>

      <v-row>
        <v-col>
          <v-card height="120">
            <v-card-title>
              <span>ad here</span>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="ml-2">
        <v-col lg="2" style="max-width: 12%">
          <v-card height="95%">
            <v-card-title>
              <span>ad here</span>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col lg="9">
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
                v-if="radioGroup === '1'"
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
                v-if="radioGroup === '2'"
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
                v-if="radioGroup === '1'"
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
                v-if="radioGroup === '2'"
                :items="egyptGovernorates"
                :disabled="radioGroup === '1'"
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
                v-if="radioGroup === '2'"
                :items="regions"
                :disabled="radioGroup === '1'"
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

            <v-col lg="2">
              <v-btn
                :disabled="radioGroup === '2'"
                class="red darken-4 white--text"
                @click="filterProducts"
              >Search</v-btn>
            </v-col>

            <v-col lg="2">
              <v-btn
                :disabled="radioGroup === '1'"
                class="red darken-4 white--text"
                @click="All"
              >All</v-btn>
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
              lg="3"
              md="4"
              sm="6"
              cols="6"
              v-for="filteredProduct in filteredProducts"
              :key="filteredProduct.id"
            >
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 4}`" width="280">
                  <product class="ml-n2 mr-n2" :filteredProduct="filteredProduct"></product>
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
          <v-col cols="6">
            <v-btn large :color="siteColor" class="mb-15 white--text" @click="loadMore">load more</v-btn>
          </v-col>
        </v-col>

        <v-col lg="2" style="max-width: 12%">
          <v-card height="95%">
            <v-card-title>
              <span>ad here</span>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-card>
        <Footer></Footer>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Product from "../components/product.vue";
import Footer from "../components/footer.vue";
import toolBar from "../components/toolbar";
import supplier from "../components/supplier";
import cartTable from "../components/cartTable";
import SiteColor from "../components/siteColor";
// import { component } from 'vue/types/umd';
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
      category: [],
      radioGroup: 1,
      governorate: "",
      region: "",
      isLoading: false,
      fullPage: true,
    };
  },
  async created() {
    this.$store.dispatch("getSiteColor");

    this.doLoading(3000);

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
    siteColor() {
      return this.$store.state.siteColor;
    },
  },

  methods: {
    doLoading(time) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, time);
    },

    filterProducts() {
      this.productFilterFlag = true;
      console.log(this.toolbarSearch, this.categoryName);
      this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
        governorate: this.governorate,
        region: this.region,
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
      this.doLoading(1000);
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
    SiteColor,
    Loading,
  },
};
</script>
<style scoped>
.container {
  max-width: 960px;
}
</style>
