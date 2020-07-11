import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import router from '../router'
Vue.use(Vuex, axios,router);
export default new Vuex.Store({
  state: {
    row: {},
    products: [],
    filteredProducts: [],
    currentProduct: {},
    businesses: {},
    users: {},
    currentUser: {},
    dialog: false,
    requests: {},
  },

  mutations: {
    addRowData(state, payload) {
      state.row = payload;
    },

    getProducts(state, row) {
      state.products = row;
      state.filteredProducts = row;
    },

    getUsers(state, payload) {
      state.users = payload
    },

    filterProducts(state, payload) {
      state.filteredProducts =
        state.products.filter(row => row.product_name.indexOf(payload) > -1)
    },

    setCurrentProduct(state, payload) {
      state.currentProduct = payload;
    },

    toggleDialog(state) {
      state.dialog = !state.dialog;
    },

    activation() {
      console.log("enterrr mutation")
       this.$router.push('http://localhost:8080')
    },
    
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },

    getRequests(state, payload) {
      state.requests = payload;
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
   
   
   
    activation(context){
     
     
        
axios.put('http://localhost:3000/api/activate')
.then((data) => {
  console.log(data);
  context.commit('activation')
})

    
    },

  
   
   
    setCurrentProduct(context, product) {
      context.commit('setCurrentProduct', product)
    },

    toggleDialog(context) {
      context.commit('toggleDialog');
    },

    getUsers(context) {
      axios.get('http://localhost:3000/api/users').then(response => {
        context.commit('getUsers', response.data);
      })
    },

    getRequests(context) {
      axios.post("http://localhost:3000/api/recievedRequests", {
          user_id: 2
        })
        .then(response => {
          console.log(response.data);
          context.commit('getRequests', response.data);
        });
    }
  },

  modules: {},

})