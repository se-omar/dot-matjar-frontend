<template>
  <v-footer  :class="backGroundColor" height="auto">
    <v-card flat tile :class="backGroundColor">
      <v-card-text>
        <v-row justify="center">
          <v-btn v-for="icon in icons" :key="icon" class="mx-8 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-row justify="center">
        <v-card-text
          class="white--text pt-1 mx-1"
        >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</v-card-text>
      </v-row>
      <v-divider></v-divider>

      <v-card-text class="white--text pt-2">
        &copy;2020 —
        <strong>E-Commerce-WEBSITE</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  props: {
    backGroundColor: {
      type: String,
      default: () => "red darken-4",
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
};
</script>
<style  scoped>

</style>
