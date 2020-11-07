<template>
  <v-app>
    <div v-if="currentUser.user_type == 'admin'">
      <div class="vld-parent">
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="true"
        ></loading>
      </div>
      <!-- ADDING Categories -->
      <v-row class="mt-6" justify="center">
        <v-col lg="2">
          <v-btn
            class="primary"
            @click="$router.push(`/${$i18n.locale}/addUser`)"
            large
            block
            >{{ $t("adminPage.addNewUser") }}</v-btn
          >
        </v-col>

        <v-col lg="2">
          <v-btn
            @click="$router.push(`/${$i18n.locale}/allUsers`)"
            large
            block
            >{{ $t("adminPage.allUsers") }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <h2>{{ $t("adminPage.addNewCategory") }}</h2>
      </v-row>

      <v-form v-model="addCategoryValidation">
        <v-row justify="center">
          <v-col lg="3" md="3" cols="5">
            <v-text-field
              :rules="[rules.required]"
              v-model="newCategoryName"
              :placeholder="$t('adminPage.categoryName')"
              rounded
              filled
            ></v-text-field>
          </v-col>
          <v-col lg="3" md="3" cols="5">
            <v-text-field
              :rules="[rules.required]"
              v-model="newCategoryArabicName"
              :placeholder="$t('adminPage.newCategoryArabicName')"
              rounded
              filled
            ></v-text-field>
          </v-col>

          <v-col class="mt-lg-3 mt-md-3 mt-n10" lg="2" md="3" cols="4">
            <v-btn
              :disabled="!addCategoryValidation"
              rounded
              block
              :color="siteColor.button_color"
              class="white--text"
              @click="addNewCategory"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("adminPage.addCategory")
              }}</span></v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <v-divider class="mx-16"></v-divider>
      <!-- Adding category items -->
      <v-row justify="center">
        <h3>{{ $t("adminPage.addCategoryItems") }}</h3>
      </v-row>

      <v-form v-model="valid">
        <v-row justify="center">
          <v-col cols="12" lg="4" sm="12" md="4">
            <v-card style="overflow: hidden">
              <v-row justify="center">
                <v-list>
                  <v-list-item>
                    <v-list-item-title
                      style="font-weight: bold; font-size: 25px"
                      >{{ $t("addProduct.chooseCategory") }}</v-list-item-title
                    >
                  </v-list-item>

                  <v-list-group
                    v-for="(category, index) in category"
                    :key="index"
                    :value="false"
                    @click="categoryClicked(category.name)"
                  >
                    <template v-slot:activator>
                      <v-list-item-action style="font-weight: bold"
                        ><span style="font-weight: bold; font-size: 20px">{{
                          category.name
                        }}</span></v-list-item-action
                      >
                    </template>

                    <v-list-group
                      v-for="(item, i) in categoryItems"
                      :key="i"
                      @click="filterProductsWithItem(item)"
                      no-action
                      sub-group
                      :value="false"
                    >
                      <template v-slot:activator>
                        <v-list-item-action>
                          <span style="font-weight: bold; font-size: 17px">
                            {{ item }}</span
                          ></v-list-item-action
                        >
                      </template>
                      <v-list-group
                        v-for="(subItem, index) in subItems"
                        :key="index"
                        no-action
                        sub-group
                        :value="false"
                        @click="filterProductsWithSubItem(subItem)"
                      >
                        <template v-slot:activator>
                          <v-list-item-action>
                            <span style="font-weight: bold; font-size: 15px">{{
                              subItem
                            }}</span></v-list-item-action
                          >
                        </template>
                      </v-list-group>
                    </v-list-group>
                  </v-list-group>
                </v-list>
              </v-row>
            </v-card>
          </v-col>
          <!-- <v-col class="mb-n7" lg="3" md="3" cols="10">
            <v-select
              :rules="[rules.required]"
              filled
              rounded
              :items="productCategory"
              v-model="categoryName"
              :placeholder="$t('adminPage.categoryName')"
            ></v-select>
          </v-col>

          <v-col lg="3" md="3" cols="5">
            <v-text-field
              v-model="categoryItem"
              :placeholder="$t('adminPage.categoryItem')"
              class="text-xl"
              rounded
              filled
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>

          <v-col lg="3" md="3" cols="5">
            <v-text-field
              v-model="itemArabicName"
              :placeholder="$t('adminPage.newCategoryItemArabicName')"
              class="text-xl"
              rounded
              filled
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>

          <v-col lg="1" md="1" class="mt-lg-3 mt-md-3 mt-n10" cols="3">
            <v-btn
              block
              :disabled="!valid"
              rounded
              :color="siteColor.button_color"
              @click="addCategoryItem"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("adminPage.addItem")
              }}</span></v-btn
            >
          </v-col> -->
        </v-row>
        <v-row justfiy="center">
          <v-col cols="4" lg="2">
            <p>
              category parent is : <span>{{ categoryParent }}</span>
            </p>
          </v-col>
          <v-col cols="4" lg="3">
            <v-text-field
              v-model="categoryItem"
              rounded
              filled
              :label="$t('adminPage.addItem')"
            >
            </v-text-field>
          </v-col>

          <v-col lg="3" md="3" cols="4">
            <v-text-field
              v-model="itemArabicName"
              :placeholder="$t('adminPage.newCategoryItemArabicName')"
              class="text-xl"
              rounded
              filled
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>

          <v-col lg="2" cols="2" sm="2" md="2">
            <v-btn
              block
              small
              :disabled="!valid"
              rounded
              :color="siteColor.button_color"
              @click="addCategoryItem"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("adminPage.addItem")
              }}</span></v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <v-divider></v-divider>
      <!-- Removing category items -->
      <v-row justify="center">
        <h2>{{ $t("adminPage.removeCategory") }}</h2>
      </v-row>
      <v-row justify="center">
        <v-col lg="3" md="3" cols="5">
          <v-select
            @change="gettingCategoryItems"
            :items="productCategory"
            filled
            rounded
            :label="$t('adminPage.chooseCategoryRemoved')"
            v-model="chooseCategoryToRemove"
          ></v-select>
        </v-col>
        <v-col lg="3" md="3" cols="5">
          <v-select
            rounded
            filled
            :placeholder="$t('adminPage.chooseItemRemoved')"
            v-model="chooseItemToRemove"
            :items="categoryItems"
          >
            <!-- ========================================================================= -->
          </v-select>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          :disabled="!chooseCategoryToRemove"
          rounded
          :color="siteColor.button_color"
          class="white--text"
          @click="confirmingRemovingCategory = true"
          ><span :style="`color:${siteColor.button_text_color}`">{{
            $t("adminPage.removeCategory")
          }}</span></v-btn
        >
        <!-- dialoge testing ============ -->
        <v-dialog v-model="confirmingRemovingCategory" max-width="400">
          <v-card>
            <v-card-title class="headline">{{
              $t("adminPage.deleteCategoryCheck")
            }}</v-card-title>

            <v-card-text>{{
              $t("adminPage.deleteCategoryCheck2")
            }}</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :color="siteColor.button_color"
                text
                @click="confirmingRemovingCategory = false"
                ><span :style="`color:${siteColor.button_text_color}`">{{
                  $t("adminPage.disagree")
                }}</span></v-btn
              >

              <v-btn
                :color="siteColor.button_color"
                text
                @click="removeCategory"
                ><span :style="`color:${siteColor.button_text_color}`"
                  >Agree</span
                ></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          class="ml-3"
          :disabled="chooseItemToRemove.length == 0"
          rounded
          :color="siteColor.button_color"
          @click="removeItem"
          ><span :style="`color:${siteColor.button_text_color}`">{{
            $t("adminPage.removeItem")
          }}</span></v-btn
        >
      </v-row>

      <v-divider class="mt-7"></v-divider>

      <v-row justify="center">
        <h2>{{ $t("adminPage.addOrRemoveCountry") }}</h2>
      </v-row>

      <v-row justify="center">
        <v-col cols="10" lg="3" md="4">
          <v-card>
            <v-toolbar dense shaped :color="siteColor.toolbar_color">
              <v-row justify="center">
                <p style="font-size: 20px">
                  {{ $t("adminPage.pickCountryToAdd") }}
                </p>
              </v-row>
            </v-toolbar>
            <v-form v-model="addCountryForm">
              <v-row justify-md="center" justify-lg="center">
                <v-col class="ml-2" lg="8" md="8" cols="7">
                  <v-select
                    v-model="country"
                    dense
                    filled
                    rounded
                    :items="worldCountries"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col class="mt-lg-n7" cols="2" lg="5" md="3">
                  <v-btn
                    :disabled="!addCountryForm"
                    rounded
                    block
                    :color="siteColor.button_color"
                    @click="addCountry"
                    ><span :style="`color:${siteColor.button_text_color}`">{{
                      $t("adminPage.addCountry")
                    }}</span></v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <v-col cols="10" lg="3" md="4">
          <v-card height="100%">
            <v-toolbar dense shaped :color="siteColor.toolbar_color">
              <v-row justify="center">
                <p style="font-size: 20px">
                  {{ $t("adminPage.countryToRemove") }}
                </p>
              </v-row>
            </v-toolbar>

            <v-virtual-scroll :items="choosenCountries" item-height="35">
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title style="text-align: center" :key="item">
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click="dialog = true" small icon>
                      <i class="fa fa-trash-alt" style="color: red"></i
                    ></v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-dialog v-model="dialog" persistent max-width="290">
                  <v-card>
                    <v-card-title style="text-align: center" class="headline">
                      {{ $t("updateSupplierPage.dialogApprovalQuestion") }}
                    </v-card-title>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="dialog = false">
                        {{ $t("updateSupplierPage.dialogDisApprovalButton") }}
                      </v-btn>
                      <v-btn
                        @click="RemoveCountry(item)"
                        text
                        :color="siteColor.button_color"
                      >
                        {{ $t("updateSupplierPage.dialogApprovalButton") }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="mx-16"></v-divider>
      <v-row justify="center" class="mt-7">
        <p class="text-lg-h4 text-sm-h6">{{ $t("adminPage.editCarousel") }}</p>
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

      <v-row justify="center">
        <p class="display-1 mt-8">{{ $t("adminPage.top10Suppliers") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col
          class="ms-3"
          v-for="(sortedSupplier, index) in suppliersSortedBySales.slice(0, 10)"
          :key="index"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier :supplier="sortedSupplier"></supplier>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" v-if="selectedMonth !== 'all'">
        <p class="display-1 mt-8">
          {{ $t("adminPage.topYearMonthSuppliers") }} {{ selectedMonth }}
        </p>
      </v-row>

      <v-row justify="center" v-if="selectedMonth === 'all'">
        <p class="display-1 mt-8">
          {{ $t("adminPage.topYearMonthSuppliers") }} {{ selectedYear }}
        </p>
      </v-row>

      <v-row class="mb-n7" style="width: 92%; margin: auto">
        <v-col lg="3">
          <v-select
            @change="changeYear"
            v-model="selectedYear"
            filled
            rounded
            :items="years"
            :label="$t('adminPage.selectYear')"
          ></v-select>
        </v-col>

        <v-col lg="3">
          <v-select
            @change="changeYear"
            v-model="selectedMonth"
            filled
            rounded
            :items="months"
            :label="$t('adminPage.selectMonth')"
          ></v-select>
        </v-col>

        <v-col class="mt-2" lg="2">
          <v-btn
            :color="siteColor.button_color"
            large
            @click="
              getTopMonthlySuppliers();
              isLoading = true;
            "
            ><span :style="`color:${siteColor.button_text_color}`">{{
              $t("adminPage.filter")
            }}</span></v-btn
          >
        </v-col>
      </v-row>

      <v-row
        justify="center"
        v-if="topYearSuppliers.length < 1 && topMonthSuppliers.length < 1"
      >
        <v-col lg="7">
          <p class="text-h4">No Data available</p>
        </v-col>
      </v-row>

      <v-row justify="center" v-if="selectedMonth === 'all'">
        <v-col
          class="ms-3"
          v-for="topSupplier in topYearSuppliers"
          :key="topSupplier.user_id"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :supplier="topSupplier"
          ></supplier>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          class="ms-3"
          v-for="topSupplier in topMonthSuppliers"
          :key="topSupplier.user_id"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :supplier="topSupplier"
          ></supplier>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center">
        <p class="display-1 mt-8">{{ $t("adminPage.suppliersChart") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col lg="6" md="6" sm="12" cols="12">
          <div style="text-align: center">
            <v-hover>
              <v-card
                width="900"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 5 : 3}`"
                class="mb-7 grey lighten-5"
              >
                <apexchart
                  dir="ltr"
                  class="mb-n2"
                  :height="
                    suppliersSortedBySales.length > 0
                      ? suppliersSortedBySales.length * 20
                      : 250
                  "
                  id="lineChart"
                  type="bar"
                  :options="chartOptions"
                  :series="salesChartSeries"
                ></apexchart>
              </v-card>
            </v-hover>
          </div>
        </v-col>

        <v-col class="ms-3" lg="2" md="2" cols="5">
          <supplier :supplier="suppliersSortedBySales[0]"></supplier>

          <v-row class="mt-4" justify="center">
            <v-label>
              <span style="font-size: 22px; text-align: center">{{
                $t("adminPage.topSellingSupplier")
              }}</span>
            </v-label>
          </v-row>
        </v-col>

        <v-col class="ms-3" lg="2" md="2" cols="5">
          <supplier
            :supplier="
              suppliersSortedBySales[suppliersSortedBySales.length - 1]
            "
          ></supplier>

          <v-row class="mt-4" justify="center">
            <v-label>
              <span style="font-size: 22px; text-align: center">{{
                $t("adminPage.leastSellingSupplier")
              }}</span>
            </v-label>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center">
        <p class="display-1 mt-8">{{ $t("adminPage.allSuppliers") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col lg="3">
          <v-text-field
            @keyup="emptySupplierName"
            dense
            filled
            v-model="supplierName"
            :placeholder="$t('adminPage.supplierNameSearch')"
          ></v-text-field>
        </v-col>

        <v-col lg="3">
          <v-select
            :items="egyptGovernorates"
            :placeholder="$t('adminPage.governorate')"
            dense
            filled
            v-model="governorate"
            @change="getCountryRegions()"
          ></v-select>
        </v-col>

        <v-col lg="3">
          <v-select
            :items="regions"
            :placeholder="$t('adminPage.region')"
            dense
            filled
            v-model="region"
          ></v-select>
        </v-col>

        <v-col lg="1">
          <v-btn
            class="white--text"
            @click="filterSuppliers"
            :color="siteColor.button_color"
          >
            <span :style="`color:${siteColor.button_text_color}`">{{
              $t("adminPage.search")
            }}</span></v-btn
          >
        </v-col>

        <v-col lg="1">
          <v-btn
            class="white--text"
            @click="All"
            :color="siteColor.button_color"
            ><span :style="`color:${siteColor.button_text_color}`"
              >All</span
            ></v-btn
          >
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          class="ms-3"
          v-for="supplier in suppliers"
          :key="supplier.user_id"
          lg="2"
          md="2"
          cols="5"
        >
          <supplier :supplier="supplier"></supplier>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          large
          :color="siteColor.button_color"
          class="mb-15 white--text"
          @click="loadMore"
          ><span :style="`color:${siteColor.button_text_color}`">{{
            $t("adminPage.loadmore")
          }}</span></v-btn
        >
      </v-row>
    </div>

    <div v-else>
      <v-row justify="center">
        <h1>you don't have permission to view this page</h1>
      </v-row>
    </div>
  </v-app>
</template>

<script>
// import supplier from "../components/supplier";
//import moment from "moment";
// import SiteColor from "../components/siteColor";
export default {
  async created() {
    await this.$store.dispatch("getSiteColor");
    //this.isLoading = true;
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getAllSuppliersWithSales");
    await this.$store.dispatch("getGovernorate");
    await this.$store.dispatch("getSiteColor");
    //
    await this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
      supplierName: this.supplierName,
      governorate: this.governorate,
      region: this.region,
    });
    await this.$store.dispatch("getWorldCountries");
    await this.$store.dispatch("getHomePageData");
    await this.$store.dispatch("getChoosenWorldCountries");

    if (this.homePageInfo.show_carousel === 1) this.carouselCheckbox = true;

    // if (this.homePageInfo.show_left_banner === 1)
    //   this.leftBannerCheckbox = true;

    if (this.homePageInfo.show_right_banner === 1)
      this.rightBannerCheckbox = true;

    //

    //
    //   "all suppliers with sales from admin page",
    //   this.allSuppliersWithSales
    // );

    await this.getTopMonthlySuppliers();
    this.isLoading = false;
    //
    await this.$store.dispatch("categoriesDB");
    // await this.$store.dispatch("getCategoryItems");
  },

  data: () => {
    return {
      supplierFilterFlag: false,
      isLoading: false,
      notSortedOrders: [],
      selectedYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      selectedMonth: "all",
      topMonthlySalesArray: [],
      topMonthlyRevenueArray: [],
      topMonthSuppliers: [],
      topYearSuppliers: [],
      governorate: "",
      region: "",
      supplierName: "",
      supplierLocation: "",
      months: [
        "all",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      loadingTimer: 10000,
      rules: {
        required: (value) => !!value || "Required.",
        min_max_width: (v) => (v > 1 && v <= 12) || "must be between 1 and 12",
        min_max_height: (v) => (v > 0 && v <= 3000) || "no more than 3000",
      },
      newCategoryName: "",
      categoryName: "",
      categoryItem: "",

      valid: true,
      chooseCategoryToRemove: "",
      categoryItems: [],
      chooseItemToRemove: [],
      addCategoryValidation: true,
      confirmingRemovingCategory: false,
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
      newCategoryArabicName: "",
      itemArabicName: "",
      country: "",
      addCountryForm: false,
      dialog: false,
      choosenCategory: "",
      categoryParent: "",
      subItems: "",
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },

    regions() {
      return this.$store.state.Home.regions;
    },
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },
    suppliers() {
      return this.$store.state.Home.suppliers;
    },

    allSuppliersWithSales() {
      return this.$store.state.AdminPage.allSuppliersWithSales;
    },

    supplier() {
      return this.$store.state.SupplierPage.supplier;
    },

    suppliersSortedBySales() {
      var allSuppliers = this.allSuppliersWithSales;
      var ar = allSuppliers.sort((a, b) =>
        a.total_sales < b.total_sales
          ? 1
          : b.total_sales < a.total_sales
          ? -1
          : 0
      );
      return ar;
    },

    sellingSuppliersNameArray() {
      var ar = [];
      this.suppliersSortedBySales.forEach((element) => {
        ar.push(element.full_arabic_name);
      });
      return ar;
    },

    suppliersTotalSalesArray() {
      var ar = [];
      this.suppliersSortedBySales.forEach((element) => {
        ar.push(element.total_sales);
      });
      return ar;
    },

    chartOptions() {
      return {
        chart: {
          id: "vuechart-example",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: this.sellingSuppliersNameArray,
        },
        colors: ["#F44336"],
      };
    },

    salesChartSeries() {
      return [
        {
          name: "asdasd",
          data: this.suppliersTotalSalesArray,
        },
      ];
    },
    years() {
      return this.getYearsArray(10);
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
    productCategory() {
      var array = [];
      this.$store.state.Home.category.forEach((e) => {
        array.push(e.name);
      });
      return array;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },
    homePageInfo() {
      return this.$store.state.Home.homePageInfo;
    },
    worldCountries() {
      return this.$store.state.Home.worldCountries;
    },
    choosenCountries() {
      return this.$store.state.Home.choosenCountries;
    },
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
    category() {
      return this.$store.state.Home.category;
    },
    allCategories() {
      return this.$store.state.Home.allCategories;
    },
  },

  methods: {
    // moment() {
    //   return new moment();
    // },

    async loadMore() {
      this.isLoading = true;
      var self = this;
      await self.$store.dispatch("getSuppliers", this.supplierFilterFlag);
      this.isLoading = false;
    },

    // supplierClicked(supplier) {
    //   localStorage.setItem("clickedSupplier", JSON.stringify(supplier));
    //
    //
    //   //this.$store.commit("supplierPage", supplier);
    //   this.$router.push(`/${this.$i18n.locale}/suppliersDashboard`);
    //   //
    // },

    groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    },

    async getTopMonthlySuppliers() {
      //this.isLoading = true;
      var self = this;
      self.topMonthSuppliers = [];
      self.topYearSuppliers = [];
      var monthlySortedOrders = [];
      var totalMonthSales;
      var totalYearSales;
      var totalMonthRevenue;
      var totalYearRevenue;
      var yearlySortedOrders;

      for (var i = 0; i < this.allSuppliersWithSales.length; i++) {
        totalMonthSales = 0;
        totalYearSales = 0;
        totalMonthRevenue = 0;
        totalYearRevenue = 0;
        await self.$axios
          .post(this.nodeHost + "/api/monthlySales", {
            user_id: self.allSuppliersWithSales[i].user_id,
          })
          .then((response) => {
            if (response.data.length > 0) {
              yearlySortedOrders = self.groupBy(
                response.data,
                (c) => c.order_year
              );

              if (yearlySortedOrders[self.selectedYear]) {
                monthlySortedOrders = self.groupBy(
                  yearlySortedOrders[self.selectedYear],
                  (c) => c.order_month
                );
                // debugger;
                var currentSupplier;
                var currentYearOrders = yearlySortedOrders[self.selectedYear];
                //

                if (self.selectedMonth === "all") {
                  currentSupplier = currentYearOrders[0].products[0].user;
                  //
                  for (var h = 0; h < currentYearOrders.length; h++) {
                    currentYearOrders[h].products.forEach((element) => {
                      totalYearSales += element.buy_counter;
                      totalYearRevenue +=
                        element.buy_counter * element.unit_price;
                    });
                  }

                  if (totalYearSales > 0) {
                    currentSupplier.yearSales = totalYearSales;
                    currentSupplier.yearRevenue = totalYearRevenue;
                    //
                    self.topYearSuppliers.push(currentSupplier);
                  }
                } else {
                  var currentMonthIndex = self.months.indexOf(
                    self.selectedMonth
                  );
                  if (monthlySortedOrders[currentMonthIndex]) {
                    for (
                      var j = 0;
                      j < monthlySortedOrders[currentMonthIndex].length;
                      j++
                    ) {
                      currentSupplier =
                        monthlySortedOrders[currentMonthIndex][j].products[0]
                          .user;
                      monthlySortedOrders[currentMonthIndex][
                        j
                      ].products.forEach((element) => {
                        totalMonthSales += element.buy_counter;
                        totalMonthRevenue +=
                          element.buy_counter * element.unit_price;
                      });
                    }
                  }
                  if (totalMonthSales > 0) {
                    currentSupplier.monthSales = totalMonthSales;
                    currentSupplier.monthRevenue = totalMonthRevenue;
                    //
                    //
                    self.topMonthSuppliers.push(currentSupplier);
                    //
                  }
                }
              }
            }
          });
      }

      self.topMonthSuppliers.sort(function (a, b) {
        return b.monthSales - a.monthSales;
      });

      self.topYearSuppliers.sort(function (a, b) {
        return b.yearSales - a.yearSales;
      });

      //
      this.isLoading = false;
    },

    changeYear() {
      //
    },

    filterSuppliers() {
      this.supplierFilterFlag = true;
      this.$store.dispatch("filterSuppliers", {
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });
    },

    emptySupplierName() {
      if (!this.supplierName) {
        this.$store.commit("emptySupplierName");
      }
    },

    getCountryRegions() {
      //
      this.$store.dispatch("getRegions", this.governorate);
    },

    All() {
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
    },

    getYearsArray(back) {
      const year = new Date().getFullYear();
      return Array.from({ length: back }, (v, i) => year - back + i + 1);
    },
    addNewCategory() {
      //
      this.$store.dispatch("addNewCategory", {
        categoryName: this.newCategoryName,
        categoryArabicName: this.newCategoryArabicName,
      });
      this.$router.go();
    },
    async addCategoryItem() {
      await this.$store.dispatch("addCategoryItems", {
        categoryName: this.categoryParent,
        categoryItem: this.categoryItem,
        itemArabicName: this.itemArabicName,
      });
      // this.$router.go();
    },
    gettingCategoryItems() {
      this.chooseItemToRemove = [];
      //

      this.categoryItems = [];
      for (let i = 0; i < this.categoriesItems.length; i++) {
        if (this.siteLanguage == "en") {
          if (
            this.categoriesItems[i].category_name == this.chooseCategoryToRemove
          ) {
            this.categoryItems.push(this.categoriesItems[i].category_items);
          }
        } else {
          if (
            this.categoriesItems[i].category_arabic_name ==
            this.chooseCategoryToRemove
          ) {
            this.categoryItems.push(
              this.categoriesItems[i].category_items_arabic_name
            );
          }
        }
      }
      //
      //
    },
    removeItem() {
      //

      this.$store.dispatch("removeCategoryAndItems", {
        categoryName: this.chooseCategoryToRemove,
        categoryItem: this.chooseItemToRemove,
      });
      // this.$router.go();
    },
    removeCategory() {
      this.confirmingRemovingCategory = false;
      this.$store.dispatch("removeCategoryAndItems", {
        categoryName: this.chooseCategoryToRemove,
        categoryItem: [],
      });
      // this.$router.go();
    },
    convertBoolToInt(bool) {
      if (bool == true) return 1;
      else return 0;
    },

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
      //
      //
    },
    setCarouselImage2(image) {
      this.carouselImage2 = image;
      this.carouselViewImg2 = URL.createObjectURL(image);
      //
    },
    setCarouselImage3(image) {
      this.carouselImage3 = image;
      this.carouselViewImg3 = URL.createObjectURL(image);
      //
    },
    setCarouselImage4(image) {
      this.carouselImage4 = image;
      this.carouselViewImg4 = URL.createObjectURL(image);
      //
    },
    // setLeftImage(image) {
    //   this.leftImage = image;
    //   this.leftBannerViewImg = URL.createObjectURL(image);
    //
    // },
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
    addCountry() {
      this.$store.dispatch("addCountry", { country: this.country });
    },
    RemoveCountry(country) {
      this.$store.dispatch("removeCountry", country);
      location.reload();
    },
    async categoryClicked(name) {
      var categoryId;
      this.categoryItems = [];
      this.categoryParent = name;
      console.log(this.categoryParent);
      console.log(name);
      if (this.siteLanguage == "en") {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_name == name) {
            console.log(this.allCategories[i].category_name, name);
            categoryId = this.allCategories[i].category_id;
            console.log("category id", categoryId);
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                console.log("id found");
                this.categoryItems.push(this.allCategories[x].category_name);
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_arabic_name == name) {
            categoryId = this.allCategories[i].category_id;
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                this.categoryItems.push(
                  this.allCategories[x].category_arabic_name
                );
              }
            }
          }
        }
      }
      console.log(this.categoryItems);
    },
    async filterProductsWithItem(name) {
      this.subItems = [];
      var categoryId;

      this.categoryParent = name;
      console.log(this.categoryParent);
      await this.$store.dispatch("filterProducts", {
        categoryItem: name,
        buttonPressed: "search",
        product_id: 0,
      });
      this.$store.commit("loadMoreType", { name: name, type: "item" });
      if (this.siteLanguage == "en") {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_name == name) {
            console.log(this.allCategories[i].category_name, name);
            categoryId = this.allCategories[i].category_id;
            console.log("category id", categoryId);
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                console.log("id found");
                this.subItems.push(this.allCategories[x].category_name);
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_arabic_name == name) {
            categoryId = this.allCategories[i].category_id;
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                this.subItems.push(this.allCategories[x].category_arabic_name);
              }
            }
          }
        }
      }
    },
    filterProductsWithSubItem(name) {
      this.categoryParent = name;
      console.log(this.categoryParent);
    },
  },

  components: {
    supplier: () => import("../components/supplier"),
    apexchart: () => import("vue-apexcharts"),
  },
};
</script>



<style scoped>
div {
  font-size: 17px;
}
</style>