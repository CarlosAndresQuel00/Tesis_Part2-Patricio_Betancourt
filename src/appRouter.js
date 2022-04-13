import Login from "./components/Login-Page.vue";
import Dashboard from "./components/Dash-Board.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import cookie from 'js-cookie'

const routes = [
    { path: "/", component: Login, meta: {requiredAuth: false} },
    { path: "/login", component: Login, meta: {requiredAuth: false} },
    { path: "/dashboard", component: Dashboard, meta: {requiredAuth: true} },
];

export const routeConfig = createRouter({
    history: createWebHistory(),
    routes: routes,
});

routeConfig.beforeEach(async (to, from, next) => {
  let userProfile = store.getters["auth/getUserProfile"];
  let isAuthenticated = cookie.get("isAuthenticated");
  if (userProfile.id === 0 && isAuthenticated) {
    await store.dispatch("auth/userProfile");
    userProfile = store.getters["auth/getUserProfile"];
  }

  if (to.fullPath == "/") {
    return next();
  } else if (!to.meta.requiredAuth) {
    if (userProfile.id !== 0) {
      return next({ path: "/dashboard" });
    }
  } else if (to.meta.requiredAuth) {
    if (userProfile.id === 0) {
      return next({ path: "/login" });
    }
  }

  return next();
});
