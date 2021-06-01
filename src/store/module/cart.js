import Api from "../../api/Api";

const cart = {
  namespaced: true,

  state: {
    cart: [],
    cartTotal: 0,
    cartWeight: 0,
  },

  mutations: {
    GET_CART(state, product) {
      state.cart = product;
    },

    TOTAL_CART(state, total) {
      state.cartTotal = total;
    },

    CART_WEIGHT(state, totalWeight) {
      state.cartWeight = totalWeight;
    },
  },

  actions: {
    // action addToCart
    addToCart({ commit }, { product_id, price, quantity, weight }) {
      // get data token dan user
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      // set axios header dengan type Authorization + Bearer token
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      // kirim data addToCart ke server
      Api.post("/cart", {
        product_id: product_id,
        price: price,
        quantity: quantity,
        weight: weight,
        customer_id: user.id,
      }).then(() => {
        // get data cart
        Api.get("/cart").then((response) => {
          // commit mutation GET_CART
          commit("GET_CART", response.data.cart);
        });

        // get total cart
        Api.get("/cart/total").then((response) => {
          // commit mutation GET_CART
          commit("TOTAL_CART", response.data.total);
        });
      });
    },

    // action cartCount
    cartCount({ commit }) {
      const token = localStorage.getItem("token");
      // set axios header dengan type Authorization + Bearer token
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get("/cart").then((response) => {
        commit("GET_CART", response.data.cart);
      });
    },

    // action cartCount
    cartTotal({ commit }) {
      const token = localStorage.getItem("token");
      // set axios header dengan type Authorization + Bearer token
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get("/cart/total").then((response) => {
        commit("TOTAL_CART", response.data.total);
      });
    },

    // action cartWeight
    cartWeight({ commit }) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.get("cart/total-weight").then((response) => {
        commit("CART_WEIGHT", response.data.total);
      });
    },

    // action remove cart
    removeCart({ commit }, cart_id) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.post("cart/remove", {
        cart_id: cart_id,
      }).then(() => {
        //get cart
        Api.get("/cart").then((response) => {
          commit("GET_CART", response.data.cart);
        });

        //get total cart
        Api.get("/cart/total").then((response) => {
          commit("TOTAL_CART", response.data.total);
        });

        //get total cart weight
        Api.get("cart/total-weight").then((response) => {
          commit("CART_WEIGHT", response.data.total);
        });
      });
    },
  },

  getters: {
    //get cart
    getCart(state) {
      return state.cart;
    },

    //count cart
    cartCount(state) {
      return state.cart.length;
    },

    cartTotal(state) {
      return state.cartTotal;
    },
  },
};

export default cart;
