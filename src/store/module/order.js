import Api from "../../api/Api";
const order = {
  // set namespace true
  namespaced: true,

  state: {
    // define state orders
    orders: [],
  },

  mutations: {
    GET_ORDER(state, orders) {
      state.orders = orders; //asign state orders dari hasil response
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
  },

  getters: {
    // getter getOrder
    getOrder(state) {
      return state.orders;
    },
  },
};

export default order;
