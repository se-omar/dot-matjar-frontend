<template>
  <v-app v-if="currentUser.user_type">
    <div class="vld-parent">
      <div v-if="currentUser.user_type == 'admin'">
        <SiteColor></SiteColor>
      </div>
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></loading>
    </div>
    <!-- ADDING Categories -->
    <v-row justify="center">
      <h2>{{ $t("adminPage.addNewCategory") }}</h2>
    </v-row>
    <v-row justify="center">
      <v-form v-model="addCategoryValidation">
        <v-col>
          <v-text-field
            :rules="required"
            v-model="newCategoryName"
            :placeholder="$t('adminPage.categoryName')"
            rounded
            outlined
          ></v-text-field>
        </v-col>
      </v-form>
    </v-row>
    <v-row justify="center">
      <v-btn
        :disabled="!addCategoryValidation"
        rounded
        :color="siteColor.button_color"
        class="white--text"
        @click="addNewCategory"
        ><span :style="`color:${siteColor.button_text_color}`">{{
          $t("adminPage.addCategory")
        }}</span></v-btn
      >
    </v-row>
    <v-divider class="mx-16"></v-divider>
    <!-- Adding category items -->
    <v-row justify="center">
      <h3>{{ $t("adminPage.addCategoryItems") }}</h3>
    </v-row>

    <v-form justify="center" v-model="valid">
      <v-row justify="center">
        <v-col cols="3">
          <v-select
            :rules="required"
            outlined
            rounded
            :items="productCategory"
            v-model="categoryName"
            :placeholder="$t('adminPage.categoryName')"
          ></v-select>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="categoryItem"
            :placeholder="$t('adminPage.categoryItem')"
            class="text-xl"
            rounded
            outlined
            :rules="required"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-row justify="center">
      <v-btn
        :disabled="!valid"
        rounded
        :color="siteColor.button_color"
        @click="addCategoryItem"
        ><span :style="`color:${siteColor.button_text_color}`">{{
          $t("adminPage.addItem")
        }}</span></v-btn
      >
    </v-row>
    <v-divider class="mx-16"></v-divider>
    <!-- Removing category items -->
    <v-row justify="center">
      <h2>{{ $t("adminPage.removeCategory") }}</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <v-select
          @change="gettingCategoryItems"
          :items="productCategory"
          outlined
          rounded
          :label="$t('adminPage.chooseCategoryRemoved')"
          v-model="chooseCategoryToRemove"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          rounded
          outlined
          :placeholder="$t('adminPage.chooseItemRemoved')"
          v-model="chooseItemToRemove"
          :items="categoryItems"
        >
          <!-- ========================================================================= -->
        </v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn
        :disabled="!chooseCategoryToRemove"
        rounded
        :color="siteColor.button_color"
        class="white--text"
        @click="confirmingRemovingCategory = true"
        ><span :style="`color:${siteColor.button_text_color}`">{{
          $t("adminPage.removeCategory")
        }}</span></v-btn
      >
      <!-- dialoge testing ============ -->
      <v-dialog v-model="confirmingRemovingCategory" max-width="400">
        <v-card>
          <v-card-title class="headline">{{
            $t("adminPage.deleteCategoryCheck")
          }}</v-card-title>

          <v-card-text>{{ $t("adminPage.deleteCategoryCheck2") }}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :color="siteColor.button_color"
              text
              @click="confirmingRemovingCategory = false"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("adminPage.disagree")
              }}</span></v-btn
            >

            <v-btn :color="siteColor" text @click="removeCategory"
              ><span :style="`color:${siteColor.button_text_color}`"
                >Agree</span
              ></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        :disabled="chooseItemToRemove.length == 0"
        rounded
        :color="siteColor.button_color"
        @click="removeItem"
        ><span :style="`color:${siteColor.button_text_color}`">Disagree</span
        >>{{ $t("adminPage.removeItem") }}</v-btn
      >
    </v-row>

    <v-divider class="mx-16"></v-divider>

    <v-row justify="center" class="mt-7">
      <p class="text-h4">{{ $t("adminPage.editCarousel") }}</p>
    </v-row>

    <v-row justify="center">
      <v-col cols="6" lg="2" sm="4" md="6">
        <v-switch
          :label="$t('adminPage.showCarousel')"
          v-model="carouselCheckbox"
        ></v-switch>
      </v-col>

      <!-- <v-col cols="6" lg="2" sm="4" md="6">
        <v-switch
          label="show left banner"
          v-model="leftBannerCheckbox"
        ></v-switch>
      </v-col> -->

      <v-col cols="6" lg="2" sm="4" md="6">
        <v-switch
          :label="$t('adminPage.showRightBanner')"
          v-model="rightBannerCheckbox"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col lg="2" v-if="carouselCheckbox">
        <v-form enctype="multipart/form-data">
          <label>{{ $t("adminPage.carouselImage") }} 1</label>
          <v-file-input
            accept="image/*"
            @change="setCarouselImage1"
          ></v-file-input>
          <v-img
            v-if="homePageInfo.carousel_image_1 || carouselViewImg1"
            :src="
              carouselViewImg1
                ? carouselViewImg1
                : nodeHost + homePageInfo.carousel_image_1
            "
            width="300px"
            height="250px"
          ></v-img>
          <v-row
            v-if="homePageInfo.carousel_image_1 || carouselViewImg1"
            class="mt-2"
            justify="center"
          >
            <v-btn
              @click="removeCarouselImage(1)"
              small
              class="red white--text"
              fab
              >X</v-btn
            >
          </v-row>
        </v-form>
      </v-col>

      <v-col lg="2" v-if="carouselCheckbox">
        <v-form>
          <label>{{ $t("adminPage.carouselImage") }} 2</label>
          <v-file-input
            accept="image/*"
            :disabled="!carouselImage1 && !homePageInfo.carousel_image_1"
            @change="setCarouselImage2"
          ></v-file-input>
          <v-img
            v-if="homePageInfo.carousel_image_2 || carouselViewImg2"
            :src="
              carouselViewImg2
                ? carouselViewImg2
                : nodeHost + homePageInfo.carousel_image_2
            "
            width="300px"
            height="250px"
          ></v-img>
          <v-row
            v-if="homePageInfo.carousel_image_2 || carouselViewImg2"
            class="mt-2"
            justify="center"
          >
            <v-btn
              v-if="homePageInfo.carousel_image_2 || carouselViewImg2"
              @click="removeCarouselImage(2)"
              small
              class="red white--text"
              fab
              >X</v-btn
            >
          </v-row>
        </v-form>
      </v-col>

      <v-col lg="2" v-if="carouselCheckbox">
        <v-form>
          <label>{{ $t("adminPage.carouselImage") }} 3</label>
          <v-file-input
            accept="image/*"
            :disabled="!carouselImage2 && !homePageInfo.carousel_image_2"
            @change="setCarouselImage3"
          ></v-file-input>
          <v-img
            v-if="homePageInfo.carousel_image_3 || carouselViewImg3"
            :src="
              carouselViewImg3
                ? carouselViewImg3
                : nodeHost + homePageInfo.carousel_image_3
            "
            width="300px"
            height="250px"
          ></v-img>
          <v-row
            v-if="homePageInfo.carousel_image_3 || carouselViewImg3"
            class="mt-2"
            justify="center"
          >
            <v-btn
              v-if="homePageInfo.carousel_image_3 || carouselViewImg3"
              @click="removeCarouselImage(3)"
              small
              class="red white--text"
              fab
              >X</v-btn
            >
          </v-row>
        </v-form>
      </v-col>

      <v-col lg="2" v-if="carouselCheckbox">
        <v-form>
          <label>{{ $t("adminPage.carouselImage") }} 4</label>
          <v-file-input
            accept="image/*"
            :disabled="!carouselImage3 && !homePageInfo.carousel_image_3"
            @change="setCarouselImage4"
          ></v-file-input>
          <v-img
            v-if="homePageInfo.carousel_image_4 || carouselViewImg4"
            :src="
              carouselViewImg4
                ? carouselViewImg4
                : nodeHost + homePageInfo.carousel_image_4
            "
            width="300px"
            height="250px"
          ></v-img>
          <v-row
            v-if="homePageInfo.carousel_image_4 || carouselViewImg4"
            class="mt-2"
            justify="center"
          >
            <v-btn
              v-if="homePageInfo.carousel_image_4 || carouselViewImg4"
              @click="removeCarouselImage(4)"
              small
              class="red white--text"
              fab
              >X</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col v-if="carouselCheckbox" cols="6" lg="3" sm="4" md="6">
        <v-text-field
          :label="$t('adminPage.carouselWidth')"
          v-model="carouselWidth"
          rounded
          :rules="[rules.min_max_width]"
          outlined
          :color="siteColor"
        ></v-text-field>
      </v-col>

      <v-col v-if="carouselCheckbox" cols="6" lg="3" sm="4" md="6">
        <v-text-field
          type="number"
          :label="$t('adminPage.carouselHeight')"
          v-model="carouselHeight"
          :rules="[rules.min_max_height]"
          rounded
          outlined
          :color="siteColor"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <!-- <v-col lg="4" v-if="leftBannerCheckbox">
        <v-form>
          <label>left banner image</label>
          <v-file-input accept="image/*" @change="setLeftImage"></v-file-input>
          <v-img
            :src="
              leftBannerViewImg
                ? leftBannerViewImg
                : nodeHost + homePageInfo.left_banner_image
            "
            width="300px"
            height="250px"
          ></v-img>

          <v-row
            v-if="homePageInfo.left_banner_image || leftBannerViewImg"
            class="mt-2"
            justify="center"
          >
            <v-btn
              v-if="homePageInfo.left_banner_image || leftBannerViewImg"
              @click="removeCarouselImage(5)"
              small
              class="red white--text"
              fab
              >X</v-btn
            >
          </v-row>
        </v-form>
      </v-col> -->

      <v-col lg="3" v-if="rightBannerCheckbox">
        <v-form>
          <label>{{ $t("adminPage.rightBannerImage") }}</label>
          <v-file-input accept="image/*" @change="setRightImage"></v-file-input>
          <v-img
            :src="
              rightBannerViewImg
                ? rightBannerViewImg
                : nodeHost + homePageInfo.right_banner_image
            "
            width="300px"
            height="250px"
          ></v-img>

          <v-row
            v-if="homePageInfo.right_banner_image || rightBannerViewImg"
            class="mt-2"
            justify="center"
          >
            <v-btn
              v-if="homePageInfo.right_banner_image || rightBannerViewImg"
              @click="removeCarouselImage(6)"
              small
              class="red white--text"
              fab
              >X</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn :color="siteColor.button_color" @click="sendData"
        ><span :style="`color:${siteColor.button_text_color}`"
          >Disagree</span
        ></v-btn
      >
      <v-btn @click="sendData">{{ $t("adminPage.update") }}</v-btn>
    </v-row>

    <v-row justify="center">
      <p class="display-1 mt-8">{{ $t("adminPage.top10Suppliers") }}</p>
    </v-row>

    <v-row>
      <v-col
        class="mb-15"
        v-for="sortedSupplier in suppliersSortedBySales.slice(0, 10)"
        :key="sortedSupplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(sortedSupplier)">
          <supplier :supplier="sortedSupplier"></supplier>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center" v-if="selectedMonth !== 'all'">
      <p class="display-1 mt-8">
        {{ $t("adminPage.topYearMonthSuppliers") }} {{ selectedMonth }}
      </p>
    </v-row>

    <v-row justify="center" v-if="selectedMonth === 'all'">
      <p class="display-1 mt-8">
        {{ $t("adminPage.topYearMonthSuppliers") }} {{ selectedYear }}
      </p>
    </v-row>

    <v-row class="mb-n7" style="width: 92%; margin: auto">
      <v-col lg="3">
        <v-select
          @change="changeYear"
          v-model="selectedYear"
          outlined
          :items="years"
          :label="$t('adminPage.selectYear')"
        ></v-select>
      </v-col>

      <v-col lg="3">
        <v-select
          @change="changeYear"
          v-model="selectedMonth"
          outlined
          :items="months"
          :label="$t('adminPage.selectMonth')"
        ></v-select>
      </v-col>

      <v-col class="mt-2" lg="2">
        <v-btn
          :color="siteColor.button_color"
          large
          @click="
            getTopMonthlySuppliers();
            isLoading = true;
          "
          ><span :style="`color:${siteColor.button_text_color}`">{{
            $t("adminPage.filter")
          }}</span></v-btn
        >
      </v-col>
    </v-row>
    <v-row
      justify="center"
      v-if="topYearSuppliers.length < 1 && topMonthSuppliers.length < 1"
    >
      <v-col lg="7">
        <p class="text-h4">No Data available</p>
      </v-col>
    </v-row>
    <v-row v-if="selectedMonth === 'all'">
      <v-col
        class="mb-15"
        v-for="topSupplier in topYearSuppliers"
        :key="topSupplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(sortedSupplier)">
          <supplier
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :supplier="topSupplier"
          ></supplier>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        class="mb-15"
        v-for="topSupplier in topMonthSuppliers"
        :key="topSupplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(sortedSupplier)">
          <supplier
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :supplier="topSupplier"
          ></supplier>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center">
      <p class="display-1 mt-8">{{ $t("adminPage.suppliersChart") }}</p>
    </v-row>

    <v-row justify="center">
      <v-col lg="7" md="6" sm="12" cols="12">
        <div style="text-align: center">
          <v-hover>
            <v-card
              width="900"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 3}`"
              class="mb-7 grey lighten-5"
            >
              <apexchart
                class="mb-n2"
                :height="
                  suppliersSortedBySales.length > 0
                    ? suppliersSortedBySales.length * 20
                    : 250
                "
                id="lineChart"
                type="bar"
                :options="chartOptions"
                :series="salesChartSeries"
              ></apexchart>
            </v-card>
          </v-hover>
        </div>
      </v-col>

      <v-col style="max-width: 18%" lg="3">
        <v-card @click="supplierClicked(suppliersSortedBySales[0])">
          <supplier
            height="100"
            :supplier="suppliersSortedBySales[0]"
          ></supplier>
        </v-card>
        <v-row class="mt-4" justify="center">
          <v-label>
            <span style="font-size: 22px; text-align: center">{{
              $t("adminPage.topSellingSupplier")
            }}</span>
          </v-label>
        </v-row>
      </v-col>

      <v-col style="max-width: 18%" lg="3">
        <v-card
          @click="
            supplierClicked(
              suppliersSortedBySales[suppliersSortedBySales.length - 1]
            )
          "
        >
          <supplier
            height="100"
            :supplier="
              suppliersSortedBySales[suppliersSortedBySales.length - 1]
            "
          ></supplier>
        </v-card>
        <v-row class="mt-4" justify="center">
          <v-label>
            <span style="font-size: 22px; text-align: center">{{
              $t("adminPage.leastSellingSupplier")
            }}</span>
          </v-label>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center">
      <p class="display-1 mt-8">{{ $t("adminPage.allSuppliers") }}</p>
    </v-row>

    <v-row justify="center">
      <v-col lg="3">
        <v-text-field
          @keyup="emptySupplierName"
          dense
          outlined
          v-model="supplierName"
          :placeholder="$t('adminPage.supplierNameSearch')"
        ></v-text-field>
      </v-col>

      <v-col lg="3">
        <v-select
          :items="egyptGovernorates"
          :placeholder="$t('adminPage.governorate')"
          dense
          outlined
          v-model="governorate"
          @change="getCountryRegions()"
        ></v-select>
      </v-col>

      <v-col lg="3">
        <v-select
          :items="regions"
          :placeholder="$t('adminPage.region')"
          dense
          outlined
          v-model="region"
        ></v-select>
      </v-col>

      <v-col lg="1">
        <v-btn
          class="white--text"
          @click="filterSuppliers"
          :color="siteColor.button_color"
        >
          <span :style="`color:${siteColor.button_text_color}`">{{
            $t("adminPage.search")
          }}</span></v-btn
        >
      </v-col>

      <v-col lg="1">
        <v-btn class="white--text" @click="All" :color="siteColor.button_color"
          ><span :style="`color:${siteColor.button_text_color}`"
            >All</span
          ></v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="mb-15"
        v-for="supplier in suppliers"
        :key="supplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(supplier)">
          <supplier :supplier="supplier"></supplier>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn
        large
        :color="siteColor.button_color"
        class="mb-15 white--text"
        @click="loadMore"
        ><span :style="`color:${siteColor.button_text_color}`">{{
          $t("adminPage.loadmore")
        }}</span></v-btn
      >
    </v-row>
  </v-app>
</template>

<script>
import supplier from "../components/supplier";
import moment from "moment";
import SiteColor from "../components/siteColor";
export default {
  async created() {
    //this.isLoading = true;
    await this.$store.dispatch("refreshCurrentUser");
    await this.$store.dispatch("getAllSuppliersWithSales");
    await this.$store.dispatch("getGovernorate");
    await this.$store.dispatch("getSiteColor");
    // console.log(this.currentMonth);
    await this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
      supplierName: this.supplierName,
      governorate: this.governorate,
      region: this.region,
    });

    await this.$store.dispatch("getHomePageData");
    // console.log("supplier page info", this.supplierPageInfo);

    if (this.homePageInfo.show_carousel === 1) this.carouselCheckbox = true;

    // if (this.homePageInfo.show_left_banner === 1)
    //   this.leftBannerCheckbox = true;

    if (this.homePageInfo.show_right_banner === 1)
      this.rightBannerCheckbox = true;

    // console.log("all suppliers", this.suppliers);

    // console.log(
    //   "all suppliers with sales from admin page",
    //   this.allSuppliersWithSales
    // );
    await this.getTopMonthlySuppliers();
    this.isLoading = false;
    // console.log("suppliers sorted by sales", this.suppliersSortedBySales);
    this.$store.dispatch("categoriesDB");
    this.$store.dispatch("getCategoryItems");
  },

  data: () => {
    return {
      supplierFilterFlag: false,
      isLoading: false,
      notSortedOrders: [],
      selectedYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      selectedMonth: "all",
      topMonthlySalesArray: [],
      topMonthlyRevenueArray: [],
      topMonthSuppliers: [],
      topYearSuppliers: [],
      governorate: "",
      region: "",
      supplierName: "",
      supplierLocation: "",
      months: [
        "all",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      loadingTimer: 10000,
      rules: {
        required: (value) => !!value || "Required.",
        min_max_width: (v) => (v > 1 && v <= 12) || "must be between 1 and 12",
        min_max_height: (v) => (v > 0 && v <= 3000) || "no more than 3000",
      },
      newCategoryName: "",
      categoryName: "",
      categoryItem: "",
      required: [(v) => !!v || "You must add your item"],
      valid: true,
      chooseCategoryToRemove: "",
      categoryItems: [],
      chooseItemToRemove: [],
      addCategoryValidation: true,
      confirmingRemovingCategory: false,
      carouselHeight: "",
      carouselWidth: "",
      carouselCheckbox: false,
      // leftBannerCheckbox: false,
      rightBannerCheckbox: false,
      carouselImage1: "",
      carouselImage2: "",
      carouselImage3: "",
      carouselImage4: "",
      // leftImage: "",
      rightImage: "",
      carouselViewImg1: "",
      carouselViewImg2: "",
      carouselViewImg3: "",
      carouselViewImg4: "",
      // leftBannerViewImg: "",
      rightBannerViewImg: "",
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },

    regions() {
      return this.$store.state.Home.regions;
    },
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },
    suppliers() {
      return this.$store.state.Home.suppliers;
    },

    allSuppliersWithSales() {
      return this.$store.state.AdminPage.allSuppliersWithSales;
    },

    supplier() {
      return this.$store.state.SupplierPage.supplier;
    },

    suppliersSortedBySales() {
      var allSuppliers = this.allSuppliersWithSales;
      var ar = allSuppliers.sort((a, b) =>
        a.total_sales < b.total_sales
          ? 1
          : b.total_sales < a.total_sales
          ? -1
          : 0
      );
      return ar;
    },

    sellingSuppliersNameArray() {
      var ar = [];
      this.suppliersSortedBySales.forEach((element) => {
        ar.push(element.full_arabic_name);
      });
      return ar;
    },

    suppliersTotalSalesArray() {
      var ar = [];
      this.suppliersSortedBySales.forEach((element) => {
        ar.push(element.total_sales);
      });
      return ar;
    },

    chartOptions() {
      return {
        chart: {
          id: "vuechart-example",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: this.sellingSuppliersNameArray,
        },
        colors: ["#F44336"],
      };
    },

    salesChartSeries() {
      return [
        {
          name: "asdasd",
          data: this.suppliersTotalSalesArray,
        },
      ];
    },
    years() {
      return this.getYearsArray(10);
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
    productCategory() {
      return this.$store.state.Home.category;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },
    homePageInfo() {
      return this.$store.state.Home.homePageInfo;
    },
  },

  methods: {
    moment() {
      return new moment();
    },

    async loadMore() {
      this.isLoading = true;
      var self = this;
      await self.$store.dispatch("getSuppliers", this.supplierFilterFlag);
      this.isLoading = false;
    },

    supplierClicked(supplier) {
      localStorage.setItem("clickedSupplier", JSON.stringify(supplier));
      console.log("supplier is", supplier);
      console.log("supplier id is", supplier.user_id);
      //this.$store.commit("supplierPage", supplier);
      this.$router.push(`/${this.$i18n.locale}/suppliersDashboard`);
      // console.log(this.supplier);
    },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },

    async getTopMonthlySuppliers() {
      //this.isLoading = true;
      var self = this;
      self.topMonthSuppliers = [];
      self.topYearSuppliers = [];
      var monthlySortedOrders = [];
      var totalMonthSales;
      var totalYearSales;
      var totalMonthRevenue;
      var totalYearRevenue;
      var yearlySortedOrders;

      for (var i = 0; i < this.allSuppliersWithSales.length; i++) {
        totalMonthSales = 0;
        totalYearSales = 0;
        totalMonthRevenue = 0;
        totalYearRevenue = 0;
        await self.$axios
          .post("http://localhost:3000/api/monthlySales", {
            user_id: self.allSuppliersWithSales[i].user_id,
          })
          .then((response) => {
            if (response.data.length > 0) {
              yearlySortedOrders = self.groupBy(
                response.data,
                (c) => c.order_year
              );

              if (yearlySortedOrders[self.selectedYear]) {
                monthlySortedOrders = self.groupBy(
                  yearlySortedOrders[self.selectedYear],
                  (c) => c.order_month
                );
                // debugger;
                var currentSupplier;
                var currentYearOrders = yearlySortedOrders[self.selectedYear];
                // console.log("current year orders", currentYearOrders);

                if (self.selectedMonth === "all") {
                  currentSupplier = currentYearOrders[0].products[0].user;
                  // console.log("current supplier from all", currentSupplier);
                  for (var h = 0; h < currentYearOrders.length; h++) {
                    currentYearOrders[h].products.forEach((element) => {
                      totalYearSales += element.buy_counter;
                      totalYearRevenue +=
                        element.buy_counter * element.unit_price;
                    });
                  }

                  if (totalYearSales > 0) {
                    currentSupplier.yearSales = totalYearSales;
                    currentSupplier.yearRevenue = totalYearRevenue;
                    // console.log(totalYearRevenue);
                    self.topYearSuppliers.push(currentSupplier);
                  }
                } else {
                  var currentMonthIndex = self.months.indexOf(
                    self.selectedMonth
                  );
                  if (monthlySortedOrders[currentMonthIndex]) {
                    for (
                      var j = 0;
                      j < monthlySortedOrders[currentMonthIndex].length;
                      j++
                    ) {
                      currentSupplier =
                        monthlySortedOrders[currentMonthIndex][j].products[0]
                          .user;
                      monthlySortedOrders[currentMonthIndex][
                        j
                      ].products.forEach((element) => {
                        totalMonthSales += element.buy_counter;
                        totalMonthRevenue +=
                          element.buy_counter * element.unit_price;
                      });
                    }
                  }
                  if (totalMonthSales > 0) {
                    currentSupplier.monthSales = totalMonthSales;
                    currentSupplier.monthRevenue = totalMonthRevenue;
                    // console.log(totalMonthRevenue);
                    // console.log("entered herer");
                    self.topMonthSuppliers.push(currentSupplier);
                    // console.log("top month suppliers", self.topMonthSuppliers);
                  }
                }
              }
            }
          });
      }

      self.topMonthSuppliers.sort(function (a, b) {
        return b.monthSales - a.monthSales;
      });

      self.topYearSuppliers.sort(function (a, b) {
        return b.yearSales - a.yearSales;
      });

      // console.log("top month suppliers", self.topMonthSuppliers);
      this.isLoading = false;
    },

    changeYear() {
      // console.log(this.selectedYear);
    },

    filterSuppliers() {
      this.supplierFilterFlag = true;
      this.$store.dispatch("filterSuppliers", {
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });
    },

    emptySupplierName() {
      if (!this.supplierName) {
        this.$store.commit("emptySupplierName");
      }
    },

    getCountryRegions() {
      // console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },

    All() {
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
    },

    getYearsArray(back) {
      const year = new Date().getFullYear();
      return Array.from({ length: back }, (v, i) => year - back + i + 1);
    },
    addNewCategory() {
      // console.log(this.newCategoryName);
      this.$store.dispatch("addNewCategory", this.newCategoryName);
      this.$router.go();
    },
    async addCategoryItem() {
      // console.log(this.categoryName, this.categoryItem);
      await this.$store.dispatch("addCategoryItems", {
        categoryName: this.categoryName,
        categoryItem: this.categoryItem,
      });
      // this.$router.go();
    },
    gettingCategoryItems() {
      this.chooseItemToRemove = [];
      // console.log(this.category);
      // console.log("categories items", this.categoriesItems);
      this.categoryItems = [];
      for (let i = 0; i < this.categoriesItems.length; i++) {
        if (
          this.categoriesItems[i].category_name == this.chooseCategoryToRemove
        ) {
          this.categoryItems.push(this.categoriesItems[i].category_items);
        }
      }
      // console.log(this.categoryItems);
      // console.log("categories items is", this.categoriesItems);
    },
    removeItem() {
      // console.log(this.chooseCategoryToRemove, this.chooseItemToRemove);

      this.$store.dispatch("removeCategoryAndItems", {
        categoryName: this.chooseCategoryToRemove,
        categoryItem: this.chooseItemToRemove,
      });
      // this.$router.go();
    },
    removeCategory() {
      this.confirmingRemovingCategory = false;
      this.$store.dispatch("removeCategoryAndItems", {
        categoryName: this.chooseCategoryToRemove,
        categoryItem: [],
      });
      // this.$router.go();
    },
    convertBoolToInt(bool) {
      if (bool == true) return 1;
      else return 0;
    },

    async sendData() {
      var carouselformdata = new FormData();
      var bannerformdata = new FormData();

      var carouselImages = [
        this.carouselImage1,
        this.carouselImage2,
        this.carouselImage3,
        this.carouselImage4,
      ];

      bannerformdata.set("user_id", this.currentUser.user_id);
      // if (this.leftImage) bannerformdata.append("file", this.leftImage, "left");
      console.log("right image", this.rightImage);
      if (this.rightImage)
        bannerformdata.append("file", this.rightImage, "right");

      carouselformdata.set("user_id", this.currentUser.user_id);
      carouselImages.forEach((element) => {
        carouselformdata.append("file", element ? element : "empty");
      });

      await this.$store.dispatch("updateHomePage", {
        show_carousel: this.convertBoolToInt(this.carouselCheckbox),
        show_right_banner: this.convertBoolToInt(this.rightBannerCheckbox),
        carousel_width: this.carouselWidth,
        carousel_height: this.carouselHeight,
      });

      await this.$store.dispatch("uploadHomeCarouselImages", carouselformdata);
      await this.$store.dispatch("uploadHomeBannerImages", bannerformdata);
      alert("home page updated successfully");
    },
    setCarouselImage1(image) {
      this.carouselImage1 = image;
      this.carouselViewImg1 = URL.createObjectURL(image);
      // console.log(this.testImg);
      // console.log(image);
    },
    setCarouselImage2(image) {
      this.carouselImage2 = image;
      this.carouselViewImg2 = URL.createObjectURL(image);
      // console.log(image);
    },
    setCarouselImage3(image) {
      this.carouselImage3 = image;
      this.carouselViewImg3 = URL.createObjectURL(image);
      // console.log(image);
    },
    setCarouselImage4(image) {
      this.carouselImage4 = image;
      this.carouselViewImg4 = URL.createObjectURL(image);
      // console.log(image);
    },
    // setLeftImage(image) {
    //   this.leftImage = image;
    //   this.leftBannerViewImg = URL.createObjectURL(image);
    // console.log(image);
    // },
    setRightImage(image) {
      this.rightImage = image;
      this.rightBannerViewImg = URL.createObjectURL(image);
      // console.log(image);
    },

    removeCarouselImage(imgNum) {
      if (imgNum == 1) {
        this.homePageInfo.carousel_image_1 = "";
        this.$store.dispatch("removeHomeCarouselImage", {
          imgName: "carousel_image_1",
        });
      }
      if (imgNum == 2) {
        this.homePageInfo.carousel_image_2 = "";
        this.$store.dispatch("removeHomeCarouselImage", {
          imgName: "carousel_image_2",
        });
      }
      if (imgNum == 3) {
        this.homePageInfo.carousel_image_3 = "";
        this.$store.dispatch("removeHomeCarouselImage", {
          imgName: "carousel_image_3",
        });
      }
      if (imgNum == 4) {
        this.homePageInfo.carousel_image_4 = "";
        this.$store.dispatch("removeHomeCarouselImage", {
          imgName: "carousel_image_4",
        });
      }
      // if (imgNum == 5) {
      //   this.homePageInfo.left_banner_image = "";
      //   this.$store.dispatch("removeHomeBannerImage", {
      //     imgName: "left_banner_image",
      //   });
      // }
      if (imgNum == 6) {
        this.homePageInfo.right_banner_image = "";
        this.$store.dispatch("removeHomeBannerImage", {
          imgName: "right_banner_image",
        });
      }
    },
  },

  components: {
    supplier,
    SiteColor,
  },
};
</script>



<style scoped>
</style>