<template>
  <v-app class="grey lighten-4">
    <v-row justify="center">
      <v-col cols="12" lg="4" class="mt-8">
        <h1>{{ $t("orderedProducts.productsPlaced") }}</h1>
      </v-col>
      <!-- <product :filteredProduct="filteredProduct"></product> -->

      <v-col cols="12" lg="10">
        <v-card>
          <v-row>
            <v-col cols="12" lg="6">
              <v-toolbar shaped dark dense :color="siteColor.toolbar_color">
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <p class="text-h4 mt-4">
                    <span :style="`color:${siteColor.toolbar_text_color}`">{{
                      $t("orderedProducts.users")
                    }}</span>
                  </p>
                </v-toolbar-title>
                <v-spacer></v-spacer>
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
                <template v-slot:item.showProducts>
                  <v-btn :color="siteColor.button_color" small
                    ><span :style="`color:${siteColor.button_text.color}`">{{
                      $t("orderedProducts.showProducts")
                    }}</span></v-btn
                  >
                </template>
              </v-data-table>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12" lg="6">
              <v-toolbar shaped dark dense :color="siteColor">
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <p class="text-h4 white--text mt-4">
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
                <template v-slot:item.status="{ item }">
                  <h5>
                    {{ item.products_orders.status }}
                    <i
                      v-if="item.products_orders.status == 'Delivered'"
                      class="fa fa-check"
                    ></i>
                    <i
                      v-if="item.products_orders.status == 'Pending'"
                      class="fas fa-spinner fa-pulse"
                    ></i>
                    <i
                      v-if="item.products_orders.status == 'Rejected'"
                      class="fa fa-trash fa-lg"
                    ></i>
                    <v-btn icon @click="productStatus">
                      <i class="fa fa-edit fa-2x ml-4"></i>
                    </v-btn>
                  </h5>

                  <v-dialog v-model="statusDialog" max-width="500px">
                    <v-card tile>
                      <v-toolbar flat dark :color="siteColor" max-height="80">
                        <v-row class="mr-6" justify="end">
                          <v-toolbar-title>{{
                            clickedProductInfo.product_name
                          }}</v-toolbar-title>
                        </v-row>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-row justify="center">
                        <v-col cols="8">
                          <v-card-text>
                            <v-list three-line subheader>
                              <v-subheader class="font-weight-black">{{
                                $t("orderedProducts.productStatus")
                              }}</v-subheader>

                              <v-select
                                v-model="productStatusUpdate"
                                outlined
                                :items="statusItems"
                              ></v-select>

                              <v-btn
                                @click="updateStatus"
                                rounded
                                :color="siteColor.button_color"
                                class="white--text"
                                ><span
                                  :style="`color:${siteColor.button_text.color}`"
                                  >{{ $t("orderedProducts.update") }}</span
                                ></v-btn
                              >
                              <v-snackbar v-model="snackbar" :timeout="timeout">
                                <template v-slot:action="{ attrs }">
                                  {{ $t("orderedProducts.statusUpdated") }}
                                  <v-btn
                                    class="red white--text"
                                    text
                                    v-bind="attrs"
                                    @click="snackbar = false"
                                    >{{ $t("orderedProducts.close") }}</v-btn
                                  >
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
                  ><span :style="`color:${siteColor.button_text.color}`">{{
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
                          :label="$t('orderedProducts.country')"
                          disabled
                          v-model="country"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          disabled
                          :label="$t('orderedProducts.city')"
                          v-model="city"
                          hint="example of helper text only on focus"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          disabled
                          :label="$t('orderedProducts.state')"
                          hint="example of persistent helper text"
                          v-model="state"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <v-text-field
                          disabled
                          v-model="address1"
                          :label="$t('orderedProducts.address1')"
                          textarea
                          class="mx-4"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          disabled
                          v-model="address2"
                          :label="$t('orderedProducts.address2')"
                          textarea
                          class="mx-4"
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
          <!-- ========================= -->
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  components: {},
  data: () => ({
    dialog: false,
    usersTableHeaders: [
      { text: this.$t("orderedProducts.username"), value: "full_arabic_name" },
      { text: this.$t("orderedProducts.userMobile"), value: "mobile_number" },
      { text: this.$t("orderedProducts.orderNumber"), value: "order_number" },
      { text: this.$t("orderedProducts.orderDate"), value: "order_date" },

      { text: this.$t("orderedProducts.showProducts"), value: "showProducts" },
    ],
    productsTableHeaders: [
      { text: this.$t("orderedProducts.productName"), value: "product_name" },
      { text: this.$t("orderedProducts.productId"), value: "product_id" },
      { text: this.$t("orderedProducts.productCode"), value: "product_code" },
      { text: this.$t("orderedProducts.productQuantity"), value: "quantity" },
      { text: this.$t("orderedProducts.status"), value: "status" },
    ],
    state: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    statusDialog: false,
    clickedProductInfo: "",
    statusItems: ["Pending", "Delivered", "Rejected"],
    productStatusUpdate: "",
    userMadeOrder: "",
    snackbar: false,
    timeout: 2000,
    // updating this page
  }),
  methods: {
    async showProducts(event) {
      console.log("pressed order is ", this.pressedOrder);
      this.userMadeOrder = event;
      console.log("user made order", event);
      await this.$store.commit("showOrderProducts", event.order_number);
      // await this.$store.commit('showAddressDetails',event.order_number)
      console.log("order addrress", this.$store.state.OrderAddressDetails);

      this.country = this.pressedOrder.country;
      this.state = this.pressedOrder.state;
      this.address1 = this.pressedOrder.address_line_1;
      this.address2 = this.pressedOrder.address_line_2;
      this.city = this.pressedOrder.city;
    },
    productClicked(event) {
      console.log(event);
      this.clickedProductInfo = event;
      this.productStatusUpdate = event.products_orders.status;
      console.log(event.pending_status);
    },
    productStatus() {
      this.statusDialog = true;
    },
    updateStatus() {
      console.log(this.productStatusUpdate);
      this.snackbar = true;
      this.$store.dispatch("updateProductStatus", {
        status: this.productStatusUpdate,
        orderId: this.userMadeOrder.order_id,
        productId: this.clickedProductInfo.product_id,
      });
    },
    // uppdating page
  },
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    console.log(this.currentUser.user_id);
    this.$store.dispatch("ordersMade", this.currentUser.user_id);
    console.log("user made orders", this.usersMadeOrders);
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
        return this.$store.state.Home.siteColor[0];
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
        };
      }
    },
  },
};
</script>