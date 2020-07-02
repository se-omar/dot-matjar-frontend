<template>
  <div id="product">
    <v-app>
      <v-card :elevation="7" max-width="280">
        <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

        <v-card-title>{{filteredProduct.product_name}}</v-card-title>

        <v-card-text>
          <div>product code: {{filteredProduct.product_code}}</div>
          <div>HS Code: {{filteredProduct.HS_code}}</div>
          <div>
            Unit Price:
            <span style="color: red;">{{filteredProduct.unit_price}}</span>
            <br />
            Min. Order: {{filteredProduct.min_units_per_order}}
          </div>
          <!-- <div>Business Name: {{filteredProducts.bussiness.bussiness_name}}</div> -->
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn color="primary" text>View Details</v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "product",
  created() {
    this.$store.dispatch("getProducts");
    console.log("Product is :", this.filteredProducts);
  },

  props: {
    product: {
      type: Object,
      default: () => null
    },
    filteredProduct: {
      type: Object,
      default: () => null
    }
  },

  methods: {},
  computed: {
    products() {
      return this.$store.state.products;
    },

    filteredProducts() {
      return this.$store.state.products;
    }
  }
};
</script>