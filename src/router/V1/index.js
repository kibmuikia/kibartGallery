import Vue from "vue";
// import VueRouter from "vue-router";
import Router from "vue-router";
import { routes } from "./routes";
import { store } from "@/store/V1";
// import fire from "@/fire/V1";

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

/* eslint-disable no-console */

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // let current_user = fire.auth.currentUser;
    if (!store.getters.user.uid) {
      console.log(`\tUser-id[ ${store.getters.user.uid} ]-not-present !`);
      next({
        path: "/auth/artist/signin",
        query: { redirect: to.fullPath }
      });
    } else {
      console.log(`\tUser[ ${store.getters.user.email} ] present.`);
      next();
    }
  } else {
    next();
  }
  // if (to.fullPath === "/upload-image") {
  //   console.log(to.fullPath);
  //   if (!store.state.user.uid) {
  //     console.log("No User");
  //     console.log(store.getters.user.uid);
  //     next("/auth/artist/signin");
  //   }
  // } //end-upload-image
  next();
}); //end-[ beforeEach ]

export { router };
