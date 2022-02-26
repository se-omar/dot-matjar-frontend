<template>
  <v-app>
    <v-container>
      <v-card>
        <v-toolbar :color="siteColor.toolbar_color" shaped>
          <v-row justify="center">
            <p :style="`color:${siteColor.toolbar_text_color};font-size: 35px`">
              {{ $t("pendingSuppliers.pendingSupplier") }}
            </p>
          </v-row>
        </v-toolbar>
        <v-row>
          <v-col
            v-for="(supplier, user_id) in pendingSuppliers"
            :key="user_id"
            cols="4"
          >
            <v-card class="grey darken-4">
              <v-row justify="center">
                <v-img
                  max-width="70%"
                  max-height="90%"
                  id="image"
                  :src="supplier.profile_photo ? supplier.profile_photo : ''"
                  style="margin-left: auto; margin-right: auto"
                ></v-img>
              </v-row>
              <v-row justify="end">
                <v-col>
                  <v-list dense nav class="py-0 grey darken-4">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title>
                          <p>
                            <i
                              class="fa fa-user fa-md mr-2"
                              style="color: white"
                            ></i>
                            <span style="color: white">
                              {{ supplier.full_arabic_name }}</span
                            >
                          </p>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider class="white"></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <p style="color: white">
                            <i
                              class="fa fa-mobile mr-2"
                              style="color: white"
                            ></i
                            >{{ $t("pendingSuppliers.mobileNumber") }} :
                          </p>
                          <span style="color: white">{{
                            supplier.mobile_number
                          }}</span>
                        </v-list-item-title>
                        <v-divider class="white"></v-divider>

                        <v-list-item-title>
                          <p style="color: white">
                            <i class="fa fa-email" style="color: white"></i
                            >{{ $t("pendingSuppliers.email") }} :
                          </p>
                          <span style="color: white">{{ supplier.email }}</span>
                        </v-list-item-title>
                        <v-divider class="white"></v-divider>

                        <v-list-item-title>
                          <p style="color: white">
                            {{ $t("pendingSuppliers.governorate") }} :
                          </p>
                          <span style="color: white">{{
                            supplier.governorate
                          }}</span>
                        </v-list-item-title>
                        <v-divider class="white"></v-divider>

                        <v-list-item-title>
                          <p style="color: white">
                            {{ $t("pendingSuppliers.region") }} :
                          </p>
                          <span style="color: white">{{
                            supplier.region
                          }}</span>
                        </v-list-item-title>
                        <v-divider class="white"></v-divider>

                        <v-list-item-title>
                          <p style="color: white">
                            {{ $t("pendingSuppliers.storeName") }} :
                          </p>
                          <span style="color: white">{{
                            supplier.store_name
                          }}</span>
                        </v-list-item-title>

                        <v-divider class="white"></v-divider>
                        <v-list-item-action class="ml-3">
                          <v-row justify="center">
                            <v-col cols="12" lg="6" sm="12" md="6">
                              <v-btn
                                @click="acceptClicked(supplier)"
                                class="green ml-2"
                              >
                                <span
                                  v-html="$t('pendingSuppliers.acceptRequest')"
                                  style="color: white"
                                  class="smallerText"
                                >
                                </span>
                              </v-btn>
                            </v-col>
                            <v-col cols="12" lg="6" sm="12" md="6">
                              <v-btn
                                @click="declineClicked(supplier)"
                                class="ml-2 red white--text"
                                ><span>{{
                                  $t("pendingSuppliers.decline")
                                }}</span></v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-list-item-action>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogAccept" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">
                <span>
                  {{ $t("updateSupplierPage.dialogApprovalQuestion") }}</span
                >
              </v-card-title>
              <v-card-text>
                <span>
                  {{ $t("pendingSuppliers.dialogAcceptDescription") }}</span
                ></v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogAccept = false">
                  <span>
                    {{ $t("updateSupplierPage.dialogDisApprovalButton") }}</span
                  >
                </v-btn>
                <v-btn
                  @click="acceptSupplierRequest(supplier.user_id)"
                  text
                  :color="siteColor.button_color"
                >
                  <span>
                    {{ $t("updateSupplierPage.dialogApprovalButton") }}
                  </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDecline" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">
                <span>
                  {{ $t("updateSupplierPage.dialogApprovalQuestion") }}
                </span>
              </v-card-title>
              <v-card-text>
                <span>
                  {{ $t("pendingSuppliers.dialogDeclineDescription") }}</span
                ></v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogDecline = false">
                  <span>
                    {{ $t("updateSupplierPage.dialogDisApprovalButton") }}</span
                  >
                </v-btn>
                <v-btn
                  @click="rejectSupplierRequest(supplier.user_id)"
                  text
                  :color="siteColor.button_color"
                >
                  <span>
                    {{ $t("updateSupplierPage.dialogApprovalButton") }}</span
                  >
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    dialogAccept: false,
    dialogDecline: false,
    supplier: [],
  }),
  async created() {
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }

    await this.$store.dispatch("getSiteColor");
    this.$store.dispatch("getPendingSuppliers");
    setTimeout(() => {
      localStorage.removeItem("reloaded");
    }, 50);
  },
  computed: {
    pendingSuppliers() {
      return this.$store.state.SupplierPage.pendingSuppliers;
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
  },
  methods: {
    acceptSupplierRequest(id) {
      this.$store.dispatch("acceptSupplierRequest", { user_id: id });
      this.dialogAccept = false;
      location.reload();
    },
    pendingSupplierss() {},
    acceptClicked(supplier) {
      this.dialogAccept = true;
      this.supplier = supplier;
    },
    declineClicked(supplier) {
      this.dialogDecline = true;
      this.supplier = supplier;
    },
    rejectSupplierRequest() {
      this.$store.dispatch("rejectSupplierRequest", {
        user_id: this.supplier.user_id,
      });
      this.dialogDecline = false;
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 25px;
}
h3 {
  font-size: 25px;
}
#image {
  border-radius: 50%;
}
</style>