<template>
  <div class="tool-bar">
    <!-- <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
      ></loading>
    </div> -->
    <v-app-bar fixed :color="siteColor.toolbar_color" shaped>
      <v-row justify="start">
        <v-col cols="12" lg="12">
          <span
            v-if="
              (supplierPageInfo && !supplierPageInfo.logo) || !supplierPageInfo
            "
          >
            <a @click="$router.push('/').catch(() => {})">
              <v-img
                src="../assets/images/dotmatjar_logo.png"
                max-height="110"
                max-width="120"
                contain
              ></v-img>
            </a>
          </span>

          <span v-else class="ml-4">
            <v-btn text rounded @click="goSupplierPage">
              <v-img
                class="mx-2"
                :src="
                  supplierPageInfo && supplierPageInfo.logo
                    ? nodeHost + supplierPageInfo.logo
                    : '../assets/images/dotmatjar_logo.png'
                "
                max-height="60"
                max-width="100"
                contain
              ></v-img>
              <span class="mt-3">{{ supplierPageInfo.site_name }}</span>
            </v-btn>
          </span>
        </v-col>
      </v-row>
      <!-- <v-spacer></v-spacer> -->
      <v-row class="mr-16" justify="start">
        <v-col
          v-if="!$route.params.supplier_id"
          cols="7"
          lg="8"
          sm="6"
          md="8"
          xs="5"
        >
          <template>
            <v-text-field
              class="mt-8 arabic"
              outlined
              rounded
              height="10px"
              solo
              :placeholder="$t('toolbar.search')"
              append-icon="fa fa-search"
              @keyup="emptySearchBox"
              v-model="toolbarSearch"
              @keypress="filterProducts"
            ></v-text-field>
          </template>
        </v-col>
        <v-col v-else cols="9" lg="8" sm="5" md="6" xs="5">
          <v-text-field
            class="mt-8 arabic"
            outlined
            rounded
            :placeholder="$t('toolbar.search')"
            append-icon="fa fa-search"
            @keyup="filterSupplierProducts($route.params.supplier_id)"
            v-model="supplierProductsSearch"
          ></v-text-field>
        </v-col>

        <!-- <span v-else>
          <v-col cols="12" lg="6" sm="7" md="6">
            <v-text-field
              class="mt-8"
              outlined
              rounded
              placeholder="SEARCH"
              append-icon="fa fa-search"
              @keyup="filterSuppliers()"
              v-model="filterSuppliersByName"
            ></v-text-field>
          </v-col>
        </span> -->
        <v-col class="mt-2" cols="3" md="3" lg="3" sm="3">
          <v-btn
            class="mt-10 ml-n3 blue white--text"
            rounded
            @click="advancedSearch = true"
            small
            ><span
              style="font-size: 12px"
              v-if="siteLanguage == 'en'"
              v-html="$t('toolbar.advancedSearch')"
            ></span>
            <span
              class="smallerText"
              v-else
              v-html="$t('toolbar.advancedSearch')"
            ></span>
          </v-btn>
        </v-col>

        <!-- <v-select
          id="langSwitch"
          @change="changeLang"
          class="mt-2"
          background-color="white"
          solo-inverted
          :items="$i18n.availableLocales"
          v-model="$i18n.locale"
        >
        </v-select>

        <v-select
          id="currSwitch"
          @change="changeCurrency"
          class="mt-2"
          solo-inverted
          background-color="white"
          :items="currencies"
          v-model="currentCurrency"
        >
        </v-select> -->

        <v-dialog
          style="overflow: hidden"
          v-model="advancedSearch"
          max-width="60%"
        >
          <v-card style="overflow: hidden">
            <v-row justify="center">
              <v-radio-group
                style="margin-right: 50px"
                mandatory
                :value="radioGroup"
              >
                <v-row class="mb-n5" justify="center">
                  <v-col cols="5" lg="4" sm="5" md="5">
                    <v-radio @change="changeRadioGroup()" value="1">
                      <template v-slot:label>
                        <p v-if="siteLanguage == 'ar'" class="mt-4 arabic">
                          {{ $t("toolbar.searchProducts") }}
                        </p>
                        <p v-else class="mt-4">
                          {{ $t("toolbar.searchProducts") }}
                        </p>
                      </template>
                    </v-radio>
                  </v-col>

                  <v-col cols="5" lg="6" sm="6" md="6">
                    <v-radio
                      @change="changeRadioGroup()"
                      :label="$t('toolbar.searchSuppliers')"
                      value="2"
                    >
                      <template v-slot:label>
                        <p v-if="siteLanguage == 'ar'" class="mt-4 arabic">
                          {{ $t("toolbar.searchSuppliers") }}
                        </p>
                        <p v-else class="mt-4 arabic">
                          {{ $t("toolbar.searchSuppliers") }}
                        </p>
                      </template>
                    </v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-row>
            <v-row justify="center">
              <v-col lg="4" cols="1" sm="3" md="3"></v-col>
              <v-col cols="10" lg="4" sm="6" md="6">
                <v-text-field
                  class="mt-8 arabic"
                  outlined
                  rounded
                  :placeholder="$t('toolbar.search')"
                  append-icon="fa fa-search"
                  @keyup="emptySearchBox"
                  v-model="toolbarSearch"
                  v-if="radioGroup === '1'"
                ></v-text-field>
              </v-col>
              <v-col lg="4" cols="1" sm="3" md="3"></v-col>
              <v-col lg="4" cols="1" sm="3" md="3"></v-col>
              <v-col lg="4" cols="10" sm="6" md="6">
                <v-select
                  rounded
                  :items="availableCountries"
                  :placeholder="$t('toolbar.country')"
                  dense
                  outlined
                  v-model="country"
                  class="arabic"
                ></v-select>
              </v-col>
              <v-col cols="1" lg="4" sm="3" md="3"></v-col>

              <v-col lg="5" cols="6" md="6" sm="6">
                <v-select
                  rounded
                  v-if="radioGroup === '1'"
                  :items="egyptGovernorates"
                  :disabled="radioGroup === '2'"
                  :placeholder="$t('toolbar.governorate')"
                  dense
                  outlined
                  v-model="governorate"
                  @change="getCountryRegions()"
                  class="arabic"
                ></v-select>
              </v-col>

              <v-col cols="6" lg="6" md="6" sm="6">
                <v-select
                  rounded
                  v-if="radioGroup === '1'"
                  :items="regions"
                  :disabled="radioGroup === '2'"
                  :placeholder="$t('toolbar.region')"
                  dense
                  outlined
                  v-model="region"
                  class="arabic"
                ></v-select>
              </v-col>

              <v-col cols="6" lg="5" sm="6" md="6">
                <v-select
                  rounded
                  v-if="radioGroup === '2'"
                  :items="egyptGovernorates"
                  :disabled="radioGroup === '1'"
                  :placeholder="$t('toolbar.governorate')"
                  dense
                  outlined
                  v-model="governorate"
                  @change="getCountryRegions()"
                  class="arabic"
                ></v-select>
              </v-col>
              <v-col lg="5" cols="6" sm="6" md="6">
                <v-select
                  rounded
                  v-if="radioGroup === '2'"
                  :items="regions"
                  :disabled="radioGroup === '1'"
                  :placeholder="$t('toolbar.region')"
                  dense
                  outlined
                  v-model="region"
                  class="arabic"
                ></v-select>
              </v-col>
              <v-col cols="10" lg="3" sm="4" md="4">
                <v-text-field
                  rounded
                  v-if="radioGroup === '2'"
                  :disabled="radioGroup === '1'"
                  @keyup="emptySupplierName"
                  dense
                  outlined
                  v-model="filterSuppliersByName"
                  :placeholder="$t('toolbar.supplierNameSearch')"
                  class="arabic"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mt-n3" justify="center">
              <v-col cols="6" sm="6" md="6" lg="5">
                <v-text-field
                  v-if="radioGroup == '1'"
                  dense
                  rounded
                  outlined
                  type="number"
                  :placeholder="$t('toolbar.priceFrom')"
                  v-model="priceFrom"
                  class="arabic"
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6" md="6" lg="5">
                <v-text-field
                  v-if="radioGroup == '1'"
                  dense
                  outlined
                  rounded
                  v-model="priceTo"
                  type="number"
                  :placeholder="$t('toolbar.priceTo')"
                  class="arabic"
                ></v-text-field>
              </v-col>
              <v-col lg="4"></v-col>
              <v-col v-if="radioGroup === '2'" cols="6" sm="6" md="6" lg="6">
                <v-btn
                  @click="filterSuppliers()"
                  :color="siteColor.button_color"
                  rounded
                  small
                  ><span :style="`color: ${siteColor.button_text_color}`">{{
                    $t("toolbar.search")
                  }}</span></v-btn
                >
              </v-col>
              <v-col v-else cols="4" sm="2" md="2" lg="6">
                <v-btn
                  class="arabic"
                  @click="filterProducts('search')"
                  :color="siteColor.button_color"
                  rounded
                  small
                  ><span :style="`color: ${siteColor.button_text_color}`">{{
                    $t("toolbar.search")
                  }}</span></v-btn
                >
              </v-col>
              <v-col lg="4"></v-col>

              <!-- <v-col cols="4" sm="2" md="2" lg="2">
            <v-btn
              class="white--text"
              @click="All"
              :color="siteColor.button_color"
              rounded
              ><span :style="`color: ${siteColor.button_text_color}`"
                >All</span
              ></v-btn
            >
          </v-col> -->

              <v-col cols="4" sm="2" md="2" lg="5">
                <!-- <v-btn
              :disabled="radioGroup === '1'"
              class="white--text"
              @click="filterSuppliers"
              :color="siteColor.button_color"
              :style="`color: ${siteColor.button_text_color}`"
              rounded
              max-width="80"
              ><span :style="`color: ${siteColor.button_text_color}`"
                >Search</span
              ></v-btn
            > -->
              </v-col>
              <v-col sm="3" lg="3" md="3"></v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
      <v-menu
        v-if="currentUser"
        transition="fab-transition"
        :close-on-content-click="false"
        :nudge-width="200"
        max-width="25%"
        max-height="90%"
        offset-y
        class="menu"
        style="overflow: hidden"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="
              $vuetify.breakpoint.sm ||
              $vuetify.breakpoint.xs ||
              $vuetify.breakpoint.md
            "
            rounded
            class="font"
            :style="`color:${siteColor.toolbar_text_color};ml-4`"
            v-bind="attrs"
            v-on="on"
            icon
            small
          >
            <i
              class="fa fa-user"
              :style="`color:${siteColor.toolbar_text_color}`"
            ></i>
            <!-- <span>{{ $t("toolbar.profile") }}</span> -->
          </v-btn>
          <v-btn
            v-else
            rounded
            style="overflow: hidden"
            class="font"
            :style="`color:${siteColor.toolbar_text_color}`"
            text
            v-bind="attrs"
            v-on="on"
          >
            <i class="fa fa-user fa-sm mt-n1 mr-1"></i>
            <span class="smallerText">{{ $t("toolbar.profile") }}</span>
          </v-btn>
        </template>

        <v-card max-width="100%">
          <v-img
            v-if="currentUser.profile_photo"
            style="
              width: 60%;
              height: 80%;
              margin-left: auto;
              margin-right: auto;
            "
            id="picture"
            :src="nodeHost + currentUser.profile_photo"
          />

          <!-- <v-card-text>
            <span>
            <input type="file" 
            ref="profilePhoto"
            @change="profilePhoto"
            id="profilephoto"
            class="file-input"
            />
            </span>
                      <span class="file-label">Click to change your photo</span>

          </v-card-text>-->

          <div
            v-if="!currentUser.profile_photo"
            id="fileUpload"
            class="file is-boxed is-primary"
          >
            <label class="file-label">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-camera fa-2x" style="color: blue"></i>
                  <br />
                </span>
                <span class="file-label">
                  {{ $t("toolbar.uploadPhoto") }}
                  <br />
                </span>
              </span>

              <input
                type="file"
                ref="profileUpload"
                @change="changePhoto"
                class="file-input"
                id="profilePhoto"
              />
              <br />
            </label>
          </div>

          <div
            v-if="currentUser.profile_photo"
            id="fileUpload"
            class="file is-boxed is-primary"
          >
            <label class="file-label">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-camera fa-lg" style="color: blue"></i>
                  <br />
                </span>
                <span class="file-label biggerText">
                  {{ $t("toolbar.changeProfilePhoto") }}
                  <br />
                </span>
              </span>

              <input
                type="file"
                ref="profileUpload"
                @change="changePhoto"
                class="file-input"
                id="profilePhoto"
              />
              <br />
            </label>
          </div>

          <v-card-title>
            <v-row justify="center">
              <span style="font-size: 20px">{{
                currentUser.full_arabic_name
              }}</span>
            </v-row>
          </v-card-title>

          <v-row v-if="currentUser.user_type == 'business'" justify="center">
            <v-col cols="10" sm="10" lg="5">
              <v-btn
                class="btn1"
                :color="siteColor.button_color"
                small
                rounded
                @click="supplierPage"
              >
                <span
                  :style="`color:${siteColor.button_text_color}; `"
                  class="smallerText"
                >
                  {{ $t("toolbar.myPage") }}</span
                >
              </v-btn>
              <!-- <v-divider class="mr-4"></v-divider> -->
            </v-col>
          </v-row>
          <v-row justify="center" v-if="currentUser.user_type == 'business'">
            <v-col cols="10" sm="11" lg="5">
              <v-btn
                class="btn1"
                :color="siteColor.button_color"
                small
                rounded
                @click="$router.push(`/${$i18n.locale}/myProducts`)"
              >
                <span
                  :style="`color: ${siteColor.button_text_color};font-size:15px`"
                  v-html="$t('toolbar.myProducts')"
                >
                </span>
              </v-btn>
              <!-- <v-divider class="mr-4"></v-divider> -->
            </v-col>
          </v-row>
          <v-row justify="center" v-if="currentUser.user_type == 'admin'">
            <v-col cols="10" sm="10" lg="5">
              <v-btn
                @click="$router.push(`/${$i18n.locale}/siteColors`)"
                small
                rounded
                :color="siteColor.button_color"
              >
                <span
                  class="smallerText"
                  v-html="$t('toolbar.siteColors')"
                  :style="`color: ${siteColor.button_text_color}`"
                >
                </span>
              </v-btn>
              <!-- <v-divider class="mr-4"></v-divider> -->
            </v-col>
          </v-row>

          <v-row justify="center" v-if="currentUser.user_type == 'business'">
            <v-col cols="10" sm="10" lg="5">
              <v-btn
                :color="siteColor.button_color"
                small
                rounded
                @click="$router.push(`/${$i18n.locale}/orderedProducts`)"
              >
                <span
                  :style="`color: ${siteColor.button_text_color}`"
                  class="smallerText"
                  v-html="$t('toolbar.orderManage')"
                >
                </span>
              </v-btn>
              <!-- <v-divider class="mr-4"></v-divider> -->
            </v-col>
          </v-row>

          <v-row justify="center" v-if="currentUser.user_type == 'admin'">
            <v-col cols="12" sm="11" lg="6">
              <v-btn
                :color="siteColor.button_color"
                small
                rounded
                @click="
                  $router.push(`/${$i18n.locale}/categoryAndItemRequests`)
                "
                ><span
                  v-html="$t('toolbar.categoryRequests')"
                  :style="`color: ${siteColor.button_text_color}; font-size:15px`"
                >
                </span
              ></v-btn>
              <!-- <v-divider class="mr-4"></v-divider> -->
            </v-col>
          </v-row>
          <v-row justify="center" v-if="currentUser.user_type == 'admin'">
            <v-col cols="10" sm="10" lg="5">
              <v-btn
                :color="siteColor.button_color"
                rounded
                @click="$router.push(`/${$i18n.locale}/pendingSuppliers`)"
              >
                <span
                  :style="`color: ${siteColor.button_text_color}`"
                  class="smallerText"
                  v-html="$t('toolbar.pendingSuppliers')"
                >
                </span>
              </v-btn>
              <!-- <v-divider class="mr-4"></v-divider> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card-text>
                <a
                  class="size"
                  @click="$router.push(`/${$i18n.locale}/editPassword`)"
                >
                  <i
                    class="fa fa-cog fa-sm"
                    aria-hidden="true"
                    style="color: black"
                  ></i>
                  <span class="ml-2" :color="siteColor.toolbar_text_color">
                    {{ $t("toolbar.changeYourPassword") }}</span
                  >
                </a>
                <br />
                <br />
                <a
                  @click="$router.push(`/${$i18n.locale}/completedata`)"
                  class="size"
                >
                  <i
                    class="fa fa-edit fa-sm"
                    aria-hidden="true"
                    style="color: black"
                  ></i>
                  <span class="ml-2" :color="siteColor.toolbar_text_color">{{
                    $t("toolbar.updateOrCompleteInfo")
                  }}</span>
                </a>
                <br />
                <br />
                <a class="size" @click="logout">
                  <i
                    class="fa fa-power-off fa-sm"
                    aria-hidden="true"
                    style="color: black"
                  ></i>
                  <span class="ml-2" :color="siteColor.toolbar_text_color">
                    {{ $t("toolbar.logout") }}</span
                  >
                </a>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>

      <!-- ================= -->
      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="!currentUser && $vuetify.breakpoint.lg"
        text
        @click="$router.push(`/${$i18n.locale}/reglogin`).catch((err) => {})"
      >
        <span class="smallerText">{{ $t("toolbar.register") }}</span></v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser &&
          currentUser.user_type == 'business' &&
          $vuetify.breakpoint.lg
        "
        text
        @click="
          $router.push(`/${$i18n.locale}/requestsPage`).catch((err) => {})
        "
      >
        <span class="smallerText"> {{ $t("toolbar.requests") }}</span></v-btn
      >

      <!-- <v-btn
        class="font"
        v-if="
          (currentUser && currentUser.user_type == 'business') ||
          (currentUser.user_type == 'admin' &&
            !$vuetify.breakpoint.sm &&
            !$vuetify.breakpoint.xs)
        "
        text
        @click="$router.push('/myProducts').catch((err) => {})"
        >My Products</v-btn
      > -->

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="currentUser.user_type == 'user' && $vuetify.breakpoint.lg"
        text
        @click="$router.push(`/${$i18n.locale}/userOrders`).catch((err) => {})"
      >
        <span class="smallerText"> {{ $t("toolbar.myOrders") }}</span></v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser &&
          currentUser.user_type == 'business' &&
          $vuetify.breakpoint.lg
        "
        text
        @click="$router.push(`/${$i18n.locale}/dashboard`).catch((err) => {})"
      >
        <span class="smallerText">{{ $t("toolbar.dashboard") }}</span></v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="$vuetify.breakpoint.lg"
        text
        @click="goToAbout"
      >
        <span class="smallerText"> {{ $t("toolbar.aboutUs") }}</span>
      </v-btn>

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="
          currentUser &&
          currentUser.user_type == 'admin' &&
          $vuetify.breakpoint.lg
        "
        text
        @click="$router.push(`/${$i18n.locale}/adminPage`).catch((err) => {})"
      >
        <span class="smallerText">
          {{ $t("toolbar.adminDashboard") }}</span
        ></v-btn
      >

      <v-btn
        class="font"
        :style="`color:${siteColor.toolbar_text_color}`"
        v-if="currentUser && $vuetify.breakpoint.lg"
        text
        @click="logout"
      >
        <span class="smallerText">{{ $t("toolbar.logout") }}</span></v-btn
      >

      <v-select
        v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        @change="changeLang"
        class="mt-7"
        dense
        style="max-width: 85px"
        solo-inverted
        :items="$i18n.availableLocales"
        v-model="$i18n.locale"
      >
      </v-select>

      <v-select
        v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        @change="changeCurrency"
        class="mt-7"
        dense
        style="max-width: 85px"
        solo-inverted
        :items="currencies"
        v-model="currentCurrency"
      >
      </v-select>
      <!--============================

      />-->
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="
          $vuetify.breakpoint.sm ||
          $vuetify.breakpoint.xs ||
          $vuetify.breakpoint.md
        "
        style="width: 15px; height: 5px"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      style="position: fixed"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item @click="$router.push('/').catch((err) => {})">
            <v-list-item-icon>
              <v-icon>fas fa-home</v-icon>
            </v-list-item-icon>
            <span style="font-size: 20px"> {{ $t("toolbar.homePage") }}</span>
          </v-list-item>

          <v-list-item
            @click="
              $router.push(`/${$i18n.locale}/editPassword`).catch((err) => {})
            "
            v-if="currentUser"
          >
            <v-list-item-icon>
              <v-icon>fas fa-user-lock</v-icon>
            </v-list-item-icon>
            <span style="font-size: 20px">
              {{ $t("toolbar.changeYourPassword") }}</span
            >
          </v-list-item>

          <v-list-item
            @click="
              $router.push(`/${$i18n.locale}/requestsPage`).catch((err) => {})
            "
            v-if="currentUser && currentUser.user_type == 'business'"
          >
            <v-list-item-icon>
              <v-icon>fas fa-envelope</v-icon>
            </v-list-item-icon>
            <span style="font-size: 20px"> {{ $t("toolbar.requests") }}</span>
          </v-list-item>

          <v-list-item
            @click="
              $router.push(`/${$i18n.locale}/dashboard`).catch((err) => {})
            "
            v-if="currentUser && currentUser.user_type == 'business'"
          >
            <v-list-item-icon>
              <v-icon>fas fa-chart-pie</v-icon>
            </v-list-item-icon>

            <span style="font-size: 20px"> {{ $t("toolbar.dashboard") }}</span>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'business'"
            @click="$router.push(`/${$i18n.locale}/myProducts`)"
          >
            <v-list-item-icon>
              <v-icon>fas fa-store</v-icon>
            </v-list-item-icon>
            <span style="font-size: 20px">
              {{ $t("toolbar.myProductsNobr") }}</span
            >
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'admin'"
            @click="$router.push(`/${$i18n.locale}/siteColors`)"
          >
            <v-list-item-icon>
              <v-icon>fas fa-palette</v-icon>
            </v-list-item-icon>
            <span
              v-html="$t('toolbar.siteColorsNobr')"
              :style="`color: ${siteColor.button_text_color}; font-size: 20px`"
            >
            </span>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'business'"
            @click="$router.push(`/${$i18n.locale}/orderedProducts`)"
          >
            <v-list-item-icon>
              <v-icon>fas fa-truck</v-icon>
            </v-list-item-icon>

            <span
              style="font-size: 20px"
              v-html="$t('toolbar.orderManageNobr')"
            >
            </span>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'admin'"
            @click="$router.push(`/${$i18n.locale}/categoryAndItemRequests`)"
          >
            <v-list-item-icon>
              <v-icon>fas fa-envelope</v-icon>
            </v-list-item-icon>
            <span
              v-html="$t('toolbar.categoryRequestsNobr')"
              style="font-size: 20px"
            >
            </span>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'admin'"
            @click="$router.push(`/${$i18n.locale}/pendingSuppliers`)"
          >
            <v-list-item-icon>
              <v-icon>fas fa-users</v-icon>
            </v-list-item-icon>
            <span
              style="font-size: 20px"
              v-html="$t('toolbar.pendingSuppliersNobr')"
            >
            </span>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'user'"
            @click="
              $router.push(`/${$i18n.locale}/userOrders`).catch((err) => {})
            "
          >
            <v-list-item-icon>
              <v-icon>fas fa-cart-arrow-down</v-icon>
            </v-list-item-icon>
            <span style="font-size: 20px"> {{ $t("toolbar.myOrders") }}</span>
          </v-list-item>

          <v-list-item
            v-if="currentUser && currentUser.user_type == 'admin'"
            @click="
              $router.push(`/${$i18n.locale}/adminPage`).catch((err) => {})
            "
          >
            <v-list-item-icon>
              <v-icon>fas fa-tools</v-icon>
            </v-list-item-icon>
            <span style="font-size: 20px">
              {{ $t("toolbar.adminDashboard") }}</span
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-sign-in-alt</v-icon>
            </v-list-item-icon>

            <span
              @click="
                $router.push(`/${$i18n.locale}/reglogin`).catch((err) => {})
              "
              style="font-size: 20px"
            >
              {{ $t("toolbar.loginSignup") }}</span
            >
          </v-list-item>

          <v-list-item v-if="currentUser" @click="logout">
            <v-list-item-icon>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>

            <span style="font-size: 20px"> {{ $t("toolbar.logout") }}</span>
          </v-list-item>

          <v-list-item>
            <v-select
              @change="changeLang"
              dense
              solo-inverted
              :items="$i18n.availableLocales"
              v-model="$i18n.locale"
            >
            </v-select>
          </v-list-item>

          <v-list-item>
            <v-select
              @change="changeCurrency"
              solo-inverted
              dense
              :items="currencies"
              v-model="currentCurrency"
            >
            </v-select>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  components: {},
  async created() {
    console.log("current language locale", this.$i18n.locale);
    localStorage.setItem("currentCurrency", "egp");

    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getAvailableCountries");
    console.log("color from toolbar", this.siteColor);
    if (this.availableCountries) {
      console.log(this.availableCountries);
    }
    this.$store.dispatch("getWorldCountries");
    console.log("site color in toolbar is :", this.siteColor);
  },

  props: {
    //     toolBarColor: {
    //       type: String,
    //       default (){
    // return this.siteColor
    //       }
    //     },
  },
  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
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

    supplierPageInfo() {
      return this.$store.state.SupplierPage.supplierPageInfo;
    },
    supplier() {
      return this.$store.state.SupplierPage.supplier;
    },
    egyptGovernorates() {
      if (this.country == "Egypt") {
        return this.$store.state.Home.governorates;
      } else return [];
    },
    regions() {
      return this.$store.state.Home.regions;
    },
    radioGroup() {
      return this.$store.state.Home.radioGroup;
    },
    availableCountries() {
      if (this.$store.state.Home.availableCountries) {
        var data = this.$store.state.Home.availableCountries.map((e) => {
          return e.country_name;
        });
        return data;
      } else return [];
    },
    products() {
      return this.$store.state.Home.products;
    },
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
  },

  methods: {
    // async changeLang(value) {
    //   this.$router.push({
    //     params: { lang: value },
    //   });
    //   this.$vuetify.rtl = value == "ar" ? true : false;
    //   this.$store.commit("siteLanguage", value);

    //   this.$store.dispatch("categoriesDB");
    //   await this.$store.dispatch(
    //     "getSupplierCategoriesAndItems",
    //     this.$route.params.supplier_id
    //   );
    //   // location.reload();
    // },
    logout() {
      this.$store.commit("removeCurrentUser");

      setTimeout(() => {
        this.$router.push(`/${this.$i18n.locale}/reglogin`).catch(() => {});
      }, 10);
    },

    changePhoto() {
      this.profilephoto = this.$refs.profileUpload.files[0];
      var form = new FormData();
      console.log("profile function starts");
      form.append("profile", this.profilephoto);
      form.set("email", this.$store.state.Home.currentUser.email);
      console.log(this.$store.state.Home.currentUser.email);
      this.$store.dispatch("profilePhoto", form);
    },
    supplierPage() {
      this.$store.commit("supplierPage", this.currentUser);
      this.$router.push(
        `/${this.$i18n.locale}/supplierPage/` + this.currentUser.user_id
      );
    },
    goSupplierPage() {
      this.$router
        .push(`/${this.$i18n.locale}/supplierPage/` + this.supplier.user_id)
        .catch(() => {});
    },

    // async filterProducts() {
    //   this.productFilterFlag = true;

    //   await this.$store.dispatch("filterProducts", {
    //     product_name: this.toolbarSearch,
    //     category_name: this.categoryName,
    //     governorate: this.governorate,
    //     region: this.region,
    //   });
    // },
    getCountryRegions() {
      console.log(this.governorate);
      this.$store.dispatch("getRegions", this.governorate);
    },
    emptySupplierName() {
      if (!this.supplierName) {
        this.$store.commit("emptySupplierName");
      }
    },
    emptySearchBox() {
      if (!this.toolbarSearch) {
        this.$store.commit("emptySearch");
      }
    },
    async filterProducts() {
      this.isLoading = true;
      this.productFilterFlag = true;
      console.log(this.toolbarSearch, this.categoryName);
      var buttonPressed = "search";
      // await this.$store.dispatch("filterProducts", {
      //   product_name: this.toolbarSearch,
      //   category_name: this.categoryName,
      //   governorate: this.governorate,
      //   region: this.region,
      //   buttonPressed: "search",
      // });

      await this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
        governorate: this.governorate,
        region: this.region,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        product_id:
          buttonPressed == "search"
            ? this.products[0].product_id
            : this.filteredProducts[this.filteredProducts.length - 1]
                .product_id,
        buttonPressed,
      });
      if (this.supplierName) {
        await this.$store.dispatch("filterSuppliers", {
          supplierName: this.supplierName,
          governorate: this.governorate,
          region: this.region,
        });
      }

      this.isLoading = false;
    },
    filterSupplierProducts() {
      console.log(this.supplierProductsSearch);
      console.log(this.$route.params.supplier_id);
      this.$store.dispatch("filterSupplierProducts", {
        productsSearch: this.supplierProductsSearch,
        user_id: this.$route.params.supplier_id,
      });
      console.log(this.$route.params.supplier_id);
    },
    async emptySupplierSearchBox() {
      await this.$store.dispatch(
        "getSupplierProducts",
        this.$route.params.supplier_id
      );
    },
    async filterSuppliers() {
      await this.$store.dispatch("filterSuppliers", {
        supplierName: this.filterSuppliersByName,
        governorate: this.governorate,
        region: this.region,
      });
    },
    changeRadioGroup() {
      if (this.radioGroup == "1") {
        this.$store.commit("changeRadioGroup", "2");
      } else {
        this.$store.commit("changeRadioGroup", "1");
      }

      console.log("test");
      console.log(this.radioGroup);
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

    async changeLang(value) {
      this.$router.push({
        params: { lang: value },
      });

      if (value == "ar" || value == "en") this.$i18n.locale = value;

      this.$vuetify.rtl = value == "ar" ? true : false;
      this.$store.commit("siteLanguage", value);
      location.reload();
      this.$store.dispatch("categoriesDB");
      await this.$store.dispatch(
        "getSupplierCategoriesAndItems",
        this.$route.params.supplier_id
      );
    },

    goToAbout() {
      window.location = "http://www.dotmatjar.com/about";
    },
    // async changeCurrency(currency) {
    //   //this.$store.commit("emptyProductsArray");
    //   //location.reload();
    //   localStorage.setItem("currentCurrency", currency);
    //   if (this.$route.name == "home") {
    //     this.$store.commit("emptyProductsArray");
    //     await this.$store.dispatch("getProducts", {
    //       productFilterFlagss: this.productFilterFlag,
    //       productName: this.toolbarSearch,
    //       categoryName: this.categoryName,
    //     });
    //     console.log(currency);
    //   } else if (this.$route.name == "supplierPage") {
    //     this.$store.commit("emptySupplierProducts");
    //     await this.$store.dispatch(
    //       "getSupplierProducts",
    //       this.$route.params.supplier_id
    //     );
    //   }
    // },
  },
  data: () => ({
    profilephoto: [],
    drawer: false,
    isLoading: false,
    categoryName: "",
    priceFrom: "",
    priceTo: "",
    region: "",
    productFilterFlag: false,
    toolbarSearch: "",
    advancedSearch: false,
    governorate: "",
    supplierName: "",
    supplierProductsSearch: "",
    filterSuppliersByName: "",
    country: "",
    currentCurrency: localStorage.getItem("currentCurrency"),
    currencies: ["egp", "usd"],
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 17px;
}
.smallerText {
  font-size: 15px;
}

.img {
  border-radius: 50%;
}
.size {
  font-size: 20px;
  font-weight: bold;
}
.x {
  margin-right: 20%;
  font-weight: bold;
}
.username {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: black;
}

.mos {
  color: beige;
}
#profilePhoto {
  opacity: 0;
  z-index: inherit;
}
#picture {
  margin-right: 15%;
  border-radius: 50%;
  text-align: center;
}
#fileUpload {
  text-align: center;
}
.font {
  font-size: 14px;
}
</style>
