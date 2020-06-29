import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [{
        name: 'name1',
        price: 10
      },
      {
        name: 'name2',
        price: 20
      },
      {
        name: 'name3',
        price: 30
      },
      {
        name: 'name4',
        price: 40
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
})