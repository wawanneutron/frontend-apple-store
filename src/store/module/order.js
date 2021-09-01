import Api from "../../api/Api";
const order = {
  // set namespace true
  namespaced: true,

  state: {
    // define state orders
    orders: [],
    detailOrder: {},
    productInOrder: [],
  },

  mutations: {
    // get order
    GET_ORDER(state, orders) {
      state.orders = orders; //asign state orders dari hasil response
    },

    // detail order
    DETAIL_ORDER(state, detailOrder) {
      state.detailOrder = detailOrder; //asign state detailOrder dari hasil response
    },

    // product in order
    PRODUCT_IN_ORDER(state, product) {
      state.productInOrder = product; //asign state productInOrder dari hasil response
    },
  },

  actions: {
    // action getOrder
    getOrder({ commit }) {
      // define variabel token
      const token = localStorage.getItem("token");

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get("/order").then((response) => {
        // commit ke mutation GET_ORDER
        commit("GET_ORDER", response.data.data);
      });
    },

    // action detailOrder
    detailOrder({ commit }, snap_token) {
      // define variable token
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get(`/order/${snap_token}`).then((response) => {
        // commit mutation DETAIL_ORDER
        commit("DETAIL_ORDER", response.data.data);

        // commit mutation PRODUCT_IN_ORDER
        commit("PRODUCT_IN_ORDER", response.data.product);
      });
    },
    // submitReview({ order_id, product_id, rating, review }) {
    //   // get data token dan user
    //   const token = localStorage.getItem("token");
    //   const user = JSON.parse(localStorage.getItem("user"));

    //   // set axios header dengan type Authorization + Bearer token
    //   Api.defaults.headers.common["Authorization"] = "Bearer " + token;

    //   return new Promise((resolve, reject) => {
    //     // kirim data ke server
    //     Api.post("/review", {
    //       order_id: order_id,
    //       product_id: product_id,
    //       rating: rating,
    //       review: review,
    //       customer_id: user.id,
    //     })
    //       .then((response) => {
    //         resolve(response.data);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
  },

  getters: {
    // getter getOrder
    getOrder(state) {
      return state.orders;
    },
    detailOrder(state) {
      return state.detailOrder;
    },
    productInOrder(state) {
      return state.productInOrder;
    },
  },
};

export default order;
