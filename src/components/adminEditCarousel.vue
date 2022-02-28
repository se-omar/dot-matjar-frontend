<template>
  <v-app>
    <v-main>
      <v-row justify="center" class="mt-7">
        <p class="text-lg-h4 text-sm-h6">
          {{ $t("adminPage.editCarousel") }}
        </p>
      </v-row>

      <v-row justify="center">
        <v-col cols="5" lg="2" sm="4" md="6">
          <v-switch
            :label="$t('adminPage.showCarousel')"
            v-model="carouselCheckbox"
          ></v-switch>
        </v-col>

        <v-col cols="5" lg="2" sm="4" md="6">
          <v-switch
            :label="$t('adminPage.showRightBanner')"
            v-model="rightBannerCheckbox"
          ></v-switch>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="2" md="3" cols="5" v-if="carouselCheckbox">
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

        <v-col lg="2" md="3" cols="5" v-if="carouselCheckbox">
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

        <v-col lg="2" md="3" cols="5" v-if="carouselCheckbox">
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

        <v-col lg="2" md="3" cols="5" v-if="carouselCheckbox">
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
            filled
            :color="siteColor.toolbar_color"
          ></v-text-field>
        </v-col>

        <v-col v-if="carouselCheckbox" cols="6" lg="3" sm="4" md="6">
          <v-text-field
            type="number"
            :label="$t('adminPage.carouselHeight')"
            v-model="carouselHeight"
            :rules="[rules.min_max_height]"
            rounded
            filled
            :color="siteColor.toolbar_color"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col lg="3" md="3" cols="8" v-if="rightBannerCheckbox">
          <v-form>
            <label>{{ $t("adminPage.rightBannerImage") }}</label>
            <v-file-input
              accept="image/*"
              @change="setRightImage"
            ></v-file-input>
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
        <v-btn @click="sendData">{{ $t("adminPage.update") }}</v-btn>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "edit-carousel",

  async created() {
    await this.$store.dispatch("getHomePageData");

    if (this.homePageInfo.show_carousel === 1) this.carouselCheckbox = true;

    if (this.homePageInfo.show_right_banner === 1)
      this.rightBannerCheckbox = true;

    this.isLoading = false;
    //
  },

  data() {
    return {
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
      rules: {
        required: (value) => !!value || "Required.",
        min_max_width: (v) => (v > 1 && v <= 12) || "must be between 1 and 12",
        min_max_height: (v) => (v > 0 && v <= 3000) || "no more than 3000",
      },
    };
  },

  methods: {
    async sendData() {
      var carouselformdata = new FormData();
      var bannerformdata = new FormData();

      bannerformdata.set("user_id", this.currentUser.user_id);
      // if (this.leftImage) bannerformdata.append("file", this.leftImage, "left");

      if (this.rightImage)
        bannerformdata.append("file", this.rightImage, "right");

      carouselformdata.set("user_id", this.currentUser.user_id);
      var indexAsString = "";
      if (this.carouselImage1) {
        indexAsString += 0;
        carouselformdata.append("file", this.carouselImage1);
      }
      if (this.carouselImage2) {
        indexAsString += 1;
        carouselformdata.append("file", this.carouselImage2);
      }

      if (this.carouselImage3) {
        indexAsString += 2;
        carouselformdata.append("file", this.carouselImage3);
      }
      if (this.carouselImage4) {
        indexAsString += 3;
        carouselformdata.append("file", this.carouselImage4);
      }
      carouselformdata.set("index", indexAsString);

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
    },
    setCarouselImage2(image) {
      this.carouselImage2 = image;
      this.carouselViewImg2 = URL.createObjectURL(image);
    },
    setCarouselImage3(image) {
      this.carouselImage3 = image;
      this.carouselViewImg3 = URL.createObjectURL(image);
    },
    setCarouselImage4(image) {
      this.carouselImage4 = image;
      this.carouselViewImg4 = URL.createObjectURL(image);
    },

    setRightImage(image) {
      this.rightImage = image;
      this.rightBannerViewImg = URL.createObjectURL(image);
      //
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

    convertBoolToInt(bool) {
      if (bool == true) return 1;
      else return 0;
    },
  },

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    homePageInfo() {
      return this.$store.state.Home.homePageInfo;
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

    nodeHost() {
      return this.$store.state.nodeHost;
    },
  },
};
</script>