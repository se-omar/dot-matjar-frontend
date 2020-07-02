<template>
  <div class="tool-bar">
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>eCommerce page</v-toolbar-title>
      <input
        v-model="toolbarSearch"
        @keyup="filterProducts"
        class="input is-rounded"
        type="text"
        placeholder="search products"
      />

      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/login')" text>
        <span>Login</span>
      </v-btn>

      <v-btn
        color="deep-purple accent-4"
        @click="$router.push('/reglogin').catch(err => {})"
      >reglogin</v-btn>

      <v-btn color="deep-purple accent-4">
        <span>Sign-Up</span>
      </v-btn>

      <v-btn text>
        <span>About</span>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolbarSearch: ""
    };
  },

  computed: {
    filteredProducts() {
      return this.$store.state.filteredProducts;
    },

    products() {
      return this.$store.state.products;
    }
  },

  methods: {
    filterProducts() {
      this.$store.dispatch("filterProducts", this.toolbarSearch);
    }
  }
};
</script>

<style scoped>
input {
  background-color: aliceblue;
  margin-left: 50px;
}
</style>