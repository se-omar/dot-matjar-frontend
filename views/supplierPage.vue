<template>
  <v-app class="pr-8">
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
    <v-row justify="center">
      <v-btn
        v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
        small
        :color="siteColor.button_color"
        @click="filterDialog = true"
        :style="`color:${siteColor.button_text_color}`"
        ><i
          class="fa fa-filter fa-sm"
          :style="`color:${siteColor.button_text_color}`"
        ></i
        ><span class="smallerText">{{ $t("supplierPage.filter") }}</span></v-btn
      >
      <v-dialog v-model="filterDialog">
        <v-card height="95%" style="overflow: hidden" max-width>
          <v-row justify="center"
            ><v-card-title>{{ $t("supplierPage.category") }}</v-card-title>
          </v-row>

          <v-row>
            <v-col class="ml-2">
              <v-treeview
                return-object
                item-key="id"
                hoverable
                activatable
                selected-color="red"
                @update:active="filterByCategory"
                color="warning"
                :items="supplierCategoriesTreeArray"
                style="cursor: pointer"
              >
              </v-treeview>
              <template slot-scope="{ item }">
                <v-btn
                  style="cursor: pointer"
                  @click="filterByCategory(item)"
                  >{{ item.name }}</v-btn
                >
              </template>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="start">
      <v-col
        lg="2"
        sm="3"
        md="2"
        cols="4"
        v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
      >
        <v-card height="95%" style="overflow: hidden">
          <v-row justify="center"
            ><v-card-title>{{ $t("addProduct.category") }}</v-card-title>
          </v-row>

          <v-row>
            <v-col class="ml-2">
              <v-treeview
                return-object
                item-key="id"
                hoverable
                activatable
                selected-color="red"
                @update:active="filterByCategory"
                color="warning"
                :items="supplierCategoriesTreeArray"
                style="cursor: pointer"
              >
              </v-treeview>
              <template slot-scope="{ item }">
                <v-btn
                  style="cursor: pointer"
                  @click="filterByCategory(item)"
                  >{{ item.name }}</v-btn
                >
              </template>
            </v-col>
          </v-row>
          <v-row class="ml-8">
            <v-btn text @click="getAllProducts"
              ><span class="smallerText">{{
                $t("homePage.allProducts")
              }}</span></v-btn
            >
          </v-row>
        </v-card>
      </v-col>
      <!-- category -->

      <v-col
        :lg="supplierPageInfo && supplierPageInfo.show_right_banner ? 8 : 10"
        sm="8"
        :md="supplierPageInfo && supplierPageInfo.show_right_banner ? 8 : 10"
        cols="12"
      >
        <v-row justify="center" class="mt-10">
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

          <v-btn
            :color="siteColor.button_color"
            @click="
              $router.push(
                `/${$i18n.locale}/supplierDetails/` + supplier.user_id
              )
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
          <!-- 
          <v-col lg="2" md="3" sm="5" cols="5">
            <v-btn
              rounded
              :color="siteColor.button_color"
              @click="getAllProducts"
            >
              <span :style="`color:${siteColor.button_text_color}`">{{
                $t("homePage.allProducts")
              }}</span></v-btn
            >
          </v-col> -->
        </v-row>

        <v-row
          :justify="
            supplierPageInfo && supplierPageInfo.show_right_banner
              ? 'space-between'
              : 'center'
          "
        >
          <v-col
            :lg="supplierPageInfo && supplierPageInfo.show_right_banner ? 4 : 3"
            :md="supplierPageInfo && supplierPageInfo.show_right_banner ? 4 : 3"
            v-for="(supplierProduct, index) in supplierProducts"
            :key="index"
            cols="6"
            sm="6"
          >
            <product
              :minWidth="
                supplierPageInfo &&
                supplierPageInfo.show_right_banner &&
                supplierPageInfo.right_banner_image
                  ? '104%'
                  : '100%'
              "
              :addToCartButton="false"
              :filteredProduct="supplierProduct"
            ></product>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="
          supplierPageInfo &&
          supplierPageInfo.show_right_banner &&
          supplierPageInfo.right_banner_image
        "
        lg="2"
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
    productsClass: "mr-2 ml-2",
    filterDialog: false,
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
      var colorInfo = this.$store.state.Home.siteColor;
      if (this.$store.state.Home.siteColor) {
        return {
          button_text_color: colorInfo.button_text_color
            ? colorInfo.button_text_color
            : "black",
          button_color: colorInfo.button_color
            ? colorInfo.button_color
            : "white",
          toolbar_color: colorInfo.toolbar_color
            ? colorInfo.toolbar_color
            : "white",
          toolbar_text_color: colorInfo.toolbar_text_color
            ? colorInfo.toolbar_text_color
            : "black",
          footer_color: colorInfo.footer_color
            ? colorInfo.footer_color
            : "white",
          footer_text_color: colorInfo.footer_text_color
            ? colorInfo.footer_text_color
            : "black",
        };
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
    supplierCategoriesTreeArray() {
      return this.$store.state.SupplierPage.supplierCategoriesTreeArray;
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
      this.$store.dispatch("filterSupplierProducts", {
        productsSearch: this.supplierProductsSearch,
        user_id: this.$route.params.supplier_id,
      });
    },
    // filterProductsWithCategory(category) {
    //   this.$store.dispatch("filterProductsWithCategory", {
    //     categoryName: category,
    //     user_id: this.$route.params.supplier_id,
    //     siteLanguage: this.siteLanguage,
    //   });
    // },
    // filterProductsWithItem(item) {
    //   this.$store.dispatch("filterProductsWithItem", {
    //     user_id: this.$route.params.supplier_id,
    //     itemName: item,
    //     siteLanguage: this.siteLanguage,
    //   });
    // },
    // mouseOver(category) {
    //   this.categoryItems = [];

    //   // for (var i = 0; i < this.categoriesItems.length; i++) {
    //   //   if (this.categoriesItems[i].category_name == category) {
    //   //     this.categoryItems.push(this.categoriesItems[i].category_items);
    //   //   }
    //   // }
    //   if (this.siteLanguage == "en") {
    //     for (var i = 0; i < this.supplierCategoriesAndItems.length; i++) {
    //       if (
    //         this.supplierCategoriesAndItems[i].product_category.category_name ==
    //         category
    //       ) {
    //         this.categoryItems.push(
    //           this.supplierCategoriesAndItems[i].item_name
    //         );
    //       }
    //     }
    //   } else {
    //     for (var x = 0; x < this.supplierCategoriesAndItems.length; x++) {
    //       if (
    //         this.supplierCategoriesAndItems[x].product_category
    //           .category_arabic_name == category
    //       ) {
    //         this.categoryItems.push(
    //           this.supplierCategoriesAndItems[x].category_item
    //             .category_items_arabic_name
    //         );
    //       }
    //     }
    //   }
    //   console.log(this.categoryItems);
    // },
    returnAllProducts() {
      this.$store.commit("returnAllProducts");
    },
    async getAllProducts() {
      await this.$store.dispatch(
        "getSupplierProducts",
        this.$route.params.supplier_id
      );
    },

    filterByCategory(catAr) {
      console.log(catAr);
      this.$store.dispatch("filterSupplierProducts", {
        categoryArray: catAr,
        supplier_id: this.$route.params.supplier_id,
        searchType: "category",
        productsSearch: "",
      });
    },
  },
  async created() {
    // await this.$store.dispatch("getSiteColor");
    //this.isLoading = true;
    await this.$store.dispatch("getCurrencies");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch(
      "getSupplierCategoriesTree",
      this.$route.params.supplier_id
    );
    await this.$store.dispatch("getSupplier", this.$route.params.supplier_id);

    await this.$store.dispatch(
      "getSupplierPageData",
      this.$route.params.supplier_id
    );
    //this.$store.commit("emptySupplierProducts");

    await this.$store.dispatch(
      "getSupplierProducts",
      this.$route.params.supplier_id
    );

    // await this.$store.dispatch(
    //   "getSupplierCategoriesAndItems",
    //   this.$route.params.supplier_id
    // );

    await this.$store.dispatch("getSupplierReview", {
      supplier_id: this.supplier.user_id,
      user_id: this.currentUser.user_id,
    });
    console.log(
      "supplier categories and items",
      this.supplierCategoriesAndItems
    );
    await this.setValues();

    await this.$store.dispatch(
      "getSupplierRatingsArray",
      this.supplier.user_id
    );

    this.groupedRatings = this.groupBy(
      this.currentSupplierRatings,
      (c) => c.rating
    );
    console.log("colors iss", this.siteColor);
    for (var j = 1; j < this.barRatingArray.length + 1; j++) {
      if (this.groupedRatings[j]) {
        this.barRatingArray[j - 1] = this.groupedRatings[j].length * 20;
      }
    }

    await this.$store.dispatch("categoriesDB");
    // await this.$store.dispatch("getCategoryItems");
    this.isLoading = false;
  },
};
</script>
<style scoped>
#image {
  border-radius: 50%;
}
</style>
