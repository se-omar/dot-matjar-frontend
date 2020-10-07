<template>
  <v-app>
    <div v-if="currentUser.user_type == 'admin'"></div>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></loading>
    </div>
    <!-- testin g sub mrnu  -->
    <!-- <v-row justify="center">
      <v-col cols="6">
        <v-text-field
          append-icon="fa fa-search"
          :color="siteColor"
          outlined
          rounded
          placeholder="What are you looking for ?"
          @keyup="emptySearchBox"
          v-model="toolbarSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="1" sm="6" lg="1">
        <v-btn
          class="white--text mt-3"
          @click="filterProducts"
          :color="siteColor"
          rounded
          max-width="80"
          >Search</v-btn
        >
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <span></span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span></span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span></span>
      </v-col>
    </v-row>
    <!-- search woth supplier and proucts -->
    <v-row justify="center">
      <v-radio-group style="margin-right: 50px" mandatory v-model="radioGroup">
        <v-row class="mb-n5" justify="center">
          <v-col cols="3" lg="4" sm="5" md="5">
            <v-radio label="Search for Products" value="1"></v-radio>
          </v-col>

          <v-col cols="3" lg="4" sm="5" md="5">
            <v-radio label="Search for suppliers" value="2"></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
    </v-row>
    <v-row justify="center">
      <v-col cols="3" sm="2" lg="3"></v-col>
      <v-col cols="3" lg="3" sm="4" md="3">
        <v-select
          rounded
          v-if="radioGroup === '1'"
          :items="egyptGovernorates"
          :disabled="radioGroup === '2'"
          placeholder="Governorate"
          dense
          outlined
          v-model="governorate"
          @change="getCountryRegions()"
        ></v-select>
      </v-col>

      <v-col cols="3" lg="3" sm="4" md="3">
        <v-select
          rounded
          v-if="radioGroup === '1'"
          :items="regions"
          :disabled="radioGroup === '2'"
          placeholder="Region"
          dense
          outlined
          v-model="region"
        ></v-select>
      </v-col>
      <v-col lg="3" cols="3" sm="2"></v-col>
      <v-col cols="2" lg="3" sm="4" md="4">
        <v-select
          rounded
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

      <v-col cols="2" lg="3" sm="4" md="4">
        <v-text-field
          rounded
          v-if="radioGroup === '2'"
          :disabled="radioGroup === '1'"
          @keyup="emptySupplierName"
          dense
          outlined
          v-model="supplierName"
          placeholder="Search Suppliers by Name"
        ></v-text-field>
      </v-col>
      <v-col lg="3" cols="2" sm="4" md="4">
        <v-select
          rounded
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
      <v-col sm="3" lg="3" md="3"></v-col>
      <v-col cols="6" sm="3" md="3" lg="3">
        <v-text-field
          :disabled="radioGroup === '2'"
          dense
          rounded
          outlined
          type="number"
          label="Price From"
        ></v-text-field>
      </v-col>

      <v-col cols="6" sm="3" md="3" lg="3">
        <v-text-field
          :disabled="radioGroup === '2'"
          dense
          outlined
          rounded
          type="number"
          label="Price TO"
        ></v-text-field>
      </v-col>
      <v-col sm="3" lg="3" md="3"></v-col>
      <v-col lg="3" sm="3" md="3"></v-col>
      <v-col cols="4" sm="2" md="2" lg="2">
        <v-btn
          :disabled="radioGroup === '2'"
          class="white--text"
          @click="filterProducts"
          :color="siteColor"
          rounded
          max-width="80"
          >Search</v-btn
        >
      </v-col>

      <v-col cols="4" sm="2" md="2" lg="2">
        <v-btn class="white--text" @click="All" :color="siteColor" rounded
          >All</v-btn
        >
      </v-col>

      <v-col cols="4" sm="2" md="2" lg="2">
        <v-btn
          :disabled="radioGroup === '1'"
          class="white--text"
          @click="filterSuppliers"
          :color="siteColor"
          rounded
          max-width="80"
          >Search</v-btn
        >
      </v-col>
      <v-col sm="3" lg="3" md="3"></v-col>
    </v-row>
    <v-row justify="center">
      <!-- <v-col cols="3" class="ml-4">
        <v-card class="ml-2" max-width="250">
          <v-row justify="center"
            ><v-card-title>Categories</v-card-title>
          </v-row>
          <v-divider class="mx-16"></v-divider>
          <v-col cols="12" v-for="category in category" :key="category">
            <v-menu offset-x :close-on-content-click="false" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @mouseover="mouseOver(category)"
                  v-bind="attrs"
                  v-on="on"
                  text
                  @click="filterProductsWithCategory(category)"
                >
                  <i :class="`fas fa-${category} fa-2x mr-4`"></i>
                  {{ category }}
                  <i class="fa fa-chevron-right ml-4" aria-hidden="true"></i>
                </v-btn>
              </template>
              <v-card>
                <v-list v-for="item in categoryItems" :key="item">
                  <v-btn
                    class="black--text"
                    @click="filterProductsWithItem(item)"
                    text
                  >
                    -
                    <i :class="`fa fa-${item} fa-lg ml-2 mr-2`"></i>
                    {{ item }}
                  </v-btn>
                </v-list>
              </v-card>
            </v-menu>
          </v-col>
        </v-card>
      </v-col> -->
      <v-col cols="11">
        <carousel
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide>
            <v-img height="400" src="..\assets\images/download.jpg"></v-img>
          </slide>
          <slide>
            <v-img height="400" src="..\assets\images/download.jpg"></v-img>
          </slide>
          <slide>
            <v-img height="400" src="..\assets\images/download.jpg"></v-img>
          </slide>
          <slide>
            <v-img height="400" src="..\assets\images/download.jpg"></v-img>
          </slide>
        </carousel>
      </v-col>
      <v-col cols="1" class="mr-n10" v-if="currentUser.user_type == 'admin'">
        <SiteColor disabled></SiteColor>
      </v-col>
    </v-row>

    <v-row class="ml-8 mt-n7">
      <v-col lg="1" sm="3" md="3">
        <v-card height="95%">
          <!-- <v-row justify="center"
            ><v-card-title>Categories</v-card-title>
          </v-row> -->
          <v-divider class="mx-16"></v-divider>

          <v-row>
            <v-col
              cols="6"
              sm="12"
              lg="12"
              v-for="category in category"
              :key="category"
            >
              <v-menu offset-x :close-on-content-click="false" open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                  <v-row justify="center">
                    <v-card-actions>
                      <v-btn
                        @mouseover="mouseOver(category)"
                        v-bind="attrs"
                        v-on="on"
                        text
                        @click="filterProductsWithCategory(category)"
                      >
                        <i :class="`fas fa-${category} fa-lg `"></i>
                        <span style="font-size: 15px"> {{ category }}</span>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </template>
                <v-card>
                  <v-list
                    class="ml-2"
                    v-for="item in categoryItems"
                    :key="item"
                  >
                    <v-btn
                      class="black--text"
                      @click="filterProductsWithItem(item)"
                      text
                    >
                      -
                      <i :class="`fa fa-${item} fa-lg ml-2 mr-2`"></i>
                      {{ item }}
                    </v-btn>
                  </v-list>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col lg="9" sm="7" md="7">
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

        <v-row class="ml-7 mr-7" v-if="radioGroup === '1'">
          <v-col
            lg="3"
            md="6"
            xmd="4"
            sm="12"
            cols="12"
            v-for="(filteredProduct, index) in filteredProducts"
            :key="index"
          >
            <product
              class="ml-n2 mr-n2"
              :currentUser="currentUser"
              :filteredProduct="filteredProduct"
            ></product>
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
            <supplier :supplier="supplier"></supplier>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            large
            :color="siteColor"
            class="mb-15 white--text"
            @click="loadMore"
            >load more</v-btn
          >
        </v-row>
      </v-col>

      <v-col lg="2" sm="2" md="2">
        <v-card height="95%">
          <v-img src="../assets/images/603-150x600.jpg"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Product from "../components/product.vue";
