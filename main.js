import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios';
import vaxios from 'vue-axios';
import vuetify from './plugins/vuetify';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'





Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
//Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.use(vaxios, axios);
Vue.prototype.$axios = axios;
new Vue({
  icons: {
    iconfont: 'fa' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  router,
  store,
  vuetify,
  created: () => {

  },



  render: h => h(App)
}).$mount('#app')