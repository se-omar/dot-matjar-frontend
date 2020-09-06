<template>
  <div class="grey lighten-4">
    <v-app class="grey lighten-4 mr-4">
      <div v-if="currentUser.user_type == 'admin'">
        <SiteColor></SiteColor>
      </div>
      <div class="vld-parent">
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
      </div>

      <v-row class="mt-16" justify="center">
        <v-col lg="10">
          <carousel
            :autoplay="true"
            :per-page="1"
            :centerMode="true"
            :loop="true"
            :navigationEnabled="true"
          >
            <slide>
              <v-img height="370" src="..\assets\images/car1.jpg"></v-img>
            </slide>
            <slide>
              <v-img height="370" src="..\assets\images/car1.jpg"></v-img>
            </slide>
            <slide>
              <v-img height="370" src="..\assets\images/car1.jpg"></v-img>
            </slide>
            <slide>
              <v-img height="370" src="..\assets\images/car1.jpg"></v-img>
            </slide>
          </carousel>
        </v-col>
      </v-row>

      <v-row class="ml-2 mt-n7">
        <v-col lg="2" style="max-width: 12%">
          <v-card height="95%">
            <v-img src="../assets/images/603-150x600.jpg"></v-img>
          </v-card>
        </v-col>

        <v-col lg="9">
          <cartTable class></cartTable>

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
            <v-col cols="6" sm="6" md="6" lg="6">
              <v-text-field :disabled="radioGroup === '2'" dense type="number" label="Price From"></v-text-field>
            </v-col>

            <v-col cols="6" sm="6" md="6" lg="6">
              <v-text-field :disabled="radioGroup === '2'" dense type="number" label="Price TO"></v-text-field>
            </v-col>

            <v-col cols="4" sm="4" md="4" lg="4">
              <v-btn
                :disabled="radioGroup === '2'"
                class="white--text"
                @click="filterProducts"
                :color="siteColor"
                rounded
                max-width="80"
              >Search</v-btn>
            </v-col>

            <v-col cols="4" sm="4" md="4" lg="4">
              <v-btn class="white--text" @click="All" :color="siteColor" rounded>All</v-btn>
            </v-col>

            <v-col cols="4" sm="4" md="4" lg="4">
              <v-btn
                :disabled="radioGroup === '1'"
                class="white--text"
                @click="filterSuppliers"
                :color="siteColor"
                rounded
                max-width="80"
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
              lg="3"
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
            <v-btn large :color="siteColor" class="mb-15 white--text" @click="loadMore">load more</v-btn>
          </v-row>
        </v-col>

        <v-col lg="2" style="max-width: 12%;   resize: both;
  overflow: auto;">
          <v-card
            style="resize: both;
  overflow: auto;"
            min-width="100"
            min-height="300"
            height="500"
          >
            <v-img src="../assets/images/838-150x600.jpg"></v-img>
          </v-card>
        </v-col>
      </v-row>

      <v-card></v-card>
    </v-app>
  </div>
</template>

<script>
import Product from "../components/product.vue";
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
    };
  },
  async created() {
    this.isLoading = true;
    this.$store.commit("removeSupplierPageData");
    await this.$store.dispatch("getSiteColor");

    if (this.loginToken) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getGovernorate");
    await this.$store.dispatch("getProducts", {
      productFilterFlagss: this.productFilterFlag,
      productName: this.toolbarSearch,
      categoryName: this.categoryName,
    });
    await this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
      supplierName: this.supplierName,
      governorate: this.governorate,
      region: this.region,
    });
    this.isLoading = false;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isLoading = false;
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
    async filterProducts() {
      this.isLoading = true;
      this.productFilterFlag = true;
      console.log(this.toolbarSearch, this.categoryName);
      await this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
        governorate: this.governorate,
        region: this.region,
      });
      this.isLoading = false;
    },

    async filterSuppliers() {
      this.isLoading = true;
      this.supplierFilterFlag = true;
      await this.$store.dispatch("filterSuppliers", {
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });
      this.isLoading = false;
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
      this.isLoading = true;
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
      this.isLoading = false;
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
    supplier,
    cartTable,
    SiteColor,
  },
};
</script>
<style scoped>
.container {
  max-width: 960px;
}
</style>
