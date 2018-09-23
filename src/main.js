import '@babel/polyfill'
import './styles/main.scss';

import Vue from 'vue'
import './plugins/vuetify'
import VueResource from 'vue-resource'

Vue.use(VueResource);

import App from './App.vue'
import store from './vuex'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

