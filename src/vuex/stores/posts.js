import Vue from 'vue';
// import axios from 'axios';
import { findIndex } from 'lodash';

// const baseurl = '/api';

const state = {
    data: []
}

const actions = {
    get({state}, index){
        return state.data[index];
    },
    async create({ commit }, payload) {
        commit('create', payload);
    },
    async update({ commit }, payload) {        
        commit('update', payload);
    },
    async destroy({ commit }, payload) {
        commit('destroy', payload);
    }
}

const mutations = {
    query(state, payload){
        state.data = payload;
    },
    create(state, payload) {
        state.data.push(payload);
    },
    update(state, payload) {
        let { data, index } = payload;
        Vue.set(state.data, index, data);
    },
    destroy(state, payload) {
        let indexOf = findIndex(state.data, { id: payload.id })
        if (payload.success){
            state.data.splice(indexOf, 1);
        }
    }
}

const getters ={
    getPost(state, index){
        return state.data[index];
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
