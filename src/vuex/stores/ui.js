import Vue from 'vue';

let state = {
    drawer: true,
}

let actions = {
    toggleDrawer({ commit }) {
        commit('toggleDrawer');
    }
}

let mutations = {
    toggleDrawer(state) {
        Vue.set(state, 'drawer', !state.drawer)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
