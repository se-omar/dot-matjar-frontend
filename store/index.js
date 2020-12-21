/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
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
    nodeHost: 'http://localhost:3000',
    // viewRequestDetails: false,
    // cart: [],
    // table: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
    // category: [],
    // incart: '',
    // paymentToken: localStorage.getItem('paymentToken'),
    // totalPrice: localStorage.getItem('totalPrice') ? localStorage.getItem('totalPrice') : '',
    // productsQuantityArray: JSON.parse(localStorage.getItem('quantity')),
    // orders: [],
    // orderProducts: [],
    // topProduct: {},
    // leastProduct: {},
    // notSortedDashboardOrders: [],

    // suppliers: [],
    // allSuppliers: [],
    // supplier: [],
    // loginToken: localStorage.getItem('loginToken'),
    // supplierProducts: JSON.parse(localStorage.getItem('supplierProducts')),
    // regions: [],
    // governorates: [],
    // ordersMade: JSON.parse(localStorage.getItem('ordersMade')) ? JSON.parse(localStorage.getItem('ordersMade')) : [],
    // usersMadeOrders: [],
    // showOrderProducts: [],
    // userOrderAddress: [],
    // OrderAddressDetails: [],
    // siteColor: localStorage.getItem('siteColor') ? localStorage.getItem('siteColor') : 'red darken-4',
    // supplierPageInfo: [],
    // allSuppliersWithSales: [],
    // pressedOrder: [],
    // productRating: 0,
    // productReview: '',
    // averageProductRating: 0,
    // categoriesItems: [],
    // currentProductRatings: [],
    // currentSupplierRatings: [],
    // userOrderedProductFlag: false,
    // supplierRating: 0,
    // supplierReview: ''
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

    // viewRequestDetails(state) {
    //   state.viewRequestDetails = true
    // },

    // viewRequestCard(state) {
    //   state.viewRequestDetails = false
    // },
    // cart(state, product) {
    //   state.cart.push(product)
    // },

    // table(state, data) {
    //   localStorage.setItem('cartItems', JSON.stringify(data))
    //   state.table = JSON.parse(localStorage.getItem('cartItems'))
    // },

    // removeProductFromCart(state, id) {

    //   
    //   for (var i = 0; i < state.table.length; i++) {
    //     if (state.table[i].product_id == id) {
    //       state.table.splice(i, 1)
    //       localStorage.setItem('cartItems', JSON.stringify(state.table))
    //       
    //     }
    //   }
    // },

    // localStorage(state, products) {
    //   localStorage.setItem('cartItems', JSON.stringify(products))
    //   state.table = JSON.parse(localStorage.getItem('cartItems'))

    // },

    // emptySearch(state) {
    //   state.filteredProducts = state.products
    // },
    // cleanCart(state) {
    //   var cartLength = state.table.length;
    //   state.table.splice(0, cartLength)
    //   localStorage.setItem('cartItems', JSON.stringify(state.table))
    // },
    // categoriesDB(state, data) {
    //   
    //   state.category = data.map(e => {
    //     return e.category_name
    //   })
    //   

    // },


    // setPaymentToken(state, token) {
    //   localStorage.setItem('paymentToken', token);
    //   state.paymentToken = localStorage.getItem('paymentToken');
    // },

    // filterProductsCategory(state, payload) {
    //   state.filteredProducts =
    //     state.products.filter(row => row.category_name.indexOf(payload) > -1)
    // },

    // putTotalPriceInStore(state, total) {
    //   localStorage.setItem('totalPrice', total)
    //   state.totalPrice = localStorage.getItem('totalPrice');
    // },

    // putQuantityInStore(state, quantity) {
    //   localStorage.setItem('quantity', JSON.stringify(quantity))
    //   state.productsQuantityArray = JSON.parse(localStorage.getItem('quantity'))
    // },
    // getOrders(state, order) {
    //   
    //   state.orders = order
    //   
    // },
    // getOrderProducts(state, response) {
    //   var products = response.map(e => {
    //     e.product.pending_status = e.status
    //     e.product.quantity = e.quantity
    //     return e.product
    //   })
    //   state.orderProducts = products
    //   
    // },
    // getTopSellingProduct(state, topProduct) {
    //   state.topProduct = topProduct;
    // },

    // getLeastSellingProduct(state, leastProduct) {
    //   state.leastProduct = leastProduct;
    // },

    // getMonthlySales(state, orders) {
    //   state.notSortedDashboardOrders = orders
    // },
    // supplierPageColor(state, color) {
    //   
    //   localStorage.setItem('siteColor', color)
    //   state.siteColor = localStorage.getItem('siteColor')
    // },
    // getSuppliers(state, suppliers) {
    //   state.suppliers.push(...suppliers);
    //   state.allSuppliers.push(...suppliers);
    // },

    // filterSuppliers(state, users) {
    //   state.suppliers = users;
    // },

    // emptySupplierName(state) {
    //   state.suppliers = state.allSuppliers
    // },

    // emptySupplierLocation(state) {
    //   state.suppliers = state.allSuppliers;
    // },

    // refreshCurrentUser(state, user) {
    //   
    //   state.currentUser = user;
    // },


    // supplierPage(state, supplier) {
    //   localStorage.setItem('supplier', JSON.stringify(supplier))
    //   state.supplier = JSON.parse(localStorage.getItem('supplier'))

    //   
    //   
    // },

    // getSupplier(state, supplier) {


    //   // localStorage.setItem('supplier', JSON.stringify(supplier))
    //   // state.supplier = JSON.parse(localStorage.getItem('supplier'))
    //   state.supplier = supplier
    //   localStorage.setItem('siteColor', supplier.page_color)
    //   state.siteColor = localStorage.getItem('siteColor')
    // },
    // getRegions(state, regions) {
    //   
    //   state.regions = []
    //   for (var i = 0; i < regions.length; i++) {
    //     state.regions.push(regions[i].city)
    //   }
    //   
    // },
    // getGovernorate(state, res) {
    //   state.governorates = res
    // },
    // ordersMade(state, orders) {
    //   // var products=orders.map(e=>{return e.products})
    //   var userId = true
    //   var users = []
    //   var address = []
    //   for (var i = 0; i < orders.length; i++) {


    //     if (userId) {
    //       users.push({
    //         'full_arabic_name': orders[i].user.full_arabic_name,
    //         'mobile_number': orders[i].user.mobile_number,
    //         'order_number': orders[i].order_number,
    //         'order_date': orders[i].order_date,
    //         'status': orders[i].status,
    //         'order_id': orders[i].order_id
    //       })
    //     }

    //   }

    //   localStorage.setItem('ordersMade', JSON.stringify(orders))
    //   state.ordersMade = JSON.parse(localStorage.getItem('ordersMade'))
    //   state.usersMadeOrders = users

    //   for (var x = 0; x < orders.length; x++) {
    //     address.push({
    //       'country': orders[x].country,
    //       'city': orders[x].city,
    //       'state': orders[x].state,
    //       'address_line_1': orders[x].address_line_1,
    //       'address_line_2': orders[x].address_line_2
    //     })
    //   }

    //   state.userOrderAddress = address

    // },
    // showOrderProducts(state, orderNumber) {

    //   for (var i = 0; i < state.ordersMade.length; i++) {
    //     if (state.ordersMade[i].order_number == orderNumber) {

    //       
    //       state.showOrderProducts = state.ordersMade[i].products
    //       state.pressedOrder = state.ordersMade[i]
    //     }

    //   }
    // },

    changingSiteColor(state, color) {
      localStorage.setItem('siteColor', color)
      state.Home.siteColor = localStorage.getItem('siteColor')
    },




    // getProductRatingsArray(state, rows) {
    //   state.currentProductRatings = [];
    //   rows.forEach(element => {
    //     state.currentProductRatings.push(element);
    //   });
    // },

    // getSupplierRatingsArray(state, rows) {
    //   state.currentSupplierRatings = [];
    //   rows.forEach(element => {
    //     state.currentSupplierRatings.push(element);
    //   });
    // },

    // checkIfUserOrdered(state, row) {
    //   if (row) {
    //     state.userOrderedProductFlag = true;
    //   }
    //   else {
    //     state.userOrderedProductFlag = false;
    //   }
    // },
    // getCategoryItems(state, items) {

    //   state.categoriesItems = items
    // }

  },


  actions: {
    profilePhoto(context, form) {
      axios.post(context.state.nodeHost + '/api/profilePhoto', form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {

          context.dispatch('doLogin', {
            email: localStorage.getItem('currentEmail'),
            password: localStorage.getItem('currentPassword')
          })
        }).catch(err => {

        })
    },




    // getProducts(context, {
    //   productFilterFlag,
    //   productName,
    //   categoryName
    // }) {
    //   if (!productFilterFlag) {
    //     axios.post('http://localhost:3000/api/products', {
    //       product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null
    //     }).then(response => {
    //       context.commit('getProducts', response.data.products);
    //       
    //     })
    //   }
    //   else {
    //     axios.post('http://localhost:3000/api/loadMoreProductsWithFilter', {
    //       product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null,
    //       product_name: productName,
    //       category_name: categoryName
    //     }).then(response => {
    //       context.commit('getProducts', response.data.products);
    //       
    //     })
    //   }
    // },

    // filterProducts(context, {
    //   product_name,
    //   category_name,
    //   governorate,
    //   region,
    //   categoryItem
    // }) {
    //   
    //   axios.put('http://localhost:3000/api/filterProducts', {
    //     product_name,
    //     category_name,
    //     governorate,
    //     region,
    //     categoryItem
    //   })
    //     .then(response => {
    //       
    //       

    //       context.commit('filterProducts', response.data.data);

    //     })


    // },

    // completedata(context, {
    //   national_number,
    //   gender,
    //   full_arabic_name,
    //   full_english_name,
    //   birthdate,
    //   qualifications,
    //   job,
    //   governorate,
    //   village,
    //   center,
    //   phone_number,
    //   mobile_number,
    //   fax,
    //   facebook_account,
    //   linkedin,
    //   website,
    //   address,
    //   email
    // }) {

    //   axios.put('http://localhost:3000/api/completedata', {
    //     national_number,
    //     gender,
    //     full_arabic_name,
    //     full_english_name,
    //     birthdate,
    //     qualifications,
    //     job,
    //     governorate,
    //     village,
    //     center,
    //     phone_number,
    //     mobile_number,
    //     fax,
    //     facebook_account,
    //     linkedin,
    //     website,
    //     address,
    //     email
    //   })
    //     .then(response => {
    //       alert(response.data.message)
    //       
    //     })
    //     .catch(err => {
    //       
    //     })
    // },

    // register(context, {
    //   email,
    //   password,
    //   full_arabic_name,
    //   mobile_number,
    //   national_number,
    //   governorate,
    //   region
    // }) {


    //   axios.post('http://localhost:3000/api/signup', {
    //     email,
    //     password,
    //     full_arabic_name,
    //     mobile_number,
    //     national_number,
    //     governorate,
    //     region

    //   })
    //     .then(response => {
    //       if (response.data.message) {
    //         alert(response.data.message)
    //       } else {
    //         
    //       }
    //     })
    //     .catch(error => {
    //       
    //     })
    // },

    // async login(context, { email, password }) {

    //   await axios.post("http://localhost:3000/api/login",
    //     { email, password, })
    //     .then((response) => {
    //       if (response.data.message === 'please sign up first' || response.data.message === 'Please activate your account' || response.data.message === 'authentication failed') {
    //         return alert(response.data.message);
    //       }
    //       context.commit('login', response.data.token);
    //       router.push('/')

    //     })
    //     .catch((error) => {
    //       
    //     });
    // },


    activation(context) {
      axios.put(context.state.nodeHost + '/api/activate')
        .then((data) => {

          context.commit('activation')
        })
    },

    // filterProductsCategory(context, payload) {
    //   context.commit('filterProductsCategory', payload)
    // },

    changingSiteColor(context, pickerColor) {
      axios.put(context.state.nodeHost + '/api/changeSiteColor', { user_id: context.state.Home.currentUser.user_id, site_color: pickerColor })
        .then(response => {

          context.commit('changingSiteColor', pickerColor)
        })
    },
    // getSiteColor(context) {
    //   axios.put('http://localhost:3000/api/getSiteColor')
    //     .then(response => {
    //       
    //       
    //       context.commit('getSiteColor', response.data.data)
    //     })
    // },
    // updateSupplierPage(context, formdata) {
    //   axios.post('http://localhost:3000/api/updateSupplierPage', formdata)
    //     .then(response => {
    //       
    //       context.commit('updateSupplierPage', response.data.data)

    //     })
    // },
    // getSupplierPageData(context, id) {

    //   
    //   axios.put('http://localhost:3000/api/getSupplierPageData', { supplier_id: id })
    //     .then(info => {
    //       
    //       
    //       context.commit('getSupplierPageData', info.data.data)
    //     })


    // },
    // createOrder(context, { governorate, region, address }) {
    //   
    //   axios.post('http://localhost:3000/api/createOrder', {
    //     user_id: context.state.currentUser.user_id
    //     , governorate: governorate,
    //     region: region,
    //     address: address,
    //     cartItems: context.state.table,
    //     totalPrice: context.state.totalPrice,

    //   })
    //     .then(res => {
    //       
    //       
    //     })
    // },
    // updateProductStatus(context, { status, orderId, productId }) {
    //   
    //   axios.put('http://localhost:3000/api/updateProductStatus', { status: status, orderId: orderId, productId: productId })
    //     .then(response => {
    //       
    //     })
    // },

    // async getProductReview(context, {
    //   product_id, user_id
    // }) {
    //   await axios
    //     .post("http://localhost:3000/api/getProductReview", {
    //       product_id: product_id,
    //       user_id: user_id,
    //     }).then(response => {

    //       context.commit('getProductReview', response.data.review)
    //     })
    // },

    // addProductReview(context, {
    //   user_id, product_id, rating, review
    // }) {
    //   axios
    //     .post("http://localhost:3000/api/addProductReview", {
    //       user_id, product_id, rating, review
    //     })
    //     .then((response) => {
    //       alert(response.data.message);
    //     });
    // },

    // calculateProductRating(context, product_id) {
    //   axios.post('http://localhost:3000/api/calculateProductRating', {
    //     product_id
    //   }).then(response => {
    //     
    //   })
    // },
    // addNewCategory(context, categoryName) {
    //   axios.post('http://localhost:3000/api/addNewCategory', { categoryName: categoryName })
    //     .then(message => {
    //       
    //       alert(message.data.message)

    //     })
    // },
    // addCategoryItems(context, { categoryName, categoryItem }) {
    //   axios.post('http://localhost:3000/api/addCategoryItems', { categoryName: categoryName, categoryItem: categoryItem })
    //     .then(message => {
    //       
    //       alert(message.data.message)
    //     })
    // },
    // getCategoryItems(context) {
    //   axios.put('http://localhost:3000/api/getCategoryItems')
    //     .then(response => {
    //       
    //       
    //       context.commit('getCategoryItems', response.data.data)
    //     })


    // },
    // removeCategoryAndItems(context, { categoryName, categoryItem }) {
    //   axios.put('http://localhost:3000/api/removeCategoryAndItems', { categoryName: categoryName, categoryItem: categoryItem })
    //     .then(message => {
    //       
    //       alert(message.data.message)
    //     })
    // },

    // calculateSupplierRating(context, supplier_id) {
    //   axios.post('http://localhost:3000/api/calculateSupplierRating', {
    //     supplier_id
    //   }).then(response => {
    //     
    //   })
    // },


    // async getProductRatingsArray(context, product_id) {
    //   await axios.post('http://localhost:3000/api/getProductRatingsArray', {
    //     product_id
    //   }).then(response => {
    //     context.commit('getProductRatingsArray', response.data.rows)
    //   })
    // },

    // async getSupplierRatingsArray(context, supplier_id) {
    //   await axios.post('http://localhost:3000/api/getSupplierRatingsArray', {
    //     supplier_id
    //   }).then(response => {
    //     context.commit('getSupplierRatingsArray', response.data.rows)
    //   })
    // },

    // async checkIfUserOrdered(context, {
    //   user_id, product_id
    // }) {
    //   await axios.post('http://localhost:3000/api/checkIfUserOrdered', {
    //     product_id,
    //     user_id
    //   }).then(response => {
    //     if (response.data.row) {
    //       context.commit('checkIfUserOrdered', response.data.row)
    //     }
    //     else {
    //       context.commit('checkIfUserOrdered')
    //     }
    //   })
    // },

    // async addSupplierReview(context, {
    //   supplier_id,
    //   user_id,
    //   rating,
    //   review,
    // }) {
    //   await axios.post('http://localhost:3000/api/addSupplierReview', {
    //     supplier_id,
    //     user_id,
    //     rating,
    //     review,
    //   }).then(response => {
    //     
    //     alert(response.data.message)
    //   })
    // },

    // async getSupplierReview(context, {
    //   supplier_id, user_id
    // }) {
    //   await axios
    //     .post("http://localhost:3000/api/getSupplierReview", {
    //       supplier_id: supplier_id,
    //       user_id: user_id,
    //     }).then(response => {

    //       context.commit('getSupplierReview', response.data.review)
    //     })
    // },

  },

  modules: {
    Home, AdminPage, Cart, Dashboard, Orders,
    ProductDetails, RegisterLogin, Requests, SupplierPage,
  },

})