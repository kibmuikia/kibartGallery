import Vue from "vue";
// import VueRouter from "vue-router";
import Router from "vue-router";
import { routes } from "./routes";

// Vue.use(VueRouter);
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // = new { VueRouter ..or.. Router }
  routes, // short for routes: routes
  // routes: routes,
  linkActiveClass: "active"
});

export { router };
