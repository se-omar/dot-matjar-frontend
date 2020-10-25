<template>
  <v-app>
    <v-row justify="center" class="ml-8">
      <v-col lg="4" md="5" sm="10" cols="10" class="mt-4">
        <carousel
          dir="ltr"
          style="max-height: 75%"
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide>
            <v-img contain :src="currentProduct.main_picture"></v-img>
          </slide>

          <slide>
            <v-img contain :src="currentProduct.extra_picture1"></v-img>
          </slide>

          <slide>
            <v-img contain :src="currentProduct.extra_picture2"></v-img>
          </slide>
        </carousel>
      </v-col>

      <v-col class lg="5" md="7" sm="12" cols="12">
        <v-row class="mb-4">
          <v-col lg="12">
            <span style="font-size: 35px">{{
              currentProduct.product_name
            }}</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.supplier") }}:
              <span class="text--secondary">{{
                currentProduct.user.full_arabic_name
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.location") }}:
              <span class="text--secondary"
                >{{ currentProduct.user.governorate }} ,
                {{ currentProduct.user.region }}</span
              >
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.category") }}:
              <span class="text--secondary">{{
                currentProduct.product_category.category_name
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.color") }}:
              <span class="text--secondary">{{ currentProduct.color }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.weight") }}:
              <span class="text--secondary">{{
                currentProduct.unit_weight
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.stockStatus") }}:
              <span class="text--secondary">{{
                currentProduct.availability === "1"
                  ? "In Stock"
                  : "Out of Stock"
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.brand") }}:
              <span class="text--secondary">brand name</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.condition") }}:
              <span class="text--secondary">New</span>
            </span>
          </v-col>

          <v-col class="mr-4 mt-12" lg="12">
            <p style="font-size: 23px" class="text-center font-weight-medium">
              {{ $t("productDetails.aboutProduct") }}:
            </p>
            <span
              class="font-weight-medium text--secondary"
              style="font-size: 20px"
              >{{ currentProduct.describtion }}</span
            >
          </v-col>
        </v-row>
      </v-col>

      <v-col lg="3" md="6" sm="12">
        <v-row justify="center" class="ml-n10">
          <v-col class="ml-3 text-sm-center" cols="10">
            <span class="text-h3">{{ currentProduct.unit_price }} EGP</span>
          </v-col>

          <v-col cols="9">
            <v-btn
              v-if="
                currentUser && currentUser.user_id === currentProduct.user_id
              "
              @click="goToEditProduct"
              :color="siteColor.button_color"
              block
              x-large
            >
              <span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.editProduct") }}:</span
              >
            </v-btn>

            <v-btn
              x-large
              block
              v-else
              :color="siteColor.button_color"
              @click="supplierClicked(currentProduct.user)"
            >
              <span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.visitSupplier") }}:</span
              >
            </v-btn>
          </v-col>

          <v-col cols="9">
            <v-btn
              v-if="
                currentUser && currentUser.user_id === currentProduct.user_id
              "
              @click="toggleRemoveDialog"
              :color="siteColor.button_color"
              block
              x-large
            >
              <span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.removeProduct") }}:</span
              >
            </v-btn>

            <v-btn
              v-if="
                addToCartButton &&
                currentUser &&
                currentUser.user_id !== currentProduct.user_id
              "
              @click="add()"
              block
              x-large
              class="white--text"
              :color="siteColor.button_color"
              ><span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.addToCart") }}:</span
              ></v-btn
            >
          </v-col>

          <v-col lg="9">
            <p class="text-h5 mb-n2 text-center">
              {{ $t("productDetails.productRating") }}:
            </p>
            <v-rating
              readonly
              class="ml-n1"
              v-model="currentProduct.rating"
              :hover="hover"
              :size="size"
              :color="siteColor.button_color"
            ></v-rating>

            <p class="text-center text-subtitle">
              (based on {{ currentProduct.rate_counter }} Ratings)
            </p>
          </v-col>

          <v-col cols="9">
            <v-divider class="mb-8"></v-divider>
            <p class="text-h5 mb-n2 text-center" v-if="!userOrderedProductFlag">
              {{ $t("productDetails.canRateIfBuy") }}:
            </p>
            <p
              v-if="productRating === 0 && userOrderedProductFlag"
              class="text-h5 mb-n2 text-center"
            >
              {{ $t("productDetails.rateProduct") }}:
            </p>
            <p
              v-if="productRating !== 0 && userOrderedProductFlag"
              class="text-h5 mb-n2 text-center"
            >
              {{ $t("productDetails.yourRating") }}:
            </p>
            <v-rating
              v-if="userOrderedProductFlag"
              class="ml-n1"
              :readonly="productRating > 0"
              v-model="rating"
              :hover="hover"
              :size="size"
              :color="siteColor.button_color"
            ></v-rating>
            <v-textarea
              v-if="userOrderedProductFlag"
              :disabled="productRating > 0"
              height="150"
              outlined
              v-model="review"
            ></v-textarea>
            <v-btn
              v-if="userOrderedProductFlag"
              :disabled="productRating > 0"
              @click="submitReview"
              block
              :color="siteColor.button_color"
              ><span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.submit") }}:</span
              ></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center">
      <v-col lg="8">
        <p class="text-h4">{{ $t("productDetails.customerReviews") }}:</p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col lg="6">
        <v-card elevation="1" height="250">
          <v-row justify="center">
            <v-col lg="6" class="text-center ml-n10 mt-5">
              <v-avatar fab :color="siteColor.button_color" size="100">
                <span class="white--text headline text-h3"
                  >{{ currentProduct.rating }}.0</span
                >
              </v-avatar>

              <v-rating
                readonly
                class="ml-n1"
                v-model="currentProduct.rating"
                :hover="hover"
                :size="size"
                :color="siteColor.button_color"
              ></v-rating>

              <p class="text-center text-subtitle">
                (based on {{ currentProduct.rate_counter }} Ratings)
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
                  :color="siteColor.button_color"
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
    <v-divider></v-divider>
    <v-row justify="center">
      <v-col lg="8">
        <p class="text-h5">
          ({{ reviewsWithText.length }}) {{ $t("productDetails.reviews") }}:
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        lg="8"
        v-for="review in reviewsWithText"
        :key="review.products_reviews_id"
      >
        <v-card class="pa-5" elevation="0">
          <v-row>
            <v-col lg="7">
              <p class="text-h5 font-weight-medium">
                {{ $t("productDetails.by") }}:
                {{ review.user.full_arabic_name }}
              </p>
            </v-col>

            <v-col lg="5">
              <v-rating
                readonly
                class="ml-n1 mt-n2"
                v-model="review.rating"
                :hover="hover"
                :size="size2"
                :color="siteColor.button_color"
              ></v-rating>
            </v-col>
          </v-row>

          <p class="font-weight-medium text--secondary" style="font-size: 17px">
            {{ review.review }}
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-dialog width="700" persistent v-model="removePressed">
      <v-card>
        <p style="text-align: center" class="text-h5">
          {{ $t("productDetails.removeProductConfirm") }}:
        </p>

        <v-row justify="center">
          <v-col lg="3">
            <v-btn
              large
              block
              @click="removeProduct"
              class="mr-15"
              :color="siteColor.button_color"
              ><span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.yes") }}:</span
              ></v-btn
            >
          </v-col>
          <v-col lg="3">
            <v-btn
              large
              block
              @click="removePressed = false"
              :color="siteColor.button_color"
              ><span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.no") }}:</span
              ></v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
//import businessInfoPopup from "../components/businessInfoPopup.vue";
// import productRequestDialog from "../components/productRequestDialog";
export default {
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    console.log(this.currentProduct);
    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch("getProductReview", {
      product_id: this.currentProduct.product_id,
      user_id: this.currentUser.user_id,
    });
    await this.setValues();
    await this.$store.dispatch(
      "getProductRatingsArray",
      this.currentProduct.product_id
    );

    this.groupedRatings = this.groupBy(
      this.currentProductRatings,
      (c) => c.rating
    );

    for (var j = 1; j < this.barRatingArray.length + 1; j++) {
      if (this.groupedRatings[j]) {
        this.barRatingArray[j - 1] = this.groupedRatings[j].length * 20;
      }
    }

    await this.$store.dispatch("checkIfUserOrdered", {
      user_id: this.currentUser.user_id,
      product_id: this.currentProduct.product_id,
    });
  },

  data() {
    return {
      hover: true,
      rating: 0,
      size: 45,
      size2: 30,
      review: "",
      removePressed: false,
      addToCartButton: true,

      starNum: 5,
      groupedRatings: [],
    };
  },

  computed: {
    currentProduct() {
      return this.$store.state.ProductDetails.currentProduct;
    },

    businesses() {
      return this.$store.state.businesses;
    },

    dialog() {
      return this.$store.state.ProductDetails.dialog;
    },

    productRequestDialog() {
      return this.$store.state.ProductDetails.productRequestDialog;
    },

    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },

    productRating() {
      return this.$store.state.ProductDetails.productRating;
    },
    productReview() {
      return this.$store.state.ProductDetails.productReview;
    },
    currentProductRatings() {
      return this.$store.state.ProductDetails.currentProductRatings;
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
      this.currentProductRatings.forEach((element) => {
        if (element.review !== "") {
          ar.push(element);
        }
      });
      return ar;
    },
    userOrderedProductFlag() {
      return this.$store.state.ProductDetails.userOrderedProductFlag;
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
  },

  components: {
    // businessInfoPopup,
    // productRequestDialog
  },
  methods: {
    viewPopup() {
      if (this.currentUser) this.$store.dispatch("toggleDialog");
      else alert("You must Register First");
      console.log(this.currentProduct);
    },

    productToggleResponse() {
      if (this.currentUser && this.currentUser.user_type == "business")
        this.$store.commit("productToggleResponse");
      else alert("You have to be a business owner");
    },

    toggleRemoveDialog() {
      this.removePressed = true;
    },

    removeProduct() {
      console.log(this.currentProduct.product_id);
      var api =
        this.nodeHost + "/api/removeProduct/" + this.currentProduct.product_id;
      this.$axios
        .delete(api)
        .then((response) => {
          alert("Product Deleted");
          console.log(response);
        })
        .then(() => {
          this.$router.push(`/${this.$i18n.locale}/myProducts`);
        });
    },

    goToEditProduct() {
      this.$router.push(`/${this.$i18n.locale}/editProduct`);
    },
    add() {
      this.$store.dispatch("table", this.currentProduct);
    },

    supplierClicked(supplier) {
      console.log("current supplier id", supplier.user_id);
      this.$store.commit("supplierPage", supplier);
      this.$router.push(
        `/${this.$i18n.locale}/supplierPage/` + supplier.user_id
      );
    },

    async submitReview() {
      console.log(this.rating);
      console.log(this.review);
      await this.$store.dispatch("addProductReview", {
        product_id: this.currentProduct.product_id,
        user_id: this.currentUser.user_id,
        rating: this.rating,
        review: this.review,
      });
      window.location.reload();
    },

    setValues() {
      this.rating = this.productRating;
      this.review = this.productReview;
    },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
.smallerText {
  font-size: 20px;
}
h2 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
h3 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
</style>
