import Api from "../../api/Api";

const product = {
  namespaced: true,

  state: {
    products: [],
  },

  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
  },

  actions: {
    getProducts({ commit }) {
      // get data categories ke server
      Api.get("/products")
        .then((response) => {
          // commit ke mutation GET_CATEGORIES dengan response data
          commit("GET_PRODUCTS", response.data.product);
          console.log("data products");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  getters: {
    getProducts(state) {
      return state.products;
    },
  },
};

export default product;
