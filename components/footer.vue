<template>
  <v-footer color="blue lighten-3" height="auto">
    <v-card flat tile color="white" width="100%">
      <v-card-text>
        <v-row justify="center">
          <v-btn v-for="icon in icons" :key="icon" class="mx-8 blue--text" icon>
            <v-icon @click="iconPressed(icon)" size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-row justify="center">
        <v-card-text
          v-if="!supplierPageInfo.footer"
          class="blue--text pt-1 mx-1"
          >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.</v-card-text
        >
        <v-card-text class="white--text" v-else>{{
          supplierPageInfo.footer
        }}</v-card-text>
      </v-row>
      <v-divider></v-divider>

      <v-card-text class="blue--text pt-2">
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
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return "red darken-4";
      }
    },
    supplierPageInfo() {
      return this.$store.state.SupplierPage.supplierPageInfo;
    },
  },
  created() {
    console.log(this.supplierPageInfo.facebook, "facebook");
  },
};
</script>
<style  scoped>
</style>
