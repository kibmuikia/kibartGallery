/* eslint-disable no-console */

import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import { router } from "./router/V1";

// import LazyLoadDirective from "./directives/LazyLoadDirective";
// import KibShow from "./directives/KibShow";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faPinterest,
  faTelegram,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons"; // faFacebook pencil-alt
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: "UA-135976056-1",
  router,
  checkDuplicatedScript: true,
  autoTracking: {
    screenview: true,
    transformQueryString: false
  },
  debug: {
    enabled: true,
    sendHitTask: false
  }
});

import SocialSharing from "vue-social-sharing";

Vue.use(SocialSharing);

// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// NProgress.configure({ easing: "ease", speed: 1300, showSpinner: false });

library.add(
  faTwitter,
  faPencilAlt,
  faFacebook,
  faPinterest,
  faTelegram,
  faWhatsapp,
  faEnvelope
);
// library.add(faPencilAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Vue.directive("lazyload", LazyLoadDirective);
// Vue.directive("kibshow", KibShow);

export const serverBus = new Vue();

// Vue.http.headers.common["Access-Control-Allow-Origin"] = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeResolve((to, from, next) => {
  // store.commit("ON_PRELOADERFLAG");
  // console.log(to.meta);
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
  if (to.matched.some(record => record.meta.title)) {
    // console.log(to.matched.some(record => record.meta.title));
    // console.log(to);
    // console.log(to.meta.title);
    document.title = to.meta.title;
    console.log(document.title);
    // let titleVal = record.meta.title;
    // console.log(`Title[ ${titleVal}`);
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
