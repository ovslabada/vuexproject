import { createStore } from 'vuex'

export default createStore({
  state: {
    catalog: [],
    cart: [],
    show: false,
    search: '',
    searchisshow: false,
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
    resetSearch(state) {
      state.search = ''
    },
    setSearchisshow(state) {
      state.searchisshow = !(state.searchisshow)
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
    deleteFromCart (state, good) {
      let index;
      index = state.cart.findIndex((item) => item.product_id == good.product_id);
      state.cart.splice([index], 1);
    },
    rescart (state) {
      let index;
      state.cart.forEach(product => {
      index = cart.findIndex((item) => item.product_id == product.product_id);
      const quantity = cart[index].in_cart;
      const goodInCatalog = state.catalog.find((good) => good.product_id == product.product_id);
      goodInCatalog.quantity += quantity;
      });
      state.cart = [];
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
      return fetch('api/resetcart', {method: 'PUT',headers: { 'Content-Type': 'application/json' }})
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          commit('rescart');
        }
      })
      .catch(console.log("error to reset"))
    }
/*     resetcart({ commit }) {
      return fetch('api/resetcart')
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          commit('rescart');
        }
      })
      .catch(console.log("error to reset"))
    } */
  },
})