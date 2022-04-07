import axios from "axios"

import config from "@/config/page";

const state = {
    todos: [],
    page: 1,
    countpage: 1,
    startnumber: 0
}
const mutations = {
    SET_DATA (state, payload) {
        state.todos = payload
    },
    ADD_DATA (state, payload) {
        state.todos.push(payload)
    },
    EDIT_DATA (state, payload) {
        let idx = state.todos.findIndex(todo => todo._id === payload._id)
        state.todos.splice(idx, 1, payload)
    },
    DELETE_DATA (state, payload) {
        let idx = state.todos.findIndex(todo => todo._id === payload._id)
        state.todos.splice(idx, 1)
    },
    COUNT_PAGE (state) {
        state.countpage = Math.ceil(state.todos.length / config.PAGE_SIZE) // round up
    }
}
const actions = {
    async getData ({commit}) {
        let url = `${process.env.VUE_APP_BE_ENDPOINT}/todos`
        let data = await axios.get(url)
        commit('SET_DATA', data.data)
        commit('COUNT_PAGE')
    },
    async addData ({commit}, payload) {
        let url = `${process.env.VUE_APP_BE_ENDPOINT}/todos/create-todos`
        let data = await axios.post(url, payload)
        commit('ADD_DATA', data.data)
        commit('COUNT_PAGE')
    },
    async editData ({commit}, payload) {
        let url = `${process.env.VUE_APP_BE_ENDPOINT}/todos/update-todos/${payload._id}`
        let data = await axios.post(url, payload.newdata)
        data.data = {
            ...data.data,
            ...payload.newdata
        }
        commit('EDIT_DATA', data.data)
        commit('COUNT_PAGE')
    },
    async deleteData ({commit}, payload) {
        let url = `${process.env.VUE_APP_BE_ENDPOINT}/todos/delete-todos/${payload._id}`
        await axios.delete(url, payload.newdata)
        commit('DELETE_DATA', payload)
        commit('COUNT_PAGE')
    },
    async getNewId () {
        let url = `${process.env.VUE_APP_BE_ENDPOINT}/todos/get-id`
        let data = await axios.get(url)
        let oldId = (data.data.length > 0)? data.data[0].idtodos: 0
        let newId = oldId + 1
        return newId
    },
}
const getters = {
    getDataPaging() {
        return state.todos.slice((state.page - 1) * config.PAGE_SIZE, (state.page - 1) * config.PAGE_SIZE + config.PAGE_SIZE);
    },
    getMaxPerPage() {
        return config.PAGE_SIZE
    },
    getPercentageDone(state) {
        return `${state.todos.length > 0 ? (((state.todos.filter(todo => todo.isdone)).length / state.todos.length) * 100).toFixed(2) : 0}%`;
      },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}