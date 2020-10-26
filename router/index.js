import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// //import reglogin from '../views/registerlogin'
// import completedata from '../views/completedata'
// import productDetails from '../views/productDetails'
// import resetPassword from '../views/resetPassword'
// import activation from '../views/activation'
// import businessownerdata from '../views/businessownerdata'
// import resetPasswordSent from '../views/resetPasswordSent'
// import updateForgottenPassword from '../views/updateForgottenPassword'
// import editPassword from '../views/editPassword'
// import requestsPage from '../views/requestsPage'
// import myProducts from '../views/myProducts'
// import addProduct from '../views/addProduct'
// import editProduct from '../views/editProduct'
// import cart from '../views/cart'
// import successfulPayment from '../views/successfulPayment'
// import notFound from '../views/notFound'
// import userOrders from '../views/userOrders'
// import dashboard from '../views/dashboard'
// import supplierPage from '../views/supplierPage'
// import sideButton from '../components/sideButton'
// import checkOutLocation from '../views/checkOutLocation'
// import adminPage from '../views/adminPage'
// import suppliersDashboard from '../views/allSuppliersDashboard'
// import orderedProducts from '../views/orderedProducts'
// import updateSupplierPage from '../views/updateSupplierPage'
// import pendingSuppliers from '../views/pendingSuppliers'
// import categoryAndItemRequests from '../views/categoryAndItemRequests.vue'
// import siteColors from '../views/siteColors.vue'
// import supplierDetails from '../views/supplierDetails'
import i18n from '../i18n'
// import testSupplierProducts from '../views/testSupplierProducts.vue'
// import { isInteger } from 'core-js/fn/number'
Vue.use(VueRouter)



var routes = [
  {
    path: '/',
    redirect: localStorage.getItem('language') ? localStorage.getItem('language') : `${i18n.locale}`

  },
  {
    path: '/:lang',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '/',
        name: "home",
        component: () => import('../views/Home'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home'),
      },
      {
        path: 'reglogin',
        name: 'reglogin',
        component: () => import('../views/registerlogin'),
      },
      // {
      //   path: 'businessownerdata',
      //   name: 'businessownerdata',
      //   component: () => import('../views/businessownerdata'),
      // },

      {
        path: 'activation/:cryptoo',
        name: 'activation',
        component: () => import('../views/activation'),
      },
      {
        path: 'completedata',
        name: 'completedata',
        component: () => import('../views/completedata'),
      },
      {
        path: 'productDetails',
        name: 'product-details',
        component: () => import('../views/productDetails'),
      },
      {
        path: 'resetPassword',
        name: 'reset-password',
        component: () => import('../views/resetPassword'),
      },
      {
        path: 'updateForgottenPassword/:hash',
        name: 'update-forgotten-password',
        component: () => import('../views/updateForgottenPassword'),
      },

      {
        path: 'resetPasswordSent',
        name: 'reset-password-sent',
        component: () => import('../views/resetPasswordSent'),
      },
      {
        path: 'editPassword',
        name: 'edit-password',
        component: () => import('../views/editPassword'),
      },
      {
        path: 'requestsPage',
        name: 'requestsPage',
        component: () => import('../views/requestsPage'),
      },
      {
        path: 'myProducts',
        name: 'myProducts',
        component: () => import('../views/myProducts'),
      },
      // {
      //   path: 'testSupplierProducts',
      //   name: 'testSupplierProducts',
      //   component: () => import('../views/testSupplierProducts'),
      // },
      {
        path: 'addProduct',
        name: 'addProducts',
        component: () => import('../views/addProduct'),
      },
      {
        path: 'editProduct',
        name: 'editProduct',
        component: () => import('../views/editProduct'),
      },
      {
        path: 'successfulPayment/:hash',
        name: 'successfulPayment',
        component: () => import('../views/successfulPayment'),
      },
      {
        path: 'userorders',
        name: 'userorders',
        component: () => import('../views/userOrders'),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard'),
      },
      {
        path: 'supplierPage/:supplier_id',
        name: 'supplierPage',
        component: () => import('../views/supplierPage'),
        props: true
      },
      {
        path: 'sideButton',
        name: 'sidebutton',
        component: () => import('../components/sideButton'),
      },
      {
        path: 'checkOutLocation',
        name: 'checkOutLocation',
        component: () => import('../views/checkOutLocation'),
      },
      {
        path: 'adminPage',
        name: 'adminPage',
        component: () => import('../views/adminPage'),
      },
      {
        path: 'suppliersDashboard',
        name: 'suppliersDashboard',
        component: () => import('../views/allSuppliersDashboard'),
      },
      {
        path: 'orderedProducts',
        name: 'orderedProducts',
        component: () => import('../views/orderedProducts'),
      },
      {
        path: 'updateSupplierPage/:supplier_id',
        name: 'updateSupplierPage',
        component: () => import('../views/updateSupplierPage'),
      }, {
        path: 'pendingSuppliers',
        name: 'pendingSuppliers',
        component: () => import('../views/pendingSuppliers'),
      },
      {
        path: 'categoryAndItemRequests',
        name: 'categoryAndItemRequests',
        component: () => import('../views/categoryAndItemRequests'),
      },
      {
        path: 'siteColors',
        name: 'siteColors',
        component: () => import('../views/siteColors'),
      },
      {
        path: 'supplierDetails/:supplier_id',
        name: 'supplierDetails',
        component: () => import('../views/supplierDetails'),
      },
      {
        path: 'updateUserData/:user_id',
        name: 'updateUserData',
        component: () => import('../views/updateUserData'),
      },
      {
        path: 'allUsers',
        name: 'allUsers',

        component: () => import('../views/allUsers'),

      },

      {
        path: 'addUser',
        name: 'addUser',
        component: () => import('../views/addUser'),
      },
      {
        path: '*',
        component: () => import('../views/notFound'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router