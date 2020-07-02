import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue';
import SignUp from '../views/signup.vue'
import reglogin from '../views/registerlogin'
import mainpage from '../views/mainpage'

Vue.use(VueRouter)

const routes = [
  {path: '/reglogin',
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router