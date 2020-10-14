<template>
  <v-app>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
    </div>
    <sideButton
      v-if="this.$route.params.supplier_id == currentUser.user_id"
    ></sideButton>
    <v-row justify="end" class="mr-16">
      <v-col cols="6">
        <v-btn
          v-if="supplier.user_id == currentUser.user_id"
          class="white--text"
          @click="updatePage"
          :color="siteColor"
          >Update My page</v-btn
        >
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
          <v-img :src="nodeHost + supplierPageInfo.left_banner_image"></v-img>
        </v-card>
      </v-col>

      <v-col v-else lg="2" style="max-width: 12%"> </v-col>

      <v-col lg="9">
        <v-row justify="center">
          <v-card max-width="400">
            <v-card-actions aspect-ratio="1.7">
              <v-img id="image" :src="supplier.profile_photo"></v-img>
            </v-card-actions>
            <v-card-title>
              <span class="black--text ml-13">{{
                supplier.full_arabic_name
              }}</span>
            </v-card-title>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text"
                >Mobile number :</span
              >
              <span class="black--text">{{ supplier.mobile_number }}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text"
                >User type :</span
              >
              <span class="black--text">{{ supplier.user_type }}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text">Email :</span>
              <span class="black--text">{{ supplier.email }}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text"
                >Facbook-account :</span
              >
              <span class="black--text">{{ supplier.facebook_account }}</span>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-divider></v-divider>

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

        <v-row justify="center">
          <v-col lg="6">
            <v-row justify="center">
              <v-col lg="6">
                <p class="text-h4">Customer Ratings</p>
              </v-col>
            </v-row>

            <v-card elevation="1" height="250">
              <v-row justify="center">
                <v-col lg="6" class="text-center ml-n10 mt-5">
                  <v-avatar fab :color="siteColor" size="100">
                    <span class="white--text headline text-h3"
                      >{{ supplier.rating }}.0</span
                    >
                  </v-avatar>

                  <v-rating
                    readonly
                    class="ml-n1"
                    v-model="supplier.rating"
                    :hover="hover"
                    :size="size"
                    :color="siteColor"
                  ></v-rating>

                  <p class="text-center text-subtitle">
                    (based on {{ supplier.rate_counter }} Ratings)
                  </p>
                </v-col>

                <v-col lg="5">
                  <div>
                    <v-progress-linear
                      class="mb-2"
                      height="38"
                      v-for="i in starNum"
                      :key="i"
                      rounded
                      :value="barRatingArray[5 - i]"
                      :color="siteColor"
                      >{{ 6 - i }} Star ({{
                        barRatingArray[5 - i] / 20
                      }}
                      Ratings)</v-progress-linear
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            :style="`background-color: ${siteColor}`"
            v-for="i in tabs"
            :key="i.name"
          >
            <div class="caption py-1 font-weight-medium text-subtitle-1">
              {{ i.name }}
            </div>
          </v-tab>

          <v-tab-item class="grey lighten-4">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="supplierProductsSearch"
                  :color="siteColor"
                  rounded
                  outlined
                  label="What are you loking for ?"
                  @keyup="returnAllProducts"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  @click="filterSupplierProducts"
                  rounded
                  :color="siteColor"
                  class="white--text mt-3"
                  >Search</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- search category toolbar -->
                <v-toolbar shaped dark dense :color="siteColor">
                  <v-row justify="center">
                    <v-col
                      cols="2"
                      v-for="category in category"
                      :key="category.id"
                    >
                      <v-menu
                        offset-x
                        :close-on-content-click="false"
                        open-on-hover
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @mouseover="mouseOver(category)"
                            v-bind="attrs"
                            v-on="on"
                            text
                            rounded
                            class="white--text"
                            @click="filterProductsWithCategory(category)"
                          >
                            {{ category }}
                            <i :class="`fas fa-${category} fa-2x ml-2`"></i>
                          </v-btn>
                        </template>
                        <v-card style="background-color: red">
                          <v-list v-for="item in categoryItems" :key="item.id">
                            <v-btn @click="filterProductsWithItem(item)" text>
                              - {{ item }}
                              <i :class="`fa fa-${item} fa-lg ml-2`"></i>
                            </v-btn>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-toolbar>
                <!-- search category toolbar -->
              </v-col>
            </v-row>
            <v-row>
              <v-col
                lg="3"
                md="4"
                sm="6"
                cols="6"
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
          </v-tab-item>

          <v-tab-item class="grey lighten-4">
            <v-row justify="center">
              <v-col lg="8">
                <p class="text-h5">({{ reviewsWithText.length }}) Reviews</p>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col
                lg="8"
                v-for="review in reviewsWithText"
                :key="review.suppliers_reviews_id"
              >
                <v-card class="pa-5" elevation="0">
                  <v-row>
                    <v-col lg="7">
                      <p class="text-h5 font-weight-medium">
                        By {{ review.user.full_arabic_name }}
                      </p>
                    </v-col>

                    <v-col lg="5">
                      <v-rating
                        readonly
                        class="ml-n1 mt-n2"
                        v-model="review.rating"
                        :hover="hover"
                        :size="size2"
                        :color="siteColor"
                      ></v-rating>
                    </v-col>
                  </v-row>
                  <p
                    class="font-weight-medium text--secondary"
                    style="font-size: 17px"
                  >
                    {{ review.review }}
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item class="grey lighten-4">
            <v-row justify="center">
              <v-col lg="8">
                <p
                  v-if="supplierRating === 0"
                  class="text-h5 mb-n2 text-center"
                >
                  Rate this Product
                </p>
                <p v-else class="text-h5 mb-n2 text-center">Your Rating:</p>
                <v-rating
                  :readonly="supplierRating > 0"
                  class="ml-n1 text-center mt-1"
                  v-model="rating"
                  :hover="hover"
                  :size="size"
                  :color="siteColor"
                ></v-rating>
                <v-textarea
                  :disabled="supplierRating > 0"
                  height="150"
                  outlined
                  v-model="review"
                ></v-textarea>
                <v-btn
                  :disabled="supplierRating > 0"
                  class="white--text"
                  @click="submitReview"
                  block
                  :color="siteColor"
                  >submit</v-btn
                >
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
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

      <v-col lg="2" v-else style="max-width: 12%"> </v-col>
    </v-row>
  </v-app>
</template>
<script>
import product from "../components/product";
import sideButton from "../components/sideButton";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "supplierPage",
  components: {
    product,
    sideButton,
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
        return this.$store.state.Home.siteColor;
      } else {
        return "red darken-4";
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
        `/${this.$i18n.locale}/updateSupplierPage` +
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
  },
};
</script>
<style scoped>
#image {
  border-radius: 50%;
}
</style>