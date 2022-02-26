<template>
  <div id="container">
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title style="font-weight: bold; font-size: 25px"
          >Category</v-list-item-title
        >
      </v-list-item>

      <v-list-group
        v-for="(cat, index) in category"
        :key="index"
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-action style="font-weight: bold"
            ><span style="font-weight: bold; font-size: 18px">{{
              cat.category_name
            }}</span></v-list-item-action
          >
        </template>

        <!-- <v-list-item
                  style="padding-left: 100px"
                  v-for="(item, i) in categoryItems"
                  :key="i"
                  @click="filterProductsWithItem(item)"
                >
                  {{ item.category_name }}
                </v-list-item> -->
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    category: Array,
  },
  methods: {
    //     async mouseOver(cat) {
    //   var categoryId;
    //   this.categoryItems = [];
    //   categoryId = cat.category_id;
    //   this.allCategories.forEach((element) => {
    //     if (element.parent_id == categoryId) {
    //       this.categoryItems.push(element);
    //     }
    //   });
    //   await this.$store.dispatch("filterProducts", {
    //     category_name: cat.category_name,
    //     buttonPressed: "search",
    //     product_id: 0,
    //   });
    //   this.$store.commit("loadMoreType", {
    //     category: cat,
    //     type: "category",
    //   });
    // },
  },
};
</script>