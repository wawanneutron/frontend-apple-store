//import vuex
import { createStore } from "vuex";
// import module auth
import auth from "./module/auth";
import order from "./module/order";

//create store vuex
export default createStore({
  modules: {
    auth,
    order,
  },
});
