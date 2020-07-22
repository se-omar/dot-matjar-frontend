<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <v-row>
        <v-col class="mr-15" cols="5">
          <br />
          <v-row>
            <p class="display-1 font-weight-medium">{{currentProduct.product_name}}</p>
          </v-row>

          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">كود المنتج: {{currentProduct.product_code}}</v-col>
            <v-col lg="6" md="6" sm="12" cols="12">كود التصدير (HS Code): {{currentProduct.HS_code}}</v-col>
          </v-row>
          <br />
          <v-row>
            <v-col>
              <span style="font-size: 22px">سعر المنتج: {{currentProduct.unit_price}}</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span
                style="font-size: 22px"
              >الحد الادني للطلب: {{currentProduct.min_units_per_order}}</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span style="font-size: 22px">المشروع: {{currentProduct.bussiness.bussiness_name}}</span>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="mt-3 mb-n5 mr-n4" cols="6">
          <v-img
            v-if="order === 1"
            style="height: 400px; width: 800px"
            :src="nodeHost + currentProduct.main_picture"
          ></v-img>
          <v-img
            v-if="order === 2"
            style="height: 400px;"
            :src="nodeHost + currentProduct.extra_picture1"
          ></v-img>
          <v-img
            v-if="order === 3"
            style="height: 400px;"
            :src="nodeHost + currentProduct.extra_picture2"
          ></v-img>
          <v-row class="mt-3" justify="center">
            <v-btn @click="order = 1">1</v-btn>
            <v-btn v-if="currentProduct.extra_picture1" class="ml-5 mr-5" @click="order = 2">2</v-btn>
            <v-btn v-if="currentProduct.extra_picture2" @click="order = 3">3</v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <p class="display-1 mr-16">وصف المنتج \الخدمة</p>
      </v-row>

      <v-row>
        <v-col class="mr-5 ml-13 mr-13">
          <p style="font-size: 19px">{{currentProduct.describtion}}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="mr-12">
          <v-btn
            v-if="currentUser && currentUser.user_id === currentProduct.bussiness.user.user_id"
            @click="goToEditProduct"
            color="secondary"
            block
          >
            <span style="font-size: 18px">تعديل المنتج</span>
          </v-btn>

          <v-btn v-else @click="viewPopup" color="secondary" block>
            <span style="font-size: 18px">اظهار بيانات صاحب المشروع</span>
          </v-btn>
        </v-col>

        <v-col cols="3"></v-col>
        <v-col cols="4">
          <v-btn
            v-if="currentUser && currentUser.user_id === currentProduct.bussiness.user.user_id"
            @click="toggleRemoveDialog"
            color="secondary"
            block
          >
            <span style="font-size: 18px">ازالة المنتج</span>
          </v-btn>

          <v-btn v-else @click="productToggleResponse" color="secondary" block>
            <span style="font-size: 18px">طلب صاحب المشروع</span>
          </v-btn>
          <business-info-popup v-if="dialog"></business-info-popup>
          <product-request-dialog v-if="productRequestDialog"></product-request-dialog>
        </v-col>

        <v-dialog width="700" persistent v-model="removePressed">
          <v-card>
            <p style="text-align:center" class="display-1">هل انت متأكد من ازالة هذا المنتج؟</p>
            <br />
            <v-row justify="center">
              <v-btn @click="removeProduct" class="primary ml-15">نعم</v-btn>
              <v-btn @click="removePressed = false" class="red white--text">لا</v-btn>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import businessInfoPopup from "../components/businessInfoPopup.vue";
import toolbar from "../components/toolbar";
import productRequestDialog from "../components/productRequestDialog";
export default {
  data() {
    return {
      order: 1,
      removePressed: false
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
    }
  },

  components: {
    businessInfoPopup,
    toolbar,
    productRequestDialog
  },
  methods: {
    viewPopup() {
      if (this.currentUser) this.$store.dispatch("toggleDialog");
      else alert("عليك تسجيل الدخول او انشاء حساب لاظهار البيانات");
      console.log(this.currentProduct);
    },

    productToggleResponse() {
      if (this.currentUser && this.currentUser.user_type == "business")
        this.$store.commit("productToggleResponse");
      else alert("عليك ان تكون صاحب مشروع لطلب صاحب هذا المشروع");
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
        .then(response => {
          alert("تم مسح المنتج بنجاح");
          console.log(response);
        })
        .then(() => {
          this.$router.push("/myProducts");
        });
    },

    goToEditProduct() {
      this.$router.push("/editProduct");
    }
  }
};
</script>
