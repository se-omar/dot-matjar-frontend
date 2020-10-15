<template>
  <v-app>
    <v-container v-if="currentUser.user_type == 'admin'" class="mt-16">
      <v-card>
        <v-row justify="center">
          <h2>{{ $t("siteColors.pickButColor") }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" lg="3">
            <v-color-picker
              dot-size="25"
              mode="rgba"
              swatches-max-height="200"
              v-model="buttonsColor"
            ></v-color-picker>
          </v-col>
          <v-col cols="3" lg="3">
            <v-btn x-large :color="buttonsColor"> </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row justify="center">
          <h2>{{ $t("siteColors.pickButTextColor") }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" lg="3">
            <v-color-picker
              dot-size="25"
              mode="rgba"
              swatches-max-height="200"
              v-model="buttonsTextColor"
            ></v-color-picker>
          </v-col>
          <v-col cols="3" lg="3">
            <v-btn :color="buttonsColor" x-large>
              <h4 :style="`color: ${buttonsTextColor}`">
                {{ $t("siteColors.textColor") }}
              </h4>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row justify="center">
          <h2>{{ $t("siteColors.pickToolbarColor") }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" lg="3">
            <v-color-picker
              dot-size="25"
              mode="rgba"
              swatches-max-height="200"
              v-model="toolBarColor"
            ></v-color-picker>
          </v-col>
          <v-col cols="6" lg="6">
            <v-app-bar :color="toolBarColor" shaped rounded>
              <span>
                <a>
                  <v-img
                    src="../assets/images/dotmatjar_logo.png"
                    max-height="110"
                    max-width="130"
                    contain
                  ></v-img>
                </a>
              </span>
              <v-spacer></v-spacer>
              <v-row justify="center">
                <v-col cols="12" lg="12" sm="12" md="10">
                  <v-text-field
                    class="mt-8"
                    outlined
                    rounded
                    placeholder="SEARCH"
                    append-icon="fa fa-search"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>

              <v-btn :style="`color:${toolBarTextColor}`" text> TEXT</v-btn>
            </v-app-bar>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row justify="center">
          <h2>{{ $t("siteColors.pickToolbarTextColor") }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" lg="3">
            <v-color-picker
              dot-size="25"
              mode="rgba"
              swatches-max-height="200"
              v-model="toolBarTextColor"
            ></v-color-picker>
          </v-col>
          <v-col cols="6" lg="6">
            <v-app-bar :color="toolBarColor" shaped rounded>
              <span>
                <a>
                  <v-img
                    src="../assets/images/dotmatjar_logo.png"
                    max-height="110"
                    max-width="130"
                    contain
                  ></v-img>
                </a>
              </span>
              <v-spacer></v-spacer>
              <v-row justify="center">
                <v-col cols="12" lg="12" sm="12" md="10">
                  <v-text-field
                    class="mt-8"
                    outlined
                    rounded
                    placeholder="SEARCH"
                    append-icon="fa fa-search"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>

              <v-btn :style="`color:${toolBarTextColor}`" text> TEXT</v-btn>
            </v-app-bar>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row justify="center">
          <h2>{{ $t("siteColors.pickFooterColor") }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" lg="3">
            <v-color-picker
              dot-size="25"
              mode="rgba"
              swatches-max-height="200"
              v-model="footerColor"
            ></v-color-picker>
          </v-col>
          <v-col cols="6" lg="6">
            <v-footer>
              <v-card :color="footerColor">
                <v-card-text>
                  <v-row justify="center">
                    <v-btn
                      v-for="icon in icons"
                      :key="icon"
                      class="mx-8"
                      :style="`color:${footerTextColor}`"
                      icon
                    >
                      <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-text>
                <v-row justify="center">
                  <v-card-text
                    class="pt-1 mx-1"
                    :style="`color:${footerTextColor}`"
                    >Phasellus feugiat arcu sapien, et iaculis ipsum elementum
                    sit amet. Mauris cursus commodo interdum. Praesent ut risus
                    eget metus luctus accumsan id ultrices nunc. Sed at orci sed
                    massa consectetur dignissim a sit amet dui. Duis commodo
                    vitae velit et faucibus. Morbi vehicula lacinia malesuada.
                    Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
                    sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
                    vel ut orci. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus.</v-card-text
                  >
                </v-row>
              </v-card>
            </v-footer>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row justify="center">
          <h2>{{ $t("siteColors.pickFooterTextColor") }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="3" lg="3">
            <v-color-picker
              dot-size="25"
              mode="rgba"
              swatches-max-height="200"
              v-model="footerTextColor"
            ></v-color-picker>
          </v-col>
          <v-col cols="6" lg="6">
            <v-footer>
              <v-card :color="footerColor">
                <v-card-text>
                  <v-row justify="center">
                    <v-btn
                      v-for="icon in icons"
                      :key="icon"
                      class="mx-8"
                      :style="`color:${footerTextColor}`"
                      icon
                    >
                      <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-text>
                <v-row justify="center">
                  <v-card-text
                    class="pt-1 mx-1"
                    :style="`color:${footerTextColor}`"
                    >Phasellus feugiat arcu sapien, et iaculis ipsum elementum
                    sit amet. Mauris cursus commodo interdum. Praesent ut risus
                    eget metus luctus accumsan id ultrices nunc. Sed at orci sed
                    massa consectetur dignissim a sit amet dui. Duis commodo
                    vitae velit et faucibus. Morbi vehicula lacinia malesuada.
                    Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
                    sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
                    vel ut orci. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus.</v-card-text
                  >
                </v-row>
              </v-card>
            </v-footer>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="1">
            <v-btn @click="updateSiteColors" :color="buttonsColor" x-large>
              <h4 :style="`color: ${buttonsTextColor}`">
                {{ $t("siteColors.update") }}
              </h4>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-container class="mt-16" v-else>
      <v-row justify="center">
        <h1>{{ $t("siteColors.accessDenied") }}</h1>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    buttonsColor: "",
    buttonsTextColor: "",
    toolBarColor: "",
    footerColor: "",
    footerTextColor: "",
    toolBarTextColor: "",
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram",
    ],
  }),
  methods: {
    updateSiteColors() {
      this.$store.dispatch("updateSiteColors", {
        toolBarColor: this.toolBarColor,
        footerColor: this.footerColor,
        buttonsColor: this.buttonsColor,
        buttonsTextColor: this.buttonsTextColor,
        footerTextColor: this.footerTextColor,
        toolBarTextColor: this.toolBarTextColor,
      });
      console.log(this.siteColor[0]);
      location.reload();
    },
  },
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    await this.$store.dispatch("getSiteColor");
    setTimeout(() => {
      this.toolBarColor = this.siteColor.toolbar_color;
      this.footerColor = this.siteColor.footer_color;
      this.buttonsColor = this.siteColor.button_color;
      this.buttonsTextColor = this.siteColor.button_text_color;
      this.footerTextColor = this.siteColor.footer_text_color;
      this.toolBarTextColor = this.siteColor.toolbar_text_color;
    }, 500);
  },
  computed: {
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
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
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
  },
};
</script>