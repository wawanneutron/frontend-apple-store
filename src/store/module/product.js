import Api from "../../api/Api";

const product = {
  namespaced: true,

  state: {
    products: [],
    detailProduct: {},
  },

  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
    GET_DETAIL_PRODUCT(state, product) {
      state.detailProduct = product;
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
    getDetailProduct({ commit }, slug) {
      Api.get(`/product/${slug}`)
        .then((response) => {
          commit("GET_DETAIL_PRODUCT", response.data.product);
          console.log("detail product");
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

    getDetailProduct(state) {
      return state.detailProduct;
    },
  },
};

export default product;
