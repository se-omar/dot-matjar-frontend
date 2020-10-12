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
import cart from '../views/cart'
import successfulPayment from '../views/successfulPayment'
import notFound from '../views/notFound'
import userOrders from '../views/userOrders'
import dashboard from '../views/dashboard'
import supplierPage from '../views/supplierPage'
import sideButton from '../components/sideButton'
import checkOutLocation from '../views/checkOutLocation'
import adminPage from '../views/adminPage'
import suppliersDashboard from '../views/allSuppliersDashboard'
import orderedProducts from '../views/orderedProducts'
import updateSupplierPage from '../views/updateSupplierPage'
import pendingSuppliers from '../views/pendingSuppliers'
import categoryAndItemRequests from '../views/categoryAndItemRequests.vue'
import siteColors from '../views/siteColors.vue'
// import { isInteger } from 'core-js/fn/number'
Vue.use(VueRouter)



var routes = [{
  path: '/cart',
  name: "cart",
  component: cart,
},
{
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
  path: '/successfulPayment/:hash',
  name: 'successfulPayment',
  component: successfulPayment
},
{
  path: '/userorders',
  name: 'userorders',
  component: userOrders
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: dashboard
},
{
  path: '/supplierPage/:supplier_id',
  name: 'supplierPage',
  component: supplierPage,
  props: true
},
{
  path: '/sideButton',
  name: 'sidebutton',
  component: sideButton
},
{
  path: '/checkOutLocation',
  name: 'checkOutLocation',
  component: checkOutLocation
},
{
  path: '/adminPage',
  name: 'adminPage',
  component: adminPage
},
{
  path: '/suppliersDashboard',
  name: 'suppliersDashboard',
  component: suppliersDashboard
},
{
  path: '/orderedProducts',
  name: 'orderedProducts',
  component: orderedProducts
},
{
  path: '/updateSupplierPage/:supplier_id',
  name: 'updateSupplierPage',
  component: updateSupplierPage
}, {
  path: '/pendingSuppliers',
  name: 'pendingSuppliers',
  component: pendingSuppliers
},
{
  path: '/categoryAndItemRequests',
  name: 'categoryAndItemRequests',
  component: categoryAndItemRequests
},
{
  path: '/siteColors',
  name: 'siteColors',
  component: siteColors
},
{
  path: '*',
  component: notFound
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router