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
            <v-icon size="20px" @click="iconPressed(icon)">{{ icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-row justify="center">
        <v-card-text
          :style="`color:${siteColor.footer_text_color}`"
          v-if="
            (supplierPageInfo && !supplierPageInfo.footer) || !supplierPageInfo
          "
          class="pt-1 mx-1 arabic"
          >{{ $t("footer.footerText") }}</v-card-text
        >
        <v-card-text
          class="arabic"
          :style="`color:${siteColor.footer_text_color}`"
          v-else
          >{{ supplierPageInfo.footer }}</v-card-text
        >
      </v-row>
      <v-divider></v-divider>

      <v-card-text
        class="pt-2 arabic"
        :style="`color:${siteColor.footer_text_color};`"
      >
        &copy; Copywrites 2020 to Dot-Matjar
        <div max-height="100" style="background-color: white; width: 5%">
          <v-img
            src="../assets/images/dotmatjar_logo.png"
            max-height="100"
            max-width="50"
            contain
          ></v-img>
        </div>
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
      switch (item) {
        case "fab fa-facebook":
          if (!this.supplierPageInfo.facebook) {
            location.href = "https://www.facebook.com/zidnysolutions/";
            break;
          } else {
            location.href = this.supplierPageInfo.facebook;
            break;
          }
        case "fab fa-twitter":
          if (!this.supplierPageInfo.twitter) {
            location.href = "https://twitter.com/zidnysolutions";
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
            location.href = "https://www.linkedin.com/company/zidnysolutions/";
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
  },
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram",
    ],
  }),
  computed: {
    siteColor() {
      var colorInfo = this.$store.state.Home.siteColor;
      if (this.$store.state.Home.siteColor) {
        return {
          button_text_color: colorInfo.button_text_color
            ? colorInfo.button_text_color
            : "black",
          button_color: colorInfo.button_color
            ? colorInfo.button_color
            : "white",
          toolbar_color: colorInfo.toolbar_color
            ? colorInfo.toolbar_color
            : "white",
          toolbar_text_color: colorInfo.toolbar_text_color
            ? colorInfo.toolbar_text_color
            : "black",
          footer_color: colorInfo.footer_color
            ? colorInfo.footer_color
            : "white",
          footer_text_color: colorInfo.footer_text_color
            ? colorInfo.footer_text_color
            : "black",
        };
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
          footer_color: "white",
          footer_text_color: "black",
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
};
</script>
<style  scoped>
.arabic {
  font-size: 15px;
}
span {
  font-size: 15px;
}
p {
  font-size: 17px;
}
.smallerText {
  font-size: 15px;
}
</style>
