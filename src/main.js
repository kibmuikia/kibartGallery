/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
// import store from "./store";
import { router } from "./router/V1";
import { store } from "./store/V1";

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
    enabled: false,
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

Vue.component("font-awesome-icon", FontAwesomeIcon);
// Vue.use(require("vue-moment"));

Vue.config.productionTip = false;

// Vue.directive("lazyload", LazyLoadDirective);
// Vue.directive("kibshow", KibShow);

export const serverBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeResolve((to, from, next) => {
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
