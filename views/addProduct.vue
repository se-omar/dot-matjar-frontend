<template>
  <v-app class="grey lighten-4">
    <v-container class="mx-8" fluid>
      <v-row class="mr-10 mt-16">
        <v-col lg="7" md="7" sm="12" cols="12">
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="productName"
                  dense
                  required
                  filled
                  :rules="[rules.required]"
                  rounded
                  :label="$t('addProduct.productName')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="categoryName"
                  :items="category"
                  dense
                  rounded
                  required
                  filled
                  :rules="[rules.required]"
                  :label="$t('addProduct.category')"
                  @change="gettingCategoryItems"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="categoryItem"
                  :items="categoryItems"
                  dense
                  rounded
                  required
                  filled
                  :label="$t('addProduct.item')"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="quantity"
                  type="number"
                  dense
                  rounded
                  :rules="[rules.required]"
                  filled
                  :label="$t('addProduct.quantity')"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="brand"
                  filled
                  rounded
                  :label="$t('addProduct.brand')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-text-field
                  :rules="[rules.required && rules.numbersOnly]"
                  v-model="unitPrice"
                  filled
                  rounded
                  dense
                  :label="$t('addProduct.price')"
                ></v-text-field>
              </v-col>

              <v-col lg="3">
                <v-select
                  
                  rounded
                  filled
                  :items="currencies"
                  v-model="productCurrency"
                >
                </v-select>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="minUnits"
                  filled
                  dense
                  rounded
                  :label="$t('addProduct.minOrders')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="color"
                  dense
                  rounded
                  filled
                  :label="$t('addProduct.color')"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  :items="['new', 'used']"
                  v-model="condition"
                  dense
                  rounded
                  filled
                  :label="$t('addProduct.condition')"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  dense
                  rounded
                  :rules="[rules.required]"
                  filled
                  :label="$t('addProduct.description')"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>

          <v-row>
            <v-col cols="12">
              <h4>{{ $t("addProduct.wantMoreCategories") }}</h4>
              <v-btn
                @click.stop="dialog = true"
                :color="siteColor.button_color"
                text
                >{{ $t("addProduct.clickHere") }}</v-btn
              >
            </v-col>
            <v-dialog
              persistent
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-toolbar dark :color="siteColor.button_color">
                <v-btn icon dark @click="dialog = false">
                  <i
                    :style="`color:${siteColor.button_text_color}`"
                    class="fa fa-times fa-lg"
                  ></i>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{
                  $t("addProduct.categoryRequest")
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-card>
                <!-- Adding cateogryiessssss -->
                <v-row justify="center">
                  <h2>{{ $t("addProduct.requestNewCategory") }}</h2>
                </v-row>

                <v-form v-model="addCategoryValidation">
                  <v-row justify="center">
                    <v-col cols="3">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="newCategoryName"
                        :placeholder="$t('addProduct.categoryName')"
                        rounded
                        filled
                        :color="siteColor"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="newCategoryArabicName"
                        :placeholder="$t('addProduct.categoryArabicName')"
                        rounded
                        filled
                        :color="siteColor"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>

                <v-row justify="center">
                  <v-col cols="6">
                    <v-textarea
                      :label="$t('addProduct.description')"
                      rounded
                      filled
                      v-model="newCategoryDescription"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    :disabled="!addCategoryValidation"
                    rounded
                    :color="siteColor.button_color"
                    class="white--text"
                    @click="requestNewCategoryAndItem"
                    ><span :style="`color:${siteColor.button_text_color}`">{{
                      $t("addProduct.addCategory")
                    }}</span></v-btn
                  >
                </v-row>
                <v-divider class="mx-16 mt-6"></v-divider>
                <!-- Adding category items -->
                <v-row justify="center">
                  <h2>{{ $t("addProduct.requestItem") }}</h2>
                </v-row>

                <v-form justify="center" v-model="addingItemsValidation">
                  <v-row justify="center">
                    <v-col cols="3">
                      <v-select
                        :rules="[rules.required]"
                        filled
                        rounded
                        :items="category"
                        v-model="categoryName"
                        :placeholder="$t('addProduct.categoryName')"
                      ></v-select>
                    </v-col>

                    <v-col cols="3">
                      <v-text-field
                        v-model="newCategoryItem"
                        :placeholder="$t('addProduct.requestItem')"
                        class="text-xl"
                        rounded
                        filled
                        :rules="[rules.required]"
                        :color="siteColor"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="3">
                      <v-text-field
                        v-model="newItemArabicName"
                        :placeholder="$t('addProduct.itemArabicName')"
                        class="text-xl"
                        rounded
                        filled
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="6">
                      <v-textarea
                        :label="$t('addProduct.description')"
                        rounded
                        filled
                        v-model="newCategoryItemDescription"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>

                <v-row justify="center">
                  <v-btn
                    :disabled="!addingItemsValidation"
                    rounded
                    :color="siteColor.button_color"
                    class="white--text"
                    @click="requestNewCategoryAndItem"
                    ><span :style="`color:${siteColor.button_text_color}`">{{
                      $t("addProduct.addItem")
                    }}</span></v-btn
                  >
                </v-row>
                <v-divider class="mx-16 mt-6"></v-divider>

                <v-row class="mt-10" justify="center">
                  <v-col cols="6" lg="6" md="6" sm="8">
                    <v-toolbar shaped :color="siteColor.toolbar_color">
                      <v-row justify="center">
                        <h2>{{ $t("addProduct.myCategoryRequests") }}</h2>
                      </v-row>
                    </v-toolbar>
                    <v-data-table
                      :items="supplierCategoriesRequests"
                      :headers="categoriesRequestHeaders"
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-row>
        </v-col>

        <v-col lg="5" md="5" sm="12">
          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("addProduct.mainPicture") }}</label>
                <v-file-input @change="setImage1"></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("addProduct.extraPicture") }}</label>
                <v-file-input
                  :disabled="!image"
                  @change="setImage2"
                ></v-file-input>
              </v-form>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="9">
              <v-form>
                <label>{{ $t("addProduct.extraPicture") }}</label>
                <v-file-input
                  :disabled="!image2 || !image"
                  @change="setImage3"
                ></v-file-input>
              </v-form>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="7" md="8" sm="8" cols="10">
          <v-row justify="center">
            <v-col cols="4">
              <v-btn
                :disabled="!valid || !image"
                @click="addProduct"
                rounded
                :color="siteColor.button_color"
              >
                <span
                  :style="`color:${siteColor.button_text_color};font-size: 18px`"
                  >{{ $t("addProduct.addProduct") }}</span
                >
              </v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn
                @click="$router.push(`/${$i18n.locale}myProducts`)"
                rounded
                class="red white--text"
              >
                <span style="font-size: 18px">{{
                  $t("addProduct.cancel")
                }}</span>
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
    nodeHost() {
      return this.$store.state.nodeHost;
    },
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
    categoriesItems() {
      return this.$store.state.Home.categoriesItems;
    },
    category() {
      var array = [];
      this.$store.state.Home.category.forEach((e) => {
        array.push(e.name);
      });
      return array;
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
    supplierCategoriesRequests() {
      return this.$store.state.Home.supplierCategoriesRequests;
    },
    currencyNames() {
      return this.$store.state.ProductDetails.currencyNames;
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
      brand: "",
      condition: "",
      quantity: "",
      minUnits: "",
      unitPrice: "",
      color: "",
      size: "",
      discountAmount: "",
      description: "",
      productCurrency: "egp",
      currencies: ["egp", "usd"],

      rules: {
        required: (v) => !!v || "Required.",
        numbersOnly: (v) => /\d+/.test(v) || "Enter numbers",
      },

      valid: true,
      categoryName: "",
      categoryItems: [],
      categoryItem: "",
      dialog: false,
      addCategoryValidation: false,
      addingItemsValidation: false,
      newCategoryName: "",
      newCategoryItemDescription: "",
      newCategoryDescription: "",
      newCategoryItem: "",
      categoriesRequestHeaders: [
        { text: "Request Type", value: "request_type" },
        { text: "New Category Name", value: "new_category_name" },
        { text: "New Category Item", value: "new_category_item" },
        { text: "Request Status", value: "status" },
      ],

      newCategoryArabicName: "",
      newItemArabicName: "",
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

    addProduct(files) {
      var self = this;

      files = [this.image, this.image2, this.image3];

      var form = new FormData();
      form.set("product_name", self.productName);
      form.set("quantity", self.quantity);
      form.set("user_id", self.currentUser.user_id);
      form.set("brand", self.brand);
      form.set("condition", self.condition);
      form.set("min_units_per_order", self.minUnits);
      form.set("unit_price", self.unitPrice);
      form.set("size", self.size);
      form.set("describtion", self.description);
      form.set("color", self.color);
      form.set("discount_amount", self.discountAmount);
      form.set("category_name", self.categoryName);
      form.set("category_item", this.categoryItem);
      form.set("currency", self.productCurrency);

      files.forEach((element) => {
        form.append("file", element);
      });

      this.$axios
        .post(this.nodeHost + "/api/product", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          alert("Product added successfully");
          this.$router.push(`/${this.$i18n.locale}/myProducts`).catch(() => {});
        });
    },

    gettingCategoryItems() {
      this.$store.dispatch("getCategoryItems");
      this.categoryItems = [];
      for (let i = 0; i < this.categoriesItems.length; i++) {
        if (this.categoriesItems[i].category_name == this.categoryName) {
          this.categoryItems.push(this.categoriesItems[i].category_items);
        }
      }
    },
    requestNewCategoryAndItem() {
      this.$store.dispatch("requestNewCategoryAndItem", {
        newCategoryName: this.newCategoryName,
        newCategoryDescription: this.newCategoryDescription,
        newCategoryItem: this.newCategoryItem,
        newCategoryItemDescription: this.newCategoryItemDescription,
        categoryName: this.categoryName,
        itemArabicName: this.newItemArabicName,
        categoryArabicName: this.newCategoryArabicName,
      });
    },
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getCategoryItems");
    await this.$store.dispatch("categoriesDB");
    await this.$store.dispatch("getSupplierCategoriesRequests");
    console.log(this.category);
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

div {
  font-size: 17px;
}
</style>
