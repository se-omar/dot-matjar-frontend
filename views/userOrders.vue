<template>
  <v-app>
    <v-row justify="center">
      <v-container class="white" style="width: 80%">
        <v-card-title>{{ $t("orderedProducts.orderDetails") }}</v-card-title>
        <v-divider class="black"></v-divider>

        <v-row v-for="(order, index) in orders" :key="index" justify="start">
          <v-col lg="12" sm="12" md="12" cols="12">
            <v-card class="mx-10">
              <v-row justify="start">
                <v-col class="ml-6" cols="6" lg="2" md="4" sm="6">
                  <v-img
                    :src="nodeHost + order.product.main_picture"
                    width="100"
                    height="100"
                  ></v-img>
                </v-col>
                <v-col cols="12" lg="6" md="4" sm="12">
                  <span class="black--text" style="font-size: 20px">{{
                    order.product.product_name
                  }}</span>
                  <br />
                  <span style="font-size: 15px"
                    >{{ $t("orderedProducts.orderNumber") }}:
                    {{ order.order.order_number }}</span
                  ><br />
                  <div
                    v-if="order.status == 'Pending'"
                    class="blue darken-4 white--text"
                    style="width: 100px"
                  >
                    <span style="font-size: 15px">Order is Placed</span>
                  </div>
                  <div
                    v-if="order.status == 'Shipped'"
                    class="blue darken-4 white--text"
                    style="width: 60px"
                  >
                    {{ order.status }}
                  </div>
                  <div
                    v-if="order.status == 'Delivered'"
                    class="green white--text"
                    style="width: 70px"
                  >
                    {{ order.status }}
                  </div>
                  <div
                    v-if="order.status == 'Rejected'"
                    class="red white--text"
                    style="width: 60px"
                  >
                    {{ order.status }}
                  </div>
                  <br />
                  <span>
                    {{ $t("orderedProducts.orderDate") }}:
                    {{ order.purchase_date }}
                  </span>
                </v-col>
                <v-col>
                  <v-btn class="orange--text" @click="orderDetails(order)" text
                    ><span>{{ $t("product.details") }}</span></v-btn
                  ><br />
                  <v-btn
                    v-if="order.status == 'Pending'"
                    class="orange--text"
                    @click="cancelOrder(order)"
                    text
                    ><span>{{ $t("addUser.cancel") }}</span></v-btn
                  ><br />

                  <v-btn
                    @click="generateBillPDF(order)"
                    :color="siteColor.button_color"
                  >
                    <span :style="`color:${siteColor.button_text_color}`">{{
                      $t("userOrders.showBillInfo")
                    }}</span></v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="orderDetailsDialog" width="70%">
        <v-card style="overflow: hidden">
          <v-row justify="start">
            <v-col>
              <v-btn icon @click="orderDetailsDialog = false"
                ><i class="fa fa-times" style="color: black"></i
              ></v-btn>

              <span class="black--text" style="font-size: 20px">
                {{ $t("orderedProducts.orderDetails") }}</span
              >
            </v-col>
          </v-row>
          <v-divider class="black mx-16"></v-divider>
          <v-row justify="start" class="ml-6">
            <v-col cols="12" lg="8" md="8" sm="12">
              <span class="black--text text-body"
                ><span class="orange--text"
                  >{{ $t("orderedProducts.orderNumber") }}:</span
                >{{ orderInfo.order ? orderInfo.order.order_number : "" }}</span
              ><br />
              <span> {{ orderProductsNumber }} Items </span><br />
              <span
                ><span class="orange--text"
                  >{{ $t("orderedProducts.orderDate") }}:</span
                >{{ orderInfo ? orderInfo.purchase_date : "" }}</span
              ><br />
              <span
                ><span class="orange--text">{{
                  $t("productDetails.totalPrice")
                }}</span
                >{{ orderInfo.order ? orderInfo.order.total_price : "" }}</span
              >
            </v-col>
          </v-row>
          <v-divider class="black"></v-divider>
          <v-row class="ml-6">
            <v-card-title>
              {{ $t("userOrders.itemsInYourOrder") }}<br />
            </v-card-title>
          </v-row>

          <v-row
            v-for="(order, index) in productsInPressedOrder"
            :key="index"
            justify="start"
          >
            <v-col lg="12" sm="12" md="12" cols="12">
              <v-card class="mx-10">
                <v-row justify="start">
                  <v-col class="ml-6" cols="6" lg="2" md="4" sm="6">
                    <v-img
                      :src="nodeHost + order.product.main_picture"
                      width="100"
                      height="100"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" lg="6" md="4" sm="12">
                    <span class="black--text" style="font-size: 20px">{{
                      order.product.product_name
                    }}</span>
                    <br />
                    <span style="font-size: 15px"
                      >{{ $t("orderedProducts.orderNumber") }}:
                      {{ order.order.order_number }}</span
                    ><br />
                    <div
                      v-if="order.status == 'Pending'"
                      class="blue darken-4 white--text"
                      style="width: 100px"
                    >
                      <span style="font-size: 15px">Order is Placed</span>
                    </div>
                    <div
                      v-if="order.status == 'Shipped'"
                      class="blue darken-4 white--text"
                      style="width: 60px"
                    >
                      {{ order.status }}
                    </div>
                    <div
                      v-if="order.status == 'Delivered'"
                      class="green white--text"
                      style="width: 70px"
                    >
                      {{ order.status }}
                    </div>
                    <div
                      v-if="order.status == 'Rejected'"
                      class="red white--text"
                      style="width: 60px"
                    >
                      {{ order.status }}
                    </div>

                    <span>
                      {{ $t("addProduct.quantity") }}:
                      {{ order.quantity }} </span
                    ><br />
                    <span>
                      {{ $t("orderedProducts.orderDate") }}:
                      {{ order.purchase_date }}
                    </span>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-col cols="12" lg="6" md="4" sm="12">
            <span class="black--text" style="font-size: 20px">{{
              orderInfo.product ? orderInfo.product.product_name : ""
            }}</span>
            <br />
            <span style="font-size: 15px"
              >{{ $t("orderedProducts.orderNumber") }}:
              {{ orderInfo.order ? orderInfo.order.order_number : "" }}</span
            ><br />
            <div
              v-if="orderInfo.status == 'Pending'"
              class="blue darken-4 white--text"
              style="width: 100px"
            >
              <span style="font-size: 15px">Order is Placed</span>
            </div>
            <div
              v-if="orderInfo.status == 'Shipped'"
              class="blue darken-4 white--text"
              style="width: 60px"
            >
              {{ orderInfo ? orderInfo.status : "" }}
            </div>
            <div
              v-if="orderInfo.status == 'Delivered'"
              class="green white--text"
              style="width: 70px"
            >
              {{ orderInfo ? orderInfo.status : "" }}
            </div>
            <div
              v-if="orderInfo.status == 'Rejected'"
              class="red white--text"
              style="width: 60px"
            >
              {{ orderInfo ? orderInfo.status : "" }}
            </div>
            <br />
            <span>
              {{ $t("orderedProducts.orderDate") }}:
              {{ orderInfo ? orderInfo.purchase_date : "" }}
            </span>
          </v-col> -->
        </v-card>
      </v-dialog>
      <v-dialog v-model="cancelOrderConfirmationDialog" width="300">
        <v-card style="overflow: hidden">
          <v-card-title>{{ $t("completedata.dialogQuestion") }}</v-card-title>
          <v-card-text
            >{{ this.$t("userOrders.orderNumber")
            }}{{
              productWillBeCanceled.order
                ? productWillBeCanceled.order.order_number
                : ""
            }}<br />
            {{
              productWillBeCanceled.product
                ? productWillBeCanceled.product.product_name
                : ""
            }}
            {{ $t("userOrders.dialogDescription") }}</v-card-text
          >
          <v-row justify="end">
            <v-btn text @click="removingProductFromOrder"
              ><span class="orange--text">{{
                $t("productDetails.submit")
              }}</span></v-btn
            >

            <v-btn text @click="cancelOrderConfirmationDialog = false"
              ><span class="red--text">{{ $t("addUser.cancel") }}</span></v-btn
            >
          </v-row>
        </v-card>
      </v-dialog>
      <!-- <v-col sm="5" lg="6" cols="5 mt-4">
        <v-card>
          <v-data-table
            @click:row="tableClicked"
            bordered
            hover
            hide-default-footer
            :headers="headers"
            :items="items"
          >
            <template #[`item.showProducts`]="{ item }">
              <v-row>
                <v-col cols="2" lg="4">
                  <v-btn
                    :color="siteColor.button_color"
                    small
                    @click="showProducts(item.order_id)"
                    ><span
                      class="smallerText"
                      :style="`color:${siteColor.button_text_color}`"
                      v-html="$t('userOrders.showProducts')"
                    ></span
                  ></v-btn>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col sm="5" lg="6" cols="5 mt-4">
        <v-card>
          <v-data-table
            bordered
            hover
            hide-default-footer
            :headers="productHeaders"
            :items="productsInOrder"
          >
            <template [`item.status`]="{ item }">
              <h4>
                {{ item.pending_status }}
                <i
                  v-if="item.pending_status == 'Delivered'"
                  class="fa fa-check"
                ></i>
                <i
                  v-if="item.pending_status == 'Pending'"
                  class="fas fa-spinner fa-pulse"
                ></i>
                <i
                  v-if="item.pending_status == 'Rejected'"
                  class="fa fa-ban"
                ></i>
              </h4>
            </template>

            <template #[`item.product_color`]="{ item }">
              <v-swatches disabled v-model="item.product_color"></v-swatches>
            </template>
          </v-data-table>
        </v-card>
      </v-col> -->

      <!-- <v-col cols="2" lg="2" sm="2">
        <v-card height="95%">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col> -->
    </v-row>
  </v-app>
