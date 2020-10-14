<template>
  <v-app>
    <v-row class="mt-6" justify="center">
      <h1>Welcome to Dot-Market</h1>
    </v-row>
    <v-row class="mt-6" justify="center">
      <h2>Please be aware that your logo has to be a PNG file</h2>
    </v-row>
    <!-- <v-row class="mb-8" justify="center"> -->
    <v-container>
      <!-- =============== photo -->
      <v-row justify="center">
        <v-col lg="3"></v-col>
        <v-col lg="5" class="mr-5">
          <form enctype="multipart.form/data">
            <label>
              <v-card max-width="200" :color="siteColor">
                <span class="mt-4" style="font-size: 25px"
                  >Upload your logo here:</span
                >

                <i class="fa fa-upload fa-lg"></i>
                <input @change="fileUploaded" type="file" ref="logo" />
                <span v-if="logo">{{ logo.name }}</span>
              </v-card>
            </label>
          </form>
        </v-col>
      </v-row>
      <!-- =================== -->
      <v-row justify="center">
        <v-col cols="6" lg="4" sm="4" md="6">
          <v-text-field
            rounded
            label="Site Name"
            v-model="siteName"
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>
        <!-- ================ -->

        <v-col cols="6" lg="4" sm="4" md="6">
          <v-text-field
            label="Facebook account"
            v-model="facebook"
            rounded
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="4" sm="4" md="6">
          <v-text-field
            label="Twitter account"
            v-model="twitter"
            rounded
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="4" sm="4" md="6">
          <v-text-field
            label="linkedin account"
            v-model="linkedin"
            rounded
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="4" sm="4" md="6">
          <v-text-field
            label="Instgram account"
            v-model="instgram"
            rounded
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="4" sm="4" md="6">
          <v-text-field
            label="google account"
            v-model="google"
            rounded
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>

        <v-col cols="6" lg="2" sm="4" md="6">
          <v-switch
            label="show carousel"
            @change="testCheckbox"
            v-model="carouselCheckbox"
          ></v-switch>
        </v-col>

        <v-col cols="6" lg="2" sm="4" md="6">
          <v-switch
            label="show left banner"
            v-model="leftBannerCheckbox"
          ></v-switch>
        </v-col>

        <v-col cols="6" lg="2" sm="4" md="6">
          <v-switch
            label="show right banner"
            v-model="rightBannerCheckbox"
          ></v-switch>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="3" v-if="carouselCheckbox">
          <v-form enctype="multipart/form-data">
            <label>Carousel Image 1</label>
            <v-file-input
              accept="image/*"
              @change="setCarouselImage1"
            ></v-file-input>
            <v-img
              v-if="supplierPageInfo.carousel_image_1 || carouselViewImg1"
              :src="
                carouselViewImg1
                  ? carouselViewImg1
                  : nodeHost + supplierPageInfo.carousel_image_1
              "
              width="300px"
              height="250px"
            ></v-img>
            <v-row
              v-if="supplierPageInfo.carousel_image_1 || carouselViewImg1"
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

        <v-col lg="3" v-if="carouselCheckbox">
          <v-form>
            <label>Carousel Image 2</label>
            <v-file-input
              accept="image/*"
              :disabled="!carouselImage1 && !supplierPageInfo.carousel_image_1"
              @change="setCarouselImage2"
            ></v-file-input>
            <v-img
              v-if="supplierPageInfo.carousel_image_2 || carouselViewImg2"
              :src="
                carouselViewImg2
                  ? carouselViewImg2
                  : nodeHost + supplierPageInfo.carousel_image_2
              "
              width="300px"
              height="250px"
            ></v-img>
            <v-row
              v-if="supplierPageInfo.carousel_image_2 || carouselViewImg2"
              class="mt-2"
              justify="center"
            >
              <v-btn
                v-if="supplierPageInfo.carousel_image_2 || carouselViewImg2"
                @click="removeCarouselImage(2)"
                small
                class="red white--text"
                fab
                >X</v-btn
              >
            </v-row>
          </v-form>
        </v-col>

        <v-col lg="3" v-if="carouselCheckbox">
          <v-form>
            <label>Carousel Image 3</label>
            <v-file-input
              accept="image/*"
              :disabled="!carouselImage2 && !supplierPageInfo.carousel_image_2"
              @change="setCarouselImage3"
            ></v-file-input>
            <v-img
              v-if="supplierPageInfo.carousel_image_3 || carouselViewImg3"
              :src="
                carouselViewImg3
                  ? carouselViewImg3
                  : nodeHost + supplierPageInfo.carousel_image_3
              "
              width="300px"
              height="250px"
            ></v-img>
            <v-row
              v-if="supplierPageInfo.carousel_image_3 || carouselViewImg3"
              class="mt-2"
              justify="center"
            >
              <v-btn
                v-if="supplierPageInfo.carousel_image_3 || carouselViewImg3"
                @click="removeCarouselImage(3)"
                small
                class="red white--text"
                fab
                >X</v-btn
              >
            </v-row>
          </v-form>
        </v-col>

        <v-col lg="3" v-if="carouselCheckbox">
          <v-form>
            <label>Carousel Image 4</label>
            <v-file-input
              accept="image/*"
              :disabled="!carouselImage3 && !supplierPageInfo.carousel_image_3"
              @change="setCarouselImage4"
            ></v-file-input>
            <v-img
              v-if="supplierPageInfo.carousel_image_4 || carouselViewImg4"
              :src="
                carouselViewImg4
                  ? carouselViewImg4
                  : nodeHost + supplierPageInfo.carousel_image_4
              "
              width="300px"
              height="250px"
            ></v-img>
            <v-row
              v-if="supplierPageInfo.carousel_image_4 || carouselViewImg4"
              class="mt-2"
              justify="center"
            >
              <v-btn
                v-if="supplierPageInfo.carousel_image_4 || carouselViewImg4"
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
        <v-col v-if="carouselCheckbox" cols="6" lg="4" sm="4" md="6">
          <v-text-field
            label="carousel width from 1 to 12 (default is 10)"
            v-model="carouselWidth"
            rounded
            :rules="[rules.min_max_width]"
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>

        <v-col v-if="carouselCheckbox" cols="6" lg="4" sm="4" md="6">
          <v-text-field
            type="number"
            label="carousel height in pixels (default is 400)"
            v-model="carouselHeight"
            :rules="[rules.min_max_height]"
            rounded
            outlined
            :color="siteColor"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col lg="4" v-if="leftBannerCheckbox">
          <v-form>
            <label>left banner image</label>
            <v-file-input
              accept="image/*"
              @change="setLeftImage"
            ></v-file-input>
            <v-img
              :src="
                leftBannerViewImg
                  ? leftBannerViewImg
                  : nodeHost + supplierPageInfo.left_banner_image
              "
              width="300px"
              height="250px"
            ></v-img>

            <v-row
              v-if="supplierPageInfo.left_banner_image || leftBannerViewImg"
              class="mt-2"
              justify="center"
            >
              <v-btn
                v-if="supplierPageInfo.left_banner_image || leftBannerViewImg"
                @click="removeCarouselImage(5)"
                small
                class="red white--text"
                fab
                >X</v-btn
              >
            </v-row>
          </v-form>
        </v-col>

        <v-col lg="4" v-if="rightBannerCheckbox">
          <v-form>
            <label>right banner image</label>
            <v-file-input
              accept="image/*"
              @change="setRightImage"
            ></v-file-input>
            <v-img
              :src="
                rightBannerViewImg
                  ? rightBannerViewImg
                  : nodeHost + supplierPageInfo.right_banner_image
              "
              width="300px"
              height="250px"
            ></v-img>

            <v-row
              v-if="supplierPageInfo.right_banner_image || rightBannerViewImg"
              class="mt-2"
              justify="center"
            >
              <v-btn
                v-if="supplierPageInfo.right_banner_image || rightBannerViewImg"
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

      <v-col cols="12" lg="12" sm="12" md="12">
        <v-textarea
          rounded
          label="Footer"
          v-model="footer"
          outlined
          :color="siteColor"
        ></v-textarea>
      </v-col>
      <v-col cols="5" lg="3" sm="3" md="3">
        <v-btn @click="sendData" x-large :color="siteColor" class="white--text"
          >Update</v-btn
        >
      </v-col>

      <!-- ======================== -->

      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :color="siteColor"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        Page Updated succesfully
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>

      <!-- ======================= -->
    </v-container>
    <!-- </v-row> -->
  </v-app>
