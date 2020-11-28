<template>
  <v-app>
    <v-main>
      <div class="vld-parent">
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="true"
        ></loading>
      </div>
      <v-row justify="center">
        <v-col lg="6" sm="10" cols="8" md="6">
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
        <v-col lg="4 " sm="5" cols="8" md="3">
          <v-row justify="center">
            <v-col lg="12" cols="8" md="12" sm="12">
              <v-card>
                <v-row justify="center">
                  <v-col cols="12" lg="6" md="6" sm="6">
                    <span v-if="defaultCompanyClicked.default"
                      >{{ $t("adminPage.defaultCompany") }}:</span
                    >
                    <br />
                    <h3>{{ defaultCompanyClicked.company_name }}</h3>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col lg="5" cols="8" md="8" sm="8">
                    <v-dialog
                      v-model="dialog"
                      fullscreen
                      hide-overlay
                      transition="dialog-bottom-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          rounded
                          :color="siteColor.button_color"
                          v-on="on"
                          v-bind="attrs"
                        >
                          <span
                            :style="`color:${siteColor.button_text_color}`"
                            >{{ $t("dashboardSellingProduct.details") }}</span
                          >
                        </v-btn>
                      </template>
                      <v-card>
                        <v-toolbar dark color="primary">
                          <v-btn icon dark @click="dialog = false">
                            <i class="fa fa-times"></i>
                          </v-btn>
                          <v-toolbar-title>{{
                            $t("dashboardSellingProduct.details")
                          }}</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-row justify="center">
                          <v-col lg="5" sm="8" md="5" cols="12">
                            <v-simple-table dark dense>
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
                                    <td>
                                      <v-btn
                                        @click="editShippingRate(row)"
                                        icon
                                        small
                                        :color="siteColor.button_color"
                                        ><i
                                          class="fa fa-edit"
                                          style="color: white"
                                        ></i
                                      ></v-btn>
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-col>
                          <v-col lg="5" sm="8" md="5" cols="12">
                            <v-simple-table dark dense>
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
                                    v-for="(row,
                                    index) in companyCollectionRate"
                                    :key="index"
                                  >
                                    <td style="font-size: 17px">
                                      {{ row.amount }}
                                    </td>
                                    <td style="font-size: 17px">
                                      {{ row.collection_rate }}
                                    </td>
                                    <td>
                                      <v-btn
                                        @click="editCollectionRate(row)"
                                        icon
                                        small
                                        :color="siteColor.button_color"
                                        ><i
                                          class="fa fa-edit"
                                          style="color: white"
                                        ></i
                                      ></v-btn>
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
                          <!-- <v-row justify="center">
           <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="country" :label="$t('orderedProducts.country')"> 

</v-text-field>
           </v-col>
            <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="shippingRate" :label="$t('adminPage.shippingRate')"> 

</v-text-field>
           </v-col>
               <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="governorate" :label="$t('adminPage.governorate')"> 

</v-text-field>
           </v-col>
       </v-row>
       <v-row justify="center">
           <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="collectionAmount" :label="$t('adminPage.collectionAmount')"> 

</v-text-field>
           </v-col>
            <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="collectionRate" :label="$t('adminPage.collectionRate')"> 

</v-text-field>
           </v-col>
              
       </v-row> -->
                          <!-- <v-data-iterator :items="defaultCompanyName.collection_rates">
   
        
         <template v-slote:default>
             <v-row>
          <v-col
            v-for="(item,index) in defaultCompanyName.collection_rates"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
<v-card>
  <v-card-title>
    Collection Rate
  </v-card-title>
  <v-list>
    
    <v-list-item>
    <v-list-item-content>
      Amount
    </v-list-item-content>
<v-list-item-content>
  {{item.amount}}
