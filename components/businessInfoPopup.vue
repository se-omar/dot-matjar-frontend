<template>
  <div id="business-info-popup">
    <v-app>
      <v-dialog persistent max-width="700" v-model="dialog">
        <v-card>
          <v-row justify="center">
            <v-card-title>
              <p style="display: centre" class="display-1">بيانات الاتصال</p>
            </v-card-title>
          </v-row>
          <v-row class="mr-15" justify="center">
            <v-col cols="6">
              <v-card-text>
                <label style="font-size: 22px" for="projectOwner">الاسم</label>
                <br />
                <span style="font-size: 18px">{{currentProduct.bussiness.user.full_arabic_name}}</span>
              </v-card-text>
            </v-col>

            <v-col cols="6">
              <v-card-text>
                <label style="font-size: 22px" for="projectOwner">البريد الالكتروني</label>
                <br />
                <span style="font-size: 18px">{{currentProduct.bussiness.user.email}}</span>
              </v-card-text>
            </v-col>

            <v-col cols="6">
              <v-card-text>
                <label style="font-size: 22px" for="projectOwner">التليفون</label>
                <br />
                <span style="font-size: 18px">{{currentProduct.bussiness.user.phone_number}}</span>
              </v-card-text>
            </v-col>

            <v-col cols="6">
              <v-card-text>
                <label style="font-size: 22px" for="projectOwner">الموبايل</label>
                <br />
                <span style="font-size: 18px">{{currentProduct.bussiness.user.mobile_number}}</span>
              </v-card-text>
            </v-col>

            <v-col cols="12">
              <v-card-text>
                <label style="font-size: 22px" for="projectOwner">العنوان</label>
                <br />
                <span style="font-size: 18px">{{currentProduct.bussiness.user.address}}</span>
              </v-card-text>
            </v-col>
          </v-row>
          <v-btn @click="closeDialog">اغلاق</v-btn>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "business-info-popup",
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

  methods: {
    closeDialog() {
      this.$store.dispatch("toggleDialog");
    }
  }
};
</script>
