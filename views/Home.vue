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
    <!-- <v-row>
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
    </v-row> -->
    <!-- search woth supplier and proucts -->
    <!-- <v-col>
      <v-btn @click="advancedSearch = true">Expand Search Options</v-btn>
    </v-col> -->
    <v-dialog style="overflow: hidden" v-model="advancedSearch" max-width="80%">
      <v-card style="overflow: hidden">
        <v-row justify="center">
          <v-radio-group
            style="margin-right: 50px"
            mandatory
            :value="radioGroup"
          >
            <v-row class="mb-n5" justify="center">
              <v-col @click="changeRadioGroup()" cols="3" lg="4" sm="5" md="5">
                <v-radio
                  style="font-family: 'lalezar', cursive; font-size: 25px"
                  :label="$t('toolbar.searchProducts')"
                  value="1"
                ></v-radio>
              </v-col>

              <v-col cols="3" lg="4" sm="5" md="5">
                <v-radio
                  :label="$t('toolbar.searchSuppliers')"
                  value="2"
                ></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" sm="1" lg="2"></v-col>
          <v-col cols="3" lg="4" sm="5" md="3">
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

          <v-col cols="3" lg="4" sm="5" md="3">
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
          <v-col lg="2" sm="1" cols="3"></v-col>
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
              v-model="priceFrom"
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
              v-model="priceTo"
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
              @click="filterProducts('search')"
              :color="siteColor"
              rounded
              max-width="80"
              >Search</v-btn
            >
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
          <v-col lg="5" sm="3" md="3"></v-col>
          <v-col cols="4" sm="2" md="2" lg="2">
            <v-btn
              class="white--text"
              @click="filterProducts"
              :color="siteColor.button_color"
              rounded
              x-large
              ><span :style="`color: ${siteColor.button_text_color}`"
                >Search</span
              ></v-btn
            >
          </v-col>
          <!-- <v-col cols="4" sm="2" md="2" lg="2">
            <v-btn
              class="white--text"
              @click="All"
              :color="siteColor.button_color"
              rounded
              ><span :style="`color: ${siteColor.button_text_color}`"
                >All</span
              ></v-btn
            >
          </v-col> -->

          <v-col cols="4" sm="2" md="2" lg="5">
            <!-- <v-btn
              :disabled="radioGroup === '1'"
              class="white--text"
              @click="filterSuppliers"
              :color="siteColor.button_color"
              :style="`color: ${siteColor.button_text_color}`"
              rounded
              max-width="80"
              ><span :style="`color: ${siteColor.button_text_color}`"
                >Search</span
              ></v-btn
            > -->
          </v-col>
          <v-col sm="3" lg="3" md="3"></v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- <v-row justify="center">
      <v-col cols="3" class="ml-4">
        <v-card class="ml-2" max-width="250">
          <v-row justify="center"
            ><v-card-title>Categories</v-card-title>
          </v-row>
          <v-divider class="mx-16"></v-divider>
          
        </v-card>
      </v-col>
      <v-col cols="11"></v-col>
      // Current 
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
    </v-row> -->

    <v-row v-if="homePageInfo.show_carousel" justify="center">
      <v-col :lg="homePageInfo ? homePageInfo.carousel_width : 10">
        <carousel
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide v-if="homePageInfo.carousel_image_1">
            <v-img
              :height="homePageInfo ? homePageInfo.carousel_height : 400"
              :src="nodeHost + homePageInfo.carousel_image_1"
            ></v-img>
          </slide>
          <slide v-if="homePageInfo.carousel_image_2">
            <v-img
              :height="homePageInfo ? homePageInfo.carousel_height : 400"
              :src="nodeHost + homePageInfo.carousel_image_2"
            ></v-img>
          </slide>
          <slide v-if="homePageInfo.carousel_image_3">
            <v-img
              :height="homePageInfo ? homePageInfo.carousel_height : 400"
              :src="nodeHost + homePageInfo.carousel_image_3"
            ></v-img>
          </slide>
          <slide v-if="homePageInfo.carousel_image_4">
            <v-img
              :height="homePageInfo ? homePageInfo.carousel_height : 400"
              :src="nodeHost + homePageInfo.carousel_image_4"
            ></v-img>
          </slide>
        </carousel>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col lg="9">
        <v-radio-group mandatory :value="radioGroup">
          <v-row class="mb-n5" justify="center">
            <v-col lg="3">
              <v-radio @change="changeRadioGroup" value="1"
                ><template v-slot:label>
                  <p class="mt-4">
                    {{ $t("toolbar.searchProducts") }}
                  </p>
                </template>
              </v-radio>
            </v-col>

            <v-col lg="3">
              <v-radio @change="changeRadioGroup" value="2">
                <template v-slot:label>
                  <p class="mt-4">
                    {{ $t("toolbar.searchSuppliers") }}
                  </p>
                </template>
              </v-radio>
            </v-col>

            <v-col lg="2" class="mt-2">
              <v-btn small :color="siteColor.button_color" @click="All">
                <span :style="`color: ${siteColor.button_text_color}`">{{
                  $t("homePage.allProducts")
                }}</span></v-btn
              >
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row
      :justify="homePageInfo.show_right_banner == 1 ? 'space-between' : 'start'"
      class="mt-n7"
    >
      <v-col lg="2" sm="4" md="2" cols="4">
        <v-card class="ml-4" height="95%" style="overflow: hidden" max-width>
          <!-- <v-row justify="center"
            ><v-card-title>Categories</v-card-title>
          </v-row> -->

          <v-row>
            <v-col cols="12" sm="12" lg="12">
              <v-menu
                v-for="(category, index) in category"
                :key="index"
                open-on-hover
                offset-x
                :left="rtlMenuCondition"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-row class="mx-2" justify="start">
                    <v-col cols="12" lg="10" sm="12">
                      <v-btn
                        width="110%"
                        @mouseover="mouseOver(category.name)"
                        v-bind="attrs"
                        v-on="on"
                        text
                        @click="filterProductsWithCategory(category.name)"
                      >
                        <span v-if="$vuetify.breakpoint.xs">
                          <v-row justify="start">
                            <v-col>
                              <span
                                class="mt-1 smallerText"
                                style="font-size: 14px"
                              >
                                {{ category.name }}</span
                              >

                              <v-btn
                                @click="
                                  filterProductsWithCategory(category.name)
                                "
                                icon
                                style="overflow: hidden; color: black"
                              >
                                <i
                                  v-if="siteLanguage == 'en'"
                                  class="fa fa-chevron-right"
                                ></i>
                                <i v-else class="fa fa-chevron-left"></i>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </span>
                        <span v-else>
                          <v-row justify="start">
                            <v-col lg="5">
                              <i
                                :class="`fas fa-${category.icon} fa-sm  mr-2 mt-2`"
                              ></i>

                              <span class="mt-1 smallerText">
                                {{ category.name }}</span
                              >
                            </v-col>
                            <v-row justify="end">
                              <v-col lg="2">
                                <v-btn
                                  @click="
                                    filterProductsWithCategory(category.name)
                                  "
                                  icon
                                  style="overflow: hidden; color: black"
                                  text
                                >
                                  <i
                                    v-if="siteLanguage == 'en'"
                                    class="fa fa-chevron-right"
                                  ></i>
                                  <i v-else class="fa fa-chevron-left"></i>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-row>
                        </span>
                      </v-btn>
                    </v-col>
                    <!-- <v-col lg="3" sm="4"> </v-col> -->
                  </v-row>
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
                      <span class="smallerText" style="color: black">
                        {{ item }}</span
                      >
                    </v-btn>
                  </v-list>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- <v-col lg="8" sm="5" md="7"> -->
      <v-col
        :class="
          this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
            ? 'mr-15'
            : ''
        "
        :lg="homePageInfo.show_right_banner ? 8 : 10"
        sm="6"
        cols="6"
        :md="homePageInfo.show_right_banner ? 8 : 10"
      >
        <v-row
          justify-lg="start"
          justify-md="center"
          justify-sm="start"
          v-if="radioGroup === '1' && filteredProducts.length > 0"
        >
          <v-col
            :class="homePageInfo.show_right_banner ? '' : productsClass"
            :lg="homePageInfo.show_right_banner ? 3 : 2"
            :md="homePageInfo.show_right_banner ? 4 : 3"
            xmd="4"
            sm="10  "
            cols="12"
            v-for="(filteredProduct, index) in filteredProducts"
            :key="index"
          >
            <product
              class="ml-n2 mr-n2"
              :currentUser="currentUser"
              :minWidth="homePageInfo.show_right_banner ? '100%' : '110%'"
              :filteredProduct="filteredProduct"
            ></product>
          </v-col>
        </v-row>

        <v-row v-else-if="radioGroup == '1'" justify="center">
          <p class="display-1">no products found</p>
        </v-row>

        <v-row v-if="radioGroup === '2'">
          <v-col
            v-for="(supplier, index) in suppliers"
            :key="index"
            :class="homePageInfo.show_right_banner ? '' : productsClass"
            :lg="homePageInfo.show_right_banner ? 3 : 2"
            :md="homePageInfo.show_right_banner ? 4 : 3"
            sm="11"
            cols="11"
          >
            <supplier
              :show_right_banner="homePageInfo.show_right_banner"
              :supplier="supplier"
            ></supplier>
          </v-col>
        </v-row>
        <v-row
          v-if="
            (filteredProducts.length > 0 && radioGroup == '1') ||
            (suppliers.length > 0 && radioGroup == '2')
          "
          justify="center"
        >
          <v-btn
            v-if="radioGroup == '2'"
            small
            :color="siteColor.button_color"
            class="mb-15"
            @click="filterProducts('loadmore')"
          >
            <span :style="`color: ${siteColor.button_text_color}`">
              {{ $t("homePage.loadMore") }}</span
            ></v-btn
          >
          <v-btn
            v-else
            small
            :color="siteColor.button_color"
            class="mb-15"
            @click="loadmoreProducts()"
          >
            <span :style="`color: ${siteColor.button_text_color}`">
              {{ $t("homePage.loadMore") }}</span
            ></v-btn
          >

          <!-- <v-btn
            v-else-if="radioGroup == '2'"
            small
            :color="siteColor.button_color"
            :style="`color: ${siteColor.button_text_color}`"
            class="mb-15 white--text"
            @click="loadMore"
          >
            <span> {{ $t("homePage.loadMore") }}</span></v-btn
          > -->
        </v-row>
      </v-col>

      <v-col
        :class="{ 'ml-n15': $vuetify.breakpoint.smAndDown }"
        v-if="homePageInfo.show_right_banner && homePageInfo.right_banner_image"
        lg="2"
        sm="2"
        md="2"
        cols="2"
      >
        <v-card height="95%">
          <v-img :src="nodeHost + homePageInfo.right_banner_image"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// import SiteColor from "../components/siteColor";
