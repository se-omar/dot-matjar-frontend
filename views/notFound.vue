<template>
  <v-app>
    <v-row justify="center">
      <p class="display-1 mt-16">404 Page Not Found</p>
    </v-row>
    <!-- <v-row justify="center">
          <v-card max-width="400">
            <v-card-actions aspect-ratio="1.7">
              <v-img id="image" :src="supplier.profile_photo"></v-img>
            </v-card-actions>
            <v-card-title>
              <span class="black--text ml-13">{{
                supplier.full_arabic_name
              }}</span>
            </v-card-title>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text"
                >Mobile number :</span
              >
              <span class="black--text">{{ supplier.mobile_number }}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text"
                >User type :</span
              >
              <span class="black--text">{{ supplier.user_type }}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text">Email :</span>
              <span class="black--text">{{ supplier.email }}</span>
            </v-card-actions>
            <v-card-actions>
              <span style="font-weight: bold" class="black--text"
                >Facbook-account :</span
              >
              <span class="black--text">{{ supplier.facebook_account }}</span>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-divider></v-divider> -->

    <!-- <v-row justify="center">
          <v-col lg="6">
            <v-row justify="center">
              <v-col lg="6">
                <p class="text-h4">Customer Ratings</p>
              </v-col>
            </v-row>

            <v-card elevation="1" height="250">
              <v-row justify="center">
                <v-col lg="6" class="text-center ml-n10 mt-5">
                  <v-avatar fab :color="siteColor.toolbar_color" size="100">
                    <span class="white--text headline text-h3"
                      >{{ supplier.rating }}.0</span
                    >
                  </v-avatar>

                  <v-rating
                    readonly
                    class="ml-n1"
                    v-model="supplier.rating"
                    :hover="hover"
                    :size="size"
                    :color="siteColor.toolbar_color"
                  ></v-rating>

                  <p class="text-center text-subtitle">
                    (based on {{ supplier.rate_counter }} Ratings)
                  </p>
                </v-col>

                <v-col lg="5">
                  <div>
                    <v-progress-linear
                      class="mb-2"
                      height="38"
                      v-for="i in starNum"
                      :key="i"
                      rounded
                      :value="barRatingArray[5 - i]"
                      :color="siteColor.toolbar_color"
                      >{{ 6 - i }} Star ({{
                        barRatingArray[5 - i] / 20
                      }}
                      Ratings)</v-progress-linear
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row> -->

    <!-- <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            :style="`background-color: ${siteColor.toolbar_color}`"
            v-for="i in tabs"
            :key="i.name"
          >
            <div
              :style="`color: ${siteColor.toolbar_text_color}`"
              class="caption py-1 font-weight-medium text-subtitle-1"
            >
              {{ i.name }}
            </div>
          </v-tab>

          <v-tab-item class="grey lighten-4">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="supplierProductsSearch"
                  rounded
                  outlined
                  label="What are you looking for ?"
                  @keyup="returnAllProducts"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  @click="filterSupplierProducts"
                  rounded
                  :color="siteColor.button_color"
                  class="white--text mt-3"
                  ><span :style="`color:${siteColor.button_text_color}`"
                    >Search</span
                  ></v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
               
                <v-toolbar shaped dark dense :color="siteColor">
                  <v-row justify="center">
                    <v-col
                      cols="2"
                      v-for="category in category"
                      :key="category.id"
                    >
                      <v-menu
                        offset-x
                        :close-on-content-click="false"
                        open-on-hover
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @mouseover="mouseOver(category)"
                            v-bind="attrs"
                            v-on="on"
                            text
                            rounded
                            class="white--text"
                            @click="filterProductsWithCategory(category)"
                          >
                            {{ category }}
                            <i :class="`fas fa-${category} fa-2x ml-2`"></i>
                          </v-btn>
                        </template>
                        <v-card style="background-color: red">
                          <v-list v-for="item in categoryItems" :key="item.id">
                            <v-btn @click="filterProductsWithItem(item)" text>
                              - {{ item }}
                              <i :class="`fa fa-${item} fa-lg ml-2`"></i>
                            </v-btn>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-toolbar>
               
              </v-col>
            </v-row>
            
          </v-tab-item>

          <v-tab-item class="grey lighten-4">
            <v-row justify="center">
              <v-col lg="8">
                <p class="text-h5">({{ reviewsWithText.length }}) Reviews</p>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col
                lg="8"
                v-for="review in reviewsWithText"
                :key="review.suppliers_reviews_id"
              >
                <v-card class="pa-5" elevation="0">
                  <v-row>
                    <v-col lg="7">
                      <p class="text-h5 font-weight-medium">
                        By {{ review.user.full_arabic_name }}
                      </p>
                    </v-col>

                    <v-col lg="5">
                      <v-rating
                        readonly
                        class="ml-n1 mt-n2"
                        v-model="review.rating"
                        :hover="hover"
                        :size="size2"
                        :color="siteColor.toolbar_color"
                      ></v-rating>
                    </v-col>
                  </v-row>
                  <p
                    class="font-weight-medium text--secondary"
                    style="font-size: 17px"
                  >
                    {{ review.review }}
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item class="grey lighten-4">
            <v-row justify="center">
              <v-col lg="8">
                <p
                  v-if="supplierRating === 0"
                  class="text-h5 mb-n2 text-center"
                >
                  Rate this Product
                </p>
                <p v-else class="text-h5 mb-n2 text-center">Your Rating:</p>
                <v-rating
                  :readonly="supplierRating > 0"
                  class="ml-n1 text-center mt-1"
                  v-model="rating"
                  :hover="hover"
                  :size="size"
                  :color="siteColor.toolbar_color"
                ></v-rating>
                <v-textarea
                  :disabled="supplierRating > 0"
                  height="150"
                  outlined
                  v-model="review"
                ></v-textarea>
                <v-btn
                  :disabled="supplierRating > 0"
                  class="white--text"
                  @click="submitReview"
                  block
                  :color="siteColor.button_color"
                  ><span :style="`color:${siteColor.button_text_color}`"
                    >submit</span
                  ></v-btn
                >
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs> -->
  </v-app>
</template>