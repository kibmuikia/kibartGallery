import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import { router } from "./router/V1";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; // faFacebook pencil-alt
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// NProgress.configure({ easing: "ease", speed: 1300, showSpinner: false });

library.add(faTwitter);
library.add(faPencilAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeResolve((to, from, next) => {
  // store.commit("ON_PRELOADERFLAG");
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    // NProgress.start();
    // console.log("route load START-ing !");
    // eslint-disable-next-line
    // console.log(`b4R :: ${store.state.viewPreloaderFlag}`);
    // store.commit("toggleFlagStore");
    // store.commit("ON_PRELOADERFLAG");
    // setTimeout(() => {
    //   store.commit("TOGGLE_PRELOADERFLAG");
    // }, 20);
    // setTimeout(function(){ alert("Hello"); }, 3000);
    // TOGGLE_PRELOADERFLAG
    // eslint-disable-next-line
    // console.log(`b4R :: ${store.state.viewPreloaderFlag}`);
  }
  next();
});

// eslint-disable-next-line
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  // NProgress.done();
  // store.commit("OFF_PRELOADERFLAG");
  // eslint-disable-next-line
  // console.log("route load DONE !");
  // eslint-disable-next-line
  // console.log(`aE :: ${store.state.viewPreloaderFlag}`);
});
