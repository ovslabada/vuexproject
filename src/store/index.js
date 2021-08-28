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
    getCart(state) {
      return state.cart
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
    setCart(state, payload) { state.cart = [...state.cart, ...payload] },
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
    },
    addToCart(state, goodId) {
      const good = state.catalog.find((good) => good.product_id === goodId);
      state.cart.push({...good})
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
      loadCart({ commit }) {
        return fetch('api/goodc')
          .then((response) => {
            return response.json()
          })
          .then((goodListC) => {
            commit('setCart', goodListC)
          })
      },
      loadToCart({commit, dispatch}, good) {
        return fetch('api/cart', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          dispatch('loadCart', {commit})
        })
      }
    }
  })