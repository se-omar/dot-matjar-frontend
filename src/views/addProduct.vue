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
                    required
                    :rules="[rules.required]"
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
                    required
                    :rules="[rules.required]"
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
                    :rules="[rules.required && rules.numbersOnly]"
                    rounded
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="stock"
                    :label="$t('addProduct.inStock')"
                    required
                    :rules="[rules.required && rules.numbersOnly]"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="['new', 'used']"
                    :rules="[rules.required]"
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

                <v-col cols="12">
                  <label class="mr-5">choose product colors</label>
                  <v-swatches
                    v-model="color"
                    swatches="text-advanced"
                  ></v-swatches>
                </v-col>

                <v-col cols="12">
                  <label class="mr-5">chosen colors: </label>
                  <span
                    class="ms-3"
                    v-for="(currentColor, index) in chosenColors"
                    :key="index"
                    @click="removeColor(currentColor)"
                  >
                    <v-swatches
                      disabled
                      v-model="chosenColors[index]"
                    ></v-swatches>
                  </span>
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="12">
                  <span class="text-h6">choose category</span>
                </v-col>
                <v-treeview
                  return-object
                  item-key="id"
                  hoverable
                  activatable
                  selected-color="red"
                  @update:active="setCategory"
                  color="warning"
                  :items="categoriesTreeArray"
                  style="cursor: pointer"
                >
                </v-treeview>
                <template slot-scope="{ item }">
                  <a @click="setCategory(item)">{{ item.name }}</a>
                </template>
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

                  <v-row justify="center">
                    <span style="font-weight: bold; font-size: 25px">{{
                      $t("addProduct.chooseParent")
                    }}</span>
                  </v-row>
                  <v-row justify="center">
                    <v-treeview
                      return-object
                      item-key="id"
                      hoverable
                      activatable
                      selected-color="red"
                      @update:active="selectCategory"
                      color="warning"
                      :items="categoriesTreeArray"
                    >
                    </v-treeview>
                    <template slot-scope="{ item }">
                      <v-btn @click="selectCategory(item)">{{
                        item.name
                      }}</v-btn>
                    </template>
                  </v-row>

                  <v-form v-model="addCategoryValidation">
                    <v-row justify="center">
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <!-- <v-text-field
                          :rules="[rules.required]"
                          v-model="newCategoryName"
                          :placeholder="$t('addProduct.categoryName')"
                          rounded
                          outlined
                          filled
                          :color="siteColor.button_color"
                        ></v-text-field> -->
                        <p>
                          Parent name :
                          <span style="color: blue; font-size: 25px">{{
                            parentCategory.name
                          }}</span>
                        </p>
                      </v-col>
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="newCategoryName"
                          :placeholder="$t('addProduct.categoryName')"
                          rounded
                          filled
                          outlined
                          :color="siteColor.button_color"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          :rules="[rules.required]"
                          v-model="categoryArabicName"
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
                      @click="requestNewCategoryAndItem('child')"
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
                    <h2>{{ $t("addProduct.requestParent") }}</h2>
                  </v-row>

                  <v-form justify="center" v-model="addingItemsValidation">
                    <v-row justify="center">
                      <v-col cols="7" lg="3" sm="4" md="3">
                        <v-text-field
                          v-model="newParentCategory"
                          :placeholder="$t('addProduct.requestParent')"
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
                          v-model="newParentCategoryArabic"
                          :placeholder="$t('addProduct.categoryArabicName')"
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
                          v-model="newParentDescription"
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
                      @click="requestNewCategoryAndItem('parent')"
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
                  @click="addProduct"
                  rounded
                  :color="siteColor.button_color"
                  :disabled="enableAddCondition"
                >
                  <span
                    :style="`color:${siteColor.button_text_color};font-size: 18px`"
                    >{{ $t("addProduct.addProduct") }}</span
                  >
                </v-btn>
              </v-col>

              <v-col cols="12" lg="4" sm="12" md="4">
                <v-btn
                  @click="$router.push(`/${$i18n.locale}/myProducts`)"
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
  components: {
    VSwatches: () => import("vue-swatches"),
  },

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
    category() {
      return this.$store.state.Home.category;
    },
    allCategories() {
      return this.$store.state.Home.allCategories;
    },
    siteLanguage() {
      return this.$store.state.Home.siteLanguage;
    },
    categoriesTreeArray() {
      return this.$store.state.Home.categoriesTreeArray;
    },
    enableAddCondition() {
      if (!this.valid || this.chosenCategory == "") return true;
      else return false;
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
      chosenColors: [],
      size: "",
      discountAmount: "",
      description: "",
      productCurrency: "egp",
      currencies: ["egp", "usd"],
      stock: "",
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
      subItems: [],
      chosenCategory: "",
      parentCategory: "",

      categoryArabicName: "",
      newParentCategoryArabic: "",
      newParentCategory: "",
      newParentDescription: "",
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
      form.set("description", self.description);
      form.set(
        "category_id",
        self.chosenCategory ? self.chosenCategory.id : ""
      );
      form.set("colors", self.chosenColors);
      form.set("discount_amount", self.discountAmount);
      form.set("currency", self.productCurrency);
      form.set("siteLanguage", self.siteLanguage);
      form.set("inStock", self.stock);
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

    requestNewCategoryAndItem(requestType) {
      this.$store.dispatch("requestNewCategoryAndItem", {
        newCategoryDescription: this.newCategoryDescription,
        newParentCategoryArabic: this.newParentCategoryArabic,
        newParentCategory: this.newParentCategory,
        newCategoryName: this.newCategoryName,
        newParentDescription: this.newParentDescription,
        categoryArabicName: this.categoryArabicName,
        parentCategoryId: this.parentCategory.id,
        requestType: requestType,
      });
      this.addCategorySnackBar = true;
    },
    async categoryClicked(name) {
      var categoryId;
      this.categoryItems = [];
      this.choosenCategory = name;
      console.log(this.choosenCategory);
      console.log(name);
      if (this.siteLanguage == "en") {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_name == name) {
            console.log(this.allCategories[i].category_name, name);
            categoryId = this.allCategories[i].category_id;
            console.log("category id", categoryId);
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                console.log("id found");
                this.categoryItems.push(this.allCategories[x].category_name);
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_arabic_name == name) {
            categoryId = this.allCategories[i].category_id;
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                this.categoryItems.push(
                  this.allCategories[x].category_arabic_name
                );
              }
            }
          }
        }
      }
      console.log(this.categoryItems);
    },
    async filterProductsWithItem(name) {
      this.subItems = [];
      var categoryId;

      this.choosenCategory = name;
      console.log(this.choosenCategory);
      await this.$store.dispatch("filterProducts", {
        categoryItem: name,
        buttonPressed: "search",
        product_id: 0,
      });
      this.$store.commit("loadMoreType", { name: name, type: "item" });
      if (this.siteLanguage == "en") {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_name == name) {
            console.log(this.allCategories[i].category_name, name);
            categoryId = this.allCategories[i].category_id;
            console.log("category id", categoryId);
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                console.log("id found");
                this.subItems.push(this.allCategories[x].category_name);
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.allCategories.length; i++) {
          if (this.allCategories[i].category_arabic_name == name) {
            categoryId = this.allCategories[i].category_id;
            for (let x = 0; x < this.allCategories.length; x++) {
              if (this.allCategories[x].parent_id == categoryId) {
                this.subItems.push(this.allCategories[x].category_arabic_name);
              }
            }
          }
        }
      }
    },
    filterProductsWithSubItem(name) {
      this.choosenCategory = name;
      console.log(this.choosenCategory);
    },
    setCategory(catAr) {
      if (catAr.length != 0) {
        this.chosenCategory = catAr[0];
      } else {
        this.chosenCategory = "";
      }
      console.log(this.chosenCategory);
    },
    selectCategory(item) {
      console.log(item);
      this.parentCategory = item[0];
    },

    removeColor(color) {
      console.log("color clicked", color);
      var index = this.chosenColors.indexOf(color);
      this.chosenColors.splice(index, 1);
    },
  },

  watch: {
    color: function () {
      this.chosenColors.indexOf(this.color) == -1
        ? this.chosenColors.push(this.color)
        : alert("color exists");
      console.log(this.chosenColors);
    },
  },

  async created() {
    await this.$store.dispatch("getSiteColor");
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }
    await this.$store.dispatch("getCategoriesTree");
    // await this.$store.dispatch("getCategoryItems");
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
