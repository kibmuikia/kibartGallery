import Vue from "vue";
import App from "./App.vue";
import router from "./router/V1/";
import store from "./store/V1/";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

import TitleMixin from "./mixins/TitleMixin/V1/";

Vue.mixin(TitleMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
