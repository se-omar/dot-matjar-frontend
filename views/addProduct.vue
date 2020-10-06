<template>
  <v-app class="grey lighten-4">
    <v-container fluid>
      <v-row class="mr-10">
        <v-col lg="7" md="7" sm="12" cols="12">
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productName"
                  dense
                  required
                  outlined
                  :rules="rules"
                  rounded
                  label="Product name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="categoryName"
                  :items="category"
                  dense
                  required
                  outlined
                  :rules="rules"
                  label="Category"
                  @change="gettingCategoryItems"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="categoryItem"
                  :items="categoryItems"
                  dense
                  required
                  outlined
                  :rules="rules"
                  label="Item"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="productCode"
                dense
                outlined
                label="Code"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                dense
                v-model="HScode"
                outlined
                label="HS code"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-form v-model="valid">
              <v-col cols="12">
                <v-text-field
                  :rules="rules"
                  dense
                  v-model="unitPrice"
                  outlined
                  label="Price"
                ></v-text-field>
              </v-col>
            </v-form>
            <v-col cols="6">
              <v-text-field
                dense
                v-model="minUnits"
                outlined
                label="Minimum required orders"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="color"
                dense
                outlined
                label="Color"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field dense outlined label="Sale"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="description"
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
                <label>Main picture</label>
                <v-file-input @change="setImage1"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>Extra picture</label>
                <v-file-input @change="setImage2"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>Extra picture</label>
                <v-file-input @change="setImage3"></v-file-input>
              </v-form>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="7" md="8" sm="8" cols="10">
          <v-row justify="center">
            <v-col cols="4">
              <v-btn
                :disabled="!valid"
                @click="addProduct"
                rounded
                class="primary"
              >
                <span style="font-size: 18px">Add product</span>
              </v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn
                @click="$router.push('/myProducts')"
                rounded
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
  components: {},

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },
    category() {
      return this.$store.state.Home.category;
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
      productName: "",
      productCode: "",
      HScode: "",
      minUnits: "",
      unitPrice: "",
      color: "",
      size: "",
      discountAmount: "",
      description: "",

      rules: [(v) => !!v || "Required."],

      valid: true,
      categoryName: "",
      catgoryItems: [],
      categoryItem: "",
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

    addProduct(files) {
      var self = this;
      console.log(this.currentUser);
      files = [this.image, this.image2, this.image3];
      console.log(files);
      var form = new FormData();
      form.set("product_name", self.productName);
      form.set("product_code", self.productCode);
      form.set("user_id", self.currentUser.user_id);
      form.set("HS_code", self.HScode);
      form.set("min_units_per_order", self.minUnits);
      form.set("unit_price", self.unitPrice);
      form.set("size", self.size);
      form.set("describtion", self.description);
      form.set("color", self.color);
      form.set("discount_amount", self.discountAmount);
      form.set("category_name", self.categoryName);
      form.set("category_item", this.categoryItem);

      files.forEach((element) => {
        form.append("file", element);
      });

      this.$axios
        .post("http://localhost:3000/api/product", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          alert("Product added successfully");
          this.$router.push("/myProducts").catch(() => {});
        });
    },

    gettingCategoryItems() {
      this.categoryItems = [];
      for (let i = 0; i < this.categoriesItems.length; i++) {
        if (this.categoriesItems[i].category_name == this.categoryName) {
          this.categoryItems.push(this.categoriesItems[i].category_items);
        }
      }
      console.log(this.categoryItems);
    },
  },
  created() {
    console.log(this.$store.state.category);
    this.$store.dispatch("refreshCurrentUser");
    return new Promise((resolve) => {
      setTimeout(() => {
        this.$store.dispatch("categoriesDB");
        resolve();
      });
    });
  },
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
