<template>
  <v-app>
    <v-row justify="center">
      <v-container class="white" style="width: 60%">
        <v-card-title>ORDER DETAILS</v-card-title>
        <v-divider class="black"></v-divider>

        <v-row v-for="(order, index) in orders" :key="index" justify="start">
          <v-col lg="12" sm="12" md="12" cols="12">
            <v-card
              v-for="(product, index1) in order.products_orders"
              :key="index1"
              class="mx-10"
            >
              <v-img
                :src="nodeHost + product.main_picture"
                width="50"
                height="50"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

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
    <v-row justify="center">
      <v-btn @click="generateBillPDF" :color="siteColor.button_color">
        <span :style="`color:${siteColor.button_text_color}`">{{
          $t("userOrders.showBillInfo")
        }}</span></v-btn
      >
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
    console.log(this.orders);
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
    async generateBillPDF() {
      await this.$store.dispatch("getOrder", { order_id: this.orderID });
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
    order: [],
    item: 1,
    billDialog: false,
    orderProducts: [],
  }),
};
</script>
<style scoped>
h5 {
  font-size: 25px;
}
</style>