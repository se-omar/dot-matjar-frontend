<template>
  <v-footer height="auto">
    <v-card :color="`${siteColor.footer_color}`" flat tile width="100%">
      <v-card-text>
        <v-row justify="center">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-8"
            :style="`color:${siteColor.footer_text_color}`"
            icon
          >
            <v-icon @click="iconPressed(icon)" size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-row justify="center">
        <v-card-text
          :style="`color:${siteColor.footer_text_color}`"
          v-if="!supplierPageInfo.footer"
          class="pt-1 mx-1"
          >{{ $t("footer.footerText") }}</v-card-text
        >
        <v-card-text :style="`color:${siteColor.footer_text_color}`" v-else>{{
          supplierPageInfo.footer
        }}</v-card-text>
      </v-row>
      <v-divider></v-divider>

      <v-card-text class="pt-2" :style="`color:${siteColor.footer_text_color}`">
        <v-row class="mr-10">
          <v-col lg="1">
            <label class="white--text" for="langSwitch">{{
              $t("footer.language")
            }}</label>
            <v-select
              id="langSwitch"
              @change="changeLang"
              class="mt-2"
              background-color="white"
              solo-inverted
              :items="$i18n.availableLocales"
              v-model="$i18n.locale"
            >
            </v-select>
          </v-col>

          <v-col lg="1">
            <label class="white--text" for="currSwitch">{{
              $t("footer.currency")
            }}</label>
            <v-select
              id="currSwitch"
              @change="changeCurrency"
              class="mt-2"
              solo-inverted
              background-color="white"
              :items="currencies"
              v-model="currentCurrency"
            >
            </v-select>
          </v-col>
        </v-row>
        &copy; Copywrites 2020 to Dot-Matjar
        <v-img
          src="../assets/images/dotmatjar_logo.png"
          max-height="100"
          max-width="50"
          contain
        ></v-img>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  props: {
    // backGroundColor: {
    //   type: String,
    //   default (){
    //     return this.siteColor
    //   },
    // },
  },
  methods: {
    iconPressed(item) {
      console.log(item);

      switch (item) {
        case "fab fa-facebook":
          if (!this.supplierPageInfo.facebook) {
            location.href = "https://www.facebook.com/";
            break;
          } else {
            location.href = this.supplierPageInfo.facebook;
            break;
          }
        case "fab fa-twitter":
          if (!this.supplierPageInfo.twitter) {
            location.href = "https://www.facebook.com/";
            break;
          } else {
            location.href = this.supplierPageInfo.twitter;
            break;
          }
        case "fab fa-google-plus":
          if (!this.supplierPageInfo.google) {
            location.href = "https://www.facebook.com/";
            break;
          } else {
            location.href = this.supplierPageInfo.google;
            break;
          }
        case "fab fa-linkedin":
          if (!this.supplierPageInfo.linkedin) {
            location.href = "https://www.facebook.com/";
            break;
          } else {
            location.href = this.supplierPageInfo.linkedin;
            break;
          }
        case "fab fa-instagram":
          if (!this.supplierPageInfo.instgram) {
            location.href = "https://www.facebook.com/";
            break;
          } else {
            location.href = this.supplierPageInfo.instgram;
            break;
          }
      }
    },

    async changeLang(value) {
      this.$router.push({
        params: { lang: value },
      });
      this.$vuetify.rtl = value == "ar" ? true : false;
      this.$store.commit("siteLanguage", value);

      this.$store.dispatch("categoriesDB");
      await this.$store.dispatch(
        "getSupplierCategoriesAndItems",
        this.$route.params.supplier_id
      );
      // location.reload();
    },

    async changeCurrency(currency) {
      //this.$store.commit("emptyProductsArray");
      //location.reload();
      localStorage.setItem("currentCurrency", currency);
      if (this.$route.name == "home") {
        this.$store.commit("emptyProductsArray");
        await this.$store.dispatch("getProducts", {
          productFilterFlagss: this.productFilterFlag,
          productName: this.toolbarSearch,
          categoryName: this.categoryName,
        });
        console.log(currency);
      } else if (this.$route.name == "supplierPage") {
        this.$store.commit("emptySupplierProducts");
        await this.$store.dispatch(
          "getSupplierProducts",
          this.$route.params.supplier_id
        );
      }
    },
  },
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram",
    ],
    currentCurrency: localStorage.getItem("currentCurrency"),
    currencies: ["egp", "usd"],
  }),
  computed: {
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
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
  },
  created() {
    console.log(this.supplierPageInfo.facebook, "facebook");
  },
};
</script>
<style  scoped>
</style>
