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
    addToCart(state, good) {
      good.quantity--;
      const goodincart = state.cart.find((item) => item.product_id == good.product_id);
      if(goodincart) {
        goodInCart.in_cart++
      } else {
        state.cart.push({...good, in_cart: 1})
      }
      let index;
      index = state.catalog.findIndex((item) => item.product_id == good.product_id);
      state.catalog[index].quantity--;
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
      loadToCart ({ commit, dispatch }, good) {
        return fetch ('api/tocart', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          dispatch('loadFromCartToCatalog', { commit }, good)
        })
        .then((response) => {
          commit('addToCart', good)
        })
        .catch(console.log("mistake is"))
      },
      loadFromCartToCatalog (good) {
        return fetch ('api/tocatalog', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          console.log(good)
        })
        .catch(console.log("mistake was"))  
      }
    },
  })