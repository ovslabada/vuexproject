import { createStore } from 'vuex'

export default createStore({
  state: {
    catalog: [],
    cart: []
  },
  getters: {
    getCatalog(state) {
      return state.catalog
    }
  }, 
  mutations: {
    setCatalog(state, payload) { state.catalog = [...state.catalog, ...payload] },
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
