<template>
  <v-app>
    <toolbar />
    <v-row justify="center">
      <p class="display-1 mt-8">All Suppliers</p>
    </v-row>

    <v-row>
      <v-col
        class="mb-15"
        v-for="supplier in suppliers"
        :key="supplier.user_id"
        lg="2"
        md="4"
        sm="6"
        cols="6"
      >
        <v-card @click="supplierClicked(supplier)">
          <supplier :supplier="supplier"></supplier>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn large class="red darken-4 mb-15 white--text" @click="loadMore">load more</v-btn>
    </v-row>
  </v-app>
</template>

<script>
import toolbar from "../components/toolbar";
import supplier from "../components/supplier";
export default {
  async created() {
    await this.$store.dispatch("refreshCurrentUser");
    this.$store.dispatch("getSuppliers", {
      supplierFilterFlag: this.supplierFilterFlag,
    });
  },

  data: () => {
    return {
      supplierFilterFlag: false,
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    suppliers() {
      return this.$store.state.suppliers;
    },

    supplier() {
      return this.$store.state.supplier;
    },
  },

  methods: {
    loadMore() {
      var self = this;
      self.$store.dispatch("getSuppliers", this.supplierFilterFlag);
      // window.onscroll = function () {
      //   console.log(this.suppliers);
      //   // let bottomOfWindow =
      //   //   document.documentElement.scrollTop + window.innerHeight ===
      //   //   document.documentElement.offsetHeight;
      //   // console.log(bottomOfWindow);
      //   console.log("false");
      //   if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      //     console.log(this.suppliers);
      //     console.log("true");
      //     self.$store.dispatch("getSuppliers");
      //   }
      // };
    },

    supplierClicked(supplier) {
      this.$store.commit("supplierPage", supplier);
      this.$router.push("/suppliersDashboard");
      console.log(this.supplier);
    },
  },

  components: {
    toolbar,
    supplier,
  },
};
</script>