<template>
  <v-app class="pr-6">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></loading>
    </div>
    <v-snackbar timeout="60000" v-model="supplierApprovalMessage">
      <v-row justify="center">
        <p style="font-size: 20px">
          Your account is waiting approval from the admin , you will be
          notified.<br />
        </p>
      </v-row>
      <v-row justify="center">
        <p>ThankYou</p>
      </v-row>
    </v-snackbar>

    <v-row
      v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      class="mt-4"
      justify="center"
    >
      <v-btn @click="filterDialog = true" :color="siteColor.button_color" small>
        <i
          class="fa fa-filter"
          :style="`color:${siteColor.button_text_color}`"
        ></i>
        <span :style="`color:${siteColor.button_text_color}`"
          >{{$t("toolbar.filter")}}</span
        ></v-btn
      >
      <v-dialog style="overflow: hidden" v-model="filterDialog" max-width="280">
        <v-card style="overflow: hidden">
          <v-row justify="center">
            <span style="font-weight: bold; font-size: 25px">
              {{ $t("addProduct.category") }}</span
            >
          </v-row>
          <v-row justify="center">
            <v-treeview
              return-object
              item-key="id"
              hoverable
              activatable
              selected-color="red"
              @update:active="filterByCategory"
              color="warning"
              :items="categoriesTreeArray"
            >
            </v-treeview>
            <template slot-scope="{ item }">
              <a @click="filterByCategory(item)">{{ item.name }}</a>
            </template>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
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

    <v-row justify="center" class="mt-6">
      <v-radio-group row mandatory :value="radioGroup">
        <v-radio @change="changeRadioGroup" value="1">
          <template v-slot:label>
            <span>{{ $t("toolbar.browseProducts") }}</span>
          </template>
        </v-radio>

        <v-radio @change="changeRadioGroup" value="2">
          <template v-slot:label>
            <span>{{ $t("toolbar.browseSuppliers") }}</span>
          </template>
        </v-radio>
      </v-radio-group>

      <v-btn small class="mt-4" :color="siteColor.button_color" @click="All">
        <span
          class="text-caption"
          :style="`color: ${siteColor.button_text_color}`"
          >{{ $t("homePage.allProducts") }}</span
        ></v-btn
      >
    </v-row>

    <v-row
      :justify="
        homePageInfo.show_right_banner == 1 ? 'space-between' : 'center'
      "
    >
      <v-col
        v-if="
          ($vuetify.breakpoint.lg && radioGroup == '1') ||
          ($vuetify.breakpoint.md && radioGroup == '1')
        "
        lg="2"
        sm="4"
        md="2"
        cols="4"
      >
        <v-card height="95%" style="overflow: hidden" max-width>
          <v-row justify="center">
            <span style="font-weight: bold; font-size: 25px">{{
              $t("addProduct.category")
            }}</span>
          </v-row>
          <v-row justify="center">
            <v-treeview
              return-object
              item-key="id"
              hoverable
              activatable
              selected-color="red"
              @update:active="filterByCategory"
              color="warning"
              :items="categoriesTreeArray"
            >
            </v-treeview>
            <template slot-scope="{ item }">
              <v-btn @click="filterByCategory(item)">{{ item.name }}</v-btn>
            </template>
          </v-row>
        </v-card>
      </v-col>

      <!-- <v-col lg="8" sm="5" md="7"> -->
      <v-col
        :lg="radioAndBannerFlag"
        :md="radioAndBannerFlag"
        :sm="radioGroup == '1' ? '12' : '12'"
        :cols="radioGroup == '1' ? '12' : '12'"
      >
        <v-row
          justify="center"
          v-if="radioGroup === '1' && filteredProducts.length > 0"
        >
          <v-col
            class="ms-2"
            :class="homePageInfo.show_right_banner ? '' : productsClass"
            :lg="homePageInfo.show_right_banner ? 3 : 2"
            :md="homePageInfo.show_right_banner ? 3 : 2"
            xmd="3"
            sm="3"
            cols="5"
            v-for="(filteredProduct, index) in filteredProducts"
            :key="index"
          >
            <product
              :currentUser="currentUser"
              :minWidth="minProductWidthFlag"
              :filteredProduct="filteredProduct"
            ></product>
          </v-col>
        </v-row>

        <v-row v-else-if="radioGroup == '1'" justify="center">
          <p class="display-1">no products found</p>
        </v-row>

        <v-row justify="center" v-if="radioGroup === '2'">
          <v-col
            v-for="(supplier, index) in suppliers"
            :key="index"
            :class="homePageInfo.show_right_banner ? 'ms-2' : productsClass"
            lg="2"
            :md="homePageInfo.show_right_banner ? 4 : 3"
            cols="5"
          >
            <supplier
              :minWidth="homePageInfo.show_right_banner ? '110%' : '120%'"
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
            @click="loadmoreSuppliers"
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
            @click="filterProducts('loadmore')"
          >
            <span :style="`color: ${siteColor.button_text_color}`">
              {{ $t("homePage.loadMore") }}</span
            ></v-btn
          >
        </v-row>
      </v-col>

      <v-col
        :class="{ 'ml-n15': $vuetify.breakpoint.smAndDown }"
        v-if="
          homePageInfo.show_right_banner &&
          homePageInfo.right_banner_image &&
          $vuetify.breakpoint.mdAndUp
        "
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
export default {
  name: "Home",
  data() {
    return {
      categoryName: "",
      productFilterFlag: false,
      supplierFilterFlag: false,
      isLoading: false,
      productsClass: "ms-4",
      supplierApprovalMessage: false,
      filterDialog: false,
    };
  },

  async created() {
    this.isLoading = true;
    await this.$store.dispatch("getCategoriesTree");
    await this.$store.dispatch("getHomePageData");
    this.$store.commit("emptyProductsArray");
    await this.$store.dispatch("getGovernorate");
    await this.$store.dispatch("getProducts", {
      productFilterFlagss: this.productFilterFlag,
      categoryName: this.categoryName,
    });

    await this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
    });
    if (this.currentUser.user_type == "waiting_approval") {
      this.supplierApprovalMessage = true;
    }
    this.isLoading = false;
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

    homePageInfo() {
      return this.$store.state.Home.homePageInfo;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    radioGroup() {
      return this.$store.state.Home.radioGroup;
    },

    rtlMenuCondition() {
      if (localStorage.getItem("language") == "en") {
        return false;
      } else {
        return true;
      }
    },
    availableCountries() {
      return this.$store.state.Home.availableCountries;
    },
    productAdvancedSearches() {
      return this.$store.state.Home.productAdvancedSearches;
    },
    radioAndBannerFlag() {
      if (this.homePageInfo.show_right_banner && this.radioGroup == "1") {
        return "8";
      } else if (
        (this.homePageInfo.show_right_banner && this.radioGroup == "2") ||
        (!this.homePageInfo.show_right_banner && this.radioGroup == "1")
      ) {
        return "10";
      } else return "10";
    },
    minProductWidthFlag() {
      if (
        (this.homePageInfo.show_right_banner &&
          this.$vuetify.breakpoint.smAndDown) ||
        !this.homePageInfo.show_right_banner
      )
        return "114%";
      else return "100%";
    },

    categoriesTreeArray() {
      return this.$store.state.Home.categoriesTreeArray;
    },
    loadmore() {
      return this.$store.state.Home.loadmore;
    },
  },
  methods: {
    async filterProducts(buttonPressed) {
      var obj = {};
      this.productFilterFlag = true;
      if (buttonPressed == "loadmore") {
        if (this.productAdvancedSearches.product_name)
          obj.product_name = this.productAdvancedSearches.product_name;

        if (this.productAdvancedSearches.governorate)
          obj.governorate = this.productAdvancedSearches.governorate;

        if (this.productAdvancedSearches.region)
          obj.region = this.productAdvancedSearches.region;

        if (this.productAdvancedSearches.priceFrom)
          obj.priceFrom = this.productAdvancedSearches.priceFrom;

        if (this.productAdvancedSearches.priceTo)
          obj.priceTo = this.productAdvancedSearches.priceTo;
      }

      obj.category_id =
        this.loadmore && this.loadmore.category
          ? this.loadmore.category.id
          : "";

      obj.product_id =
        buttonPressed == "search"
          ? this.products[0].product_id
          : this.filteredProducts[this.filteredProducts.length - 1].product_id;

      obj.buttonPressed = buttonPressed;
      await this.$store.dispatch("filterProducts", obj);

      this.isLoading = false;
    },

    async loadmoreSuppliers() {
      this.isLoading = true;
      var self = this;
      self.$store.dispatch("getSuppliers", {
        supplierFilterFlag: this.supplierFilterFlag,
      });
      this.isLoading = false;
    },

    async All() {
      await this.$store.commit("loadMoreType", { name: "all", type: "all" });
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
      await this.$store.dispatch("getSuppliers", {
        supplierFilterFlag: this.supplierFilterFlag,
      });
    },

    async filterByCategory(catAr) {
      if (catAr.length != 0) {
        var cat = catAr[0];
        var obj = {};
        obj.category_id = cat.id;
        obj.buttonPressed = "search";
        obj.product_id = 0;
        await this.$store.dispatch("filterProducts", obj);
        this.$store.commit("loadMoreType", {
          category: cat,
          type: "category",
        });
      }
    },

    changeRadioGroup() {
      if (this.radioGroup == "1") {
        this.$store.commit("changeRadioGroup", "2");
      } else {
        this.$store.commit("changeRadioGroup", "1");
      }
    },
  },
  components: {
    product: () => import("../components/product"),
    supplier: () => import("../components/supplier"),
  },
};
</script>
