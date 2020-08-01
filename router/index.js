import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import reglogin from '../views/registerlogin'
import completedata from '../views/completedata'
import productDetails from '../views/productDetails'
import resetPassword from '../views/resetPassword'
import activation from '../views/activation'
import businessownerdata from '../views/businessownerdata'
import resetPasswordSent from '../views/resetPasswordSent'
import updateForgottenPassword from '../views/updateForgottenPassword'
import editPassword from '../views/editPassword'
import requestsPage from '../views/requestsPage'
import myProducts from '../views/myProducts'
import addProduct from '../views/addProduct'
import editProduct from '../views/editProduct'
import checkout from '../views/checkout'

Vue.use(VueRouter)

var routes = [{
    path: '/',
    name: "home",
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/reglogin',
    name: 'reglogin',
    component: reglogin
  },
  {
    path: '/businessownerdata',
    name: 'businessownerdata',
    component: businessownerdata
  },

  {
    path: '/activation/:cryptoo',
    name: 'activation',
    component: activation
  },
  {
    path: '/completedata',
    name: 'completedata',
    component: completedata
  },
  {
    path: '/productDetails',
    name: 'product-details',
    component: productDetails
  },
  {
    path: '/resetPassword',
    name: 'reset-password',
    component: resetPassword
  },
  {
    path: '/updateForgottenPassword/:hash',
    name: 'update-forgotten-password',
    component: updateForgottenPassword
  },

  {
    path: '/resetPasswordSent',
    name: 'reset-password-sent',
    component: resetPasswordSent
  },
  {
    path: '/editPassword',
    name: 'edit-password',
    component: editPassword
  },
  {
    path: '/requestsPage',
    name: 'requestsPage',
    component: requestsPage
  },
  {
    path: '/myProducts',
    name: 'myProducts',
    component: myProducts
  },
  {
    path: '/addProduct',
    name: 'addProducts',
    component: addProduct
  },
  {
    path: '/editProduct',
    name: 'editProduct',
    component: editProduct
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router