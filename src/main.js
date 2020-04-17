import Vue from 'vue'
import App from './App.vue'
import fa from '@fortawesome/fontawesome-free/js/all'

Vue.prototype.$eventHub = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
