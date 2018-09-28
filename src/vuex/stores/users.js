import Vue from 'vue';
import axios from 'axios';
import { findIndex } from 'lodash';

const baseurl = '/api';

let state = {
    data: [],
    count: 0
}

let actions = {
    async query({commit}, query){
        let { data } = await axios.get(`${baseurl}/users?page=${query.page}`);
        commit('query', data);
    },
    async create({ commit }, payload) {
        let { data } = await axios.post(`${baseurl}/users`, { user: payload });
        commit('create', data);
    },
    async update({ commit }, payload) {
        let { data } = await axios.put(`${baseurl}/users/${payload.id}`, { user: payload });
        commit('update', data);
    },
    async destroy({ commit }, payload) {
        let { data } = await axios.delete(`${baseurl}/users/${payload.id}`);
        commit('destroy', data);
    }
}

let mutations = {
    query(state, payload){
        state.data = payload.result;
        state.count = payload.count;
    },
    create(state, payload) {
        state.data.push(payload);
        state.count++;
    },
    update(state, payload) {
        let indexOf = findIndex(state.data, { id: payload.id })
        Vue.set(state.data, indexOf, payload);
    },
    destroy(state, payload) {
        let indexOf = findIndex(state.data, { id: payload.id })
        if (payload.success){
            state.data.splice(indexOf, 1);
        }
        state.count--;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
