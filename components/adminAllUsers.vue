<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            dense
            :placeholder="$t('allUsers.searchUserByName')"
            outlined
            rounded
            v-model="searchUserByName"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn
            @click="filterSuppliers"
            rounded
            :color="siteColor.button_color"
            ><span :style="`color:${siteColor.button_text_color}`">{{
              $t("allUsers.search")
            }}</span></v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="ml-3 mr-3"
          v-for="user in allUsers"
          :key="user.user_id"
          lg="2"
          md="4"
          sm="6"
          cols="6"
        >
          <supplier minWidth="115%" :supplier="user"></supplier>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-btn rounded :color="siteColor.button_color" @click="loadmore"
        ><span :style="`color:${siteColor.button_text_color}`">{{
          $t("allUsers.loadmore")
        }}</span></v-btn
      >
    </v-row>
  </v-app>
</template>



<script>
export default {
  name: "all-users",
  data: () => ({
    searchUserByName: "",
  }),
  methods: {
    loadmore() {
      this.$store.dispatch("getAllUsers");
    },

    filterSuppliers() {
      this.$store.dispatch("filterSuppliers", {
        supplierName: this.supplierName,
      });
    },
  },
  async created() {
    await this.$store.dispatch("getSiteColor");
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    allUsers() {
      return this.$store.state.Home.allUsers;
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
  components: {
    supplier: () => import("../components/supplier"),
  },
};
</script>


<style scoped>
div {
  font-size: 17px;
}
</style>