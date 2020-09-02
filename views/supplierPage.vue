<template>
  <v-app >
   
    <div class="vld-parent">
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
      </div>
    <sideButton v-if="this.$route.params.supplier_id == currentUser.user_id" ></sideButton>
    <v-row justify="end" class="mr-16">
    <v-col cols="6"> 
      <v-btn v-if="supplier.user_id == currentUser.user_id" class="white--text" @click="updatePage" :color="pageColor" >Update My page</v-btn>
      </v-col>

 </v-row>
 <CartTable></CartTable>
 

    <v-container>
      <v-row justify="center">
        <v-card max-width="400">
          <v-card-actions aspect-ratio="1.7">
            <v-img id="image" :src="supplier.profile_photo"></v-img>
          </v-card-actions>
          <v-card-title>
            <span class="black--text ml-13">{{supplier.full_arabic_name}}</span>
          </v-card-title>
          <v-card-actions>
            <span style="font-weight:bold" class="black--text">Mobile number :</span>
            <span class="black--text">{{supplier.mobile_number}}</span>
          </v-card-actions>
          <v-card-actions>
            <span style="font-weight:bold" class="black--text">User type :</span>
            <span class="black--text">{{supplier.user_type}}</span>
          </v-card-actions>
          <v-card-actions>
            <span style="font-weight:bold" class="black--text">Email :</span>
            <span class="black--text">{{supplier.email}}</span>
          </v-card-actions>
          <v-card-actions>
            <span style="font-weight:bold" class="black--text">Facbook-account :</span>
            <span class="black--text">{{supplier.facebook_account}}</span>
          </v-card-actions>
        </v-card>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <h1>Products</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          lg="3"
          md="4"
          sm="6"
          cols="6"
          v-for="(supplierProduct,product_id) in supplierProducts"
          :key="product_id"
        >
          <v-card>
            <v-hover>
              <product :addToCartButton="false" :filteredProduct="supplierProduct"></product>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  
  </v-app>
</template>
<script>
import product from "../components/product";
import sideButton from "../components/sideButton";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import CartTable from '../components/cartTable'
export default {
  name: "supplierPage",
  components: {
    product,
    sideButton,
    Loading,
    CartTable
  },
  data: () => ({
     isLoading: false,
  }),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    supplier() {
      return this.$store.state.supplier;
    },
    myProducts() {
      return this.$store.state.myProducts;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    pageColor() {
      return this.$store.state.siteColor;
    },
    supplierProducts() {
      return this.$store.state.supplierProducts;
    },

    
  },
  methods:{
  doLoading(time) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, time);
    },
    updatePage(){
    
      this.$router.push('/updateSupplierPage/' + this.$route.params.supplier_id)
    }
  },
  created() {
     this.doLoading(3000);
    this.$store.dispatch("getSupplier", this.$route.params.supplier_id);
    this.$store.dispatch("refreshCurrentUser");
  
       this.$store.dispatch('getSupplierPageData' , this.$route.params.supplier_id);
    this.$store.state.supplierPageColor = [];
    this.$store.dispatch("getSupplierProducts", this.$route.params.supplier_id);

    
    console.log(this.$store.state.myProducts);
    console.log(this.$store.state.supplierPageColor);
    this.pageColor = this.$store.state.supplierPageColor;
    console.log(this.currentUser.user_id , this.supplier.user_id)
  },
};
</script>
<style scoped>
#image {
  border-radius: 50%;
}
</style>