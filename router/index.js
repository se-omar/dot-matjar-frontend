import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue';
import SignUp from '../views/signup.vue'
import reglogin from '../views/registerlogin'
import mainpage from '../views/mainpage'
import completedata from '../views/completedata'
import productDetails from '../views/productDetails'

Vue.use(VueRouter)

const routes = [{
    path: '/reglogin',
    name: 'reglogin',
    component: reglogin
  },
  {
    path: '/completedata',
    name: 'completedata',
    component: completedata
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router