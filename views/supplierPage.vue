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

    <v-row v-if="supplierPageInfo.show_carousel" justify="center">
      <v-col :lg="supplierPageInfo ? supplierPageInfo.carousel_width : 10">
        <carousel
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide v-if="supplierPageInfo.carousel_image_1">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_1"
            ></v-img>
          </slide>
          <slide v-if="supplierPageInfo.carousel_image_2">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_2"
            ></v-img>
          </slide>
          <slide v-if="supplierPageInfo.carousel_image_3">
            <v-img
              :height="
                supplierPageInfo ? supplierPageInfo.carousel_height : 400
              "
              :src="nodeHost + supplierPageInfo.carousel_image_3"
            ></v-img>
          </slide>
          <slide v-if="supplierPageInfo.carousel_image_4">
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
      <v-col cols="2">
        <v-btn
          v-if="supplier.user_id == currentUser.user_id"
          @click="updatePage"
          :color="siteColor.button_color"
          rounded
          ><span :style="`color:${siteColor.button_text_color}`"
            >Update My page</span
          ></v-btn
        >
      </v-col>
      <v-col cols="2">
        <v-btn
          :color="siteColor.button_color"
          @click="$router.push('/supplierDetails/' + supplier.user_id)"
          rounded
        >
          <span :style="`color:${siteColor.button_text_color}`">
            Supplier Details</span
          >
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col
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
      </v-col>

      <v-col lg="8" md="4" sm="6" cols="6">
        <v-row>
          <v-col
            lg="3"
            v-for="(supplierProduct, product_id) in supplierProducts"
            :key="product_id"
          >
            <v-hover>
              <product
                :addToCartButton="false"
                :filteredProduct="supplierProduct"
              ></product>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        lg="2"
        v-if="
          supplierPageInfo.show_right_banner &&
          supplierPageInfo.right_banner_image
        "
        style="max-width: 12%"
      >
        <v-card height="95%">
          <v-img :src="nodeHost + supplierPageInfo.right_banner_image"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import product from "../components/product";
// import sideButton from "../components/sideButton";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "supplierPage",
  components: {
    product,
    // sideButton,
    Loading,
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
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
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
    category() {
      return this.$store.state.Home.category;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },
  },
  methods: {
    updatePage() {
      this.$router.push(
        "/updateSupplierPage/" + this.$route.params.supplier_id
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
      });
    },
    filterProductsWithItem(item) {
      console.log(item);
      this.$store.dispatch("filterProductsWithItem", {
        user_id: this.$route.params.supplier_id,
        itemName: item,
      });
    },
    mouseOver(category) {
      this.categoryItems = [];
      console.log(category);
      for (var i = 0; i < this.categoriesItems.length; i++) {
        if (this.categoriesItems[i].category_name == category) {
          this.categoryItems.push(this.categoriesItems[i].category_items);
        }
      }
    },
    returnAllProducts() {
      this.$store.commit("returnAllProducts");
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch("refreshCurrentUser");
    await this.$store.dispatch("getSupplier", this.$route.params.supplier_id);
    console.log("current user", this.currentUser);

    await this.$store.dispatch(
      "getSupplierPageData",
      this.$route.params.supplier_id
    );
    await this.$store.dispatch(
      "getSupplierProducts",
      this.$route.params.supplier_id
    );

    console.log(this.carouselImagesArray);

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
  },
};
</script>
<style scoped>
#image {
  border-radius: 50%;
}
</style>