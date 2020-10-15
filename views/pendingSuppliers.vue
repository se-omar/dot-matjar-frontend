<template>
  <v-app>
    <v-row justify="center">
      <h1 style="font-weight: bold">
        {{ $t("pendingSuppliers.pendingSupplier") }}
      </h1>
    </v-row>
    <v-container class="grey">
      <v-row>
        <v-col
          cols="4"
          v-for="(supplier, user_id) in pendingSuppliers"
          :key="user_id"
        >
          <v-card height="500" width="300" class="overflow-hidden">
            <v-row justify="end">
              <v-navigation-drawer
                width="300"
                :color="siteColor"
                v-model="drawer"
                absolute
                dark
              >
                <v-list dense nav class="py-0">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-icon></v-list-item-icon>
                      <v-list-item-title>
                        <h5>
                          <i class="fa fa-user fa-md mr-2"></i>
                          {{ supplier.full_arabic_name }}
                        </h5>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <h5>
                          <i class="fa fa-mobile"></i
                          >{{ $t("pendingSuppliers.mobileNumber") }} :
                        </h5>
                        <span style="font-size: large">{{
                          supplier.mobile_number
                        }}</span>
                      </v-list-item-title>
                      <v-divider></v-divider>

                      <v-list-item-title>
                        <h5>
                          <i class="fa fa-email"></i
                          >{{ $t("pendingSuppliers.email") }} :
                        </h5>
                        <span style="font-size: large">{{
                          supplier.email
                        }}</span>
                      </v-list-item-title>
                      <v-divider></v-divider>

                      <v-list-item-title>
                        <h5>{{ $t("pendingSuppliers.governorate") }} :</h5>
                        <span style="font-size: large">{{
                          supplier.governorate
                        }}</span>
                      </v-list-item-title>
                      <v-divider></v-divider>

                      <v-list-item-title>
                        <h5>{{ $t("pendingSuppliers.region") }} :</h5>
                        <span style="font-size: large">{{
                          supplier.region
                        }}</span>
                      </v-list-item-title>
                      <v-divider></v-divider>

                      <v-list-item-title>
                        <h5>{{ $t("pendingSuppliers.storeName") }} :</h5>
                        <span style="font-size: large">{{
                          supplier.store_name
                        }}</span>
                      </v-list-item-title>
                      <v-divider></v-divider>
                      <v-list-item-action-text>
                        <v-btn
                          @click="acceptSupplierRequest(supplier.user_id)"
                          :color="siteColor.button_color"
                          class="green"
                        >
                          <span
                            v-html="$t('pendingSuppliers.acceptRequest')"
                            :style="`color:${siteColor.button_text_color}`"
                          >
                          </span>
                        </v-btn>
                        <v-btn class="ml-2 red white--text">{{
                          $t("pendingSuppliers.decline")
                        }}</v-btn>
                      </v-list-item-action-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
  }),
  created() {
    this.$store.dispatch("getPendingSuppliers");
    if (this.pendingSuppliers) {
      console.log(this.pendingSuppliers);
    }
  },
  computed: {
    pendingSuppliers() {
      return this.$store.state.SupplierPage.pendingSuppliers;
    },
    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
        };
      }
    },
  },
  methods: {
    acceptSupplierRequest(id) {
      console.log(id);
      this.$store.dispatch("acceptSupplierRequest", { user_id: id });
    },
  },
};
</script>