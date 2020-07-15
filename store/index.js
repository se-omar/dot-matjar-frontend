import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import router from '../router'
Vue.use(Vuex, axios, router);
export default new Vuex.Store({
  state: {
    row: {},
    products: [],
    filteredProducts: [],
    currentProduct: JSON.parse(localStorage.getItem('currentProduct')),
    businesses: {},
    users: {},
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    dialog: false,
    responseDialog: false,
    productRequestDialog: false,
    recievedRequests: {},
    sentRequests: {},
    currentRequest: {},
    currentUserEmail: localStorage.getItem('email'),
    currentUserPassword: localStorage.getItem('password'),
    viewResponseDetails: false
  },

  mutations: {
    validateLoginPage(state, response) {
      if (response.data.message !== "authentication successful") {
        alert(response.data.message);
      } else {
        // self.$store.commit("setCurrentUser", response.data.data);
        localStorage.setItem('email', response.data.data.email);
        localStorage.setItem('password', response.data.data.password)



        //this.$router.push("/home");
      }
    },

    doLogin(state, response) {
      if (response.data.message !== "authentication successful") {
        alert(response.data.message);
      } else {
        localStorage.setItem('currentUser', JSON.stringify(response.data.data));
        router.push('/home')
        console.log(state.currentUser);
      }
    },

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
      localStorage.setItem('currentProduct', JSON.stringify(payload));
      state.currentProduct = JSON.parse(localStorage.getItem('currentProduct'))

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

    getRecievedRequests(state, payload) {
      state.recievedRequests = payload;
    },

    getSentRequests(state, payload) {
      state.sentRequests = payload
    },

    getCurrentRequest(state, payload) {
      state.currentRequest = payload;
    },

    toggleResponse(state) {
      state.responseDialog = !state.responseDialog;
    },

    productToggleResponse(state) {
      state.productRequestDialog = !state.productRequestDialog;
    },

  },

  actions: {
    validateLoginPage(context, {
      email,
      password
    }) {
      axios
        .post("http://localhost:3000/api/login", {
          email,
          password,
        })
        .then((response) => {
          context.commit('validateLoginPage', response);
          context.dispatch('doLogin')
        })
        .catch((error) => {
          console.log(error);
        });
    },

    doLogin(context) {
      var email = context.state.currentUserEmail;
      var password = context.state.currentUserPassword;
      if (email === '') {
        console.log('email empty')

        return
      }
      axios.post("http://localhost:3000/api/login", {
          email,
          password
        }).then((response) => {
          context.commit('doLogin', response)
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProducts(context) {
      axios.get('http://localhost:3000/api/products').then(response => {
        context.commit('getProducts', response.data);
      })
    },

    filterProducts(context, payload) {
      context.commit('filterProducts', payload);
    },

    completedata(commit, {
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
    }) {

      axios.put('http://localhost:3000/api/completedata/3', {
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

    activation(context) {
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

    getRecievedRequests(context) {
      axios.post("http://localhost:3000/api/recievedRequests", {
          user_id: context.state.currentUser.user_id
        })
        .then(response => {
          console.log(response.data);
          context.commit('getRecievedRequests', response.data);
        });
    },

    getSentRequests(context) {
      axios.post("http://localhost:3000/api/sentRequests", {
          user_id: context.state.currentUser.user_id
        })
        .then(response => {
          console.log(response.data);
          context.commit('getSentRequests', response.data);
        });
    },

    getCurrentRequest(context, request) {
      context.commit('getCurrentRequest', request)
    },

    sendRequest(context, requestDetails) {
      if (context.state.currentUser.user_id === context.state.currentProduct.bussiness.user.user_id) {
        alert('لا يمكن ارسال طلب لنفسك');
        return

      }
      axios.post('http://localhost:3000/api/sendRequest', {
        by_user_id: context.state.currentUser.user_id,
        to_user_id: context.state.currentProduct.bussiness.user.user_id,
        request_details: requestDetails,
        request_date: new Date(),
        product_id: context.state.currentProduct.product_id,
        //to: context.state.currentProduct.bussiness.user.email
      }).then(response => {
        console.log(response)
        alert('تم ارسال الطلب بنجاح')
      })
    },

    sendRequestResponse(context, responseDetails) {
      axios.post('http://localhost:3000/api/sendRequestResponse', {
        requests_id: context.state.currentRequest.requests_id,
        request_response: responseDetails
      }).then(response => {
        if (response.data === 'response added successfully')
          alert('تم ارسال الرد بنجاح')
        console.log(response)
      })
    }
  },

  modules: {},

})