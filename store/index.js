import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row: {},
    products: [],
    filteredProducts: []
  },

  mutations: {
    addRowData(state, payload) {
      state.row = payload;
    },

    getProducts(state, row) {
      state.products = row;
      state.filteredProducts = row;
    },

    filterProducts(state, payload) {
      state.filteredProducts =
        state.products.filter(row => row.product_name.indexOf(payload) > -1)
    }
  },

  actions: {
    getProducts(context) {
      axios.get('http://localhost:3000/api/products').then(response => {
        context.commit('getProducts', response.data);
      })
    },

    filterProducts(context, payload) {
      context.commit('filterProducts', payload);
    }
  },

  modules: {},

})