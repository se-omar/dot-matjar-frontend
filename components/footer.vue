<template>
  <v-footer :color="siteColor" height="auto">
    <v-card flat tile :color="siteColor" width="100%">
      <v-card-text>
        <v-row justify="center">
          <v-btn v-for="icon in icons" :key="icon" class="mx-8 white--text" icon>
            <v-icon @click="iconPressed(icon)" size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-row justify="center">
        <v-card-text
          v-if="!supplierPageInfo.footer"
          class="white--text pt-1 mx-1"
        >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</v-card-text>
        <v-card-text class="white--text" v-else>{{supplierPageInfo.footer}}</v-card-text>
      </v-row>
      <v-divider></v-divider>

      <v-card-text class="white--text pt-2">
        &copy; Copywrites 2020 -
        <strong>Dot-Matjar</strong>
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
          location.href = this.supplierPageInfo.facebook;
          break;
        case "fab fa-twitter":
          location.href = this.supplierPageInfo.twitter;
          break;
        case "fab fa-google-plus":
          location.href = this.supplierPageInfo.google;

          break;

        case "fab fa-linkedin":
          location.href = this.supplierPageInfo.linkedin;
          break;
        case "fab fa-instagram":
          location.href = this.supplierPageInfo.instgram;
          break;
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
      if (this.$store.state.siteColor) {
        return this.$store.state.siteColor;
      } else {
        return "red darken-4";
      }
    },
    supplierPageInfo() {
      return this.$store.state.supplierPageInfo;
    },
  },
  created() {
    console.log(this.supplierPageInfo.facebook, "facebook");
  },
};
</script>
<style  scoped>
</style>
