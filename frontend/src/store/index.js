import { createStore } from 'vuex'

export default createStore({
  state: {
    catalog: [],
    cart: [],
    show: false,
    search: '',
    searchisshow: false,
    adress: {},
    adresswited: false,
    adresssent: false,
    navisshow: false
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
    goodCountInCart(state) {
      return state.cart.reduce((acc, item) => acc + item.in_cart, 0)
    },
    gettotalsum(state) {
      return state.cart.reduce((acc, item) => acc + (item.in_cart * item.product_price), 0)
    },
    getAdress(state) {
      return state.adress
    },
    getadresswited(state) {
      return state.adresswited
    },
    getadresssent(state) {
      return state.adresssent
    },
    getnavstatus(state) {
      return state.navisshow
    }

  },
  mutations: {
    setCatalog(state, payload) { state.catalog = [...state.catalog, ...payload] },
    setCart(state, payload) { state.cart = [...state.cart, ...payload] },
    
    // Show other goods
    setShow(state) {
      state.show = !(state.show)
    },

    // Show right menu
    setNavShow(state) {
      state.navisshow = !(state.navisshow)
    },

    // Search
    setSearch(state, value) {
      state.search = value
    },
    resetSearch(state) {
      state.search = ''
    },
    setSearchisshow(state) {
      state.searchisshow = !(state.searchisshow)
    },

    // Add to cart
    addToCart(state, good) {
      let index = state.cart.findIndex((item) => item.product_id == good.product_id);
      if (index == -1) {
        state.cart.push({ ...good, in_cart: 1 })
      } else {
        state.cart[index].in_cart++
      }
    },
    
    // Delete from cart
    minusFromCart(state, good) {
      let index = state.cart.findIndex((item) => item.product_id == good.product_id);
      if (state.cart[index].in_cart > 1) {
        state.cart[index].in_cart--
      } else {
        state.cart.splice([index], 1);
      }
    },
    deleteFromCart(state, good) {
      let index = state.cart.findIndex((item) => item.product_id == good.product_id);
      state.cart.splice([index], 1);
    },
    rescart(state) {
      state.cart.forEach(cartItem => {
        const goodInCatalog = state.catalog.find((good) => good.product_id == cartItem.product_id);
        if (goodInCatalog) goodInCatalog.quantity += cartItem.in_cart;
      });
      state.cart = [];
    },
    newcart(state) {
      state.cart = [];
    },

    // Adress
    addadress(state, adress) {
      state.adress = {...adress}
    },
    resetadress(state) {
      state.adress = {}
    },
    setadresswrited(state) {
      state.adresswited = !state.adresswited
    },
    setadresssent(state) {
      state.adresssent = !state.adresssent
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
            commit('deleteFromCart', good)
          }
        })
        .catch(console.log("error to delite"))
    },
    resetcart({ commit }) {
      return fetch('api/resetcart', { method: 'PUT', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "ok") {
            commit('rescart');
          }
        })
        .catch(console.log("error to reset"))
    },
    loadAdress({ commit }, adress) {
      return fetch('api/postaddress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(adress) })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "ok") {
            commit('resetadress');
            commit('newcart');
            commit('setadresssent');
          }
        })
        .catch(console.log("error to get adress"))
    },
  },
})