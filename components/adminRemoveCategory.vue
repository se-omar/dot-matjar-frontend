<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <h2>{{ $t("adminPage.removeCategory") }}</h2>
      </v-row>

      <v-row justify="center">
        <v-col lg="3">
          <v-treeview
            return-object
            item-key="id"
            hoverable
            activatable
            selected-color="red"
            @update:active="setRemoveCategory"
            color="warning"
            :items="categoriesTreeArray"
          >
          </v-treeview>
          <template slot-scope="{ item }">
            <a @click="setRemoveCategory(item)">{{ item.name }}</a>
          </template>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="removeCatDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="!chosenRemoveCategory"
              :color="siteColor.button_color"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{ $t("adminPage.removeCategory") }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              {{ $t("adminPage.sure") }}
            </v-card-title>

            <v-card-text>
              {{ $t("adminPage.happensIfDelete") }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                :disabled="!chosenRemoveCategory"
                color="primary"
                text
                @click="removeCategory"
              >
                {{ $t("adminPage.accept") }}
              </v-btn>
              <v-btn color="primary" text @click="removeCatDialog = false">
                {{ $t("adminPage.cancel") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "remove-category",
  async created() {
    await this.$store.dispatch("getCategoriesTree");
  },

  data() {
    return {
      removeCatDialog: false,
      chosenRemoveCategory: "",
    };
  },
  methods: {
    setRemoveCategory(catAr) {
      if (catAr.length != 0) {
        this.chosenRemoveCategory = catAr[0];
      } else {
        this.chosenRemoveCategory = "";
      }
      console.log(this.chosenRemoveCategory);
    },

    async removeCategory() {
      await this.$store.dispatch(
        "removeCategory",
        this.chosenRemoveCategory.id
      );
      this.removeCatDialog = false;
      setTimeout(() => {
        location.reload();
      }, 1000);
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