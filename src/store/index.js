import { createStore } from 'vuex'

export default createStore({
  state: {
    catalog: [],
    cart: [],
    show: false,
    search: '',
    searchisshow: false,
    searchistrue: false
  },
  getters: {
    getCatalog(state) {
      return state.catalog
    },
    getShow(state) {
      return state.show
    },
    getSearch(state){
      return state.search
    },
    getSearchisshow(state){
      return state.searchisshow
    },
    getSearchis(state) {
      return state.searchistrue
    }
  }, 
  mutations: {
    setCatalog(state, payload) { state.catalog = [...state.catalog, ...payload] },
    setShow(state) {
      state.show = !(state.show)
    },
    setSearch(state, value) {
      state.search = value
    },
    setSearchisshow(state) {
      state.searchisshow = !(state.searchisshow)
    },
    setSearchIs(state) {
      state.searchistrue = !(state.searchistrue)
    }
    },
  actions: {
      loadCatalog({ commit }) {
        return fetch('api/good')
          .then((response) => {
            return response.json()
          })
          .then((goodList) => {
            commit('setCatalog', goodList)
          })
      },
    }
  })
