<template>
  <v-app>
    <v-main>
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
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "add-remove-country",
  async created() {
    await this.$store.dispatch("getWorldCountries");
    await this.$store.dispatch("getChoosenWorldCountries");
  },

  data() {
    return {
      addCountryForm: false,
      country: "",
      rules: {
        required: (value) => !!value || "Required.",
        min_max_width: (v) => (v > 1 && v <= 12) || "must be between 1 and 12",
        min_max_height: (v) => (v > 0 && v <= 3000) || "no more than 3000",
      },
      dialog: false,
    };
  },

  methods: {
    addCountry() {
      this.$store.dispatch("addCountry", { country: this.country });
    },
    RemoveCountry(country) {
      this.$store.dispatch("removeCountry", country);
      location.reload();
    },
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
    worldCountries() {
      return this.$store.state.Home.worldCountries;
    },
    choosenCountries() {
      return this.$store.state.Home.choosenCountries;
    },
  },
};
</script>