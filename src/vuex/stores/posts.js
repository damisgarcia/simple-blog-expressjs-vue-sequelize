import Vue from 'vue';
import axios from 'axios';
import { findIndex } from 'lodash';

const baseurl = '/api';

const state = {
    data: [],
    count: 0
}

const actions = {    
    async query({commit}, query){
        let { data } = await axios.get(`${baseurl}/posts?page=${query.page}`);
        commit('query', data);
    },
    async create({ commit }, payload) {
        let { data } = await axios.post(`${baseurl}/posts`, { post: payload });
        commit('create', data);
    },
    async update({ commit }, payload) {        
        let { data } = await axios.put(`${baseurl}/posts/${payload.id}`, { post: payload });
        commit('update', data);
    },
    async destroy({ commit }, payload) {
        let { data } = await axios.delete(`${baseurl}/posts/${payload.id}`);
        commit('destroy', data);
    }
}

const mutations = {
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
        if (payload.success) {
            state.data.splice(indexOf, 1);
        }
        state.count--;
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