</template>
<script>
export default {
  name: "userOrders",
  components: {
    // VSwatches: () => import("vue-swatches"),
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getOrders");
  },
  computed: {
    row() {
      return this.$store.state.row;
    },
    products() {
      return this.$store.state.products;
    },
    filteredProducts() {
      return this.$store.state.Home.filteredProducts;
    },
    orders() {
      return this.$store.state.Orders.orders;
    },
    productsInOrder() {
      return this.$store.state.Orders.orderProducts;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    items() {
      return this.$store.state.Orders.orders;
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
          footer_color: "white",
          footer_text_color: "black",
        };
      }
    },

    headers() {
      return [
        { text: this.$t("userOrders.orderId"), value: "order_id" },
        { text: this.$t("userOrders.orderNumber"), value: "order_number" },
        { text: this.$t("userOrders.orderDate"), value: "order_date" },
        { text: this.$t("userOrders.shippingDate"), value: "shipping_date" },
        { text: this.$t("userOrders.orderPrice"), value: "total_price" },
        { text: this.$t("orderedProducts.status"), value: "status" },
        { text: this.$t("userOrders.showProducts"), value: "showProducts" },
      ];
    },

    productHeaders() {
      return [
        { text: this.$t("userOrders.productName"), value: "product_name" },
        { text: this.$t("userOrders.price"), value: "unit_price" },
        { text: this.$t("userOrders.productCode"), value: "product_code" },
        { text: this.$t("userOrders.quantity"), value: "quantity" },
        { text: this.$t("userOrders.color"), value: "product_color" },
      ];
    },
  },

  methods: {
    async removingProductFromOrder() {
      await this.$store.dispatch(
        "removingProductfromOrder",
        this.productWillBeCanceled.products_orders_id
      );
      this.cancelOrderConfirmationDialog = false;
      await this.$store.dispatch("getOrders");
    },
    cancelOrder(order) {
      this.productWillBeCanceled = order;
      this.cancelOrderConfirmationDialog = true;
    },
    orderDetails(order) {
      console.log(order);

      this.productsInPressedOrder = [];
      this.orderProductsNumber = 0;
      this.orderInfo = order;
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].order_id == order.order_id) {
          this.orderProductsNumber++;
          this.productsInPressedOrder.push(this.orders[i]);
        }
      }
      this.orderDetailsDialog = true;
    },
    async generateBillPDF(order) {
      await this.$store.dispatch("getOrder", {
        order_id: order.order.order_id,
      });
      this.$router.push(`/${this.$i18n.locale}/orderConfirmation`);
    },
    filterProducts() {
      var obj = {};
      obj.product_name = this.toolbarSearch;
      obj.category_name = this.categoryName;

      this.$store.dispatch("filterProducts", obj);
    },

    rowClicked(order) {
      var orders = this.$store.state.orders;

      for (var i = 0; i < orders.length; i++) {
        if (order.order_id == orders[i].order_id) {
          this.order = [
            {
              order_id: orders[i].order_id,
              order_date: orders[i].order_date,
              order_number: orders[i].order_number,
              shipping_date: orders[i].shipping_date,
              order_price: orders[i].total_price,
              order_status: orders[i].status,
            },
          ];
        }
      }

      this.orderProducts = this.productsInOrder;
    },
    async showProducts(order) {
      await this.$store.dispatch("getOrder", { order_id: order });
      console.log(order);
      this.orderID = order;
      await this.$store.dispatch("getOrderProducts", order);
      console.log("products in orderr", this.productsInOrder);
    },
    // eslint-disable-next-line no-unused-vars
    tableClicked(event) {
      // this.$store.dispatch("getOrderProducts", event.order_id);
      // this.orderProducts = this.productsInOrder;
    },
  },
  data: () => ({
    orderID: "",
    orderInfo: {},
    item: 1,
    billDialog: false,
    orderProducts: [],
    orderDetailsDialog: false,
    orderProductsNumber: 0,
    productsInPressedOrder: [],
    cancelOrderConfirmationDialog: false,
    productWillBeCanceled: {},
  }),
};
</script>
<style scoped>
h5 {
  font-size: 25px;
}
</style>