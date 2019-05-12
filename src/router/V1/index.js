import Vue from "vue";
// import VueRouter from "vue-router";
import Router from "vue-router";
import { routes } from "./routes";
import { store } from "@/store/V1";
// import fire from "@/fire/V1";

/* eslint-disable no-console */

// Vue.use(VueRouter);
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // = new { VueRouter ..or.. Router }
  routes, // short for routes: routes
  // routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition);
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkActiveClass: "active"
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // let current_user = fire.auth.currentUser;
    // !store.getters.user.uid
    if (
      isEmpty(store.getters.user) ||
      store.getters.user.emailVerified != true
    ) {
      console.log(`\tUser-id[ ${store.getters.user.uid} ]-not-present !`);
      next({
        path: "/auth/artist/signin",
        query: { status: "Invalid User, Please Sign In", redirect: to.fullPath }
      });
    } else {
      console.log(
        `\tUser[ ${store.getters.user.email} ][${
          store.getters.user.emailVerified
        }] present & valid.`
      );
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