// import { component } from 'vue/types/umd';
//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  data() {
    return {
      offset: true,
      toolbarSearch: "",
      categoryName: "",
      supplierName: "",
      supplierLocation: "",
      items: [],
      productFilterFlag: false,
      supplierFilterFlag: false,
      // category: [],
      // radioGroup:1,
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
      priceFrom: "",
      priceTo: "",
      advancedSearch: false,
      productsClass: "mr-4 ml-4",
    };
  },
  async created() {
    this.isLoading = true;
    console.log("dotenvvvvv", this.nodeHost);
    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch("getCurrencies");
    await this.$store.dispatch("categoriesDB");
    await this.$store.dispatch("getCategoryItems");

    this.$store.dispatch("removeSupplierPageData");
    await this.$store.dispatch("getSiteColor");
    console.log("site color is from", localStorage.getItem("siteColor"));
    await this.$store.dispatch("getHomePageData");
    if (localStorage.getItem("loginToken")) {
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
    console.log("filtered products", this.filteredProducts);
    await this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
      supplierName: this.supplierName,
      governorate: this.governorate,
      region: this.region,
    });

    console.log("Category itemssssss in in in ", this.categoriesItems);
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
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },
    category() {
      return this.$store.state.Home.category;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },
    homePageInfo() {
      return this.$store.state.Home.homePageInfo;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },

    radioGroup() {
      return this.$store.state.Home.radioGroup;
    },
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
    rtlMenuCondition() {
      if (this.siteLanguage == "en") {
        return false;
      } else {
        return true;
      }
    },
    availableCountries() {
      return this.$store.state.Home.availableCountries;
    },
  },
  methods: {
    async filterProducts(buttonPressed) {
      // this.isLoading = true;
      // debugger
      this.productFilterFlag = true;
      console.log(this.toolbarSearch, this.categoryName);

      await this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
        governorate: this.governorate,
        region: this.region,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        product_id:
          buttonPressed == "search"
            ? this.products[0].product_id
            : this.filteredProducts[this.filteredProducts.length - 1]
                .product_id,
        buttonPressed,
      });
      if (this.supplierName) {
        await this.$store.dispatch("filterSuppliers", {
          supplierName: this.supplierName,
          governorate: this.governorate,
          region: this.region,
        });
      }

      this.isLoading = false;
    },
    async loadmoreProducts() {
      this.$store.dispatch("loadmoreProducts", {
        id:
          this.filteredProducts.length > 0
            ? this.filteredProducts[this.filteredProducts.length - 1].product_id
            : 0,
      });
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

    async loadMore() {
      console.log("clicked");
      this.isLoading = true;
      var self = this;
      self.$store.dispatch("getSuppliers", {
        supplierFilterFlag: this.supplierFilterFlag,
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });

      this.isLoading = false;
    },

    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    async All() {
      await this.$store.commit("loadMoreType", { name: "all", type: "all" });
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
      await this.$store.dispatch("getSuppliers", {
        supplierFilterFlag: this.supplierFilterFlag,
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });
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
      console.log(this.siteLanguage);
      if (this.siteLanguage == "en") {
        for (let i = 0; i < this.categoriesItems.length; i++) {
          if (this.categoriesItems[i].category_name == name) {
            this.categoryItems.push(this.categoriesItems[i].category_items);
          }
        }
      } else {
        for (let i = 0; i < this.categoriesItems.length; i++) {
          if (this.categoriesItems[i].category_arabic_name == name) {
            console.log(
              "test",
              this.categoriesItems[i].category_arabic_name,
              name
            );
            this.categoryItems.push(
              this.categoriesItems[i].category_items_arabic_name
            );
          }
        }
      }
      console.log("category itemsis", this.categoryItems);
      console.log("categories item", this.categoriesItems);
    },
    async filterProductsWithItem(item) {
      console.log(item);
      await this.$store.dispatch("filterProducts", {
        categoryItem: item,
        buttonPressed: "search",
        product_id: 0,
      });
      this.$store.commit("loadMoreType", { name: item, type: "item" });
    },
    async filterProductsWithCategory(category) {
      await this.$store.dispatch("filterProducts", {
        category_name: category,
        buttonPressed: "search",
        product_id: 0,
      });
      console.log(category);
      this.$store.commit("loadMoreType", {
        name: category,
        type: "category",
      });
    },
    testModule() {
      this.$store.dispatch("testAct", "assdfsaf");
      console.log(this.$store.state.test.testVar);
    },
    changeRadioGroup() {
      if (this.radioGroup == "1") {
        this.$store.commit("changeRadioGroup", "2");
      } else {
        this.$store.commit("changeRadioGroup", "1");
      }

      console.log("test");
      console.log(this.radioGroup);
    },
  },
  components: {
    product: () => import("../components/product"),
    supplier: () => import("../components/supplier"),

    // SiteColor,
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@500&display=swap");
.container {
  max-width: 960px;
}
.v-btn__content {
  background-color: red;
}
.padding-0 {
  padding-right: 0;
  padding-left: 0;
}
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 19px;
}
.smallerText {
  font-size: 15px;
}
</style>

