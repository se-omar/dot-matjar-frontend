<template>
  <v-app>
    <div v-if="currentUser.user_id == $route.params.supplier_id">
      <div class="vld-parent">
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="true"
        ></loading>
      </div>
      <v-container>
        <v-card class="mx-8">
          <v-row class="mt-6" justify="center">
            <h1>{{ $t("updateSupplierPage.welcome") }}</h1>
          </v-row>
          <v-row class="mt-6" justify="center">
            <v-col cols="10">
              <h2>{{ $t("updateSupplierPage.pngFormat") }}</h2>
            </v-col>
          </v-row>
          <!-- <v-row class="mb-8" justify="center"> -->
          <v-container>
            <!-- =============== photo -->
            <v-row justify="center">
              <v-col lg="4" cols="6" sm="6" md="4">
                <form enctype="multipart.form/data">
                  <label>
                    <v-card max-width="200">
                      <span class="mt-4 ml-6"
                        >{{ $t("updateSupplierPage.uploadLogo") }}:</span
                      >
                      <v-row justify="center">
                        <i class="fa fa-upload fa-lg"></i>
                      </v-row>
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
                  :placeholder="$t('updateSupplierPage.siteName')"
                  class="arabic"
                  v-model="siteName"
                  outlined
                ></v-text-field>
              </v-col>
              <!-- ================ -->

              <v-col cols="6" lg="4" sm="4" md="6">
                <v-text-field
                  :placeholder="$t('updateSupplierPage.facebook')"
                  v-model="facebook"
                  rounded
                  outlined
                  class="arabic"
                ></v-text-field>
              </v-col>
              <v-col cols="6" lg="4" sm="4" md="6">
                <v-text-field
                  :placeholder="$t('updateSupplierPage.twitter')"
                  v-model="twitter"
                  rounded
                  outlined
                  class="arabic"
                ></v-text-field>
              </v-col>
              <v-col cols="6" lg="4" sm="4" md="6">
                <v-text-field
                  :placeholder="$t('updateSupplierPage.linkedin')"
                  v-model="linkedin"
                  rounded
                  outlined
                  class="arabic"
                ></v-text-field>
              </v-col>
              <v-col cols="6" lg="4" sm="4" md="6">
                <v-text-field
                  :placeholder="$t('updateSupplierPage.instagram')"
                  v-model="instgram"
                  rounded
                  outlined
                  class="arabic"
                ></v-text-field>
              </v-col>
              <v-col cols="6" lg="4" sm="4" md="6">
                <v-text-field
                  :placeholder="$t('updateSupplierPage.google')"
                  v-model="google"
                  rounded
                  outlined
                  class="arabic"
                ></v-text-field>
              </v-col>

              <v-col cols="6" lg="2" sm="4" md="6">
                <v-switch
                  :label="$t('updateSupplierPage.showCarousel')"
                  @change="testCheckbox"
                  v-model="carouselCheckbox"
                ></v-switch>
              </v-col>

              <!-- <v-col cols="6" lg="2" sm="4" md="6">
            <v-switch
              :label="show left banner"
              v-model="leftBannerCheckbox"
            ></v-switch>
          </v-col> -->

              <v-col cols="6" lg="2" sm="4" md="6">
                <v-switch
                  :label="$t('updateSupplierPage.showRightBanner')"
                  v-model="rightBannerCheckbox"
                ></v-switch>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col lg="3" v-if="carouselCheckbox">
                <v-form enctype="multipart/form-data">
                  <label style="font-size: 25px"
                    >{{ $t("updateSupplierPage.carouselImage") }} 1</label
                  >
                  <v-file-input
                    type="file"
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
                  <label style="font-size: 25px"
                    >{{ $t("updateSupplierPage.carouselImage") }} 2</label
                  >
                  <v-file-input
                    accept="image/*"
                    :disabled="
                      !carouselImage1 && !supplierPageInfo.carousel_image_1
                    "
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
                      v-if="
                        supplierPageInfo.carousel_image_2 || carouselViewImg2
                      "
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
                  <label style="font-size: 25px"
                    >{{ $t("updateSupplierPage.carouselImage") }} 3</label
                  >
                  <v-file-input
                    accept="image/*"
                    :disabled="
                      !carouselImage2 && !supplierPageInfo.carousel_image_2
                    "
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
                      v-if="
                        supplierPageInfo.carousel_image_3 || carouselViewImg3
                      "
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
                  <label style="font-size: 25px"
                    >{{ $t("updateSupplierPage.carouselImage") }} 4</label
                  >
                  <v-file-input
                    accept="image/*"
                    :disabled="
                      !carouselImage3 && !supplierPageInfo.carousel_image_3
                    "
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
                      v-if="
                        supplierPageInfo.carousel_image_4 || carouselViewImg4
                      "
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
                  :label="$t('updateSupplierPage.carouselWidth')"
                  v-model="carouselWidth"
                  rounded
                  :rules="[rules.min_max_width]"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col v-if="carouselCheckbox" cols="6" lg="4" sm="4" md="6">
                <v-text-field
                  type="number"
                  :label="$t('updateSupplierPage.carouselHeight')"
                  v-model="carouselHeight"
                  :rules="[rules.min_max_height]"
                  rounded
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="space-around">
              <!-- <v-col lg="4" v-if="leftBannerCheckbox">
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
          </v-col> -->

              <v-col lg="4" v-if="rightBannerCheckbox">
                <v-form>
                  <label style="font-size: 25px">
                    {{ $t("updateSupplierPage.rightBannerImage") }}</label
                  >
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
                    v-if="
                      supplierPageInfo.right_banner_image || rightBannerViewImg
                    "
                    class="mt-2"
                    justify="center"
                  >
                    <v-btn
                      v-if="
                        supplierPageInfo.right_banner_image ||
                        rightBannerViewImg
                      "
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
              <v-col cols="10" lg="6" sm="10" md="6">
                <v-textarea
                  rounded
                  :placeholder="$t('updateSupplierPage.footer')"
                  v-model="footer"
                  outlined
                  class="arabic"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="5" lg="3" sm="3" md="3">
                <v-btn @click="sendData" x-large :color="siteColor.button_color"
                  ><span :style="`color: ${buttonsTextColor}`">{{
                    $t("updateSupplierPage.update")
                  }}</span></v-btn
                >
              </v-col>
            </v-row>
            <!-- ======================== -->

            <v-snackbar
              v-model="snackbar"
              :bottom="y === 'bottom'"
              :color="siteColor.footer_color"
              :left="x === 'left'"
              :multi-line="mode === 'multi-line'"
              :right="x === 'right'"
              :timeout="timeout"
              :top="y === 'top'"
              :vertical="mode === 'vertical'"
            >
              <span> {{ $t("updateSupplierPage.pageUpdated") }}</span>
              <template v-slot:action="{ attrs }">
                <v-btn dark text v-bind="attrs" @click="snackbar = false">{{
                  $t("updateSupplierPage.close")
                }}</v-btn>
              </template>
            </v-snackbar>
          </v-container>

          <!-- Site colorssssssssssssssssssssss -->
          <v-container class="mt-16">
            <v-toolbar shaped :color="toolBarColor">
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.siteColors") }}</h2>
              </v-row>
            </v-toolbar>
            <v-card>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.pickButColor") }}</h2>
              </v-row>

              <v-row justify="center">
                <v-col cols="10" sm="5" md="5" lg="3">
                  <v-color-picker
                    dot-size="25"
                    mode="rgba"
                    swatches-max-height="200"
                    v-model="buttonsColor"
                  ></v-color-picker>
                </v-col>
                <v-col cols="4" sm="3" md="3" lg="3">
                  <v-btn x-large :color="this.buttonsColor"> </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-card>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.pickButTextColor") }}</h2>
              </v-row>
              <v-row justify="center">
                <v-col cols="10" sm="5" md="5" lg="3">
                  <v-color-picker
                    dot-size="25"
                    mode="rgba"
                    swatches-max-height="200"
                    v-model="buttonsTextColor"
                  ></v-color-picker>
                </v-col>
                <v-col cols="7" sm="3" md="3" lg="3">
                  <v-btn :color="buttonsColor" x-large>
                    <h4 :style="`color: ${this.buttonsTextColor}`">
                      {{ $t("updateSupplierPage.textColor") }}
                    </h4>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-card>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.pickToolbarColor") }}</h2>
              </v-row>
              <v-row justify="center">
                <v-col cols="9" sm="5" md="5" lg="3">
                  <v-color-picker
                    dot-size="25"
                    mode="rgba"
                    swatches-max-height="200"
                    v-model="toolBarColor"
                  ></v-color-picker>
                </v-col>
                <v-col cols="10" sm="6" md="6" lg="6">
                  <v-app-bar :color="toolBarColor" shaped rounded>
                    <a>
                      <v-img
                        v-if="!$vuetify.breakpoint.xs"
                        :src="
                          supplierPageInfo || supplierPageInfo.logo
                            ? nodeHost + '/' + supplierPageInfo.logo
                            : '../assets/images/dotmatjar_logo.png'
                        "
                        max-height="110"
                        max-width="130"
                        contain
                      ></v-img>
                      <v-img
                        v-else
                        :src="
                          supplierPageInfo || supplierPageInfo.logo
                            ? nodeHost + '/' + supplierPageInfo.logo
                            : '../assets/images/dotmatjar_logo.png'
                        "
                        max-height="60"
                        max-width="70"
                        contain
                      ></v-img>
                    </a>

                    <v-spacer></v-spacer>
                    <v-row justify="center">
                      <v-col cols="12" lg="12" sm="12" md="10">
                        <v-text-field
                          class="mt-8 arabic"
                          outlined
                          rounded
                          :placeholder="$t('toolbar.search')"
                          append-icon="fa fa-search"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-spacer></v-spacer>

                    <span :style="`color:${toolBarTextColor}`"> TEXT</span>
                  </v-app-bar>
                </v-col>
              </v-row>
            </v-card>
            <v-card>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.pickToolbarTextColor") }}</h2>
              </v-row>
              <v-row justify="center">
                <v-col cols="9" sm="5" md="5" lg="3">
                  <v-color-picker
                    dot-size="25"
                    mode="rgba"
                    swatches-max-height="200"
                    v-model="toolBarTextColor"
                  ></v-color-picker>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-app-bar :color="toolBarColor" shaped rounded>
                    <a>
                      <v-img
                        v-if="!$vuetify.breakpoint.xs"
                        :src="
                          supplierPageInfo || supplierPageInfo.logo
                            ? nodeHost + '/' + supplierPageInfo.logo
                            : '../assets/images/dotmatjar_logo.png'
                        "
                        max-height="110"
                        max-width="130"
                        contain
                      ></v-img>
                      <v-img
                        v-else
                        :src="
                          supplierPageInfo || supplierPageInfo.logo
                            ? nodeHost + '/' + supplierPageInfo.logo
                            : '../assets/images/dotmatjar_logo.png'
                        "
                        max-height="60"
                        max-width="70"
                        contain
                      ></v-img>
                    </a>

                    <v-spacer></v-spacer>
                    <v-row justify="center">
                      <v-col cols="12" lg="12" sm="12" md="10">
                        <v-text-field
                          class="mt-8 arabic"
                          outlined
                          rounded
                          :placeholder="$t('toolbar.search')"
                          append-icon="fa fa-search"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-spacer></v-spacer>

                    <span :style="`color:${toolBarTextColor}`"> TEXT</span>
                  </v-app-bar>
                </v-col>
              </v-row>
            </v-card>
            <v-card>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.pickFooterColor") }}</h2>
              </v-row>
              <v-row justify="center">
                <v-col cols="9" sm="5" md="5" lg="3">
                  <v-color-picker
                    dot-size="25"
                    mode="rgba"
                    swatches-max-height="200"
                    v-model="footerColor"
                  ></v-color-picker>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
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
                          >Phasellus feugiat arcu sapien, et iaculis ipsum
                          elementum sit amet. Mauris cursus commodo interdum.
                          Praesent ut risus eget metus luctus accumsan id
                          ultrices nunc. Sed at orci sed massa consectetur
                          dignissim a sit amet dui. Duis commodo vitae velit et
                          faucibus. Morbi vehicula lacinia malesuada. Nulla
                          placerat augue vel ipsum ultrices, cursus iaculis dui
                          sollicitudin. Vestibulum eu ipsum vel diam elementum
                          tempor vel ut orci. Orci varius natoque penatibus et
                          magnis dis parturient montes, nascetur ridiculus
                          mus.</v-card-text
                        >
                      </v-row>
                    </v-card>
                  </v-footer>
                </v-col>
              </v-row>
            </v-card>
            <v-card>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.pickFooterTextColor") }}</h2>
              </v-row>
              <v-row justify="center">
                <v-col cols="9" sm="5" md="5" lg="3">
                  <v-color-picker
                    dot-size="25"
                    mode="rgba"
                    swatches-max-height="200"
                    v-model="footerTextColor"
                  ></v-color-picker>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
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
                          >Phasellus feugiat arcu sapien, et iaculis ipsum
                          elementum sit amet. Mauris cursus commodo interdum.
                          Praesent ut risus eget metus luctus accumsan id
                          ultrices nunc. Sed at orci sed massa consectetur
                          dignissim a sit amet dui. Duis commodo vitae velit et
                          faucibus. Morbi vehicula lacinia malesuada. Nulla
                          placerat augue vel ipsum ultrices, cursus iaculis dui
                          sollicitudin. Vestibulum eu ipsum vel diam elementum
                          tempor vel ut orci. Orci varius natoque penatibus et
                          magnis dis parturient montes, nascetur ridiculus
                          mus.</v-card-text
                        >
                      </v-row>
                    </v-card>
                  </v-footer>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn @click="updateSiteColors" :color="buttonsColor" x-large>
                  <h4 :style="`color: ${buttonsTextColor}`">
                    {{ $t("updateSupplierPage.update") }}
                  </h4>
                </v-btn>
              </v-row>
            </v-card>
          </v-container>

          <v-container>
            <v-toolbar shaped>
              <v-row justify="center">
                <h2>{{ $t("updateSupplierPage.chooseYourCategory") }}</h2>
              </v-row>
            </v-toolbar>
            <v-card>
              <v-row justify="center">
                <v-col cols="10" lg="6" sm="10" md="6">
                  <v-card elevation="16" max-width="400" class="mx-auto">
                    <v-toolbar shaped>
                      <v-row justify="center">
                        <h2 style="text-align: center">
                          {{ $t("updateSupplierPage.category") }}
                        </h2>
                      </v-row>
                    </v-toolbar>
                    <v-virtual-scroll
                      :items="mainCategories"
                      height="300"
                      item-height="64"
                    >
                      <template v-slot="{ item }">
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn
                              @click="getCategoryItems(item)"
                              fab
                              small
                              depressed
                              color="primary"
                            >
                              <i :class="`fa fa-${item} fa-2x`"></i>
                            </v-btn>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title :key="item">
                              <v-btn
                                @click="getCategoryItems(item)"
                                text
                                width="100%"
                              >
                                {{ item }}</v-btn
                              >
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-virtual-scroll>
                  </v-card>
                </v-col>
                <v-col cols="10" lg="6" sm="10" md="6">
                  <v-card elevation="16" max-width="400" class="mx-auto">
                    <v-toolbar shaped>
                      <v-row justify="center">
                        <h2 style="text-align: center">
                          {{ $t("updateSupplierPage.items") }}
                        </h2>
                      </v-row>
                    </v-toolbar>
                    <v-virtual-scroll
                      :items="categoryItems"
                      height="300"
                      item-height="64"
                    >
                      <template v-slot="{ item }">
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn fab small depressed color="primary">
                              <i :class="`fa fa-${item.name} fa-2x`"></i>
                            </v-btn>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              style="text-align: center"
                              :key="item.id"
                            >
                              {{ item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn @click="addItem(item)" large icon>
                              <i class="fa fa-plus fa-2x"></i
                            ></v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </template>
                    </v-virtual-scroll>
                  </v-card>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10" lg="6" sm="10" md="6">
                  <v-card elevation="16" max-width="400" class="mx-auto">
                    <v-toolbar shaped>
                      <v-row justify="center">
                        <h2 style="text-align: center">
                          {{ $t("updateSupplierPage.selectedItems") }}
                        </h2>
                      </v-row>
                    </v-toolbar>

                    <v-virtual-scroll
                      :items="supplierItemsFromDB"
                      height="300"
                      item-height="64"
                    >
                      <template v-slot="{ item }">
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn
                              @click="getCategoryItems(item)"
                              fab
                              small
                              depressed
                              color="primary"
                            >
                              <i :class="`fa fa-${item} fa-2x`"></i>
                            </v-btn>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              style="text-align: center"
                              :key="item"
                            >
                              {{ item }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn @click="RemoveItem(item)" large icon>
                              <i
                                class="fa fa-trash-alt fa-2x"
                                style="color: red"
                              ></i
                            ></v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </template>
                    </v-virtual-scroll>
                    <v-snackbar v-model="snackBarAlert" :timeout="timeout">
                      <v-row justify="center">
                        <h2>{{ snackBarMessage }}</h2>
                      </v-row>
                    </v-snackbar>
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="mt-8 mb-8" justify="center">
                <v-btn
                  rounded
                  large
                  :color="buttonsColor"
                  @click="addButtonEvent"
                  ><span :style="`color:${buttonsTextColor}`">Add</span></v-btn
                >
                <v-dialog v-model="dialog" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">
                      {{ $t("updateSupplierPage.dialogApprovalQuestion") }}
                    </v-card-title>
                    <v-card-text>
                      {{
                        $t("updateSupplierPage.dialogApprovalDescription")
                      }}</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="dialog = false">
                        {{ $t("updateSupplierPage.dialogDisApprovalButton") }}
                      </v-btn>
                      <v-btn
                        @click="addCategoryAndItemsToSupplier"
                        text
                        :color="buttonsColor"
                      >
                        {{ $t("updateSupplierPage.dialogApprovalButton") }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-container>
        </v-card>
      </v-container>
    </div>
    <!-- <div class="mt-16" v-else>
      <v-row justify="center">
        <h1>{{ $t("updateSupplierPage.accessDenied") }}</h1>
      </v-row>
    </div> -->
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
    buttonsColor: "",
    buttonsTextColor: "",
    toolBarColor: "",
    toolBarTextColor: "",
    footerColor: "",
    footerTextColor: "",
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram",
    ],
    isLoading: false,
    categoryItems: [],
    // supplierItems: [],
    snackBarAlert: false,
    snackBarMessage: "",
    dialog: false,
    chosenSupplierCategories: [],
  }),
  methods: {
    fileUploaded() {
      this.logo = this.$refs.logo.files[0];
    },

    testCheckbox() {},

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

      // var carouselImages = [
      //   this.carouselImage1,
      //   this.carouselImage2,
      //   this.carouselImage3,
      //   this.carouselImage4,
      // ];
      bannerformdata.set("supplier_id", this.supplier.user_id);
      if (this.leftImage) bannerformdata.append("file", this.leftImage);
      if (this.rightImage) bannerformdata.append("file", this.rightImage);

      carouselformdata.set("supplier_id", this.supplier.user_id);
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
      // this.$router.push(
      //   `/${this.$i18n.locale}/supplierPage/` + this.currentUser.user_id
      // );
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
    setLeftImage(image) {
      this.leftImage = image;
      this.leftBannerViewImg = URL.createObjectURL(image);
    },
    setRightImage(image) {
      this.rightImage = image;
      this.rightBannerViewImg = URL.createObjectURL(image);
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
    updateSiteColors() {
      this.$store.dispatch("updateSupplierSiteColors", {
        toolBarColor: this.toolBarColor,
        footerColor: this.footerColor,
        buttonsColor: this.buttonsColor,
        buttonsTextColor: this.buttonsTextColor,
        footerTextColor: this.footerTextColor,
        toolBarTextColor: this.toolBarTextColor,
      });
      location.reload();
    },
    getCategoryItems(category) {
      this.categoryItems = [];
      console.log(category);
      // if (this.siteLanguage == "en") {
      //   for (var i = 0; i < this.categoriesItems.length; i++) {
      //     if (this.categoriesItems[i].category_name == category) {
      //       this.categoryItems.push(this.categoriesItems[i].category_items);
      //     }
      //   }
      // } else {
      //   for (var x = 0; x < this.categoriesItems.length; x++) {
      //     if (this.categoriesItems[x].category_arabic_name == category) {
      //       this.categoryItems.push(
      //         this.categoriesItems[x].category_items_arabic_name
      //       );
      //     }
      //   }
      // }
      this.categoriesTreeArray.forEach((e) => {
        if (e.name == category) {
          e.children.forEach((item) => {
            this.categoryItems.push({ id: item.id, name: item.name });
          });
        }
      });
    },
    treeView() {
      for (let i = 0; i < this.category.length; i++) {
        var counter = 1;
        var children = [];

        for (var j = 0; j < this.categoriesItems.length; j++) {
          if (this.category[i] == this.categoriesItems[j].category_name) {
            children.push({
              id: counter,
              name: this.categoriesItems[j].category_items,
            });
          } else {
            children.push({ type: "null" });
          }
          counter++;
        }

        // this.categoriesItems.map((e) => {
        //   if (this.category[i] == e.category_name) {
        //     children.push({ id: counter, name: e.category_items });
        //   }
        //   counter++;
        // });

        this.categoryItemstest.push({
          id: i + 1,
          name: this.category[i],
          children: children,
        });
      }
    },
    addItem(item) {
      console.log(item);
      var check = false;
      if (this.supplierItemsFromDB.length > 0) {
        for (let i = 0; i < this.supplierItemsFromDB.length; i++) {
          if (item.name == this.supplierItemsFromDB[i]) {
            check = true;
            break;
          }
        }
      }
      if (!check) {
        this.supplierItemsFromDB.push(item.name);
        this.chosenSupplierCategories.push(item.id);
        console.log(this.chosenSupplierCategories);
      } else {
        this.snackBarMessage = "Item Already exists";
        this.snackBarAlert = true;
      }
    },
    RemoveItem(item) {
      for (let i = 0; i < this.supplierItemsFromDB.length; i++) {
        if (this.supplierItemsFromDB[i] == item) {
          this.supplierItemsFromDB.splice(i, 1);
          this.chosenSupplierCategories.splice(i, 1);
        }
      }
    },
    addCategoryAndItemsToSupplier() {
      this.dialog = false;
      console.log(this.chosenSupplierCategories);
      this.$store.dispatch("supplierPageAddCategories", {
        supplierItems: this.chosenSupplierCategories,
        user_id: this.currentUser.user_id,
        siteLanguage: localStorage.getItem("language"),
      });
      // location.reload();
    },
    addButtonEvent() {
      if (this.supplierItemsFromDB.length == 0) {
        this.snackBarMessage = "Please add item to proceed";
        this.snackBarAlert = true;
      } else {
        this.dialog = true;
      }
    },
  },

  computed: {
    siteColor() {
      if (this.$store.state.SupplierPage.supplierPageInfo) {
        return this.$store.state.SupplierPage.supplierPageInfo;
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
    category() {
      var obj = [];
      this.$store.state.Home.category.forEach((element) => {
        obj.push(element.name);
      });
      return obj;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },

    supplierItemsFromDB() {
      return this.$store.state.SupplierPage.supplierItems;
    },
    supplierCategoriesAndItems() {
      return this.$store.state.SupplierPage.supplierCategoriesAndItems;
    },
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
    categoriesTreeArray() {
      return this.$store.state.Home.categoriesTreeArray;
    },
    mainCategories() {
      var categories = [];
      this.$store.state.Home.categoriesTreeArray.forEach((e) => {
        categories.push(e.name);
      });
      return categories;
    },
  },
  async created() {
    await this.$store.dispatch("getCategoriesTree");
    await this.$store.dispatch("getSiteColor");
    // this.isLoading = true;
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getSupplier", this.currentUser.user_id);
    await this.$store.dispatch("getSupplierPageData", this.currentUser.user_id);

    await this.$store.dispatch("categoriesDB");
    // await this.$store.dispatch("getCategoryItems");
    // await this.$store.dispatch("getSupplierItems", {
    //   user_id: this.currentUser.user_id,
    // });
    await this.$store.dispatch(
      "getSupplierCategoriesAndItems",
      this.currentUser.user_id
    );

    await setTimeout(() => {
      this.toolBarColor = this.siteColor.toolbar_color;
      this.footerColor = this.siteColor.footer_color;
      this.buttonsColor = this.siteColor.button_color;
      this.buttonsTextColor = this.siteColor.button_text_color;
      this.footerTextColor = this.siteColor.footer_text_color;
      this.toolBarTextColor = this.siteColor.toolbar_text_color;
    }, 500);

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

    // this.supplierItems = this.supplierItemsFromDB;
    console.log("category tree arrray", this.categoriesTreeArray);
    this.isLoading = false;
  },
};
</script>

<style scoped>
input {
  opacity: 0;
  z-index: inherit;
}

h1 {
  font-size: 25px;
}
h2 {
  font-size: 25px;
}
</style>
