//import vue router
import { createRouter, createWebHistory } from "vue-router";
// import store vuex
import store from "@/store";
//define a routes
const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/customer/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/Index.vue"),
    // check is loggedIn
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer/order",
    name: "order",
    component: () => import("@/views/order/Index.vue"),
    // check is loggedIn
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer/order/:snap_token",
    name: "detail_order",
    component: () => import("@/views/order/Show.vue"),
    // check is loggedIn
    meta: {
      requiresAuth: true,
    },
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes
});

// define route for handle authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // cek nilai dari getters isLoggedIn di module auth
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
