import Vue from 'vue'
import Vuex from 'vuex'

import ui from './stores/ui';
import users from './stores/users';
import posts from './stores/posts';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    users,
    posts
  }
})
