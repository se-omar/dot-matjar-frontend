<template>
  <v-app>
    <tool-bar></tool-bar>
    <v-container fluid>
      <v-row class="mr-10">
        <v-col lg="7" md="7" sm="12">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="productName"
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
              <v-text-field :rules="Rules" v-model="productCode" dense outlined label="الكود*"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="HScode"
                :rules="Rules"
                outlined
                label="كود التصدير (HS Code)*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field :rules="Rules" dense v-model="unitPrice" outlined label="السعر للقطعة*"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="minUnits"
                :rules="Rules"
                outlined
                label="الحد الادني للطلب*"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field v-model="color" dense outlined label="اللون"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field dense outlined label="قيمة التخفيض"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                :rules="Rules"
                dense
                outlined
                label="وصف المنتج\الخدمة"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-btn @click="uploadImage" block class="primary">
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
                <label>الصورة الرئيسبة</label>>
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
      productName: "",
      productCode: "",
      HScode: "",
      minUnits: "",
      unitPrice: "",
      color: "",
      size: "",
      discountAmount: "",
      description: "",
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

    addProduct() {
      var self = this;
      console.log(this.currentUser);
      this.$axios
        .post("http://localhost:3000/api/product", {
          product_name: self.productName,
          product_code: self.productCode,
          user_id: self.currentUser.user_id,
          bussiness_id: self.currentUser.bussiness.bussiness_id,
          HS_code: self.HScode,
          min_units_per_order: self.minUnits,
          unit_price: self.unitPrice,
          color: self.color,
          size: self.size,
          discount_amount: self.discountAmount,
          description: self.description,
          image: self.image
        })
        .then(response => {
          console.log(response);
        });
    },

    uploadImage(files) {
      files = [this.image, this.image2, this.image3];
      console.log(files);
      var form = new FormData();
      form.append("files", files);
      this.$axios.post("http://localhost:3000/api/product", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }
};
</script>

<style scoped>
#fileInput {
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>
