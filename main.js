import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios';
import vaxios from 'vue-axios';
import vuetify from './plugins/vuetify';



Vue.config.productionTip = false



//Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.use(vaxios, axios);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  vuetify,
  created: () => {
   
  },
   
 
  
  render: h => h(App)
}).$mount('#app')