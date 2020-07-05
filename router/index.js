import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue';
import SignUp from '../views/signup.vue'
import reglogin from '../views/registerlogin'
import mainpage from '../views/mainpage'
import productDetails from '../views/productDetails'
import resetPassword from '../views/resetPassword'
import resetPasswordSent from '../views/resetPasswordSent'
import updatePassword from '../views/updatePassword'

Vue.use(VueRouter)

var routes = [{
    path: '/reglogin',
    name: 'reglogin',
    component: reglogin
  },

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    component: mainpage
  },
  {
    path: '/signup',
    name: 'Sign-up',
    component: SignUp
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
    path: '/updatePassword/:hash',
    name: 'update-password',
    component: updatePassword
  },
  {
    path: '/updatePassword/',
    name: 'update-password',
    component: updatePassword
  },
  {
    path: '/resetPasswordSent',
    name: 'reset-password-sent',
    component: resetPasswordSent
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router