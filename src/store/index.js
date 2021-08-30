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
      let index;
    
      if (good.quantity > 0) {
          index = state.cart.findIndex((item) => item.product_id == good.product_id);
          if (index != -1) {
              state.cart[index].in_cart++;
              state.cart[index].quantity--;
              dispatch('loadChangeCart');
          } else {
              let goodToCart = Object.assign({}, good);
                  goodToCart.in_cart = 1;
                  goodToCart.quantity--;
              dispatch('loadToCart', goodToCart);
          }
          good.in_cart++;
          good.quantity--;
          dispatch('loadChangeCatalogAdd', good);

      }
    },
    delFromCart(state, good) {
/*         let index;
        index = state.cart.findIndex((item) => item.product_id == good.product_id);
        state.cart[index].in_cart--;
        state.cart[index].quantity++;
        if (state.cart[index].in_cart <= 0) {
          state.cart.splice([index], 1);
        }
        dispatch('loadChangeCart');
        good.quantity++;
        dispatch('loadChangeCatalogDel', {commit}); */
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
/*       loadToCart({commit, dispatch}, good) {
        return fetch('api/cart', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          dispatch('loadCart', {commit})
        })
      }, */

     loadToCart({commit, dispatch}, good) {
        return fetch('api/cart', {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(good)})
        .then((response) => {
          dispatch('loadCart', {commit})
        })
     },
    
      loadChangeCart({commit, dispatch}) {
        return fetch('api/newcart', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(state.cart)})
        .then((response) => {
          dispatch('loadCart', {commit})
        })
      },
/*       loadChangeCart({commit, dispatch}, newcart) {
        return fetch('api/newcart', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newcart)})
        .then((response) => {
          dispatch('loadCart', {commit}) */

/*       loadChangeCatalogAdd({commit, dispatch}, newgood) {
        return fetch('api/addgood', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newgood)})
        .then((response) => {
          dispatch('loadCatalog', {commit})
        })
      }, */

     loadChangeCatalogAdd ({commit, dispatch}, newgood) {
          return fetch('api/addgood', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newgood)})
          .then((response) => {
            dispatch('loadCatalog', {commit})
          }) 
          }, 
      
      loadChangeCatalogDel({commit, dispatch}, newgood) {
        return fetch('api/delgood', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newgood)})
        .then((response) => {
          dispatch('loadCatalog', {commit})
        })

/*         ({commit, dispatch}, newgood) {
          return fetch('api/delgood', {method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newgood)})
          .then((response) => {
            dispatch('loadCatalog', {commit})
          })
        }   */
      }
    }
  })