import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row: {}
  },
  mutations: {
    addRowData(state, payload) {
      state.row = payload;
    }
  },
  actions: {},
  modules: {}
})