<template>
  <v-app class="grey lighten-4">
    <v-row justify="center">
      <v-col lg="12">
        <v-container
          v-if="
            (currentUser && currentUser.user_type == 'business') ||
            currentUser.user_type == 'admin'
          "
        >
          <v-row justify="center">
            <p class="display-1">
              {{ currentUser.full_arabic_name }} {{ $t("myProducts.products") }}
            </p>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>

          <v-row justify="center">
            <v-btn
              @click="
                $router.push(`/${$i18n.locale}/addProduct`).catch((err) => {})
              "
              rounded
              :color="siteColor.button_color"
            >
              <span :style="`color:${siteColor.button_text_color}`">
                <i class="fa fa-plus fa-2x mt-1"></i
              ></span>
            </v-btn>
          </v-row>
          <v-row justify="start">
            <v-col lg="4" sm="8" cols="8" md="4">
              <v-text-field
                class="white arabic mx-5"
                style="max-width: 250px; max-height: 41px"
                outlined
                @keyup="filterProductsTable"
                v-model="searchSupplierProductsTable"
                dense
                rounded
                :placeholder="$t('toolbar.search')"
                append-icon="fa fa-search"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="myProducts.length != 0">
            <!-- <v-col
              lg="3"
              md="4"
              sm="6"
              cols="6"
              v-for="myProduct in myProducts"
              :key="myProduct.id"
            >
              <product
                class="ml-n2 mr-n2"
                :addToCartButton="false"
                :filteredProduct="myProduct"
              ></product>
            </v-col> -->
            <v-data-table :items="myProducts" :headers="productTableHeaders">
              <template #[`item.main_picture`]="{ item }">
                <v-img
                  :src="nodeHost + item.main_picture"
                  width="80"
                  height="80"
                  style="
                    border-radius: 50%;
                    margin-left: auto;
                    margin-right: auto;
                  "
                ></v-img>
                <!-- <p>{{ item.main_picture }}</p> -->
              </template>
              <template #[`item.details`]="{ item }">
                <v-btn @click="productInfo(item)" icon>
                  <i class="fa fa-info-circle"></i
                ></v-btn>
              </template>
            </v-data-table>
          </v-row>

          <v-row class="mt-16" justify="center" v-else>
            <p class="display-1">No data available</p>
          </v-row>
        </v-container>

        <v-container
          v-else-if="!currentUser || currentUser.user_type != 'business'"
        >
          <v-row justify="center">
            <p class="display-1">You cannot proceed to this page</p>
          </v-row>
        </v-container>

        <v-container v-else>
          <v-row justify="center">
            <p class="display-1">No products available</p>
          </v-row>
        </v-container>
        <v-divider class="mx-15"></v-divider>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
//import Product from "../components/product.vue";

export default {
  async created() {
    console.log("nodehost", this.nodeHost);
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getMyProducts", this.currentUser.user_id);
    await this.$store.dispatch("getSiteColor");
  },

  computed: {
    myProducts() {
      return this.$store.state.Dashboard.myProducts;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
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
    productTableHeaders() {
      return [
        { text: this.$t("userOrders.productName"), value: "product_name" },
        { text: this.$t("userOrders.productCode"), value: "product_code" },
        {
          text: this.$t("dashboardSellingProduct.unitPrice"),
          value: "unit_price",
        },
        {
          text: this.$t("myProducts.minUnitsPerOrder"),
          value: "min_units_per_order",
        },
        { text: this.$t("productDetails.weight"), value: "unit_weight" },
        { text: this.$t("footer.currency"), value: "currency" },
        { text: this.$t("myProducts.boughtNumber"), value: "buy_counter" },

        {
          text: this.$t("myProducts.remainingInStock"),
          value: "stock_remaining",
        },
        {
          text: this.$t("productDetails.discountInfo"),
          value: "discount_amount",
        },

        { text: this.$t("addProduct.mainPicture"), value: "main_picture" },
        { text: this.$t("product.details"), value: "details" },
      ];
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
  },
  methods: {
    productInfo(item) {
      this.$store.dispatch("setCurrentProduct", item);
      this.$router.push(`/${this.$i18n.locale}/productDetails`);
      console.log("filtered product in componetents", item);
    },
    filterProductsTable() {
      this.$store.dispatch("filterSupplierProductsTable", {
        productsSearch: this.searchSupplierProductsTable,
        searchType: "name",
        supplier_id: this.currentUser.user_id,
      });
    },
  },
  // components: {
  //   product: () => import("../components/product"),
  // },
  data: () => ({
    searchSupplierProductsTable: "",
  }),
};
</script>
<style scoped>
.img {
  border-radius: 50%;
}
.size {
  font-size: 20px;
  font-weight: bold;
}
.x {
  margin-right: 20%;
  font-weight: bold;
}
.username {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: black;
}

.mos {
  color: beige;
}
#profilePhoto {
  opacity: 0;
  z-index: inherit;
}
#picture {
  margin-right: 15%;
  border-radius: 50%;
  text-align: center;
}
#fileUpload {
  text-align: center;
}
.font {
  font-size: 14px;
}
</style>