</template>

<script>
export default {
  name: "updateSupplierPage",
  components: {},
  data: () => ({
    logo: "",
    siteName: "",
    facebook: "",
    instgram: "",
    linkedin: "",
    twitter: "",
    google: "",
    footer: "",
    carouselHeight: "",
    carouselWidth: "",
    mode: "",
    snackbar: false,
    timeout: 3000,
    x: null,
    y: "top",
    rules: {
      required: (value) => !!value || "Required.",
      min_max_width: (v) => (v > 1 && v <= 12) || "must be between 1 and 12",
      min_max_height: (v) => (v > 0 && v <= 3000) || "no more than 3000",
    },
    carouselCheckbox: false,
    leftBannerCheckbox: false,
    rightBannerCheckbox: false,
    carouselImage1: "",
    carouselImage2: "",
    carouselImage3: "",
    carouselImage4: "",
    leftImage: "",
    rightImage: "",
    carouselViewImg1: "",
    carouselViewImg2: "",
    carouselViewImg3: "",
    carouselViewImg4: "",
    leftBannerViewImg: "",
    rightBannerViewImg: "",
  }),
  methods: {
    fileUploaded() {
      this.logo = this.$refs.logo.files[0];
      console.log(this.$refs.logo.files[0]);
    },

    testCheckbox() {
      console.log(this.carouselCheckbox);
      console.log(this.convertBoolToInt(this.carouselCheckbox));
    },

    convertBoolToInt(bool) {
      if (bool == true) return 1;
      else return 0;
    },
    async sendData() {
      // if (this.leftBannerCheckbox && !this.leftImage) {
      //   alert("you need to add a banner image or disable the banner");
      //   return;
      // }

      // if (this.rightBannerCheckbox && !this.rightImage) {
      //   alert("you need to add a banner image or disable the banner");
      //   return;
      // }

      // if (
      //   this.carouselCheckbox &&
      //   !this.carouselImage1 &&
      //   !this.carouselImage2 &&
      //   !this.carouselImage3 &&
      //   !this.carouselImage4
      // ) {
      //   alert("you need to add a carousel image or disable the carousel");
      //   return;
      // }
      var formdata = new FormData();
      var carouselformdata = new FormData();
      var bannerformdata = new FormData();

      var carouselImages = [
        this.carouselImage1,
        this.carouselImage2,
        this.carouselImage3,
        this.carouselImage4,
      ];

      bannerformdata.set("supplier_id", this.supplier.user_id);
      if (this.leftImage) bannerformdata.append("file", this.leftImage, "left");
      if (this.rightImage)
        bannerformdata.append("file", this.rightImage, "right");

      carouselformdata.set("supplier_id", this.supplier.user_id);
      carouselImages.forEach((element) => {
        carouselformdata.append("file", element ? element : "empty");
      });

      formdata.append("file", this.logo);
      formdata.set("siteName", this.siteName);
      formdata.set("facebook", this.facebook);
      formdata.set("instgram", this.instgram);
      formdata.set("linkedin", this.linkedin);
      formdata.set("twitter", this.twitter);
      formdata.set("google", this.google);
      formdata.set("footer", this.footer);
      formdata.set("supplier_id", this.supplier.user_id);
      formdata.set(
        "showCarousel",
        this.convertBoolToInt(this.carouselCheckbox)
      );
      formdata.set(
        "showLeftBanner",
        this.convertBoolToInt(this.leftBannerCheckbox)
      );
      formdata.set(
        "showRightBanner",
        this.convertBoolToInt(this.rightBannerCheckbox)
      );
      formdata.set("carousel_height", this.carouselHeight);
      formdata.set("carousel_width", this.carouselWidth);

      this.$store.dispatch("updateSupplierPage", formdata);
      await this.$store.dispatch("uploadCarouselImages", carouselformdata);
      await this.$store.dispatch("uploadBannerImages", bannerformdata);
      this.snackbar = true;
      this.$router.push(
        `/${this.$i18n.locale}/supplierPage/` + this.currentUser.user_id
      );
    },
    setCarouselImage1(image) {
      this.carouselImage1 = image;
      this.carouselViewImg1 = URL.createObjectURL(image);
      console.log(this.testImg);
      console.log(image);
    },
    setCarouselImage2(image) {
      this.carouselImage2 = image;
      this.carouselViewImg2 = URL.createObjectURL(image);
      console.log(image);
    },
    setCarouselImage3(image) {
      this.carouselImage3 = image;
      this.carouselViewImg3 = URL.createObjectURL(image);
      console.log(image);
    },
    setCarouselImage4(image) {
      this.carouselImage4 = image;
      this.carouselViewImg4 = URL.createObjectURL(image);
      console.log(image);
    },
    setLeftImage(image) {
      this.leftImage = image;
      this.leftBannerViewImg = URL.createObjectURL(image);
      console.log(image);
    },
    setRightImage(image) {
      this.rightImage = image;
      this.rightBannerViewImg = URL.createObjectURL(image);
      console.log(image);
    },

    removeCarouselImage(imgNum) {
      if (imgNum == 1) {
        this.supplierPageInfo.carousel_image_1 = "";
        this.$store.dispatch("removeCarouselImage", {
          id: this.supplier.user_id,
          imgName: "carousel_image_1",
        });
      }
      if (imgNum == 2) {
        this.supplierPageInfo.carousel_image_2 = "";
        this.$store.dispatch("removeCarouselImage", {
          id: this.supplier.user_id,
          imgName: "carousel_image_2",
        });
      }
      if (imgNum == 3) {
        this.supplierPageInfo.carousel_image_3 = "";
        this.$store.dispatch("removeCarouselImage", {
          id: this.supplier.user_id,
          imgName: "carousel_image_3",
        });
      }
      if (imgNum == 4) {
        this.supplierPageInfo.carousel_image_4 = "";
        this.$store.dispatch("removeCarouselImage", {
          id: this.supplier.user_id,
          imgName: "carousel_image_4",
        });
      }
      if (imgNum == 5) {
        this.supplierPageInfo.left_banner_image = "";
        this.$store.dispatch("removeBannerImage", {
          id: this.supplier.user_id,
          imgName: "left_banner_image",
        });
      }
      if (imgNum == 6) {
        this.supplierPageInfo.right_banner_image = "";
        this.$store.dispatch("removeBannerImage", {
          id: this.supplier.user_id,
          imgName: "right_banner_image",
        });
      }
    },
  },

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
    testVar() {
      return this.$store.state.SupplierPage.testVar;
    },
    supplier() {
      return this.$store.state.SupplierPage.supplier;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
  },
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    await this.$store.dispatch("getSupplier", this.$route.params.supplier_id);
    await this.$store.dispatch(
      "getSupplierPageData",
      this.$route.params.supplier_id
    );
    console.log("supplier page info", this.supplierPageInfo);

    if (this.supplierPageInfo.show_carousel === 1) this.carouselCheckbox = true;

    if (this.supplierPageInfo.show_left_banner === 1)
      this.leftBannerCheckbox = true;

    if (this.supplierPageInfo.show_right_banner === 1)
      this.rightBannerCheckbox = true;

    if (this.currentUser) {
      if (this.$route.params.supplier_id != this.currentUser.user_id) {
        this.$router.push(`/${this.$i18n.locale}/notFound`);
      }
    }
    console.log(this.supplier.user_id);
  },
};
</script>

<style scoped>
input {
  opacity: 0;
  z-index: inherit;
}
</style>