import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row: {},
    productRow: ''
  },
  mutations: {
    addRowData(state, payload) {
      state.row = payload;
    },

    getProductRow(state, row) {
      state.productRow = row;
    }
  },
  actions: {
    getProductRow(context) {
      axios.get('http://localhost:3000/api/products').then(response => {
        context.commit('getProductRow', response.data[1])
        console.log(response.data[1].product_name);
      })
    }
  },
  modules: {}
})