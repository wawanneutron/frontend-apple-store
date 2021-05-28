import Api from "../../api/Api";

const sliders = {
  namespaced: true,

  state: {
    sliders: [],
  },

  mutations: {
    GET_SLIDERS(state, sliders) {
      state.sliders = sliders;
    },
  },

  actions: {
    getSliders({ commit }) {
      // get data categories ke server
      Api.get("/sliders")
        .then((response) => {
          // commit ke mutation GET_CATEGORIES dengan response data
          commit("GET_SLIDERS", response.data.sliders);
          console.log("data sliders");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  getters: {
    getSliders(state) {
      return state.sliders;
    },
  },
};

export default sliders;