import supplier from "../components/supplier";

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
      // category: [],
      radioGroup: 1,
      governorate: "",
      region: "",
      isLoading: false,
      categoryItems: [],
      categoryItem: "",
      // testCategories: [
      //   { name: "Clothing", icon: "fa fa-user-tie fa-2x ml-2" },
      //   { name: "Furniture", icon: "fa fa-couch fa-2x ml-2" },
      //   { name: "Labtops", icon: "fa fa-laptop fa-2x ml-2" },
      //   { name: "Mobile Phones", icon: "fa fa-mobile fa-2x ml-2" },
      //   { name: "Cars", icon: "fa fa-car fa-2x ml-2" },
      // ],
      menuButton: false,
    };
  },
  async created() {
    await this.$store.dispatch("categoriesDB");
    await this.$store.dispatch("getCategoryItems");
    this.isLoading = true;
    this.$store.dispatch("removeSupplierPageData");
    await this.$store.dispatch("getSiteColor");
    console.log(this.loginToken);
    if (this.loginToken) {
      console.log("x");
      await this.$store.dispatch("refreshCurrentUser");
    }
    this.$store.commit("emptyProductsArray");
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
        // this.$store.dispatch("categoriesDB");
        resolve();
      });
    });
  },

  computed: {
    products() {
      return this.$store.state.Home.products;
    },
    filteredProducts() {
      return this.$store.state.Home.filteredProducts;
    },
    suppliers() {
      return this.$store.state.Home.suppliers;
    },
    regions() {
      return this.$store.state.Home.regions;
    },
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    loginToken() {
      return this.$store.state.RegisterLogin.loginToken;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return "red darken-4";
      }
    },
    category() {
      return this.$store.state.Home.category;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
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
      console.log(this.categoryName);
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

    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    All() {
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
    },
    gettingCategoryItems() {
      console.log("categoriestems", this.categoriesItems);
      console.log(this.categoryName);
      console.log(this.categoryItems);
      this.categoryItems = [];
      for (let i = 0; i < this.categoriesItems.length; i++) {
        if (this.categoriesItems[i].category_name == this.categoryName) {
          this.categoryItems.push(this.categoriesItems[i].category_items);
        }
      }
      console.log(this.categoryItems);
    },
    mouseOver(name) {
      this.categoryItems = [];
      console.log(name);
      for (let i = 0; i < this.categoriesItems.length; i++) {
        if (this.categoriesItems[i].category_name == name) {
          this.categoryItems.push(this.categoriesItems[i].category_items);
        }
      }
      console.log("category itemsis", this.categoryItems);
    },
    filterProductsWithItem(item) {
      console.log(item);
      this.$store.dispatch("filterProducts", { categoryItem: item });
    },
    filterProductsWithCategory(category) {
      console.log(category);
      this.$store.dispatch("filterProducts", { category_name: category });
    },
    testModule() {
      this.$store.dispatch("testAct", "assdfsaf");
      console.log(this.$store.state.test.testVar);
    },
  },
  components: {
    Product,
    supplier,

    SiteColor,
  },
};
</script>
<style scoped>
.container {
  max-width: 960px;
}
</style>
