import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

Vue.use(Vuex, axios);

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
    },
    completedata(commit,{
      national_number,
          gender,
          full_arabic_name,
          full_english_name,
          birthdate,
          qualifications,
          job,
          governorate,
          village,
          center,
          telephone_number,
          phone_number,
          fax,
          facebook_account,
          linkedin,
          website,
          address
    }){

axios.put('http://localhost:3000/api/completedata/3',{
  national_number,
  gender,
  full_arabic_name,
  full_english_name,
  birthdate,
  qualifications,
  job,
  governorate,
  village,
  center,
  telephone_number,
  phone_number,
  fax,
  facebook_account,
  linkedin,
  website,
  address
})
    },

    register(commit, {
      email,
      password,
      full_arabic_name,
      mobile_number,
      national_number
    }) {
      
      axios.post('http://localhost:3000/api/signup', {
          email,
          password,
          full_arabic_name,
          mobile_number,
          national_number
        })
        .then((data, status) => {
          if (status === 201) console.log("Account Created")
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

  modules: {},

})