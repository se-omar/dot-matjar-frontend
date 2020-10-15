<template>
  <div class="tool-bar">
    <!-- <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></loading>
    </div> -->
    <v-app-bar fixed :color="siteColor.toolbar_color" shaped>
      <span v-if="!supplierPageInfo.logo">
        <a @click="$router.push('/').catch(() => {})">
          <v-img
            src="../assets/images/dotmatjar_logo.png"
            max-height="150"
            max-width="160"
            contain
          ></v-img>
        </a>
      </span>

      <span v-else class="ml-4">
        <v-btn text max-width="150" @click="goSupplierPage">
          <v-img
            class="mx-2"
            :src="nodeHost + supplierPageInfo.logo"
            max-height="60"
            max-width="100"
            contain
          ></v-img>
          <span class="mt-3">{{ supplierPageInfo.site_name }}</span>
        </v-btn>
      </span>

      <!-- <v-spacer></v-spacer> -->
      <v-row justify="center">
        <v-col v-if="!$route.params.supplier_id" cols="12" lg="6" sm="7" md="6">
          <v-text-field
            class="mt-8"
            outlined
            rounded
            placeholder="SEARCH"
            append-icon="fa fa-search"
            @keyup="emptySearchBox"
            v-model="toolbarSearch"
            @keypress="filterProducts"
          ></v-text-field>
        </v-col>
        <v-col v-else cols="12" lg="6" sm="7" md="6">
          <v-text-field
            class="mt-8"
            outlined
            rounded
            placeholder="SEARCH"
            append-icon="fa fa-search"
            @keyup="filterSupplierProducts($route.params.supplier_id)"
            v-model="supplierProductsSearch"
          ></v-text-field>
        </v-col>

        <!-- <span v-else>
          <v-col cols="12" lg="6" sm="7" md="6">
            <v-text-field
              class="mt-8"
              outlined
              rounded
              placeholder="SEARCH"
              append-icon="fa fa-search"
              @keyup="filterSuppliers()"
              v-model="filterSuppliersByName"
            ></v-text-field>
          </v-col>
        </span> -->
        <v-col cols="12" md="3" lg="3" sm="5">
          <v-btn
            class="mt-10 mr-1 blue white--text"
            rounded
            @click="advancedSearch = true"
            ><span style="font-size: 12px">{{
              $t("toolbar.advancedSearch")
            }}</span></v-btn
          >
        </v-col>
        <v-dialog
          style="overflow: hidden"
          v-model="advancedSearch"
          max-width="80%"
        >
          <v-card style="overflow: hidden">
            <v-row justify="center">
              <v-radio-group
                style="margin-right: 50px"
                mandatory
                v-model="radioGroup"
              >
                <v-row class="mb-n5" justify="center">
                  <v-col cols="3" lg="4" sm="5" md="5">
                    <v-radio
                      :label="$t('toolbar.searchProducts')"
                      value="1"
                    ></v-radio>
                  </v-col>

                  <v-col cols="3" lg="4" sm="5" md="5">
                    <v-radio
                      :label="$t('toolbar.searchSuppliers')"
                      value="2"
                    ></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-row>
            <v-row justify="center">
              <v-col cols="3" sm="1" lg="2"></v-col>
              <v-col cols="3" lg="4" sm="5" md="3">
                <v-select
                  rounded
                  v-if="radioGroup === '1'"
                  :items="egyptGovernorates"
                  :disabled="radioGroup === '2'"
                  :placeholder="$t('toolbar.governorate')"
                  dense
                  outlined
                  v-model="governorate"
                  @change="getCountryRegions()"
                ></v-select>
              </v-col>

              <v-col cols="3" lg="4" sm="5" md="3">
                <v-select
                  rounded
                  v-if="radioGroup === '1'"
                  :items="regions"
                  :disabled="radioGroup === '2'"
                  :placeholder="$t('toolbar.region')"
                  dense
                  outlined
                  v-model="region"
                ></v-select>
              </v-col>
              <v-col lg="2" sm="1" cols="3"></v-col>
              <v-col cols="2" lg="3" sm="4" md="4">
                <v-select
                  rounded
                  v-if="radioGroup === '2'"
                  :items="egyptGovernorates"
                  :disabled="radioGroup === '1'"
                  :placeholder="$t('toolbar.governorate')"
                  dense
                  outlined
                  v-model="governorate"
                  @change="getCountryRegions()"
                ></v-select>
              </v-col>

              <v-col cols="2" lg="3" sm="4" md="4">
                <v-text-field
                  rounded
                  v-if="radioGroup === '2'"
                  :disabled="radioGroup === '1'"
                  @keyup="emptySupplierName"
                  dense
                  outlined
                  v-model="filterSuppliersByName"
                  :placeholder="$t('toolbar.supplierNameSearch')"
                ></v-text-field>
              </v-col>
              <v-col lg="3" cols="2" sm="4" md="4">
                <v-select
                  rounded
                  v-if="radioGroup === '2'"
                  :items="regions"
                  :disabled="radioGroup === '1'"
                  :placeholder="$t('toolbar.region')"
                  dense
                  outlined
                  v-model="region"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="mt-n3" justify="center">
              <v-col sm="3" lg="3" md="3"></v-col>
              <v-col cols="6" sm="3" md="3" lg="3">
                <v-text-field
                  :disabled="radioGroup === '2'"
                  dense
                  rounded
                  outlined
                  type="number"
                  :label="$t('toolbar.priceFrom')"
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="3" md="3" lg="3">
                <v-text-field
                  :disabled="radioGroup === '2'"
                  dense
                  outlined
                  rounded
                  type="number"
                  :label="$t('toolbar.priceTo')"
                ></v-text-field>
              </v-col>
              <v-col sm="3" lg="3" md="3"></v-col>
              <v-col lg="5" sm="3" md="3"></v-col>
              <v-col cols="4" sm="2" md="2" lg="2">
                <v-btn
                  class="white--text"
                  @click="filterSuppliers()"
                  :color="siteColor.button_color"
                  rounded
                  x-large
                  ><span :style="`color: ${siteColor.button_text_color}`">{{
                    $t("toolbar.search")
                  }}</span></v-btn
                >
              </v-col>

              <!-- <v-col cols="4" sm="2" md="2" lg="2">
            <v-btn
              class="white--text"
              @click="All"
              :color="siteColor.button_color"
              rounded
              ><span :style="`color: ${siteColor.button_text_color}`"
                >All</span
              ></v-btn
            >
          </v-col> -->

              <v-col cols="4" sm="2" md="2" lg="5">
                <!-- <v-btn
              :disabled="radioGroup === '1'"
              class="white--text"
              @click="filterSuppliers"
              :color="siteColor.button_color"
              :style="`color: ${siteColor.button_text_color}`"
              rounded
              max-width="80"
              ><span :style="`color: ${siteColor.button_text_color}`"
                >Search</span
              ></v-btn
            > -->
              </v-col>
              <v-col sm="3" lg="3" md="3"></v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
      <v-menu
        v-if="currentUser"
        transition="fab-transition"
        :close-on-content-click="false"
        :nudge-width="200"
        max-width="25%"
        max-height="90%"
        offset-y
        class="menu"
        style="overflow: hidden"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            rounded
            style="overflow: hidden"
            class="font"
            :style="`color:${siteColor.toolbar_text_color}`"
            text
            v-bind="attrs"
            v-on="on"
          >
            <i class="fa fa-user fa-lg mt-n1 mr-1" style="color: black"></i>
            <span>{{ $t("toolbar.profile") }}</span>
          </v-btn>
        </template>

        <v-card max-width="100%">
          <v-img
            v-if="currentUser.profile_photo"
            style="
              width: 60%;
              height: 80%;
              margin-left: auto;
              margin-right: auto;
            "
            id="picture"
            :src="nodeHost + currentUser.profile_photo"
          />

          <!-- <v-card-text>
            <span>
            <input type="file" 
            ref="profilePhoto"
            @change="profilePhoto"
            id="profilephoto"
            class="file-input"
            />
            </span>
                      <span class="file-label">Click to change your photo</span>

          </v-card-text>-->

          <div
            v-if="!currentUser.profile_photo"
            id="fileUpload"
            class="file is-boxed is-primary"
          >
            <label class="file-label">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-camera fa-2x" style="color: blue"></i>
                  <br />
                </span>
                <span class="file-label" style="font-weight: bold">
                  {{ $t("toolbar.uploadPhoto") }}
                  <br />
                </span>
              </span>

              <input
                type="file"
                ref="profileUpload"
                @change="changePhoto"
                class="file-input"
                id="profilePhoto"
              />
              <br />
            </label>
          </div>

          <div
            v-if="currentUser.profile_photo"
            id="fileUpload"
            class="file is-boxed is-primary"
          >
            <label class="file-label">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-camera fa-2x" style="color: blue"></i>
                  <br />
                </span>
                <span class="file-label" style="font-weight: bold">
                  {{ $t("toolbar.changeProfilePhoto") }}
                  <br />
                </span>
              </span>

              <input
                type="file"
                ref="profileUpload"
                @change="changePhoto"
                class="file-input"
                id="profilePhoto"
              />
              <br />
            </label>
          </div>

          <v-card-text>
            <v-row justify="center">
              <span class="username">{{ currentUser.full_arabic_name }}</span>
            </v-row>
          </v-card-text>

          <v-row justify="center">
            <v-col cols="12" sm="10" lg="5">
              <v-btn
                class="btn1"
                :color="siteColor.button_color"
                large
                rounded
                @click="supplierPage"
              >
                <span
                  :style="`color:${siteColor.button_text_color}; `"
                  class="mos"
                >
                  {{ $t("toolbar.myPage") }}</span
                >
              </v-btn>
              <v-divider class="mr-4"></v-divider>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="currentUser.user_type == 'business'">
            <v-col cols="12" sm="10" lg="5">
              <v-btn
                class="btn1"
                :color="siteColor.button_color"
                large
                rounded
                @click="$router.push(`/${$i18n.locale}/myProducts`)"
              >
                <span
                  :style="`color:${siteColor.button_text_color}; `"
                  class="mos"
                >
                  {{ $t("toolbar.myProducts") }}</span
                >
              </v-btn>
              <v-divider class="mr-4"></v-divider>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="currentUser.user_type == 'admin'">
            <v-col cols="12" sm="10" lg="5">
              <v-btn
                @click="$router.push('/siteColors')"
                large
                rounded
                :color="siteColor.button_color"
              >
                <span :style="`color:${siteColor.button_text_color};`">
                  Site <br />
                  Colors</span
                >
              </v-btn>
              <v-divider class="mr-4"></v-divider>
            </v-col>
          </v-row>

          <v-row justify="center" v-if="currentUser.user_type == 'business'">
            <v-col cols="12" sm="10" lg="5">
              <v-btn
                class="btn1"
                :color="siteColor.button_color"
                large
                rounded
                @click="$router.push(`/${$i18n.locale}/orderedProducts`)"
              >
                <span
                  :style="`color:${siteColor.button_text_color};`"
                  class="mos"
                >
                  {{ $t("toolbar.orderManage") }}</span
                >
              </v-btn>
              <v-divider class="mr-4"></v-divider>
            </v-col>
          </v-row>

          <v-row justify="center" v-if="currentUser.user_type == 'admin'">
            <v-col cols="12x" sm="11" lg="6">
              <v-btn
                :color="siteColor.button_color"
                large
                rounded
                @click="
                  $router.push(`/${$i18n.locale}/categoryAndItemRequests`)
                "
                ><span
                  v-html="$t('toolbar.categoryRequests')"
                  :style="`color:${siteColor.button_text_color};`"
                >
                </span
              ></v-btn>
              <v-divider class="mr-4"></v-divider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card-text>
                <a
                  class="size"
                  @click="$router.push(`/${$i18n.locale}/editPassword`)"
                >
                  <i
                    class="fa fa-cog"
                    aria-hidden="true"
                    style="color: black"
                  ></i>
                  <span class="ml-2" :color="siteColor.toolbar_text_color">
                    {{ $t("toolbar.changeYourPassword") }}</span
                  >
                </a>
                <br />
                <br />
                <a
                  @click="$router.push(`/${$i18n.locale}/completedata`)"
                  class="size"
                >
                  <i
                    class="fa fa-edit"
                    aria-hidden="true"
                    style="color: black"
                  ></i>
                  {{ $t("toolbar.updateOrCompleteInfo") }}
                </a>
                <br />
                <br />
                <a class="size" @click="logout">
                  <i
                    class="fa fa-power-off"
                    aria-hidden="true"
                    style="color: black"
                  ></i>
                  {{ $t("toolbar.logout") }}
                </a>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>

      <!-- ================= -->
      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          !currentUser && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs
        "
        text
        @click="$router.push(`/${$i18n.locale}/reglogin`).catch((err) => {})"
      >
        {{ $t("toolbar.register") }}</v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser &&
          currentUser.user_type == 'business' &&
          !$vuetify.breakpoint.sm &&
          !$vuetify.breakpoint.xs
        "
        text
        @click="
          $router.push(`/${$i18n.locale}/requestsPage`).catch((err) => {})
        "
      >
        {{ $t("toolbar.requests") }}</v-btn
      >

      <!-- <v-btn
        class="font"
        v-if="
          (currentUser && currentUser.user_type == 'business') ||
          (currentUser.user_type == 'admin' &&
            !$vuetify.breakpoint.sm &&
            !$vuetify.breakpoint.xs)
        "
        text
        @click="$router.push('/myProducts').catch((err) => {})"
        >My Products</v-btn
      > -->

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser.user_type == 'user' &&
          !$vuetify.breakpoint.sm &&
          !$vuetify.breakpoint.xs
        "
        text
        @click="$router.push(`/${$i18n.locale}/userOrders`).catch((err) => {})"
      >
        {{ $t("toolbar.myOrders") }}</v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser &&
          currentUser.user_type == 'business' &&
          !$vuetify.breakpoint.sm &&
          !$vuetify.breakpoint.xs
        "
        text
        @click="$router.push(`/${$i18n.locale}/dashboard`).catch((err) => {})"
      >
        {{ $t("toolbar.dashboard") }}</v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        text
        @click="$router.push(`/${$i18n.locale}/myProducts`)"
      >
        <span> {{ $t("toolbar.aboutUs") }}</span>
      </v-btn>

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser &&
          currentUser.user_type == 'admin' &&
          !$vuetify.breakpoint.sm &&
          !$vuetify.breakpoint.xs
        "
        text
        @click="$router.push(`/${$i18n.locale}/adminPage`).catch((err) => {})"
      >
        {{ $t("toolbar.adminDashboard") }}</v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="currentUser && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        text
        @click="logout"
      >
        {{ $t("toolbar.logout") }}</v-btn
      >

      <v-select
        @change="changeLang"
        class="mt-7"
        style="max-width: 85px"
        solo-inverted
        :items="$i18n.availableLocales"
        v-model="$i18n.locale"
      >
      </v-select>

      <!--============================

      />-->
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="$router.push('/').catch((err) => {})">
              <span style="font-size: 17px"> {{ $t("toolbar.homePage") }}</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="currentUser">
            <v-list-item-icon>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              @click="
                $router.push(`/${$i18n.locale}/editPassword`).catch((err) => {})
              "
            >
              <span style="font-size: 17px">
                {{ $t("toolbar.changeYourPassword") }}</span
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'business'"
          >
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              @click="
                $router.push(`/${$i18n.locale}/requestsPage`).catch((err) => {})
              "
            >
              <span style="font-size: 17px"> {{ $t("toolbar.requests") }}</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'business'"
          >
            <v-list-item-icon>
              <v-icon>mdi-cart-plus</v-icon>
            </v-list-item-icon>
            <!-- <v-list-item-title
              @click="$router.push('/myProducts').catch((err) => {})"
            >
              <span style="font-size: 17px">my products</span>
            </v-list-item-title> -->
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'business'"
          >
            <v-list-item-icon>
              <v-icon>mdi-cart-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              @click="
                $router.push(`/${$i18n.locale}/dashboard`).catch((err) => {})
              "
            >
              <span style="font-size: 17px">
                {{ $t("toolbar.dashboard") }}</span
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!currentUser">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              @click="
                $router.push(`/${$i18n.locale}/reglogin`).catch((err) => {})
              "
            >
              <span style="font-size: 17px">
                {{ $t("toolbar.loginSignup") }}</span
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <span style="font-size: 17px"> {{ $t("toolbar.aboutUs") }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  components: {},
  created() {
    this.$store.dispatch("refreshCurrentUser");

    console.log("color from toolbar", this.siteColor);
  },

  props: {
    //     toolBarColor: {
    //       type: String,
    //       default (){
    // return this.siteColor
    //       }
    //     },
    radioGroup: {
      type: Number,
      default() {
        return 1;
      },
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
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
    supplierPageInfo() {
      return this.$store.state.SupplierPage.supplierPageInfo;
    },
    supplier() {
      return this.$store.state.SupplierPage.supplier;
    },
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },
    regions() {
      return this.$store.state.Home.regions;
    },
  },

  methods: {
    changeLang(value) {
      this.$router.push({
        params: { lang: value },
      });
      this.$vuetify.rtl = value == "ar" ? true : false;
    },
    logout() {
      this.$store.commit("removeCurrentUser");

      setTimeout(() => {
        this.$router.push(`/${this.$i18n.locale}/reglogin`).catch(() => {});
      }, 10);
    },

    changePhoto() {
      this.profilephoto = this.$refs.profileUpload.files[0];
      var form = new FormData();
      console.log("profile function starts");
      form.append("profile", this.profilephoto);
      form.set("email", this.$store.state.Home.currentUser.email);
      console.log(this.$store.state.Home.currentUser.email);
      this.$store.dispatch("profilePhoto", form);
    },
    supplierPage() {
      this.$store.commit("supplierPage", this.currentUser);
      this.$router.push(
        `/${this.$i18n.locale}/supplierPage/` + this.currentUser.user_id
      );
    },
    goSupplierPage() {
      this.$router
        .push("/supplierPage/" + this.supplier.user_id)
        .catch(() => {});
    },

    // async filterProducts() {
    //   this.productFilterFlag = true;

    //   await this.$store.dispatch("filterProducts", {
    //     product_name: this.toolbarSearch,
    //     category_name: this.categoryName,
    //     governorate: this.governorate,
    //     region: this.region,
    //   });
    // },
    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    emptySupplierName() {
      if (!this.supplierName) {
        this.$store.commit("emptySupplierName");
      }
    },
    emptySearchBox() {
      if (!this.toolbarSearch) {
        this.$store.commit("emptySearch");
      }
    },
    async filterProducts() {
      this.isLoading = true;
      this.productFilterFlag = true;
      console.log(this.toolbarSearch, this.categoryName);

      await this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
        governorate: this.governorate,
        region: this.region,
      });

      this.isLoading = false;
    },
    filterSupplierProducts() {
      console.log(this.supplierProductsSearch);
      console.log(this.$route.params.supplier_id);
      this.$store.dispatch("filterSupplierProducts", {
        productsSearch: this.supplierProductsSearch,
        user_id: this.$route.params.supplier_id,
      });
      console.log(this.$route.params.supplier_id);
    },
    async emptySupplierSearchBox() {
      await this.$store.dispatch(
        "getSupplierProducts",
        this.$route.params.supplier_id
      );
    },
    async filterSuppliers() {
      await this.$store.dispatch("filterSuppliers", {
        supplierName: this.filterSuppliersByName,
        governorate: this.governorate,
        region: this.region,
      });
    },
  },
  data: () => ({
    profilephoto: [],
    drawer: false,
    isLoading: false,
    categoryName: "",

    region: "",
    productFilterFlag: false,
    toolbarSearch: "",
    advancedSearch: false,

    governorate: "",

    supplierName: "",
    supplierProductsSearch: "",
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
/* .btn1 {
  margin-left: 30%;
} */
</style>
