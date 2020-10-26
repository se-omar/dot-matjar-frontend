<template>
  <v-app>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
    </div>
    <!-- <sideButton
      v-if="this.$route.params.supplier_id == currentUser.user_id"
    ></sideButton> -->

    <v-row
      v-if="supplierPageInfo && supplierPageInfo.show_carousel"
      justify="center"
    >
      <v-col :lg="supplierPageInfo ? supplierPageInfo.carousel_width : 10">
        <carousel
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide v-if="supplierPageInfo && supplierPageInfo.carousel_image_1">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_1"
            ></v-img>
          </slide>
          <slide v-if="supplierPageInfo && supplierPageInfo.carousel_image_2">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_2"
            ></v-img>
          </slide>
          <slide v-if="supplierPageInfo && supplierPageInfo.carousel_image_3">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_3"
            ></v-img>
          </slide>
          <slide v-if="supplierPageInfo && supplierPageInfo.carousel_image_4">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_4"
            ></v-img>
          </slide>
        </carousel>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-16">
      <v-col lg="2" md="3" sm="5" cols="5">
        <v-btn
          v-if="$route.params.supplier_id == currentUser.user_id"
          @click="updatePage"
          :color="siteColor.button_color"
          rounded
        >
          <span
            class="smallerText"
            :style="`color:${siteColor.button_text_color}`"
          >
            {{ $t("supplierPage.updatePage") }}</span
          ></v-btn
        >
      </v-col>
      <v-col lg="2" md="3" sm="5" cols="5">
        <v-btn
          :color="siteColor.button_color"
          @click="
            $router.push(`/${$i18n.locale}/supplierDetails/` + supplier.user_id)
          "
          rounded
        >
          <span
            class="smallerText"
            :style="`color:${siteColor.button_text_color}`"
          >
            {{ $t("supplierPage.supplierDetails") }}</span
          >
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col
        v-if="
          supplierPageInfo.show_left_banner &&
          supplierPageInfo.left_banner_image
        "
        lg="2"
        style="max-width: 12%"
      >
        <v-card height="95%">
          <v-img src="https://picsum.photos/id/237/200/300"></v-img>
        </v-card>
      </v-col> -->
      <!-- category -->
      <v-col lg="2" sm="3" md="2" cols="3">
        <v-card height="95%" style="overflow: hidden" max-width>
          <!-- <v-row justify="center"
            ><v-card-title>Categories</v-card-title>
          </v-row> -->

          <v-row>
            <v-col cols="6" sm="12" lg="10">
              <v-menu
                v-for="category in supplierCategories"
                :key="category"
                offset-x
                :close-on-content-click="false"
                open-on-hover
                :left="leftMenu"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-row class="mx-3" justify="start">
                    <v-col cols="12" lg="12" sm="12">
                      <v-btn
                        width="110%"
                        @mouseover="mouseOver(category)"
                        v-bind="attrs"
                        v-on="on"
                        text
                        @click="filterProductsWithCategory(category)"
                      >
                        <span v-if="$vuetify.breakpoint.xs">
                          <v-row justify="center">
                            <v-col>
                              <span
                                class="mt-1 smallerText"
                                style="font-size: 15px"
                              >
                                {{ category }}</span
                              >

                              <v-btn
                                @click="filterProductsWithCategory(category)"
                                icon
                                style="color: black"
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
                                :class="`fas fa-${category} fa-sm  mr-2 mt-2`"
                              ></i>

                              <span class="mt-1 smallerText">
                                {{ category }}</span
                              >
                            </v-col>
                            <v-row justify="end">
                              <v-col lg="2">
                                <v-btn
                                  @click="filterProductsWithCategory(category)"
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
      <!-- category -->

      <v-col
        :lg="supplierPageInfo && supplierPageInfo.show_right_banner ? 8 : 10"
        sm="7"
        :md="supplierPageInfo && supplierPageInfo.show_right_banner ? 8 : 10"
        cols="7"
      >
        <v-row justify="center">
          <v-btn small :color="siteColor.button_color" @click="getAllProducts">
            <span :style="`color:${siteColor.button_text_color}`">{{
              $t("homePage.allProducts")
            }}</span></v-btn
          >
        </v-row>
        <v-row>
          <v-col
            :class="
              supplierPageInfo && supplierPageInfo.show_right_banner
                ? ''
                : productsClass
            "
            :lg="supplierPageInfo && supplierPageInfo.show_right_banner ? 3 : 3"
            :md="supplierPageInfo && supplierPageInfo.show_right_banner ? 4 : 3"
            cols="9"
            v-for="supplierProduct in supplierProducts"
            :key="supplierProduct.product_id"
          >
            <product
              :minWidth="
                supplierPageInfo &&
                supplierPageInfo.show_right_banner &&
                supplierPageInfo.right_banner_image
                  ? '104%'
                  : '120%'
              "
              :addToCartButton="false"
              :filteredProduct="supplierProduct"
            ></product>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        lg="2"
        v-if="
          supplierPageInfo &&
          supplierPageInfo.show_right_banner &&
          supplierPageInfo.right_banner_image
        "
      >
        <v-card height="95%">
          <v-img :src="nodeHost + supplierPageInfo.right_banner_image"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
