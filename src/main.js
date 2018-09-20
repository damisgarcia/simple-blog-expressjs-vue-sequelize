import '@babel/polyfill'
import './styles/main.scss';

import Vue from 'vue'
import './plugins/vuetify'
import VueResource from 'vue-resource'

Vue.use(VueResource);

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

