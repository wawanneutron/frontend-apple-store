//import vuex
import { createStore } from "vuex";
// import module auth
import auth from "./module/auth";
import order from "./module/order";
import category from "./module/category";
import slider from "./module/slider";
import product from "./module/product";
import cart from "./module/cart";
import alert from "./module/alert";

//create store vuex
export default createStore({
  modules: {
    auth,
    order,
    category,
    slider,
    product,
    cart,
    alert,
  },
});
