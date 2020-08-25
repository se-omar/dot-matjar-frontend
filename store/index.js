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
    currentUser: '',
    dialog: false,
    responseDialog: false,
    productRequestDialog: false,
    recievedRequests: JSON.parse(localStorage.getItem('recievedRequests')),
    sentRequests: JSON.parse(localStorage.getItem('sentRequests')),
    currentRequest: {},
    currentUserEmail: localStorage.getItem('currentEmail'),
    currentUserPassword: localStorage.getItem('currentPassword'),
    viewResponseDetails: false,
    myProducts: [],
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
    topProduct: {},
    leastProduct: {},
    notSortedDashboardOrders: [],
    supplierPageColor: localStorage.getItem('supplierPageColor'),
    suppliers: [],
    allSuppliers: [],
    supplier: JSON.parse(localStorage.getItem('supplier')),
    loginToken: localStorage.getItem('loginToken'),
    supplierProducts: JSON.parse(localStorage.getItem('supplierProducts')),
    regions: [],
    governorates: []
  },

  mutations: {
    login(state, token) {
      localStorage.setItem('loginToken', token)
      state.loginToken = localStorage.getItem('loginToken');
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
      state.myProducts = myProducts;
    },

    getSupplierProducts(state, supplierProducts) {
      localStorage.setItem('supplierProducts', JSON.stringify(supplierProducts))
      state.supplierProducts = JSON.parse(localStorage.getItem('supplierProducts'));
    },

    removeCurrentUser(state) {
      state.currentUser = '';
      state.table = ''
      localStorage.removeItem('loginToken');
      state.loginToken = ''
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
    },
    getTopSellingProduct(state, topProduct) {
      state.topProduct = topProduct;
    },

    getLeastSellingProduct(state, leastProduct) {
      state.leastProduct = leastProduct;
    },

    getMonthlySales(state, orders) {
      state.notSortedDashboardOrders = orders
    },
    supplierPageColor(state, color) {
      localStorage.setItem('supplierPageColor', color)
      state.supplierPageColor = localStorage.getItem('supplierPageColor')
    },
    getSuppliers(state, suppliers) {
      state.suppliers.push(...suppliers);
      state.allSuppliers.push(...suppliers);
    },

    filterSuppliers(state, users) {
      state.suppliers = users;
    },

    emptySupplierName(state) {
      state.suppliers = state.allSuppliers
    },

    emptySupplierLocation(state) {
      state.suppliers = state.allSuppliers;
    },

    refreshCurrentUser(state, user) {
      console.log('new user is ', user)
      state.currentUser = user;
    },


    supplierPage(state, supplier) {
      localStorage.setItem('supplier', JSON.stringify(supplier))
      state.supplier = JSON.parse(localStorage.getItem('supplier'))

      console.log(state.supplier)
      console.log('supplier worked')
    },

    getSupplier(state, supplier) {


      localStorage.setItem('supplier', JSON.stringify(supplier))
      state.supplier = JSON.parse(localStorage.getItem('supplier'))
      localStorage.setItem('supplierPageColor', state.supplier.page_color)
      state.supplierPageColor = localStorage.getItem('supplierPageColor')
    },
    getRegions(state, regions) {
      state.regions = []
      for (var i = 0; i < regions.length; i++) {
        state.regions.push(regions[i].city)
      }

    },
    getGovernorate(state, res) {
      state.governorates = res
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
      national_number,
      governorate,
      region
    }) {


      axios.post('http://localhost:3000/api/signup', {
        email,
        password,
        full_arabic_name,
        mobile_number,
        national_number,
        governorate,
        region

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

    async login(context, { email, password }) {

      await axios.post("http://localhost:3000/api/login",
        { email, password, })
        .then((response) => {
          if (response.data.message === 'please sign up first' || response.data.message === 'Please activate your account' || response.data.message === 'authentication failed') {
            return alert(response.data.message);
          }
          context.commit('login', response.data.token);
          router.push('/')

        })
        .catch((error) => {
          console.log(error);
        });
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

    async getSupplierProducts(context, id) {
      console.log('the id is', id);
      await axios.put("http://localhost:3000/api/supplierProducts", {
        user_id: id
      }).then(response => {
        console.log('Products is here', response)
        context.commit('getSupplierProducts', response.data.data)
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
    async removeProductFromCart(context, id) {

      await axios.put('http://localhost:3000/api/remove', {
        product_id: id
      })
        .then(response => {

          console.log(response.data)
          context.commit('removeProductFromCart', id)
        })

    },
    async localStorage(context) {
      await axios.put('http://localhost:3000/api/getProducts', {
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
   async getOrders(context) {
      console.log('user id iss',context.state.currentUser.user_id)
     await axios.put('http://localhost:3000/api/getOrders', {
        user_id: context.state.currentUser.user_id
      })
        .then(orders => {

          context.commit('getOrders', orders.data.data)
        })
    },
    filterProductsCategory(context, payload) {
      context.commit('filterProductsCategory', payload)
    },


    async getTopSellingProduct(context, id) {

      await axios
        .post("http://localhost:3000/api/topSellingProduct", {
          user_id: id
        })
        .then(response => {
          console.log(response);
          context.commit('getTopSellingProduct', response.data.maxProduct);
        });
    },

    async getLeastSellingProduct(context, id) {
      await axios
        .post("http://localhost:3000/api/leastSellingProduct", {
          user_id: id
        })
        .then(response => {
          console.log(response);
          context.commit('getLeastSellingProduct', response.data.minProduct);
        });
    },

    async getMonthlySales(context, id) {
      await axios.post('http://localhost:3000/api/monthlySales', {
        user_id: id
      }).then(response => {
        console.log('monthly sales', response.data)

        context.commit('getMonthlySales', response.data)
      })
    },

    getSuppliers(context) {
      axios.post('http://localhost:3000/api/getSuppliers', {
        user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null
      }).then(response => {
        console.log(response.data.users)
        context.commit('getSuppliers', response.data.users)
      })
    },

    filterSuppliers(context, {
      supplierName,
      governorate,
      region
    }) {
      console.log('governorate', governorate)
      console.log('region', region)

      axios.put('http://localhost:3000/api/filterSuppliers', {
        name: supplierName,
        governorate: governorate,
        region: region
      }).then(response => {
        console.log(response)
        context.commit('filterSuppliers', response.data.users)
      })
    },

    async refreshCurrentUser(context) {

      await axios.post('http://localhost:3000/api/refreshCurrentUser', {
        token: context.state.loginToken
      }).then(response => {

        context.commit('refreshCurrentUser', response.data.user)
      })
    },

    // supplierProducts(context) {
    //   console.log(context.state.supplier.user_id)
    //   axios.put('http://localhost:3000/api/supplierProducts', {
    //     user_id: context.state.supplier.user_id
    //   }).then(products => {
    //     if (products) {
    //       console.log('supplier products', products.data.data)
    //     } else {
    //       console.log('error')
    //     }
    //   })
    // },
    supplierPageColor(context, color) {

      axios.put('http://localhost:3000/api/supplierPageColor', {
        page_color: color,
        user_id: context.state.supplier.user_id
      })
        .then(response => {
          console.log(response.data.message)
          console.log(response.data.data)
          context.commit('supplierPageColor', response.data.data)
        })
    },
    async getSupplier(context, id) {
      await axios.put('http://localhost:3000/api/getSupplier', { user_id: id })
        .then(supplier => {
          console.log('supplierererer', supplier.data.data)
          context.commit('getSupplier', supplier.data.data)

        })
    },

    getRegions(context, governorate) {
      console.log(governorate)
      axios.put('http://localhost:3000/api/getRegions', { governorate: governorate })
        .then(regions => {
          console.log('regionss', regions.data.data)
          context.commit('getRegions', regions.data.data)

        })
    },

    async getMyProducts(context) {
      console.log('id isss',context.state.currentUser.user_id)
      await axios.post("http://localhost:3000/api/myProducts", {
        user_id: context.state.currentUser.user_id
      }).then(response => {
        console.log(response)
        context.commit('getMyProducts', response.data)
      })
    },


    getGovernorate(context) {
      axios.put('http://localhost:3000/api/getGovernorate')
        .then(res => {
          console.log(res.data.data)
          context.commit('getGovernorate', res.data.data)
        })
    }

  },

  modules: {},

})