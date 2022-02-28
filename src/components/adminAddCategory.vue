<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col lg="12">
          <h2 class="text-center">
            {{ $t("adminPage.addNewCategory") }}
          </h2>
        </v-col>

        <v-col lg="12">
          <h3 class="text-center">
            {{ $t("adminPage.catWillBeChild") }}
          </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col lg="8">
          <v-row justify="center">
            <v-col lg="5">
              <v-text-field
                dense
                :placeholder="$t('adminPage.catName')"
                rounded
                :rules="[rules.required]"
                filled
                v-model="addCategoryName"
              ></v-text-field>
            </v-col>

            <v-col lg="5">
              <v-text-field
                dense
                :placeholder="$t('adminPage.catArName')"
                rounded
                :rules="[rules.required]"
                filled
                v-model="addCategoryArName"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col lg="3">
          <v-treeview
            return-object
            item-key="id"
            hoverable
            activatable
            selected-color="red"
            @update:active="setCategory"
            color="warning"
            :items="categoriesTreeArray"
          >
          </v-treeview>
          <template slot-scope="{ item }">
            <a @click="setCategory(item)">{{ item.name }}</a>
          </template>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="2">
          <v-btn
            @click="addCategory"
            block
            :color="siteColor.button_color"
            class="text-center"
          >
            {{ $t("adminPage.addCategory") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "add-category",
  async created() {
    await this.$store.dispatch("getCategoriesTree");
  },

  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        min_max_width: (v) => (v > 1 && v <= 12) || "must be between 1 and 12",
        min_max_height: (v) => (v > 0 && v <= 3000) || "no more than 3000",
      },
      addCategoryName: "",
      addCategoryArName: "",
    };
  },
  methods: {
    setCategory(catAr) {
      if (catAr.length != 0) {
        this.chosenCategory = catAr[0];
      } else {
        this.chosenCategory = "";
      }
      console.log(this.chosenCategory);
    },

    async addCategory() {
      if (!this.addCategoryName || !this.addCategoryArName) {
        alert("please fill category english and arabic name");
      } else {
        console.log(this.chosenCategory);
        console.log(this.addCategoryName);
        await this.$store.dispatch("adminPageAddCategory", {
          parentCat: this.chosenCategory,
          catName: this.addCategoryName,
          catArName: this.addCategoryArName,
        });
      }
    },
  },

  computed: {
    categoriesTreeArray() {
      return this.$store.state.Home.categoriesTreeArray;
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
  },
};
</script>