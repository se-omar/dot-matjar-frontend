<template>
  <v-app>
    <carttable></carttable>
    <v-content>
    
      <v-row justify="center mt-3">
        <v-card height="400px" width="800px" class="grey lighten-4">
          <v-card>
            <v-img
              v-if="order === 1"
              style="height: 400px; width: 800px"
              :src=" currentProduct.main_picture"
            ></v-img>
            <v-img
              v-if="order === 2"
              style="height: 400px;"
              :src="currentProduct.extra_picture1"
            ></v-img>
            <v-img
              v-if="order === 3"
              style="height: 400px;"
              :src="currentProduct.extra_picture2"
            ></v-img>
            <v-img v-if="order === 2" style="height: 400px;" :src="currentProduct.extra_picture1"></v-img>
            <v-img v-if="order === 3" style="height: 400px;" :src="currentProduct.extra_picture2"></v-img>

            <v-row class="mt-3" justify="center">
              <v-btn @click="order = 1">1</v-btn>
              <v-btn v-if="currentProduct.extra_picture1" class="ml-5 mr-5" @click="order = 2">2</v-btn>
              <v-btn v-if="currentProduct.extra_picture2" @click="order = 3">3</v-btn>
            </v-row>
          </v-card>
          <v-divider></v-divider>
          <v-list class="mt-5" style=" font-size:large">
            <v-list-item>
              <v-list-item-content>
                <span>
                  Product name :
                  <span class="red--text">{{currentProduct.product_name}}</span>
                </span>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content>
                <span>
                  Price :
                  <span class="red--text">{{currentProduct.unit_price}}</span>
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <span>
                  Color :
                  <span class="red--text">{{currentProduct.color}}</span>
                </span>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content>
                <span>
                  Describtion :
                  <span class="red--text">{{currentProduct.describtion}}</span>
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <span>
                  Minimum units per order :
                  <span
                    class="red--text"
                  >{{currentProduct.min_units_per_order}}</span>
                </span>
              </v-list-item-content>
              <v-spacer></v-spacer>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <span>
                  Product code :
                  <span class="red--text">{{currentProduct.product_code}}</span>
                </span>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-content>
                <span>
                  HS code :
                  <span class="red--text">{{currentProduct.HS_code}}</span>
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-row>
              <!-- ================ -->

              <v-col cols="4" lg="4">
                <v-btn
                  v-if="currentUser && currentUser.user_id === currentProduct.user_id"
                  @click="goToEditProduct"
                  color="red darken-4"
                  block
                  rounded
                >
                  <span class="white--text" style="font-size: 18px">Edite product</span>
                </v-btn>

                <v-btn color="red darken-4 " v-else @click="viewPopup" rounded>
                  <span style="font-size: 18px" class="white--text">Display business owner INFO</span>
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>

              <v-col cols="4" lg="4">
                <v-btn
                  v-if="currentUser && currentUser.user_id === currentProduct.user_id"
                  @click="toggleRemoveDialog"
                  color="red darken-4"
                  rounded
                  block
                >
                  <span style="font-size: 18px" class="white--text">Remove product</span>
                </v-btn>

                <!-- <v-btn v-else @click="productToggleResponse" class="red darken-4" block rounded>
                  <span style="font-size: 18px" class="white--text">Contact Business owner</span>
                </v-btn> -->
                 <v-btn
        v-if="addToCartButton"
        @click="add()"
        variant="primary"
        class="red darken-4 white--text"
        rounded
        
      >Add to cart</v-btn>



                <business-info-popup v-if="dialog"></business-info-popup>
                <product-request-dialog v-if="productRequestDialog"></product-request-dialog>
              </v-col>

              <v-dialog width="700" persistent v-model="removePressed">
                <v-card>
                  <p style="text-align:center" class="display-1">Remove product ?</p>
                  <br />
                  <v-row justify="center">
                    <v-btn @click="removeProduct" class="primary ml-15">Yes</v-btn>
                    <v-btn @click="removePressed = false" class="red white--text">No</v-btn>
                  </v-row>
                </v-card>
              </v-dialog>

              <!-- ===================== -->
            </v-row>
          </v-list>
        </v-card>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
// import businessInfoPopup from "../components/businessInfoPopup.vue";
// import productRequestDialog from "../components/productRequestDialog";
import carttable from '../components/cartTable'
export default {
  created() {
    this.$store.dispatch("refreshCurrentUser");
  },

  data() {
    return {
      order: 1,
      removePressed: false,
      addToCartButton:true
    };
  },

  computed: {
    currentProduct() {
      return this.$store.state.currentProduct;
    },

    businesses() {
      return this.$store.state.businesses;
    },

    dialog() {
      return this.$store.state.dialog;
    },

    productRequestDialog() {
      return this.$store.state.productRequestDialog;
    },

    currentUser() {
      return this.$store.state.currentUser;
    },

    nodeHost() {
      return this.$store.state.nodeHost;
    },
  },

  components: {
    // businessInfoPopup,
    // productRequestDialog
    carttable
  },
  methods: {
    viewPopup() {
      if (this.currentUser) this.$store.dispatch("toggleDialog");
      else alert("You must Register First");
      console.log(this.currentProduct);
    },

    productToggleResponse() {
      if (this.currentUser && this.currentUser.user_type == "business")
        this.$store.commit("productToggleResponse");
      else alert("You have to be a business owner");
    },

    toggleRemoveDialog() {
      this.removePressed = true;
    },

    removeProduct() {
      console.log(this.currentProduct.product_id);
      var api =
        "http://localhost:3000/api/removeProduct/" +
        this.currentProduct.product_id;
      this.$axios
        .delete(api)
        .then((response) => {
          alert("Product Deleted");
          console.log(response);
        })
        .then(() => {
          this.$router.push("/myProducts");
        });
    },

    goToEditProduct() {
      this.$router.push("/editProduct");
    },
    add(){
      this.$store.dispatch("table", this.currentProduct);
    }
  },
};
</script>
