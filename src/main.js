import './styles/main.scss';

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

