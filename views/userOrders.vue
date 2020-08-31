<template>
  <div>
    <toolbar></toolbar>
    <v-flex ml-10>
    <v-row justify="start mx-6">
      <!-- <v-col cols="4">
        <v-card class="mx-auto mt-4" max-width="700" tile>
          <v-list rounded>
            <v-subheader style="font-weight:bold; font-size:large;">Orders</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, order_id) in items"
                :key="order_id"
                @click="rowClicked(item)"
              >
                <v-list-item-icon></v-list-item-icon>
                <v-list-item-content>
                  <span>Order :</span>
                  <v-list-item-title v-text="item.order_number"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>-->
      <v-col cols="6 mt-4">
        <v-card max-width="700">
          <v-data-table
            @click:row="tableClicked"
            bordered
            hover
            hide-default-footer
            :headers="headers"
            :items="items"
          >
            <template v-slot:item.showProducts="{item}">
              <v-row>
                <v-col cols="6" lg="4">
                  <v-btn small @click="showProducts(item.order_id)">ShowProducts</v-btn>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="6 mt-4">
        <v-card max-width="500">
          <v-data-table
            bordered
            hover
            hide-default-footer
            :headers="productHeaders"
            :items="productsInOrder"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- <v-row justify="center mt-4">
      <v-col cols="5">
        <v-card max-width="500">
          <v-data-table bordered hover hide-default-footer :headers="headers" :items="order"></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card max-width="500">
          <v-data-table
            bordered
            hover
            hide-default-footer
            :headers="productHeaders"
            :items="orderProducts"
          ></v-data-table>
        </v-card>
      </v-col>``
    </v-row>-->

    <!-- Card orderr -->
    <!-- <v-row>
      <v-card v-for="order in orders" :key="order.order_id">
        <v-card-title>Order:{{order.order_number}}</v-card-title>
        <v-row>
          <v-col v-for="productt in  orderProducts" :key="productt.product_id">
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-img width="100" height="100" :src="nodeHost + productt.main_picture"></v-img>
                </v-col>
                <v-col>
                  <v-card-text>
                    <p>{{productt.product_name}}</p>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-row>-->
    </v-flex>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/footer'
import toolbar from '../components/toolbar'
export default {
  name: "userOrders",
  components: {
    Footer,
    toolbar
  },
 async created() {
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
      return this.$store.state.filteredProducts;
    },
    orders() {
      return this.$store.state.orders;
    },
    productsInOrder() {
      return this.$store.state.orderProducts;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
   items(){
      return this.$store.state.orders
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
        console.log('this , orderrr',this.order)
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
      { text: "size", value: "product_size" },
      { text: "Quantity", value: "quantity" },
    ],
    orderProducts: [],
  }),
};
</script>