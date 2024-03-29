<template>
  <v-app class="grey lighten-4">
    <div class="vld-parent">
      <loading
        :active.sync="isloading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
    </div>
    <v-row justify="center">
      <!-- <product :filteredProduct="filteredProduct"></product> -->

      <v-col cols="12" lg="10">
        <v-card>
          <v-row>
            <v-col cols="12" lg="6">
              <v-toolbar shaped dark dense :color="siteColor.toolbar_color">
                <v-row justify="center">
                  <p
                    :style="`color:${siteColor.toolbar_text_color}`"
                    class="mt-4"
                  >
                    {{ $t("orderedProducts.users") }}
                  </p>
                </v-row>
              </v-toolbar>
              <v-data-table
                @click:row="showProducts"
                :headers="usersTableHeaders"
                :items="usersMadeOrders"
                :footer-props="{
                  showFirstLastPage: true,
                  firstIcon: 'mdi-arrow-collapse-left',
                  lastIcon: 'mdi-arrow-collapse-right',
                  prevIcon: 'mdi-minus',
                  nextIcon: 'mdi-plus',
                }"
              >
                <template #[`item.showProducts`]>
                  <v-btn :color="siteColor.button_color" small
                    ><span :style="`color:${siteColor.button_text_color}`">{{
                      $t("orderedProducts.showProducts")
                    }}</span></v-btn
                  >
                </template>
              </v-data-table>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12" lg="6">
              <v-toolbar shaped dark dense :color="siteColor.toolbar_color">
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <p
                    class="mt-4"
                    :style="`color:${siteColor.toolbar_text_color}`"
                  >
                    {{ $t("orderedProducts.products") }}
                  </p>
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-data-table
                :headers="productsTableHeaders"
                :items="showOrderProducts"
                hide-default-footer
                @click:row="productClicked"
              >
                <template #[`item.status`]="{ item }">
                  <h4>
                    {{ item.status }}
                    <i
                      v-if="item.status == 'Delivered'"
                      class="fa fa-check"
                    ></i>
                    <i
                      v-if="item.status == 'Pending'"
                      class="fas fa-spinner fa-pulse"
                    ></i>
                    <i
                      v-if="item.status == 'Rejected'"
                      class="fa fa-trash fa-sm"
                    ></i>
                    <i v-if="item.status == 'Shipped'" class="fa fa-truck"> </i>
                    <v-btn icon @click="productStatus(item)">
                      <i class="fa fa-edit fa-sm ml-4"></i>
                    </v-btn>
                  </h4>

                  <v-dialog
                    style="overflow: hidden"
                    v-model="statusDialog"
                    max-width="500px"
                  >
                    <v-card style="overflow: hidden" tile>
                      <v-row justify="center">
                        <v-col cols="8">
                          <v-card-title>{{
                            clickedProductInfo && clickedProductInfo.product
                              ? clickedProductInfo.product.product_name
                              : ""
                          }}</v-card-title>

                          <v-card-text>
                            <v-list three-line subheader>
                              <v-subheader class="font-weight-black">{{
                                $t("orderedProducts.productStatus")
                              }}</v-subheader>

                              <v-select
                                v-model="productStatusUpdate"
                                outlined
                                :items="statusItems"
                              >
                              </v-select>

                              <v-btn
                                @click="updateStatus"
                                rounded
                                :color="siteColor.button_color"
                                class="white--text"
                                ><span
                                  :style="`color:${siteColor.button_text_color}`"
                                  >{{ $t("orderedProducts.update") }}</span
                                ></v-btn
                              >
                              <v-snackbar v-model="snackbar" :timeout="timeout">
                                <template>
                                  {{ $t("orderedProducts.statusUpdated") }}
                                </template>
                              </v-snackbar>
                              <v-btn
                                @click="statusDialog = false"
                                rounded
                                class="ml-2 red white--text"
                                >{{ $t("orderedProducts.close") }}</v-btn
                              >
                            </v-list>
                          </v-card-text>
                        </v-col>
                      </v-row>
                      <div style="flex: 1 1 auto"></div>
                    </v-card>
                  </v-dialog>

                  <!-- ================================== -->
                </template>

                <template #[`item.color`]="{ item }">
                  <v-swatches
                    disabled
                    v-model="item.product_color"
                  ></v-swatches>
                </template>

                <template #[`item.quantity`]="{ item }">
                  {{ item.quantity }}
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- ============================ -->
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :color="siteColor.button_color"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="dialog = true"
                  ><span :style="`color:${siteColor.button_text_color}`">{{
                    $t("orderedProducts.showAddress")
                  }}</span></v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{
                    $t("orderedProducts.addressDetails")
                  }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :placeholder="$t('orderedProducts.country')"
                          disabled
                          v-model="country"
                          class="arabic"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          disabled
                          :placeholder="$t('orderedProducts.city')"
                          v-model="city"
                          class="arabic"
                          hint="example of helper text only on focus"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          disabled
                          :placeholder="$t('orderedProducts.state')"
                          hint="example of persistent helper text"
                          v-model="state"
                          class="arabic"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <v-text-field
                          disabled
                          v-model="address1"
                          :placeholder="$t('orderedProducts.address1')"
                          textarea
                          class="mx-4 arabic"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          disabled
                          v-model="address2"
                          :placeholder="$t('orderedProducts.address2')"
                          textarea
                          class="mx-4 arabic"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red white--text" text @click="dialog = false">{{
                    $t("orderedProducts.close")
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row class="mt-4" justify="center">
            <v-btn
              @click="PushTOBillPage"
              small
              rounded
              :color="siteColor.button_color"
              :disabled="!orderID"
            >
              <span :style="`color:${siteColor.button_text_color}`">
                {{ $t("userOrders.showBillInfo") }}</span
              >
            </v-btn>
          </v-row>
          <!-- ========================= -->
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  components: { VSwatches: () => import("vue-swatches") },
  data: () => ({
    dialog: false,
    orderID: "",
    state: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    statusDialog: false,
    clickedProductInfo: "",
    productStatusUpdate: "",
    userMadeOrder: "",
    snackbar: false,
    timeout: 2000,
    isloading: false,
    fullPage: "",
    productClickedd: {},
  }),
  methods: {
    async showProducts(event) {
      this.userMadeOrder = event;
      console.log("event", event);
      console.log("orders made", this.ordersMade);
      await this.$store.commit("showOrderProducts", event.order_number);
      // await this.$store.commit('showAddressDetails',event.order_number)
      this.orderID = event.order_id;
      this.country = this.pressedOrder.country;
      this.state = this.pressedOrder.state;
      this.address1 = this.pressedOrder.address_line_1;
      this.address2 = this.pressedOrder.address_line_2;
      this.city = this.pressedOrder.city;
    },
    productClicked(event) {
      this.clickedProductInfo = event;
      this.productStatusUpdate = event.status;
    },
    productStatus(item) {
      console.log(item);
      this.productClickedd = item;
      this.statusDialog = true;
    },
    async updateStatus() {
      this.isloading = true;
      this.snackbar = true;
      console.log("product status ", this.productStatusUpdate);
      await this.$store.dispatch("updateProductStatus", {
        status: this.productStatusUpdate,
        orderId: this.clickedProductInfo.order_id,
        productId: this.clickedProductInfo.product_id,
        productColor: this.clickedProductInfo.product_color,
      });
      await this.$store.commit(
        "showOrderProducts",
        this.pressedOrder.order_number
      );

      setTimeout(async () => {
        await this.$store.dispatch("ordersMade", this.currentUser.user_id);

        this.statusDialog = false;
        this.isloading = false;
      }, 3000);
    },
    async PushTOBillPage() {
      if (this.orderID) {
        await this.$store.dispatch("getOrder", { order_id: this.orderID });
        this.$router.push(`/${this.$i18n.locale}/orderConfirmation`);
      }
    },
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }

    this.$store.dispatch("ordersMade", this.currentUser.user_id);
  },
  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    ordersMade() {
      return this.$store.state.Orders.ordersMade;
    },
    usersMadeOrders() {
      return this.$store.state.Orders.usersMadeOrders;
    },
    showOrderProducts() {
      return this.$store.state.Orders.showOrderProducts;
    },
    userOrderAddress() {
      return this.$store.state.Orders.userOrderAddress;
    },
    pressedOrder() {
      return this.$store.state.Orders.pressedOrder;
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
    usersTableHeaders() {
      return [
        {
          text: this.$t("orderedProducts.username"),
          value: "full_arabic_name",
        },
        { text: this.$t("orderedProducts.userMobile"), value: "mobile_number" },
        { text: this.$t("orderedProducts.orderNumber"), value: "order_number" },
        { text: this.$t("orderedProducts.orderDate"), value: "order_date" },

        {
          text: this.$t("orderedProducts.showProducts"),
          value: "showProducts",
        },
      ];
    },
    productsTableHeaders() {
      return [
        {
          text: this.$t("orderedProducts.productName"),
          value: "product.product_name",
        },
        {
          text: this.$t("orderedProducts.productCode"),
          value: "product.product_code",
        },
        { text: this.$t("orderedProducts.quantity"), value: "quantity" },
        { text: this.$t("orderedProducts.status"), value: "status" },
        {
          text: this.$t("orderedProducts.color"),
          value: "color",
        },
      ];
    },
    statusItems() {
      var a = [
        { text: "Pending", value: "Pending" },
        { text: "Shipped", value: "Shipped" },
        { text: "Delivered", value: "Delivered" },
        { text: "Rejected", value: "Rejected" },
      ];
      return a;
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 17px;
}
h3 {
  font-size: 17px;
}
</style>