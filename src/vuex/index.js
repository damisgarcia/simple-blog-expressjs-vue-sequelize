import Vue from 'vue'
import Vuex from 'vuex'

import ui from './stores/ui';
import users from './stores/users';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    users
  }
})