//import product from "../components/product";
// import sideButton from "../components/sideButton";

export default {
  name: "supplierPage",
  components: {
    product: () => import("../components/product"),
  },
  data: () => ({
    isLoading: false,
    fullPage: "",
    hover: true,
    size: 45,
    size2: 30,
    starNum: 5,
    rating: 0,
    review: "",
    groupedRatings: [],
    tab: 0,
    tabs: [
      { name: "Products" },
      { name: "Reviews" },
      { name: "Rate Supplier" },
    ],
    supplierProductsSearch: "",
    categoryItems: [],
    productsClass: "mr-4 ml-4",
  }),
  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    supplier() {
      return this.$store.state.SupplierPage.supplier;
    },
    myProducts() {
      return this.$store.state.Dashboard.myProducts;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
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
          footer_color: "white",
          footer_text_color: "black",
        };
      }
    },

    supplierProducts() {
      return this.$store.state.SupplierPage.supplierProducts;
    },
    supplierPageInfo() {
      return this.$store.state.SupplierPage.supplierPageInfo;
    },
    supplierRating() {
      return this.$store.state.SupplierPage.supplierRating;
    },
    supplierReview() {
      return this.$store.state.SupplierPage.supplierReview;
    },
    currentSupplierRatings() {
      return this.$store.state.SupplierPage.currentSupplierRatings;
    },
    barRatingArray() {
      var ar = [0, 0, 0, 0, 0];
      for (var j = 1; j < ar.length + 1; j++) {
        if (this.groupedRatings[j]) {
          ar[j - 1] = this.groupedRatings[j].length * 20;
        }
      }
      return ar;
    },

    reviewsWithText() {
      var ar = [];
      this.currentSupplierRatings.forEach((element) => {
        if (element.review !== "") {
          ar.push(element);
        }
      });
      return ar;
    },
    // category() {
    //   return this.$store.state.Home.category;
    // },
    // categoriesItems() {
    //   return this.$store.state.Home.categoriesItems;
    // },
    supplierCategoriesAndItems() {
      return this.$store.state.SupplierPage.supplierCategoriesAndItems;
    },
    supplierCategories() {
      return this.$store.state.SupplierPage.supplierCategories;
    },
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
    leftMenu() {
      if (this.$store.state.Home.siteLanguage == "en") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    updatePage() {
      this.$router.push(
        `/${this.$i18n.locale}/updateSupplierPage/` +
          this.$route.params.supplier_id
      );
    },

    async submitReview() {
      await this.$store.dispatch("addSupplierReview", {
        supplier_id: this.supplier.user_id,
        user_id: this.currentUser.user_id,
        rating: this.rating,
        review: this.review,
      });
      window.location.reload();
    },

    setValues() {
      this.rating = this.supplierRating;
      this.review = this.supplierReview;
    },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },
    filterSupplierProducts() {
      console.log(this.supplierProductsSearch);
      console.log(this.$route.params.supplier_id);
      this.$store.dispatch("filterSupplierProducts", {
        productsSearch: this.supplierProductsSearch,
        user_id: this.$route.params.supplier_id,
      });
    },
    filterProductsWithCategory(category) {
      console.log(this.category);
      console.log(this.categoriesItems);
      console.log(category);

      this.$store.dispatch("filterProductsWithCategory", {
        categoryName: category,
        user_id: this.$route.params.supplier_id,
        siteLanguage: this.siteLanguage,
      });
    },
    filterProductsWithItem(item) {
      console.log(item);
      this.$store.dispatch("filterProductsWithItem", {
        user_id: this.$route.params.supplier_id,
        itemName: item,
        siteLanguage: this.siteLanguage,
      });
    },
    mouseOver(category) {
      console.log(this.supplierCategories);
      this.categoryItems = [];
      console.log(category);
      // for (var i = 0; i < this.categoriesItems.length; i++) {
      //   if (this.categoriesItems[i].category_name == category) {
      //     this.categoryItems.push(this.categoriesItems[i].category_items);
      //   }
      // }
      if (this.siteLanguage == "en") {
        for (var i = 0; i < this.supplierCategoriesAndItems.length; i++) {
          if (
            this.supplierCategoriesAndItems[i].product_category.category_name ==
            category
          ) {
            this.categoryItems.push(
              this.supplierCategoriesAndItems[i].item_name
            );
          }
        }
      } else {
        for (var x = 0; x < this.supplierCategoriesAndItems.length; x++) {
          if (
            this.supplierCategoriesAndItems[x].product_category
              .category_arabic_name == category
          ) {
            this.categoryItems.push(
              this.supplierCategoriesAndItems[x].category_item
                .category_items_arabic_name
            );
          }
        }
      }
    },
    returnAllProducts() {
      this.$store.commit("returnAllProducts");
    },
    async getAllProducts() {
      await this.$store.dispatch(
        "getSupplierProducts",
        this.$route.params.supplier_id
      );
    },
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
    //this.isLoading = true;
    await this.$store.dispatch("getCurrencies");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getSupplier", this.$route.params.supplier_id);
    console.log("user paramasss", this.$route.params.supplier_id);
    console.log("current user", this.currentUser);

    await this.$store.dispatch(
      "getSupplierPageData",
      this.$route.params.supplier_id
    );
    //this.$store.commit("emptySupplierProducts");

    await this.$store.dispatch(
      "getSupplierProducts",
      this.$route.params.supplier_id
    );
    console.log("supplier products from supplier apge", this.supplierProducts);
    await this.$store.dispatch(
      "getSupplierCategoriesAndItems",
      this.$route.params.supplier_id
    );

    await this.$store.dispatch("getSupplierReview", {
      supplier_id: this.supplier.user_id,
      user_id: this.currentUser.user_id,
    });
    await this.setValues();

    await this.$store.dispatch(
      "getSupplierRatingsArray",
      this.supplier.user_id
    );

    this.groupedRatings = this.groupBy(
      this.currentSupplierRatings,
      (c) => c.rating
    );

    for (var j = 1; j < this.barRatingArray.length + 1; j++) {
      if (this.groupedRatings[j]) {
        this.barRatingArray[j - 1] = this.groupedRatings[j].length * 20;
      }
    }
    console.log(this.barRatingArray);
    await this.$store.dispatch("categoriesDB");
    await this.$store.dispatch("getCategoryItems");
    this.isLoading = false;
    console.log("supplier info", this.supplier);
    this.isLoading = false;
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");

#image {
  border-radius: 50%;
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