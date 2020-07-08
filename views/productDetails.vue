<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col class="mr-10" cols="6">
          <br />
          <v-row>
            <p class="display-1 font-weight-medium">{{currentProduct.product_name}}</p>
          </v-row>

          <v-row>
            <v-col>كود المنتج: {{currentProduct.product_code}}</v-col>
            <v-col>كود التصدير (HS Code): {{currentProduct.HS_code}}</v-col>
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

        <v-col class="mt-3" cols="5">
          <v-img style="height: 370px;" src="https://bulma.io/images/placeholders/480x480.png"></v-img>
        </v-col>
      </v-row>

      <v-row>
        <p class="display-1 mr-10">وصف المنتج \الخدمة</p>
      </v-row>

      <v-row>
        <v-col class="mr-5 ml-13">
          <p style="font-size: 19px">{{currentProduct.describtion}}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="mr-10">
          <v-btn @click="viewPopup" color="secondary" block>
            <span style="font-size: 18px">اظهار بيانات صاحب المشروع</span>
          </v-btn>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="4">
          <v-btn color="secondary" block>
            <span style="font-size: 18px">طلب صاحب المشروع</span>
          </v-btn>
        </v-col>
      </v-row>
      <business-info-popup></business-info-popup>
    </v-content>
  </v-app>
</template>

<script>
import businessInfoPopup from "../components/businessInfoPopup.vue";
export default {
  connected() {},

  computed: {
    currentProduct() {
      return this.$store.state.currentProduct;
    },

    businesses() {
      return this.$store.state.businesses;
    },

    dialog() {
      return this.$store.state.dialog;
    }
  },

  components: {
    businessInfoPopup
  },
  methods: {
    viewPopup() {
      this.$store.dispatch("toggleDialog");
    }
  }
};
</script>
