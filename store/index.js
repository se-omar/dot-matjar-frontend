import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import router from '../router'
import Home from './modules/Home'
import AdminPage from './modules/AdminPage'
import Cart from './modules/Cart'
import Dashboard from './modules/Dashboard'
import Orders from './modules/Orders'
import ProductDetails from './modules/ProductDetails'
import RegisterLogin from './modules/RegisterLogin'
import Requests from './modules/Requests'
import SupplierPage from './modules/SupplierPage'
Vue.use(Vuex, axios, router);


export default new Vuex.Store({
  state: {
    nodeHost: "http://localhost:3000/",
  },

  mutations: {
    activation() {
      this.$router.push('http://localhost:8080')
    },

    removeCurrentUser(state) {
      state.Home.currentUser = '';
      state.Cart.table = ''
      localStorage.removeItem('loginToken');
      state.RegisterLogin.loginToken = ''
      localStorage.removeItem('currentEmail');
      localStorage.removeItem('currentPassword');
      localStorage.removeItem('recievedRequests');
      localStorage.removeItem('sentRequests');
      localStorage.removeItem('myProducts');
      localStorage.removeItem('cartItems');
    },

    profilePhoto(state, photoPath) {
      state.profilephoto = photoPath
    },

    // filterProductsCategory(state, payload) {
    //   state.filteredProducts =
    //     state.products.filter(row => row.category_name.indexOf(payload) > -1)
    // },

    changingSiteColor(state, color) {
      localStorage.setItem('siteColor', color)
      state.Home.siteColor = localStorage.getItem('siteColor')
    },
  },


  actions: {
    profilePhoto(context, form) {
      axios.post('http://localhost:3000/api/profilePhoto', form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response)
          context.dispatch('doLogin', {
            email: localStorage.getItem('currentEmail'),
            password: localStorage.getItem('currentPassword')
          })
        }).catch(err => {
          console.log('ERROR', err)
        })
    },

    activation(context) {
      axios.put('http://localhost:3000/api/activate')
        .then((data) => {
          console.log(data);
          context.commit('activation')
        })
    },

    // filterProductsCategory(context, payload) {
    //   context.commit('filterProductsCategory', payload)
    // },

    changingSiteColor(context, pickerColor) {
      axios.put('http://localhost:3000/api/changeSiteColor', { user_id: context.state.Home.currentUser.user_id, site_color: pickerColor })
        .then(response => {
          console.log(response.data.message)
          context.commit('changingSiteColor', pickerColor)
        })
    },
  },

  modules: {
    Home, AdminPage, Cart, Dashboard, Orders,
    ProductDetails, RegisterLogin, Requests, SupplierPage,
  },

})