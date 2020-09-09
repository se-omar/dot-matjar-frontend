<template>
  <v-app>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    </div>
    <sideButton v-if="this.$route.params.supplier_id == currentUser.user_id"></sideButton>
    <v-row justify="end" class="mr-16">
      <v-col cols="6">
        <v-btn
          v-if="supplier.user_id == currentUser.user_id"
          class="white--text"
          @click="updatePage"
          :color="pageColor"
        >Update My page</v-btn>
      </v-col>
    </v-row>

    <v-row class="ml-2">
      <v-col lg="2" style="max-width: 12%">
        <v-card height="95%">
          <v-img src="../assets/images/603-150x600.jpg"></v-img>
        </v-card>
      </v-col>

      <v-col lg="9">
        <v-row justify="center">
          <v-card max-width="400">
            <v-card-actions aspect-ratio="1.7">
              <v-img id="image" :src="supplier.profile_photo"></v-img>
            </v-card-actions>
            <v-card-title>
              <span class="black--text ml-13">{{supplier.full_arabic_name}}</span>
            </v-card-title>
            <v-card-actions>
              <span style="font-weight:bold" class="black--text">Mobile number :</span>
              <span class="black--text">{{supplier.mobile_number}}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight:bold" class="black--text">User type :</span>
              <span class="black--text">{{supplier.user_type}}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight:bold" class="black--text">Email :</span>
              <span class="black--text">{{supplier.email}}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight:bold" class="black--text">Facbook-account :</span>
              <span class="black--text">{{supplier.facebook_account}}</span>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-divider></v-divider>

        <v-row justify="center">
          <v-col :lg="supplierPageInfo? supplierPageInfo.carousel_width : 10">
            <carousel
              :autoplay="true"
              :per-page="1"
              :centerMode="true"
              :loop="true"
              :navigationEnabled="true"
            >
              <slide>
                <v-img
                  :height="supplierPageInfo? supplierPageInfo.carousel_height : 400"
                  src="..\assets\images/car1.jpg"
                ></v-img>
              </slide>
              <slide>
                <v-img
                  :height="supplierPageInfo? supplierPageInfo.carousel_height : 400"
                  src="..\assets\images/car1.jpg"
                ></v-img>
              </slide>
              <slide>
                <v-img
                  :height="supplierPageInfo? supplierPageInfo.carousel_height : 400"
                  src="..\assets\images/car1.jpg"
                ></v-img>
              </slide>
              <slide>
                <v-img
                  :height="supplierPageInfo? supplierPageInfo.carousel_height : 400"
                  src="..\assets\images/car1.jpg"
                ></v-img>
              </slide>
            </carousel>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h1>Products</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            lg="3"
            md="4"
            sm="6"
            cols="6"
            v-for="(supplierProduct,product_id) in supplierProducts"
            :key="product_id"
          >
            <v-card>
              <v-hover>
                <product :addToCartButton="false" :filteredProduct="supplierProduct"></product>
              </v-hover>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col lg="2" style="max-width: 12%">
        <v-card height="95%">
          <v-img src="../assets/images/603-150x600.jpg"></v-img>
        </v-card>
      </v-col>
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
  }),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    supplier() {
      return this.$store.state.supplier;
    },
    myProducts() {
      return this.$store.state.myProducts;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    pageColor() {
      return this.$store.state.siteColor;
    },
    supplierProducts() {
      return this.$store.state.supplierProducts;
    },
    supplierPageInfo() {
      return this.$store.state.supplierPageInfo;
    },
  },
  methods: {
    updatePage() {
      this.$router.push(
        "/updateSupplierPage/" + this.$route.params.supplier_id
      );
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch("getSupplier", this.$route.params.supplier_id);
    await this.$store.dispatch("refreshCurrentUser");
    console.log("current user", this.currentUser);

    await this.$store.dispatch(
      "getSupplierPageData",
      this.$route.params.supplier_id
    );
    this.$store.state.supplierPageColor = [];
    await this.$store.dispatch(
      "getSupplierProducts",
      this.$route.params.supplier_id
    );

    console.log(this.$store.state.myProducts);
    console.log(this.$store.state.supplierPageColor);
    this.pageColor = this.$store.state.supplierPageColor;
    console.log(this.currentUser.user_id, this.supplier.user_id);
    this.isLoading = false;
  },
};
</script>
<style scoped>
#image {
  border-radius: 50%;
}
</style>