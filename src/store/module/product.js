import Api from "../../api/Api";

const product = {
  namespaced: true,

  state: {
    products: [],
    productsHome: [],
    productsTerlaris: [],
    detailProduct: {},
    galleries: [],
  },

  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
    GET_DETAIL_PRODUCT(state, product) {
      state.detailProduct = product;
    },
    GET_PRODUCTS_HOME(state, product) {
      state.productsHome = product;
    },
    GET_PRODUCTS_TERLARIS(state, product) {
      state.productsTerlaris = product;
    },
    GALLERY(state, gallery) {
      state.galleries = gallery;
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
    getProductsHome({ commit }) {
      Api.get("/products-home")
        .then((response) => {
          commit("GET_PRODUCTS_HOME", response.data.product);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTerlaris({ commit }) {
      Api.get("/products-terlaris")
        .then((response) => {
          commit("GET_PRODUCTS_TERLARIS", response.data.terlaris);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailProduct({ commit }, slug) {
      Api.get(`/product/${slug}`)
        .then((response) => {
          commit("GET_DETAIL_PRODUCT", response.data.product);
          commit("GALLERY", response.data.product.gallery);
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
    getProductsHome(state) {
      return state.productsHome;
    },
    getProductsTerlaris(state) {
      return state.productsTerlaris;
    },
    getGalleries(state) {
      return state.galleries;
    },
  },
};

export default product;
