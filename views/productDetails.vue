<template>
  <v-app>
    <v-row justify="center" class="ml-8">
      <v-col lg="4" md="5" sm="10" cols="10" class="mt-4">
        <carousel
          style="max-height: 75%"
          :autoplay="true"
          :per-page="1"
          :centerMode="true"
          :loop="true"
          :navigationEnabled="true"
        >
          <slide>
            <v-img contain :src=" currentProduct.main_picture"></v-img>
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
            <span style="font-size: 35px">{{currentProduct.product_name}}</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Supplier:
              <span class="text--secondary">{{currentProduct.user.full_arabic_name}}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Location:
              <span
                class="text--secondary"
              >{{currentProduct.user.governorate}} , {{currentProduct.user.region}}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Category:
              <span
                class="text--secondary"
              >{{currentProduct.product_category.category_name}}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Color:
              <span class="text--secondary">{{currentProduct.color}}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Weight:
              <span class="text--secondary">{{currentProduct.unit_weight}}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Stock Status:
              <span
                class="text--secondary"
              >{{currentProduct.availability === '1'? 'In Stock' : 'Out of Stock'}}</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Brand:
              <span class="text--secondary">brand name</span>
            </span>
          </v-col>

          <v-col lg="6" md="12" sm="12" cols="12">
            <span class="font-weight-medium" style="font-size: 20px">
              Condition:
              <span class="text--secondary">New</span>
            </span>
          </v-col>

          <v-col class="mr-4 mt-12" lg="12">
            <p style="font-size: 23px" class="text-center font-weight-medium">About this Product:</p>
            <span
              class="font-weight-medium text--secondary"
              style="font-size: 20px"
            >{{currentProduct.describtion}}</span>
          </v-col>
        </v-row>
      </v-col>

      <v-col lg="3" md="6" sm="12">
        <v-row justify="center" class="ml-n10">
          <v-col class="ml-3 text-sm-center" cols="10">
            <span :style="`color: ${siteColor}`" class="text-h3">{{currentProduct.unit_price}} EGP</span>
          </v-col>

          <v-col cols="9">
            <v-btn
              v-if="currentUser && currentUser.user_id === currentProduct.user_id"
              @click="goToEditProduct"
              :color="siteColor"
              block
              x-large
            >
              <span class="white--text" style="font-size: 18px">Edit product</span>
            </v-btn>

            <v-btn
              x-large
              block
              :color="siteColor"
              v-else
              @click="supplierClicked(currentProduct.user)"
            >
              <span class="white--text">Visit Supplier's Page</span>
            </v-btn>
          </v-col>

          <v-col cols="9">
            <v-btn
              v-if="currentUser && currentUser.user_id === currentProduct.user_id"
              @click="toggleRemoveDialog"
              :color="siteColor"
              block
              x-large
            >
              <span style="font-size: 18px" class="white--text">Remove product</span>
            </v-btn>

            <v-btn
              v-if="addToCartButton && currentUser && currentUser.user_id !== currentProduct.user_id"
              @click="add()"
              block
              x-large
              class="white--text"
              :color="siteColor"
            >Add to cart</v-btn>
          </v-col>

          <v-col lg="9">
            <p class="text-h5 mb-n2 text-center">Product Rating</p>
            <v-rating
              class="ml-n1"
              :readonly="productRating > 0"
              v-model="currentProduct.rating"
              :hover="hover"
              :size="size"
              :color="siteColor"
            ></v-rating>

            <p class="text-center text-subtitle">(based on {{currentProduct.rate_counter}} Ratings)</p>
          </v-col>

          <v-col cols="9">
            <v-divider class="mb-8"></v-divider>
            <p v-if="productRating === 0" class="text-h5 mb-n2 text-center">Rate this Product</p>
            <p v-else class="text-h5 mb-n2 text-center">Your Rating:</p>
            <v-rating
              class="ml-n1"
              :readonly="productRating > 0"
              v-model="rating"
              :hover="hover"
              :size="size"
              :color="siteColor"
            ></v-rating>
            <v-textarea :disabled="productRating > 0" height="150" outlined v-model="review"></v-textarea>
            <v-btn
              class="white--text"
              :disabled="productRating > 0"
              @click="submitReview"
              block
              :color="siteColor"
            >submit</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog width="700" persistent v-model="removePressed">
      <v-card>
        <p style="text-align:center" class="text-h5">Are you sure you want to remove this product?</p>

        <v-row justify="center">
          <v-col lg="3">
            <v-btn large block @click="removeProduct" class="primary mr-15">Yes</v-btn>
          </v-col>
          <v-col lg="3">
            <v-btn large block @click="removePressed = false" class="red white--text">No</v-btn>
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
  async mounted() {
    await this.$store.dispatch("refreshCurrentUser");
    console.log(this.currentProduct);
    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch("getProductReview", {
      product_id: this.currentProduct.product_id,
      user_id: this.currentUser.user_id,
    });
    await this.setValues();
    console.log(this.productRating);
    console.log(this.productReview);
  },

  data() {
    return {
      hover: true,
      rating: 0,
      size: 45,
      review: "",
      removePressed: false,
      addToCartButton: true,
    };
  },

  computed: {
    currentProduct() {
      return this.$store.state.currentProduct;
    },

    businesses() {
      return this.$store.state.businesses;
    },

    dialog() {
      return this.$store.state.dialog;
    },

    productRequestDialog() {
      return this.$store.state.productRequestDialog;
    },

    currentUser() {
      return this.$store.state.currentUser;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },
    siteColor() {
      return this.$store.state.siteColor;
    },
    productRating() {
      return this.$store.state.productRating;
    },
    productReview() {
      return this.$store.state.productReview;
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
        "http://localhost:3000/api/removeProduct/" +
        this.currentProduct.product_id;
      this.$axios
        .delete(api)
        .then((response) => {
          alert("Product Deleted");
          console.log(response);
        })
        .then(() => {
          this.$router.push("/myProducts");
        });
    },

    goToEditProduct() {
      this.$router.push("/editProduct");
    },
    add() {
      this.$store.dispatch("table", this.currentProduct);
    },

    supplierClicked(supplier) {
      console.log("current supplier id", supplier.user_id);
      this.$store.commit("supplierPage", supplier);
      this.$router.push("/supplierPage/" + supplier.user_id);
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
  },
};
</script>
