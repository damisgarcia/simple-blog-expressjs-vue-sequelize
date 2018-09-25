import '@babel/polyfill'
import './styles/main.scss';

import Vue from 'vue';
import './plugins/vuetify';
import './plugins/wysiwyg';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import App from './App.vue';
import store from './vuex';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

