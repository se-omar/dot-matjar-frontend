<template>
  <v-app>
    <v-row>
      <v-col>
        <v-card height="120">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="start">
      <v-col cols="1" lg="1" sm="1">
        <v-card height="95%">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col sm="5" lg="5" cols="5 mt-4">
        <v-card>
          <v-data-table
            @click:row="tableClicked"
            bordered
            hover
            hide-default-footer
            :headers="headers"
            :items="items"
          >
            <template v-slot:item.showProducts="{ item }">
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
      <v-col sm="5" lg="5" cols="5 mt-4">
        <v-card>
          <v-data-table
            bordered
            hover
            hide-default-footer
            :headers="productHeaders"
            :items="productsInOrder"
          >
            <template v-slot:item.status="{ item }">
              <h5>
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
              </h5>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="1" lg="1" sm="1">
        <v-card height="95%">
          <v-card-title>
            <span>ad here</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
export default {
  name: "userOrders",
  components: {},
  async created() {
    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch("refreshCurrentUser");
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
  },

  methods: {
    filterProducts() {
      this.$store.dispatch("filterProducts", {
        product_name: this.toolbarSearch,
        category_name: this.categoryName,
      });
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
            },
          ];
        }
        console.log("this , orderrr", this.order);
      }

      this.orderProducts = this.productsInOrder;
      console.log(this.productsInOrder);
    },
    async showProducts(order) {
      console.log("id iss", order);
      await this.$store.dispatch("getOrderProducts", order);
    },
    tableClicked(event) {
      console.log("event is", event);
      // this.$store.dispatch("getOrderProducts", event.order_id);
      // this.orderProducts = this.productsInOrder;
    },
  },
  data: () => ({
    headers: [
      { text: "order ID", value: "order_id" },
      { text: "Order number", value: "order_number" },
      { text: "Order DATE", value: "order_date" },
      { text: "shipping DATE", value: "shipping_date" },
      { text: "Order price", value: "total_price" },
      { text: "Show products", value: "showProducts" },
    ],
    order: [],
    item: 1,

    productHeaders: [
      { text: "Product name", value: "product_name" },
      { text: "Price", value: "unit_price" },
      { text: "Product code", value: "product_code" },
      { text: "Status", value: "status" },
      { text: "Quantity", value: "quantity" },
    ],
    orderProducts: [],
  }),
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Markazi+Text:wght@700&display=swap");
.arabic {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
span {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
p {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
.smallerText {
  font-size: 18px;
}
h5 {
  font-family: "Markazi Text", serif;
  font-size: 25px;
}
</style>