import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$eventHub = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