</v-list-item-content>
</v-list-item>
<v-list-item>
      <v-list-item-content>
        Collection Rate
      </v-list-item-content>
      <v-list-item-content>
        {{item.collection_rate}}
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-card>
          </v-col>
             </v-row>
         </template>
       </v-data-iterator> -->
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
                        <v-dialog width="500" v-model="collectionDialog">
                          <v-card style="overflow: hidden">
                            <v-row justify="center">
                              <v-col lg="5" sm="4" cols="6" md="3">
                                <v-text-field
                                  filled
                                  outlined
                                  rounded
                                  v-model="collectionAmount"
                                  :label="$t('adminPage.collectionAmount')"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col lg="5" sm="4" cols="6" md="3">
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
                                @click="updateCollectionTable"
                                small
                                :color="siteColor.button_color"
                                ><span
                                  :style="`color:${siteColor.button_text_color}`"
                                >
                                  {{ $t("siteColors.update") }}</span
                                ></v-btn
                              >
                            </v-row>
                          </v-card>
                        </v-dialog>
                        <v-dialog width="500" v-model="shippingRateDialog">
                          <v-card style="overflow: hidden">
                            <v-row justify="center">
                              <v-col lg="5" sm="4" cols="6" md="3">
                                <v-text-field
                                  filled
                                  outlined
                                  rounded
                                  v-model="country"
                                  :label="$t('orderedProducts.country')"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col lg="5" sm="4" cols="6" md="3">
                                <v-text-field
                                  filled
                                  outlined
                                  rounded
                                  v-model="shippingRate"
                                  :label="$t('adminPage.shippingRate')"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col lg="5" sm="4" cols="6" md="3">
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
                              <v-btn
                                @click="updateShippingTable"
                                small
                                :color="siteColor.button_color"
                                ><span
                                  :style="`color:${siteColor.button_text_color}`"
                                >
                                  {{ $t("siteColors.update") }}</span
                                ></v-btn
                              >
                            </v-row>
                          </v-card>
                        </v-dialog>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col lg="12" cols="12" md="12" sm="12">
              <v-card
                v-if="
                  defaultCompanyClicked.shipping_companies_id !=
                  defaultCompany.shipping_companies_id
                "
              >
                <v-row justify="center">
                  <h2>{{ defaultCompanyClicked.company_name }}</h2>
                </v-row>
                <v-row justify="center">
                  <h3>{{ $t("adminPage.setCompany") }}</h3>
                  <v-btn
                    @click="defaultCompanyPermission = true"
                    text
                    :color="siteColor.button_color"
                  >
                    {{ $t("productDetails.yes") }}
                  </v-btn>
                  <v-dialog width="300" v-model="defaultCompanyPermission">
                    <v-card style="overflow: hidden">
                      <v-card-title>
                        {{ $t("completedata.dialogQuestion") }}
                      </v-card-title>
                      <v-row justify="end">
                        <v-btn
                          @click="makeDefaultCompany"
                          text
                          :color="siteColor.button_color"
                        >
                          {{ $t("supplierDetails.submit") }}
                        </v-btn>
                      </v-row>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      defaultCompanyClicked: [],
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
      collectionDialog: false,
      editCollection: [],
      shippingRateDialog: false,
      collectionRowPressed: [],
      shippingRowPressed: [],
      defaultCompanyPermission: false,
      isLoading: false,
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
      return this.defaultCompanyClicked.shipping_rates;
    },
    companyCollectionRate() {
      return this.defaultCompanyClicked.collection_rates;
    },
  },
  methods: {
    chooseDefaultCompany(name) {
      for (let i = 0; i < this.allCompanies.length; i++) {
        if (this.allCompanies[i].company_name == name) {
          this.defaultCompanyClicked = this.allCompanies[i];
        }
      }

      this.country = this.defaultCompanyClicked.shipping_rates.country;
      this.governorate = this.defaultCompanyClicked.shipping_rates.governorate;
      this.shippingRate = this.defaultCompanyClicked.shipping_rates.shipping_rate;
      this.collectionRate = this.defaultCompanyClicked.collection_rates.collection_rate;
      this.collectionAmount = this.defaultCompanyClicked.collection_rates.collection_rate;
      this.companyName = this.defaultCompanyClicked.company_name;
      this.companyNumber = this.defaultCompanyClicked.company_number;
      this.companyAddress1 = this.defaultCompanyClicked.company_address1;
      this.companyAddress2 = this.defaultCompanyClicked.company_address2;
      this.companyAddress3 = this.defaultCompanyClicked.company_address3;
    },
    updateShippingCompany() {
      console.log(this.defaultCompanyClicked.shipping_companies_id);
      var wh = {};

      wh.companyName = this.companyName;
      wh.companyNumber = this.companyNumber;
      wh.companyAddress1 = this.companyAddress1;
      wh.companyAddress2 = this.companyAddress2;
      wh.companyAddress3 = this.companyAddress3;
      wh.shipping_companies_id = this.defaultCompanyClicked.shipping_companies_id;
      this.$store.dispatch("updateShippingCompany", wh);
    },
    editCollectionRate(item) {
      console.log(item);
      this.collectionRowPressed = item;
      this.collectionDialog = true;
      this.collectionRate = item.collection_rate;
      this.collectionAmount = item.amount;
    },

    updateCollectionTable() {
      this.$store.dispatch("updateCollectionTable", {
        collection_rate: this.collectionRate,
        amount: this.collectionAmount,
        collection_id: this.collectionRowPressed.collection_id,
      });
    },
    editShippingRate(row) {
      this.shippingRowPressed = row;
      this.country = row.country;
      this.governorate = row.governorate;
      this.shippingRate = row.shipping_rate;
      this.shippingRateDialog = true;
    },
    updateShippingTable() {
      var wh = {};
      wh.country = this.country;
      wh.shipping_rate = this.shippingRate;
      wh.governorate = this.governorate;
      wh.rate_id = this.shippingRowPressed.rate_id;
      this.$store.dispatch("updateShippingTable", wh);
    },
    makeDefaultCompany() {
      this.$store.dispatch(
        "makeDefaultCompany",
        this.defaultCompanyClicked.shipping_companies_id
      );
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        location.reload();
      }, 3000);
    },
  },
  async created() {
    await this.$store.dispatch("getDefaultCompany");
    await this.$store.dispatch("getAllCompanies");

    this.defaultCompanyClicked = this.defaultCompany;

    this.country = this.defaultCompanyClicked.shipping_rates.country;
    this.governorate = this.defaultCompanyClicked.shipping_rates.governorate;
    this.shippingRate = this.defaultCompanyClicked.shipping_rates.shipping_rate;
    this.collectionRate = this.defaultCompanyClicked.collection_rates.collection_rate;
    this.collectionAmount = this.defaultCompanyClicked.collection_rates.collection_rate;
    this.companyName = this.defaultCompanyClicked.company_name;
    this.companyNumber = this.defaultCompanyClicked.company_number;
    this.companyAddress1 = this.defaultCompanyClicked.company_address1;
    this.companyAddress2 = this.defaultCompanyClicked.company_address2;
    this.companyAddress3 = this.defaultCompanyClicked.company_address3;

    console.log(this.defaultCompanyClicked);
  },
};
</script>