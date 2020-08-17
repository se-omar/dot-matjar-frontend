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
    recievedRequests: JSON.parse(localStorage.getItem('recievedRequests')),
    sentRequests: JSON.parse(localStorage.getItem('sentRequests')),
    currentRequest: {},
    currentUserEmail: localStorage.getItem('currentEmail'),
    currentUserPassword: localStorage.getItem('currentPassword'),
    viewResponseDetails: false,
    myProducts: JSON.parse(localStorage.getItem('myProducts')),
    nodeHost: "http://localhost:3000/",
    viewRequestDetails: false,
    cart: [],
    table: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
    category: [],
    incart: '',
    paymentToken: localStorage.getItem('paymentToken'),
    totalPrice: localStorage.getItem('totalPrice'),
    productsQuantityArray: JSON.parse(localStorage.getItem('quantity')),
    orders: [],
    orderProducts: [],
  },

  mutations: {
    validateLoginPage(state, response) {
      if (response.data.message !== "authenitcation succesfull") {
        alert(response.data);
      } else {
        localStorage.setItem('currentEmail', response.data.data.email);
        localStorage.setItem('currentPassword', response.data.data.password);
        console.log(localStorage.getItem('currentEmail'));
      }
    },

    doLogin(state, response) {
      //debugger
      if (response.data.message != "authenitcation succesfull") {
        console.log(response.data.message);
      } else {
        localStorage.setItem('currentUser', JSON.stringify(response.data.data));
        console.log(JSON.parse(localStorage.getItem('currentUser')));
        state.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        router.push('/home').catch(() => {})
        console.log('current user is: ', state.currentUser);
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

    filterProducts(state, products) {
      //      if(!state.filteredProducts){
      // state.filteredProducts =
      // state.products.filter(row => row.product_name.indexOf(payload) > -1 )
      // }
      // else{
      //   state.filteredProducts=
      //   state.filteredProducts.filter(row => row.product_name.indexOf(payload) > -1 )

      // }

      state.filteredProducts = products
    },

    setCurrentProduct(state, payload) {
      localStorage.setItem('currentProduct', JSON.stringify(payload));
      state.currentProduct = JSON.parse(localStorage.getItem('currentProduct'))

    },

    toggleDialog(state) {
      state.dialog = !state.dialog;
    },

    activation() {

      this.$router.push('http://localhost:8080')
    },


    getRecievedRequests(state, payload) {
      localStorage.setItem('recievedRequests', JSON.stringify(payload))
      state.recievedRequests = JSON.parse(localStorage.getItem('recievedRequests'));
    },

    getSentRequests(state, payload) {
      localStorage.setItem('sentRequests', JSON.stringify(payload))
      state.sentRequests = JSON.parse(localStorage.getItem('sentRequests'));
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

    getMyProducts(state, myProducts) {
      localStorage.setItem('myProducts', JSON.stringify(myProducts))
      state.myProducts = JSON.parse(localStorage.getItem('myProducts'));
    },

    removeCurrentUser(state) {
      localStorage.removeItem('currentUser');
      state.currentUser = '';
      state.table = ''
      localStorage.removeItem('currentEmail');
      localStorage.removeItem('currentPassword');
      localStorage.removeItem('recievedRequests');
      localStorage.removeItem('sentRequests');
      localStorage.removeItem('myProducts');
      localStorage.removeItem('cartItems');

      console.log(state.currentUser)

    },
    profilePhoto(state, photoPath) {
      state.profilephoto = photoPath
    },

    viewRequestDetails(state) {
      state.viewRequestDetails = true
    },

    viewRequestCard(state) {
      state.viewRequestDetails = false
    },
    cart(state, product) {
      state.cart.push(product)
    },

    table(state, data) {
      localStorage.setItem('cartItems', JSON.stringify(data))
      state.table = JSON.parse(localStorage.getItem('cartItems'))
    },

    removeProductFromCart(state, id) {
      console.log(state.table)
      for (var i = 0; i < state.table.length; i++) {
        if (state.table[i].product_id == id) {
          state.table.splice(i, 1)
          localStorage.setItem('cartItems', JSON.stringify(state.table))
          console.log('splice is:', state.table)
        }
      }
    },

    localStorage(state, products) {
      localStorage.setItem('cartItems', JSON.stringify(products))
      state.table = JSON.parse(localStorage.getItem('cartItems'))

    },

    emptySearch(state) {
      state.filteredProducts = state.products
    },
    cleanCart(state) {
      var cartLength = state.table.length;
      state.table.splice(0, cartLength)
      localStorage.setItem('cartItems', JSON.stringify(state.table))


    },
    categoriesDB(state, data) {
      console.log(data)
      state.category = data.map(e => {
        return e.category_name
      })
      console.log(state.category)
    },


    setPaymentToken(state, token) {
      localStorage.setItem('paymentToken', token);
      state.paymentToken = localStorage.getItem('paymentToken');
    },

    filterProductsCategory(state, payload) {
      state.filteredProducts =
        state.products.filter(row => row.category_name.indexOf(payload) > -1)
    },

    putTotalPriceInStore(state, total) {
      localStorage.setItem('totalPrice', total)
      state.totalPrice = localStorage.getItem('totalPrice');
    },

    putQuantityInStore(state, quantity) {
      localStorage.setItem('quantity', JSON.stringify(quantity))
      state.productsQuantityArray = JSON.parse(localStorage.getItem('quantity'))
    },
    getOrders(state, order) {
      console.log('orer si', order)
      state.orders = order
      console.log('state order', state.order)
    },
    getOrderProducts(state, response) {
      var products = response.map(e => {

        return e.product
      })
      state.orderProducts = products
      console.log('commit products', state.orderProducts)
    }

  },



  actions: {
    profilePhoto(context, form) {
      axios.post('http://localhost:3000/api/profilePhoto', form, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log("the image path", response.data.data)
          console.log(response.data.message)
          console.log(localStorage.getItem('currentEmail'))
          console.log("=======", context.state.currentUser.profile_photo)
          context.dispatch('doLogin', {
            email: localStorage.getItem('currentEmail'),
            password: localStorage.getItem('currentPassword')
          })
        }).catch(err => {
          console.log('ERROR', err)
        })
    },
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
          console.log(localStorage.getItem('currentEmail'))
          console.log(localStorage.getItem('currentPassword'))
          context.dispatch('doLogin', {
            email: localStorage.getItem('currentEmail'),
            password: localStorage.getItem('currentPassword')
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },

    doLogin(context, {
      email,
      password
    }) {
      console.log("dologin starts")
      if (email === '') {
        console.log('email empty')

        return
      }
      console.log('dologin email', email)
      axios.post("http://localhost:3000/api/login", {
          email,
          password
        }).then((response) => {
          console.log('dologin response', response)
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

    filterProducts(context, {
      product_name,
      category_name
    }) {
      console.log(product_name)
      axios.put('http://localhost:3000/api/filterProducts', {
          product_name,
          category_name
        })
        .then(products => {
          console.log('message:', products.data.message)
          console.log('products:', products.data.data)

          context.commit('filterProducts', products.data.data);

        })


    },

    completedata(context, {
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
      phone_number,
      mobile_number,
      fax,
      facebook_account,
      linkedin,
      website,
      address,
      email
    }) {

      axios.put('http://localhost:3000/api/completedata', {
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
          phone_number,
          mobile_number,
          fax,
          facebook_account,
          linkedin,
          website,
          address,
          email
        })
        .then(response => {
          alert(response.data.message)
          console.log(response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    register(context, {
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
        .then(response => {
          if (response.data.message) {
            alert(response.data.message)
          } else {
            console.log("Error in database")
          }
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
    },

    getMyProducts(context) {
      console.log(context.state.currentUser.user_id);
      axios.post("http://localhost:3000/api/myProducts", {
        user_id: context.state.currentUser.user_id
      }).then(response => {
        console.log(response)
        context.commit('getMyProducts', response.data)
      })
    },

    businessOwnerData(context, {
      bussiness_name,
      bussiness_activity,
      enterprice_national_number,
      user_id
    }) {
      console.log(bussiness_activity)
      axios.post('http://localhost:3000/api/businessOwnerData', {
        bussiness_name,
        bussiness_activity,
        enterprice_national_number,
        user_id
      }).then(response => {
        if (response) {
          alert(response.data.message)
        } else {
          alert("Something went wrong")

        }
      })
    },
    cart(context, product_id) {
      axios.post('http://localhost:3000/api/cart', {
          product_id: product_id,
          user_id: context.state.currentUser.user_id

        })
        .then(response => {
          console.log(response.data)

        })





    },
    table(context, product) {
      axios.post('http://localhost:3000/api/table', {
          user_id: context.state.currentUser.user_id,
          product_id: product.product_id
        })
        .then(response => {
          console.log(response.data.message)
        })

    },
    removeProductFromCart(context, id) {
      axios.put('http://localhost:3000/api/remove', {
          product_id: id
        })
        .then(response => {
          console.log(response.data)
          context.commit('removeProductFromCart', id)
        })

    },
    localStorage(context) {
      axios.put('http://localhost:3000/api/getProducts', {
          user_id: context.state.currentUser.user_id
        })
        .then((response) => {
          context.commit('localStorage', response.data.data)
        })
    },

    cleanCart(context) {

      context.commit('cleanCart')
      axios.put('http://localhost:3000/api/cleanCart', {
          user_id: context.state.currentUser.user_id
        })
        .then(response => {
          console.log(response.data.message)
        })
    },

    categoriesDB(context) {
      axios.get('http://localhost:3000/api/selectCategory')
        .then((res) => {
          console.log(res.data.data)
          context.commit('categoriesDB', res.data.data)
        })
    },
    getOrderProducts(context, id) {
      console.log('id', id)
      axios.put('http://localhost:3000/api/getOrderProducts', {
          order_id: id
        })
        .then(response => {
          console.log('Products', response.data)
          context.commit('getOrderProducts', response.data)
        })


    },
    getOrders(context) {
      console.log(context.state.currentUser.user_id)
      axios.put('http://localhost:3000/api/getOrders', {
          user_id: context.state.currentUser.user_id
        })
        .then(orders => {

          context.commit('getOrders', orders.data.data)
        })
    }


    // filterProductsCategory(context, payload) {
    //   context.commit('filterProductsCategory', payload)
    // }

  },

  modules: {},

})