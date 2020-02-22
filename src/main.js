import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'

Vue.use(BootstrapVue)

Vue.prototype.$eventHub = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
