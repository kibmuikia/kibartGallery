import Vue from "vue";
import Router from "vue-router";
import Home from "../../views/Home.vue";
import EmptyRouteView from "../../views/EmptyRouterView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "../../views/About.vue")
    },
    {
      path: "/gallery",
      name: "gallery",
      component: () => import("../../views/Gallery/V1/All.vue")
    },
    {
      path: "/sign-in",
      name: "signin",
      component: () => import("../../views/Auth/V1/signin.vue")
    },
    {
      path: "/sign-up",
      name: "signup",
      component: () => import("../../views/Auth/V1/signup.vue")
    },
    {
      path: "/profile/:nickname",
      component: EmptyRouteView,
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("../../views/Auth/V1/profile.vue")
        },
        {
          path: "your-artwork",
          name: "yourartwork",
          component: () => import("../../views/Auth/V1/your_artwork.vue")
        },
        {
          path: "upload",
          name: "upload",
          component: () => import("../../views/Auth/V1/upload.vue")
        }
      ]
    }
  ]
});
