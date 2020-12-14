<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <p class="display-1 mt-8">{{ $t("adminPage.allSuppliers") }}</p>
      </v-row>

      <v-row justify="center">
        <v-col lg="3" cols="12" sm="12" md="3">
          <v-text-field
            @keyup="emptySupplierName"
            dense
            rounded
            filled
            v-model="supplierName"
            :placeholder="$t('adminPage.supplierNameSearch')"
          ></v-text-field>
        </v-col>

        <v-col lg="3" cols="12" sm="12" md="3">
          <v-select
            :items="egyptGovernorates"
            :placeholder="$t('adminPage.governorate')"
            dense
            rounded
            filled
            v-model="governorate"
            @change="getCountryRegions()"
          ></v-select>
        </v-col>

        <v-col lg="3" cols="12" sm="12" md="3">
          <v-select
            :items="regions"
            :placeholder="$t('adminPage.region')"
            dense
            rounded
            filled
            v-model="region"
          ></v-select>
        </v-col>

        <v-col lg="4" cols="7" md="4" sm="4">
          <v-btn
            small
            class="white--text mt-1"
            @click="filterSuppliers"
            :color="siteColor.button_color"
          >
            <span :style="`color:${siteColor.button_text_color}`">{{
              $t("adminPage.search")
            }}</span></v-btn
          >
        </v-col>

        <v-col lg="3" cols="7" md="3" sm="3">
          <v-btn
            small
            class="white--text mt-1"
            @click="All"
            :color="siteColor.button_color"
            ><span :style="`color:${siteColor.button_text_color}`"
              >All</span
            ></v-btn
          >
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          class="ms-3"
          v-for="supplier in suppliers"
          :key="supplier.user_id"
          lg="3"
          md="3"
          cols="8"
          sm="4"
        >
          <supplier :supplier="supplier"></supplier>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          large
          :color="siteColor.button_color"
          class="mb-15 white--text"
          @click="loadMore"
          ><span :style="`color:${siteColor.button_text_color}`">{{
            $t("adminPage.loadmore")
          }}</span></v-btn
        >
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "all-suppliers",
  data() {
    return {
      supplierName: "",
      governorate: "",
      region: "",
      supplierFilterFlag: false,
    };
  },

  methods: {
    emptySupplierName() {
      if (!this.supplierName) {
        this.$store.commit("emptySupplierName");
      }
    },

    getCountryRegions() {
      this.$store.dispatch("getRegions", this.governorate);
    },

    filterSuppliers() {
      this.supplierFilterFlag = true;
      this.$store.dispatch("filterSuppliers", {
        supplierName: this.supplierName,
        governorate: this.governorate,
        region: this.region,
      });
    },

    async loadMore() {
      this.isLoading = true;
      var self = this;
      await self.$store.dispatch("getSuppliers", this.supplierFilterFlag);
      this.isLoading = false;
    },

    All() {
      this.supplierFilterFlag = false;
      this.$store.commit("emptySearch");
      this.$store.commit("emptySupplierName");
    },
  },

  computed: {
    egyptGovernorates() {
      return this.$store.state.Home.governorates;
    },

    regions() {
      return this.$store.state.Home.regions;
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

    suppliers() {
      return this.$store.state.Home.suppliers;
    },
  },

  components: {
    Supplier: () => import("./supplier"),
  },
};
</script>
