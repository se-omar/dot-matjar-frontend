<template>
  <v-app>
    <tool-bar></tool-bar>
    <v-container fluid>
      <v-row class="mr-10">
        <v-col lg="7" md="7" sm="12">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentProduct.product_name"
                dense
                required
                outlined
                :rules="Rules"
                label="اسم المنتج او الخدمة*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                :rules="Rules"
                v-model="currentProduct.product_code"
                dense
                outlined
                label="الكود*"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="currentProduct.HS_code"
                :rules="Rules"
                outlined
                label="كود التصدير (HS Code)*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                :rules="Rules"
                dense
                v-model="currentProduct.unit_price"
                outlined
                label="السعر للقطعة*"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="currentProduct.min_units_per_order"
                :rules="Rules"
                outlined
                label="الحد الادني للطلب*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field v-model="currentProduct.color" dense outlined label="اللون"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field currentProduct.discount_amount dense outlined label="قيمة التخفيض"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="currentProduct.describtion"
                :rules="Rules"
                dense
                outlined
                label="وصف المنتج\الخدمة"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-btn @click="addProduct" block class="primary">
                <span style="font-size: 18px">اضافة المنتج</span>
              </v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn @click="$router.push('/myProducts')" block class="red white--text">
                <span style="font-size: 18px">الغاء</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="5" md="5" sm="12">
          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>الصورة الرئيسبة</label>
                <v-file-input @change="setImage1"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>صورة اضافية</label>
                <v-file-input @change="setImage2"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>صورة اضافية</label>
                <v-file-input @change="setImage3"></v-file-input>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import toolBar from "../components/toolbar";
export default {
  components: {
    toolBar
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },

    currentProduct() {
      return this.$store.state.currentProduct;
    }
  },

  data() {
    return {
      hasImage1: false,
      image: null,
      hasImage2: false,
      image2: null,
      hasImage3: false,
      image3: null,
      Rules: [v => !!v || "Required"]
    };
  },
  methods: {
    setImage1: function(output) {
      this.image = output;
      console.log(output);
    },
    setImage2: function(output) {
      this.image2 = output;
      console.log(output);
    },
    setImage3: function(output) {
      this.image3 = output;
    },

    addProduct(files) {
      console.log(this.productName);
      var self = this;
      console.log(this.currentUser);

      files = [this.image, this.image2, this.image3];
      console.log(files);
      var form = new FormData();
      form.set("product_id", self.currentProduct.product_id);
      form.set("product_name", self.currentProduct.product_name);
      form.set("product_code", self.currentProduct.product_code);
      form.set("user_id", self.currentUser.user_id);
      form.set("bussiness_id", self.currentUser.bussiness.bussiness_id);
      form.set("HS_code", self.currentProduct.HS_code);
      form.set("min_units_per_order", self.currentProduct.min_units_per_order);
      form.set("unit_price", self.currentProduct.unit_price);
      form.set("size", self.currentProduct.size);
      form.set("describtion", self.currentProduct.describtion);
      form.set("color", self.currentProduct.color);
      form.set("discount_amount", self.currentProduct.discount_amount);

      files.forEach(element => {
        if (element) {
          form.append("file", element);
        }
      });

      this.$axios
        .post("http://localhost:3000/api/updateProduct", form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>


