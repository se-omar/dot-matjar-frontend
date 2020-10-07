<template>
  <v-app>
    <v-container fluid>
      <v-row class="mr-10">
        <v-col lg="7" md="7" sm="12" cols="12">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentProduct.product_name"
                dense
                required
                outlined
                :rules="Rules"
                label="Product name"
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
                label="Code"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="currentProduct.HS_code"
                :rules="Rules"
                outlined
                label="HS code"
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
                label="Price"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="currentProduct.min_units_per_order"
                :rules="Rules"
                outlined
                label="Minimum required Products"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="currentProduct.color"
                dense
                outlined
                label="Color"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                currentProduct.discount_amount
                dense
                outlined
                label="Sale"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="currentProduct.describtion"
                :rules="Rules"
                dense
                outlined
                label="Description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="5" md="5" sm="12">
          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>Main photo</label>
                <v-file-input @change="setImage1"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>Extra photo</label>
                <v-file-input @change="setImage2"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>Extra photo</label>
                <v-file-input @change="setImage3"></v-file-input>
              </v-form>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="6" md="8" sm="8" cols="10">
          <v-row justify="center">
            <v-col cols="5">
              <v-btn rounded @click="updateProduct" block class="primary">
                <span style="font-size: 18px">Edit product</span>
              </v-btn>
            </v-col>

            <v-col cols="5" lg="4">
              <v-btn
                rounded
                @click="$router.go(-1)"
                block
                class="red white--text"
              >
                <span style="font-size: 18px">Cancel</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("refreshCurrentUser");
  },

  components: {},

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    currentProduct() {
      return this.$store.state.ProductDetails.currentProduct;
    },
  },

  data() {
    return {
      hasImage1: false,
      image: null,
      hasImage2: false,
      image2: null,
      hasImage3: false,
      image3: null,
      Rules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    setImage1: function (output) {
      this.image = output;
      console.log(output);
    },
    setImage2: function (output) {
      this.image2 = output;
      console.log(output);
    },
    setImage3: function (output) {
      this.image3 = output;
    },

    updateProduct(files) {
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
      form.set("HS_code", self.currentProduct.HS_code);
      form.set("min_units_per_order", self.currentProduct.min_units_per_order);
      form.set("unit_price", self.currentProduct.unit_price);
      form.set("size", self.currentProduct.size);
      form.set("describtion", self.currentProduct.describtion);
      form.set("color", self.currentProduct.color);
      form.set("discount_amount", self.currentProduct.discount_amount);

      files.forEach((element) => {
        if (element) {
          form.append("file", element);
        }
      });

      this.$axios
        .post("http://localhost:3000/api/updateProduct", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response is:", response);
        })
        .then(() => {
          alert("Product changed");
          this.$router.push("/myProducts");
        });
    },
  },
};
</script>


