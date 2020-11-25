<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <v-col lg="6" sm="10" cols="12" md="6">
          <v-card
            style="overflow: hidden"
            elevation="16"
            max-width="400"
            class="mx-auto"
          >
            <v-toolbar shaped>
              <v-row justify="center">
                <h2 style="text-align: center">
                  {{ $t("adminPage.companies") }}
                </h2>
              </v-row>
            </v-toolbar>

            <v-virtual-scroll
              :items="virtualScrollerCompaniesArray"
              height="300"
              item-height="64"
              ma
            >
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-action>
                    <v-btn @click="true" fab small depressed color="primary">
                      N
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title :key="item">
                      <v-btn
                        @click="chooseDefaultCompany(item)"
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
        <v-col lg="4 " sm="7" cols="8" md="3">
          <v-card>
            <v-row justify="center">
              <v-col cols="6" lg="8" md="12">
                <h2>
                  {{ $t("adminPage.defaultCompany") }}: <br />
                  {{ defaultCompanyName.company_name }}
                </h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col lg="5">
                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-on="on" v-bind="attrs" color="red">
                      {{ $t("dashboardSellingProduct.details") }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog = false">
                        <i class="fa fa-times"></i>
                      </v-btn>
                      <v-toolbar-title>Settings</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="dialog = false"> Save </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                    <v-row justify="center">
                      <v-col lg="5" sm="8" md="5" cols="12">
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th style="font-size: 20px">
                                  {{ $t("orderedProducts.country") }}
                                </th>
                                <th style="font-size: 20px">
                                  {{ $t("adminPage.governorate") }}
                                </th>
                                <th style="font-size: 20px">
                                  {{ $t("adminPage.shippingRate") }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(row, index) in companyShippingRate"
                                :key="index"
                              >
                                <td style="font-size: 17px">
                                  {{ row.country }}
                                </td>
                                <td style="font-size: 17px">
                                  {{ row.governorate }}
                                </td>
                                <td style="font-size: 17px">
                                  {{ row.shipping_rate }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                      <v-col lg="5" sm="8" md="5" cols="12">
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th style="font-size: 20px">
                                  {{ $t("adminPage.collectionAmount") }}
                                </th>
                                <th style="font-size: 20px">
                                  {{ $t("adminPage.collectionRate") }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(row, index) in companyCollectionRate"
                                :key="index"
                              >
                                <td style="font-size: 17px">
                                  {{ row.amount }}
                                </td>
                                <td style="font-size: 17px">
                                  {{ row.collection_rate }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-btn
                        rounded
                        small
                        :color="siteColor.button_color"
                        @click="edit = !edit"
                        ><span
                          :style="`color:${siteColor.button_text_color}`"
                          >{{ $t("adminPage.edit") }}</span
                        ></v-btn
                      >
                    </v-row>
                    <v-container v-if="edit">
                      <v-row justify="center">
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="companyName"
                            :label="$t('adminPage.companyName')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="companyNumber"
                            :label="$t('adminPage.companyNumber')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="companyAddress1"
                            :label="$t('adminPage.companyAddress1')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="companyAddress2"
                            :label="$t('adminPage.companyAddress2')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="companyAddress3"
                            :label="$t('adminPage.companyAddress3')"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="country"
                            :label="$t('orderedProducts.country')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="shippingRate"
                            :label="$t('adminPage.shippingRate')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="governorate"
                            :label="$t('adminPage.governorate')"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="collectionAmount"
                            :label="$t('adminPage.collectionAmount')"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col lg="3" sm="4" cols="6" md="3">
                          <v-text-field
                            filled
                            outlined
                            rounded
                            v-model="collectionRate"
                            :label="$t('adminPage.collectionRate')"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-btn
                          @click="updateShippingCompany"
                          rounded
                          :color="siteColor.button_color"
                        >
                          <span
                            :style="`color:${siteColor.button_text_color}`"
                            >{{ $t("siteColors.update") }}</span
                          >
                        </v-btn>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      defaultCompanyName: [],
      dialog: false,
      edit: false,
      country: "",
      governorate: "",
      shippingRate: "",
      collectionRate: "",
      collectionAmount: "",
      companyName: "",
      companyNumber: "",
      companyAddress1: "",
      companyAddress2: "",
      companyAddress3: "",
    };
  },
  computed: {
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
    allCompanies() {
      return this.$store.state.AdminPage.allCompanies;
    },
    defaultCompany() {
      return this.$store.state.AdminPage.defaultCompany;
    },
    virtualScrollerCompaniesArray() {
      var array = this.$store.state.AdminPage.allCompanies.map((company) => {
        return company.company_name;
      });
      return array;
    },
    companyShippingRate() {
      return this.defaultCompanyName.shipping_rates;
    },
    companyCollectionRate() {
      return this.defaultCompanyName.collection_rates;
    },
  },
  methods: {
    chooseDefaultCompany(name) {
      for (let i = 0; i < this.allCompanies.length; i++) {
        if (this.allCompanies[i].company_name == name) {
          this.defaultCompanyName = this.allCompanies[i];
        }
      }
      console.log("default company", this.defaultCompanyName);
      this.country = this.defaultCompanyName.shipping_rates.country;
      this.governorate = this.defaultCompanyName.shipping_rates.governorate;
      this.shippingRate = this.defaultCompanyName.shipping_rates.shipping_rate;
      this.collectionRate = this.defaultCompanyName.collection_rates.collection_rate;
      this.collectionAmount = this.defaultCompanyName.collection_rates.collection_rate;
      this.companyName = this.defaultCompanyName.company_name;
      this.companyNumber = this.defaultCompanyName.company_number;
      this.companyAddress1 = this.defaultCompanyName.company_address1;
      this.companyAddress2 = this.defaultCompanyName.company_address2;
      this.companyAddress3 = this.defaultCompanyName.company_address3;
    },
    updateShippingCompany() {
      var wh = {};
      wh.country = this.country;
      wh.shipping_rate = this.shippingRate;
      wh.governorate = this.governorate;
      wh.amount = this.collectionAmount;
      wh.collection_rate = this.collectionRate;
      wh.shipping_companies_id = this.defaultCompanyName.shipping_companies_id;
      this.$store.dispatch("updateShippingCompany", wh);
    },
  },
  async created() {
    await this.$store.dispatch("getDefaultCompany");
    await this.$store.dispatch("getAllCompanies");

    this.defaultCompanyName = this.defaultCompany;

    this.country = this.defaultCompanyName.shipping_rates.country;
    this.governorate = this.defaultCompanyName.shipping_rates.governorate;
    this.shippingRate = this.defaultCompanyName.shipping_rates.shipping_rate;
    this.collectionRate = this.defaultCompanyName.collection_rates.collection_rate;
    this.collectionAmount = this.defaultCompanyName.collection_rates.collection_rate;
    this.companyName = this.defaultCompanyName.company_name;
    this.companyNumber = this.defaultCompanyName.company_number;
    this.companyAddress1 = this.defaultCompanyName.company_address1;
    this.companyAddress2 = this.defaultCompanyName.company_address2;
    this.companyAddress3 = this.defaultCompanyName.company_address3;

    console.log(this.defaultCompanyName);
  },
};
</script>