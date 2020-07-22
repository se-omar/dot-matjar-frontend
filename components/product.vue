<template>
  <v-card :elevation="7" max-width="280">
    <v-img height="200" :src="nodeHost + filteredProduct.main_picture"></v-img>

    <v-card-title>{{ filteredProduct.product_name }}</v-card-title>

    <v-card-text>
      <div>كود المنتج: {{ filteredProduct.product_code }}</div>
      <div>
        سعر القطعة:
        <span style="color: red;">{{ filteredProduct.unit_price }}</span>
        <br />
        الحد الادني للطلب: {{ filteredProduct.min_units_per_order }}
      </div>
      <div>المشروع: {{ filteredProduct.bussiness.bussiness_name }}</div>
      <v-row align="center" class="mx-0">
        <v-rating v-model="rating" color="amber" dense half-increments readonly size="15"></v-rating>

        <div class="grey--text ml-4">4</div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn @click="setCurrentRow" color="primary" text>التفاصيل</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "product",
  data() {
    return {
      rating: 4
    };
  },
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

  methods: {
    setCurrentRow() {
      this.$store.dispatch("setCurrentProduct", this.filteredProduct);
      this.$router.push("/productDetails");
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    },

    filteredProducts() {
      return this.$store.state.products;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    }
  }
};
</script>
