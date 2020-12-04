<template>
  <v-app>
    <v-row justify="center" class="ml-8">
      <v-col lg="4" md="5" sm="10" cols="10" class="mt-4">
        <carousel
          dir="ltr"
          style="max-height: 530px"
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide>
            <v-img
              contain
              :src="
                currentProduct.main_picture
                  ? nodeHost + currentProduct.main_picture
                  : ''
              "
            ></v-img>
          </slide>

          <slide>
            <v-img
              contain
              :src="
                currentProduct.extra_picture1
                  ? nodeHost + currentProduct.extra_picture1
                  : ''
              "
            ></v-img>
          </slide>

          <slide>
            <v-img
              contain
              :src="
                currentProduct.extra_picture2
                  ? nodeHost + currentProduct.extra_picture2
                  : ''
              "
            ></v-img>
          </slide>
        </carousel>
      </v-col>

      <v-col class lg="5" md="7" sm="12" cols="12">
        <v-row class="mb-4">
          <v-col lg="12">
            <span v-if="currentProduct" class="text-lg-h5 text-h6">{{
              currentProduct.product_name
            }}</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.supplier") }}:
              <span
                v-if="currentProduct && currentProduct.user"
                class="text--secondary"
                >{{ currentProduct.user.full_arabic_name }}</span
              >
            </span>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.location") }}:
              <span
                v-if="currentProduct && currentProduct.user"
                class="text--secondary"
                >{{ currentProduct.user.governorate }} ,
                {{ currentProduct.user.region }}</span
              >
            </span>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.category") }}:
              <span
                v-if="currentProduct && currentProduct.product_category"
                class="text--secondary"
                >{{ currentProduct.product_category.category_name }}</span
              >
            </span>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.weight") }}:
              <span v-if="currentProduct" class="text--secondary">{{
                currentProduct.unit_weight
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.stockStatus") }}:
              <span v-if="currentProduct" class="text--secondary">{{
                currentProduct.availability === "1"
                  ? "In Stock"
                  : "Out of Stock"
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.brand") }}:
              <span v-if="currentProduct" class="text--secondary">{{
                currentProduct.brand
              }}</span>
            </span>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              {{ $t("productDetails.condition") }}:
              <span v-if="currentProduct" class="text--secondary">{{
                currentProduct.condition
              }}</span>
            </span>
          </v-col>

          <v-col lg="12" md="6" sm="6" cols="6">
            <span class="font-weight-medium" style="font-size: 20px">
              available colors:
              <v-swatches
                v-model="chosenColor"
                inline
                :swatches="productColors"
              ></v-swatches>
            </span>
          </v-col>

          <v-col class="mr-4 mt-12" lg="12">
            <p style="font-size: 23px" class="text-center font-weight-medium">
              {{ $t("productDetails.aboutProduct") }}:
            </p>
            <span
              v-if="currentProduct"
              class="font-weight-medium text--secondary"
              style="font-size: 20px"
              >{{ currentProduct.describtion }}</span
            >
          </v-col>
        </v-row>
      </v-col>

      <v-col lg="3" md="6" sm="12">
        <v-row justify="center" class="ml-n10">
          <v-col class="text-center" cols="12">
            <span
              v-if="currentProduct && !currentProduct.discount_amount"
              class="text-lg-h3 text-sm-center text-h4"
              >{{ currentProduct.unit_price }}
              {{ currentProduct.currency }}</span
            >
            <span
              v-if="currentProduct && currentProduct.discount_amount"
              class="text-lg-h5 text-sm-center text-h5 text-decoration-line-through"
              >{{ currentProduct.unit_price }}
              {{ currentProduct.currency }}
            </span>
            <br />
            <span
              v-if="currentProduct && currentProduct.discount_amount"
              class="text-lg-h3 text-sm-center text-h3"
              >{{ currentProduct.unit_price - currentProduct.discount_amount }}
              {{ currentProduct.currency }}</span
            >
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
                {{ $t("productDetails.editProduct") }}</span
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
                {{ $t("productDetails.visitSupplier") }}</span
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
                {{ $t("productDetails.removeProduct") }}</span
              >
            </v-btn>

            <v-btn
              v-if="
                addToCartButton &&
                currentUser &&
                currentUser.user_id !== currentProduct.user_id &&
                currentUser.user_type == 'user'
              "
              @click="addProductToCart"
              block
              large
              class="white--text"
              :color="siteColor.button_color"
              ><span :style="`color:${siteColor.button_text_color}`">
                {{ $t("productDetails.addToCart") }}</span
              ></v-btn
            >
            <v-btn
              @click="discountDialogActivation"
              v-if="currentProduct.user_id == currentUser.user_id"
              :color="siteColor.button_color"
              block
              large
              class="mt-4"
            >
              <span :style="`color:${siteColor.button_text_color}`">{{
                $t("productDetails.discountInfo")
              }}</span>
            </v-btn>
          </v-col>

          <v-col lg="9" md="9" cols="9">
            <p class="text-h5 mb-n2 text-center">
              {{ $t("productDetails.productRating") }}
            </p>
          </v-col>

          <v-col lg="9" md="9" cols="9">
            <v-rating
              readonly
              class="ml-lg-n7 text-center"
              v-model="currentProduct.rating"
              :hover="hover"
              :size="size"
              :color="siteColor.button_color"
            ></v-rating>
          </v-col>

          <v-col lg="9" md="9" cols="9">
            <p class="text-center text-subtitle">
              (based on {{ currentProduct.rate_counter }} Ratings)
            </p>
          </v-col>

          <v-col cols="9">
            <v-divider class="mb-8"></v-divider>
            <p class="text-h5 mb-n2 text-center" v-if="!userOrderedProductFlag">
              {{ $t("productDetails.canRateIfBuy") }}
            </p>
            <p
              v-if="productRating === 0 && userOrderedProductFlag"
              class="text-h5 mb-n2 text-center"
            >
              {{ $t("productDetails.rateProduct") }}
            </p>
            <p
              v-if="productRating !== 0 && userOrderedProductFlag"
              class="text-h5 mb-n2 text-center"
            >
              {{ $t("productDetails.yourRating") }}
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
                {{ $t("productDetails.submit") }}</span
              ></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row justify="center">
      <v-col lg="8">
        <p class="text-lg-h4 text-h5">
          {{ $t("productDetails.customerReviews") }}:
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col lg="6" md="7" cols="11">
        <v-card flat height="250">
          <v-row justify="center">
            <v-col lg="5" cols="5" class="text-center mt-5">
              <v-avatar
                fab
                :color="siteColor ? siteColor.button_color : 'black'"
                size="100"
              >
                <span v-if="currentProduct" class="white--text headline text-h3"
                  >{{ currentProduct.rating }}.0</span
                >
              </v-avatar>

              <v-rating
                readonly
                class="ml-n2"
                v-model="currentProduct.rating"
                :hover="hover"
                :size="size"
                :color="siteColor.button_color"
              ></v-rating>

              <p v-if="currentProduct" class="text-center text-subtitle">
                (based on {{ currentProduct.rate_counter }} Ratings)
              </p>
            </v-col>

            <v-col lg="5" md="5" cols="6">
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
        md="9"
        cols="11"
        v-for="review in reviewsWithText"
        :key="review.products_reviews_id"
      >
        <v-card class="pa-5" elevation="0">
          <v-row>
            <v-col lg="7">
              <p class="text-lg-h5 text-h6 font-weight-medium">
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
    <v-dialog max-width="60%" v-model="discountDialog">
      <v-card style="overflow: hidden">
        <v-row justify="center" v-if="!currentProduct.discount_amount">
          <v-card-title
            ><span>
              {{ $t("productDetails.productHasNoDiscount") }}
            </span></v-card-title
          >
        </v-row>
        <v-form v-model="discountValidation">
          <v-row justify="center">
            <v-col lg="6" md="6" cols="12" sm="10">
              <v-text-field
                outlined
                :label="$t('productDetails.originalPrice')"
                rounded
                v-model="originalPrice"
                filled
                disabled
                :rules="(required, numbersOnly)"
              >
              </v-text-field>
            </v-col>
            <v-col lg="6" md="6" cols="12" sm="10">
              <v-text-field
                outlined
                :label="
                  $t('productDetails.discountAmount') + ' ' + discountPresentage
                "
                rounded
                filled
                v-model="discountAmount"
                :rules="(required, numbersOnly)"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-row justify="center"> {{ discountPresentage }} % </v-row>
        <v-row justify="center">
          <span style="font-weight: bold"
            >{{ $t("productDetails.totalPrice") }}
            <span style="color: blue">{{ totalPrice }}</span></span
          >
        </v-row>
        <v-row class="mt-4 mb-4" justify="center">
          <v-btn
            @click="updateProductDiscount"
            rounded
            :color="siteColor.button_color"
            :disabled="!discountValidation"
          >
            <span
              class="smallerText"
              :style="`color:${siteColor.button_text_color}`"
            >
              {{ $t("productDetails.AddDiscount") }}</span
            >
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn
            @click="removeProductDiscount"
            rounded
            color="red"
            v-if="currentProduct.discount_amount"
          >
            <span class="smallerText" style="color: white">
              {{ $t("productDetails.removeDiscount") }}</span
            >
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-snackbar timeout="5000" v-model="snackbar">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch(
      "getProductColors",
      this.currentProduct.product_id
    );
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
      size2: 30,
      review: "",
      removePressed: false,
      addToCartButton: true,
      starNum: 5,
      groupedRatings: [],
      chosenColor: "",
      discountDialog: false,
      originalPrice: "",
      discountAmount: "",
      snackbar: false,
      discountValidation: false,
      required: [(v) => !!v || "Required!!"],
      numbersOnly: [(v) => /\d+/.test(v) || "Numbers only.."],
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
    size() {
      if (this.$vuetify.breakpoint.lg) return 40;
      else if (this.$vuetify.breakpoint.md) return 35;
      else return 23;
    },

    productColors() {
      return this.$store.state.ProductDetails.productColors;
    },
    totalPrice() {
      return this.originalPrice - this.discountAmount > 0
        ? this.originalPrice - this.discountAmount
        : 0;
    },
    discountPresentage() {
      var perc =
        this.discountAmount > 0
          ? (this.discountAmount * 100) / this.originalPrice
          : 0;
      return perc < 100 ? perc.toFixed(1) : 100;
    },
    snackbarMessage() {
      return this.$store.state.ProductDetails.snackbarMessage
        ? this.$store.state.ProductDetails.snackbarMessage
        : " ";
    },
  },

  components: {
    VSwatches: () => import("vue-swatches"),
    // businessInfoPopup,
    // productRequestDialog
  },
  methods: {
    viewPopup() {
      if (this.currentUser) this.$store.dispatch("toggleDialog");
      else alert("You must Register First");
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
      var api =
        this.nodeHost + "/api/removeProduct/" + this.currentProduct.product_id;
      this.$axios
        .delete(api)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          alert("Product Deleted");
        })
        .then(() => {
          this.$router.push(`/${this.$i18n.locale}/myProducts`);
        });
    },

    goToEditProduct() {
      this.$router.push(`/${this.$i18n.locale}/editProduct`);
    },
    addProductToCart() {
      this.$store.dispatch("addProductToCart", {
        product: this.currentProduct,
        color: this.chosenColor,
      });
    },

    supplierClicked(supplier) {
      console.log("current product", this.currentProduct);
      console.log("supplier", supplier);
      this.$store.commit("supplierPage", supplier);
      this.$router.push(
        `/${this.$i18n.locale}/supplierPage/` + supplier.user_id
      );
    },

    async submitReview() {
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
    discountDialogActivation() {
      this.discountDialog = true;
      this.originalPrice = this.currentProduct.unit_price;
      this.discountAmount = this.currentProduct.discount_amount
        ? this.currentProduct.discount_amount
        : "";
    },
    async updateProductDiscount() {
      await this.$store.dispatch("updateProductDiscount", {
        discountAmount: this.discountAmount,
        product_id: this.currentProduct.product_id,
      });
      this.snackbar = true;
      setTimeout(() => {
        this.$router.push(
          `/${this.$i18n.locale}/supplierPage/${this.currentUser.user_id}`
        );
      }, 3000);
    },
    async removeProductDiscount() {
      await this.$store.dispatch("removeProductDiscount", {
        product_id: this.currentProduct.product_id,
      });
      this.snackbar = true;
      var self = this;
      setTimeout(() => {
        self.$router.push(
          `/${this.$i18n.locale}/supplierPage/${this.currentUser.user_id}`
        );
      }, 3000);
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 25px;
}
h3 {
  font-size: 25px;
}
</style>
