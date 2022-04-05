import Login from "./components/Login-Page.vue";
import Dashboard from "./components/Dash-Board.vue";
import { createRouter, createWebHistory } from "vue-router";
 
const routes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
];

export const routeConfig = createRouter({
  history: createWebHistory(),
  routes: routes,
});