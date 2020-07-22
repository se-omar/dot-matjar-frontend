<template>
  <v-app>
    <tool-bar></tool-bar>
    <v-container v-if="currentUser && currentUser.user_type == 'business'">
      <v-row justify="center">
        <p class="display-1">منتجاتي</p>
      </v-row>

      <v-row justify="center">
        <v-btn @click="$router.push('/addProduct').catch((err) => {})">
          <span style="font-size: 19px">اضافة منتح</span>
        </v-btn>
      </v-row>

      <v-row v-if="myProducts.length != 0">
        <v-col lg="3" md="4" sm="6" cols="6" v-for="myProduct in myProducts" :key="myProduct.id">
          <product :filteredProduct="myProduct"></product>
        </v-col>
      </v-row>

      <v-row class="mt-16" justify="center" v-else>
        <p class="display-1">لا يوجد منتجات</p>
      </v-row>
    </v-container>

    <v-container v-else-if="!currentUser || currentUser.user_type != 'business'">
      <v-row justify="center">
        <p class="display-1">ليس لديك صلاحيات لإظهار هذه الصفحة</p>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row justify="center">
        <p class="display-1">لا يوجد منتجات</p>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Product from "../components/product.vue";
import ToolBar from "../components/toolbar.vue";
export default {
  mounted() {
    this.$store.dispatch("getMyProducts");
    console.log(this.myProducts);
  },

  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },

  components: {
    Product,
    ToolBar
  }
};
</script>

