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
    getSearch(state) {
      return state.search
    },
    getSearchisshow(state) {
      return state.searchisshow
    },
    getSearchis(state) {
      return state.searchistrue
    },
    goodCountInCart(state) {
      return state.cart.reduce((acc, item) => acc + item.in_cart, 0)
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
      const goodincart = state.cart.find((item) => item.product_id == good.product_id);
      if (goodincart) {
        goodInCart.in_cart++
      } else {
        state.cart.push({ ...good, in_cart: 1 })
      }
    },
    minusFromCart (state, good) {
      let index;
      index = state.cart.findIndex((item) => item.product_id == good.product_id);
      if (state.cart[index].in_cart > 1) {
        state.cart[index].in_cart--
      } else {
        state.cart.splice([index], 1);
      }
    },
    minusFromCart (state, good) {
      let index;
      index = state.cart.findIndex((item) => item.product_id == good.product_id);
      state.cart.splice([index], 1);
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
    pushToCart({ commit }, good) {
      return fetch('api/tocart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(good) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          commit('addToCart', good)
        }
      })
        .catch(console.log("mistake is"))
    },
    popToCart({ commit }, good) {
      return fetch('api/poptocart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(good) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          commit('minusFromCart', good)
        }
      })
        .catch(console.log("mistake is"))
    },
    delFromCart({ commit }, good) {
      return fetch('api/delfromcart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(good) })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          commit('minusFromCart', good)
        }
      })
      .catch(console.log("error to delite"))
    }
  },
})