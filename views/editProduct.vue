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
                filled
                rounded
                :rules="Rules"
                class="arabic"
                :placeholder="$t('editProduct.productName')"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                :rules="Rules"
                v-model="currentProduct.product_code"
                dense
                filled
                rounded
                class="arabic"
                :placeholder="$t('editProduct.code')"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                class="arabic"
                dense
                v-model="currentProduct.HS_code"
                :rules="Rules"
                filled
                rounded
                :placeholder="$t('editProduct.hsCode')"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-text-field
                :rules="Rules"
                dense
                v-model="currentProduct.unit_price"
                filled
                rounded
                class="arabic"
                :placeholder="$t('editProduct.price')"
              ></v-text-field>
            </v-col>

            <v-col lg="3">
              <v-select
                solo-inverted
                :items="currencies"
                v-model="currentProduct.currency"
              >
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field
                dense
                v-model="currentProduct.min_units_per_order"
                :rules="Rules"
                filled
                rounded
                :placeholder="$t('editProduct.minOrders')"
                class="arabic"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="currentProduct.color"
                dense
                filled
                rounded
                :placeholder="$t('editProduct.color')"
                class="arabic"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                currentProduct.discount_amount
                dense
                filled
                rounded
                :placeholder="$t('editProduct.sale')"
                class="arabic"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="currentProduct.description"
                :rules="Rules"
                dense
                filled
                rounded
                :placeholder="$t('editProduct.description')"
                class="arabic"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <label class="mr-5">choose product colors</label>
              <v-swatches swatches="text-advanced" v-model="color"></v-swatches>
            </v-col>

            <v-col cols="12">
              <label class="mr-5">chosen colors: </label>
              <span
                class="ms-3"
                v-for="(currentColor, index) in productColors"
                :key="index"
                @click="removeColor(currentColor)"
              >
                <v-swatches
                  disabled
                  v-model="productColors[index]"
                ></v-swatches>
              </span>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="5" md="5" sm="12">
          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("editProduct.mainPicture") }}</label>
                <v-file-input @change="setImage1"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("editProduct.extraPicture") }}</label>
                <v-file-input @change="setImage2"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("editProduct.extraPicture") }}</label>
                <v-file-input @change="setImage3"></v-file-input>
              </v-form>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="6" md="8" sm="8" cols="10">
          <v-row justify="center">
            <v-col cols="5">
              <v-btn
                :color="siteColor.button_color"
                rounded
                @click="updateProduct"
                block
              >
                <span :style="`color:${siteColor.button_text_color}`">{{
                  $t("editProduct.editProduct")
                }}</span>
              </v-btn>
            </v-col>

            <v-col cols="5" lg="4">
              <v-btn
                rounded
                @click="$router.go(-1)"
                block
                class="red white--text"
              >
                <span>{{ $t("editProduct.cancel") }}</span>
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
  async created() {
    await this.$store.dispatch("getSiteColor");
    await this.$store.dispatch(
      "getProductColors",
      this.currentProduct.product_id
    );
    console.log(this.productColors);
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
  },

  components: { VSwatches: () => import("vue-swatches") },

  computed: {
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },

    currentProduct() {
      return this.$store.state.ProductDetails.currentProduct;
    },

    siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },

    productColors() {
      return this.$store.state.ProductDetails.productColors;
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
      color: "",
      Rules: [(v) => !!v || "Required"],
      currencies: ["egp", "usd"],
    };
  },
  methods: {
    setImage1: function (output) {
      this.image = output;
    },
    setImage2: function (output) {
      this.image2 = output;
    },
    setImage3: function (output) {
      this.image3 = output;
    },

    updateProduct(files) {
      var self = this;

      files = [this.image, this.image2, this.image3];

      var form = new FormData();
      form.set("product_id", self.currentProduct.product_id);
      form.set("product_name", self.currentProduct.product_name);
      form.set("product_code", self.currentProduct.product_code);
      form.set("user_id", self.currentUser.user_id);
      form.set("HS_code", self.currentProduct.HS_code);
      form.set("min_units_per_order", self.currentProduct.min_units_per_order);
      form.set("unit_price", self.currentProduct.unit_price);
      form.set("size", self.currentProduct.size);
      form.set("description", self.currentProduct.description);
      form.set("colors", self.productColors);
      form.set("discount_amount", self.currentProduct.discount_amount);
      form.set("currency", self.currentProduct.currency);

      files.forEach((element) => {
        if (element) {
          form.append("file", element);
        }
      });

      this.$axios
        .post(this.nodeHost + "/api/updateProduct", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        // eslint-disable-next-line no-unused-vars
        .then((response) => {})
        .then(() => {
          alert("Product changed");
          this.$router.push(`/${this.$i18n.locale}/myProducts`);
        });
    },

    removeColor(color) {
      console.log("color clicked", color);
      var index = this.productColors.indexOf(color);
      this.productColors.splice(index, 1);
    },
  },

  watch: {
    color: function () {
      this.productColors.indexOf(this.color) == -1
        ? this.productColors.push(this.color)
        : alert("color exists");
      console.log(this.productColors);
    },
  },
};
</script>
<style scoped>
div {
  font-size: 17px;
}
</style>

