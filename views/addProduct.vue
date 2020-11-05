<template>
  <v-app class="grey lighten-4">
    <v-container>
      <v-card>
        <v-row justify="center" class="mx-4 mt-16">
          <v-col lg="7" md="7" sm="12" cols="12">
            <v-form v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    filled
                    v-model="productName"
                    dense
                    required
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
                    required
                    :rules="[rules.required]"
                    :label="$t('addProduct.category')"
                    @change="gettingCategoryItems"
                    filled
                    rounded
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="categoryItem"
                    :items="categoryItems"
                    dense
                    required
                    :label="$t('addProduct.item')"
                    filled
                    rounded
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="quantity"
                    type="number"
                    dense
                    :rules="[rules.required]"
                    :label="$t('addProduct.quantity')"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    dense
                    v-model="brand"
                    :label="$t('addProduct.brand')"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    :rules="[rules.required && rules.numbersOnly]"
                    v-model="unitPrice"
                    :label="$t('addProduct.price')"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>

                <v-col lg="3">
                  <v-select
                    solo-inverted
                    :items="currencies"
                    v-model="productCurrency"
                    filled
                    rounded
                  >
                  </v-select>
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    v-model="minUnits"
                    :label="$t('addProduct.minOrders')"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="color"
                    dense
                    :label="$t('addProduct.color')"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-select
                    :items="['new', 'used']"
                    v-model="condition"
                    dense
                    :label="$t('addProduct.condition')"
                    filled
                    rounded
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="description"
                    dense
                    :rules="[rules.required]"
                    :label="$t('addProduct.description')"
                    filled
                    rounded
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
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="newCategoryName"
                          :placeholder="$t('addProduct.categoryName')"
                          rounded
                          outlined
                          filled
                          :color="siteColor.button_color"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="newCategoryArabicName"
                          :placeholder="$t('addProduct.categoryArabicName')"
                          rounded
                          filled
                          outlined
                          :color="siteColor.button_color"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-row justify="center">
                    <v-col cols="10" lg="3" sm="6" md="6">
                      <v-textarea
                        :label="$t('addProduct.description')"
                        rounded
                        outlined
                        v-model="newCategoryDescription"
                        filled
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
                    <v-snackbar
                      centered
                      v-model="addCategorySnackBar"
                      timeout="5000"
                      max-width="10"
                    >
                      <v-row justify="center">
                        <p>
                          {{ $t("addProduct.addCategorySnackBar") }}
                        </p>
                      </v-row>
                    </v-snackbar>
                  </v-row>
                  <v-divider class="mx-16 mt-6"></v-divider>
                  <!-- Adding category items -->
                  <v-row justify="center">
                    <h2>{{ $t("addProduct.requestItem") }}</h2>
                  </v-row>

                  <v-form justify="center" v-model="addingItemsValidation">
                    <v-row justify="center">
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-select
                          :rules="[rules.required]"
                          outlined
                          rounded
                          :items="category"
                          v-model="categoryName"
                          :placeholder="$t('addProduct.categoryName')"
                          filled
                        ></v-select>
                      </v-col>

                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          v-model="newCategoryItem"
                          :placeholder="$t('addProduct.requestItem')"
                          class="text-xl"
                          rounded
                          outlined
                          :rules="[rules.required]"
                          :color="siteColor.button_color"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          v-model="newItemArabicName"
                          :placeholder="$t('addProduct.itemArabicName')"
                          class="text-xl"
                          rounded
                          outlined
                          :rules="[rules.required]"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="10" lg="3" sm="4" md="3">
                        <v-textarea
                          :label="$t('addProduct.description')"
                          rounded
                          outlined
                          v-model="newCategoryItemDescription"
                          filled
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
                    <v-col cols="10" lg="6" md="6" sm="8">
                      <v-toolbar shaped :color="siteColor.toolbar_color">
                        <v-row justify="center">
                          <h2>{{ $t("addProduct.myCategoryRequests") }}</h2>
                        </v-row>
                      </v-toolbar>
                      <v-card class="mt-4">
                        <v-data-table
                          :items="supplierCategoriesRequests"
                          :headers="categoriesRequestHeaders"
                        >
                        </v-data-table>
                      </v-card>
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
              <v-col cols="12" lg="4" sm="12" md="4">
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

              <v-col cols="12" lg="4" sm="12" md="4">
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
      </v-card>
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
      addCategorySnackBar: false,
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
      this.addCategorySnackBar = true;
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
