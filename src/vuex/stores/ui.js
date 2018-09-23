let state = {
    drawer: true,
}

let actions = {
    toggleDrawer({ commit }) {
        commit('toggleDrawer');
    },
    toggleModal({ commit }) {
        commit('toggleModal');
    }
}

let mutations = {
    toggleDrawer(state) {
        state.drawer = !state.drawer;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
