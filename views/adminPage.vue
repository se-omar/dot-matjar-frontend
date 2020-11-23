<template>
  <v-app>
    <div v-if="currentUser.user_type == 'admin'">
      <div class="vld-parent">
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="true"
        ></loading>
      </div>

      <v-row>
        <v-col lg="3" cols="12" sm="12" md="3">
          <div>
            <v-navigation-drawer permanent>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ $t("adminPage.adminDashboard") }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list nav>
                <v-list-item
                  @click="currentSection = pageSections.addUser"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.addUser") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.allUsers"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.allUsers") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item @click="currentSection = pageSections.addCat" link>
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.addCategory") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.removeCat"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.removeCategory") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.addRemCountry"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.addOrRemoveCountry") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.editCarousel"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.editCarousel") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.topTenSupp"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.top10Suppliers") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.topSuppYear"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{
                      $t("adminPage.topYearMonthSuppliers")
                    }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.suppRanking"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.suppliersChart") }}</v-list-item-title
                  >
                </v-list-item>

                <v-list-item
                  @click="currentSection = pageSections.allSupp"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("adminPage.allSuppliers") }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  @click="currentSection = pageSections.defaultComp"
                  link
                >
                  <v-list-item-icon> </v-list-item-icon>
                  <v-list-item-title>Choose Shipping Company</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </div>
        </v-col>

        <v-col :class="$vuetify.rtl == true ? 'mr-n13' : 'ml-n13'" lg="9">
          <div v-if="currentSection == pageSections.addUser">
            <add-user></add-user>
          </div>

          <div v-if="currentSection == pageSections.allUsers">
            <all-users></all-users>
          </div>

          <div v-if="currentSection == pageSections.addCat">
            <add-category></add-category>
          </div>

          <!-- Removing category items -->
          <div v-if="currentSection == pageSections.removeCat">
            <remove-category></remove-category>
          </div>

          <!-- <v-divider class="mt-7"></v-divider> -->

          <div v-if="currentSection == pageSections.addRemCountry">
            <add-remove-country></add-remove-country>
          </div>

          <!-- <v-divider class="mx-16"></v-divider> -->
          <div v-if="currentSection == pageSections.editCarousel">
            <edit-carousel></edit-carousel>
          </div>

          <div v-if="currentSection == pageSections.topTenSupp">
            <top-ten-suppliers></top-ten-suppliers>
          </div>

          <div v-if="currentSection == pageSections.topSuppYear">
            <top-year-suppliers></top-year-suppliers>
          </div>

          <div v-if="currentSection == pageSections.suppRanking">
            <supp-ranking-chart></supp-ranking-chart>
          </div>

          <!-- <v-divider></v-divider> -->

          <div v-if="currentSection == pageSections.allSupp">
            <all-suppliers></all-suppliers>
          </div>
          <div v-if="currentSection == pageSections.defaultComp">
            <defaultShippingCompany></defaultShippingCompany>
          </div>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <v-row justify="center">
        <h1>you don't have permission to view this page</h1>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  async created() {
    if (localStorage.getItem("loginToken")) {
      await this.$store.dispatch("refreshCurrentUser");
    }

    await this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: false,
    });
  },

  data: () => {
    return {
      supplierFilterFlag: false,
      isLoading: false,
      pageSections: {
        addUser: 0,
        allUsers: 1,
        addCat: 2,
        removeCat: 3,
        addRemCountry: 4,
        editCarousel: 5,
        topTenSupp: 6,
        topSuppYear: 7,
        suppRanking: 8,
        allSupp: 9,
        defaultComp: 10,
      },
      currentSection: 0,
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.Home.currentUser;
    },
  },

  components: {
    AddUser: () => import("../components/adminAddUser"),
    AllUsers: () => import("../components/adminAllUsers"),
    AddCategory: () => import("../components/adminAddCategory"),
    removeCategory: () => import("../components/adminRemoveCategory"),
    AddRemoveCountry: () => import("../components/adminAddRemCountry"),
    EditCarousel: () => import("../components/adminEditCarousel"),
    TopTenSuppliers: () => import("../components/adminTopTenSupp"),
    TopYearSuppliers: () => import("../components/adminTopYearSuppliers"),
    SuppRankingChart: () => import("../components/suppRankingChart"),
    AllSuppliers: () => import("../components/adminAllSuppliers"),
    defaultShippingCompany: () =>
      import("../components/adminDefaultShippingCompany"),
  },
};
</script>
