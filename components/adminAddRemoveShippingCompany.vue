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
        <v-radio-group mandatory v-model="radioGroup">
          <v-radio value="1">
            <template v-slot:label>
              <span>{{ $t("adminPage.addCompany") }}</span>
            </template>
          </v-radio>

          <v-radio value="2">
            <template v-slot:label>
              <span>{{ $t("adminPage.removeCompany") }}</span>
            </template>
          </v-radio>
        </v-radio-group>
      </v-row>
      <v-container v-if="radioGroup == 1">
        <v-form v-model="companyInfoValidation">
          <v-row justify="center">
            <v-col lg="3" sm="4" cols="6" md="3">
              <v-text-field
                filled
                outlined
                rounded
                v-model="companyName"
                :label="$t('adminPage.companyName')"
                :rules="required"
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
                :rules="required"
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
                :rules="required"
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
                :rules="required"
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
                :rules="required"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-form v-model="shippingValidation">
          <v-row justify="center">
            <v-col lg="3" sm="4" cols="6" md="3">
              <v-select
                rounded
                :items="availableCountries"
                :placeholder="$t('toolbar.country')"
                dense
                filled
                v-model="country"
                class="arabic mb-n5 mb-lg-n0"
              ></v-select>
            </v-col>
            <v-col lg="3" sm="4" cols="6" md="3">
              <v-select
                rounded
                :items="egyptGovernorates"
                :disabled="radioGroup === '2'"
                :placeholder="$t('toolbar.governorate')"
                dense
                filled
                v-model="governorate"
                @change="getCountryRegions()"
                class="arabic"
              ></v-select>
            </v-col>
            <v-col lg="3" sm="4" cols="6" md="3">
              <v-select
                rounded
                :items="regions"
                :disabled="radioGroup === '2'"
                :placeholder="$t('toolbar.region')"
                dense
                filled
                v-model="region"
                class="arabic"
              ></v-select>
            </v-col>
            <v-col lg="3" sm="4" cols="6" md="3">
              <v-text-field
                :rules="required"
                filled
                outlined
                rounded
                v-model="shippingRate"
                :label="$t('adminPage.shippingRate')"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center">
          <v-col lg="1" cols="3" md="3" sm="3">
            <v-btn
              :disabled="!shippingValidation"
              rounded
              small
              :color="siteColor.button_color"
              @click="pushShippingData"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("adminPage.push")
              }}</span></v-btn
            >
          </v-col>
          <v-col lg="6" cols="12" md="12" sm="12">
            <v-simple-table dark>
              <thead>
                <tr>
                  <th style="font-size: 15px">
                    {{ $t("orderedProducts.country") }}
                  </th>
                  <th style="font-size: 15px">
                    {{ $t("addUser.governorate") }}
                  </th>
                  <th style="font-size: 15px">
                    {{ $t("completedata.region") }}
                  </th>
                  <th style="font-size: 15px">
                    {{ $t("adminPage.shippingRate") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(object, index) in shippingDataTable" :key="index">
                  <td>{{ object.country }}</td>
                  <td>{{ object.governorate }}</td>
                  <td>{{ object.region }}</td>
                  <td>{{ object.shipping_rate }}</td>

                  <td>
                    <v-btn @click="removeShippingData(index)" small icon>
                      <i class="fa fa-times"></i
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-form v-model="collectionValidation">
          <v-row justify="center">
            <v-col lg="3" sm="4" cols="6" md="3">
              <v-text-field
                :rules="required"
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
                :rules="required"
                filled
                outlined
                rounded
                v-model="collectionRate"
                :label="$t('adminPage.collectionRate')"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center">
          <v-col lg="1" cols="3" md="3" sm="3">
            <v-btn
              :disabled="!collectionValidation"
              rounded
              small
              :color="siteColor.button_color"
              @click="pushCollectionData"
              ><span :style="`color:${siteColor.button_text_color}`">{{
                $t("adminPage.push")
              }}</span></v-btn
            >
          </v-col>
          <v-col lg="6" cols="12">
            <v-simple-table dark>
              <thead>
                <tr>
                  <th style="font-size: 15px">
                    {{ $t("adminPage.collectionAmount") }}
                  </th>
                  <th style="font-size: 15px">
                    {{ $t("adminPage.collectionRate") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(object, index) in collectionDataTable" :key="index">
                  <td>{{ object.amount }}</td>
                  <td>{{ object.collection_rate }}</td>

                  <td>
                    <v-btn @click="removeCollectionData(index)" small icon>
                      <i class="fa fa-times"></i
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            small
            rounded
            :color="siteColor.button_color"
            @click="addNewCompany"
            :disabled="
              !collectionValidation ||
              !shippingValidation ||
              !companyInfoValidation
            "
            ><span :style="`color:${siteColor.button_text_color}`">{{
              $t("adminPage.addCompany")
            }}</span></v-btn
          >
        </v-row>
      </v-container>
      <v-container v-else>
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
                    {{ item }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn @click="activateRemoveDialog(item)" small icon>
                    <i style="color: red" class="fa fa-times"></i
                  ></v-btn>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </v-virtual-scroll>

          <v-dialog v-model="removeDialog" width="300">
            <v-card style="overflow: hidden">
              <v-card-title>
                {{ $t("completedata.dialogQuestion") }}
              </v-card-title>
              <v-row justify="center">
                <v-btn
                  @click="removeCompany"
                  small
                  rounded
                  :color="siteColor.button_color"
                  ><span
                    :style="`color:${siteColor.button_text_color};font-size:12px`"
                    >{{ $t("adminPage.removeCompany") }}</span
                  ></v-btn
                >
              </v-row>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
      <v-snackbar timeout="5000" v-model="snackbar">
        <h2>{{ $t("adminPage.snackbar") }}</h2>
      </v-snackbar>
      <v-snackbar timeout="5000" v-model="snackbarShippingTable">
        <h2>{{ $t("adminPage.snackbarShippingTableMessage") }}</h2>
      </v-snackbar>
      <v-snackbar timeout="5000" v-model="snackbarCollectionTable">
        <h2>{{ $t("adminPage.snackbarCollectionTableMessage") }}</h2>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: 1,
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
      removeDialog: false,
      companyData: [],
      shippingDataTable: [],
      required: [(v) => !!v || "Required"],
      shippingValidation: false,
      collectionDataTable: [],
      collectionValidation: false,
      snackbar: false,
      isLoading: false,
      companyInfoValidation: false,
      region: "",
      snackbarShippingTable: false,
      snackbarCollectionTable: false,
    };
  },
  methods: {
    activateRemoveDialog(name) {
      for (let i = 0; i < this.allCompanies.length; i++) {
        if (this.allCompanies[i].company_name == name) {
          this.companyData = this.allCompanies[i];
        }
      }
      if (this.companyData.default == "TRUE") {
        this.snackbar = true;
      } else this.removeDialog = true;
    },
    async removeCompany() {
      this.isLoading = true;
      this.$store.dispatch(
        "removeCompany",
        this.companyData.shipping_companies_id
      );
      await this.$store.dispatch("getDefaultCompany");
      await this.$store.dispatch("getAllCompanies");
      setTimeout(() => {
        this.isLoading = false;
        this.removeDialog = false;
      }, 3000);
    },
    addNewCompany() {
      this.isLoading = true;
      var wh = {};
      wh.company_name = this.companyName;
      wh.company_number = this.companyNumber;
      wh.company_address1 = this.companyAddress1;
      wh.company_address2 = this.companyAddress2;
      wh.company_address3 = this.companyAddress3;
      wh.shippingTable = this.shippingDataTable;
      wh.collectionTable = this.collectionDataTable;
      this.$store.dispatch("addNewCompany", wh);
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
    pushShippingData() {
      var check = true;
      if (this.shippingDataTable.length > 0) {
        for (let i = 0; i < this.shippingDataTable.length; i++) {
          if (this.shippingDataTable[i].region == this.region) {
            check = false;
          }
        }
      }
      var obj = {};
      if (check) {
        obj.country = this.country;
        obj.governorate = this.governorate;
        obj.shipping_rate = this.shippingRate;
        obj.region = this.region;
        this.shippingDataTable.push(obj);
      } else if (!check) {
        this.snackbarShippingTable = true;
      }
    },
    removeShippingData(index) {
      this.shippingDataTable.splice(index, 1);
    },
    pushCollectionData() {
      var obj = {};
      var check = true;
      if (this.collectionDataTable.length > 0) {
        for (let i = 0; i < this.collectionDataTable.length; i++) {
          if (this.collectionDataTable[i].amount == this.collectionAmount) {
            check = false;
          }
        }
      }
      if (check) {
        obj.collection_rate = this.collectionRate;
        obj.amount = this.collectionAmount;

        this.collectionDataTable.push(obj);
      } else if (!check) {
        this.snackbarCollectionTable = true;
      }
    },
    removeCollectionData(index) {
      this.collectionDataTable.splice(index, 1);
    },
    getCountryRegions() {
      this.$store.dispatch("getRegions", this.governorate);
    },
  },
  computed: {
    virtualScrollerCompaniesArray() {
      var array = this.$store.state.AdminPage.allCompanies.map((company) => {
        return company.company_name;
      });
      return array;
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
    allCompanies() {
      return this.$store.state.AdminPage.allCompanies;
    },
    defaultCompany() {
      return this.$store.state.AdminPage.defaultCompany;
    },
    availableCountries() {
      if (this.$store.state.Home.availableCountries) {
        var data = this.$store.state.Home.availableCountries.map((e) => {
          return e.country_name;
        });
        return data;
      } else return [];
    },
    egyptGovernorates() {
      if (this.country == "Egypt") {
        return this.$store.state.Home.governorates;
      } else return [];
    },
    regions() {
      return this.$store.state.Home.regions;
    },
  },
  async created() {
    await this.$store.dispatch("getWorldCountries");
    await this.$store.dispatch("getDefaultCompany");
    await this.$store.dispatch("getAllCompanies");
  },
};
</script>