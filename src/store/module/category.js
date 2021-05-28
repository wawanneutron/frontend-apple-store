import Api from "../../api/Api";

const category = {
  namespaced: true,

  state: {
    categoriesHome: [],
    categoriesAll: [],
    productOnCategory: [],
  },

  mutations: {
    GET_CATEGORIES_HOME(state, categories) {
      state.categoriesHome = categories;
    },

    GET_CATEGORIES_ALL(state, categories) {
      state.categoriesAll = categories;
    },

    GET_PRODUCT_ON_CATEGORY(state, categories) {
      state.productOnCategory = categories;
    },
  },

  actions: {
    getCategoriesHome({ commit }) {
      // get data categories ke server
      Api.get("/categories-home")
        .then((response) => {
          // commit ke mutation GET_CATEGORIES dengan response data
          commit("GET_CATEGORIES_HOME", response.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCategoriesAll({ commit }) {
      Api.get("/categories-all")
        .then((response) => {
          commit("GET_CATEGORIES_ALL", response.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProductOnCategory({ commit }, slug) {
      Api.get(`/category-show/${slug}`)
        .then((response) => {
          commit("GET_PRODUCT_ON_CATEGORY", response.data.product);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  getters: {
    getCategoriesHome(state) {
      return state.categoriesHome;
    },

    getCategoriesAll(state) {
      return state.categoriesAll;
    },

    getProductOnCategory(state) {
      return state.productOnCategory;
    },
  },
};

export default category;
