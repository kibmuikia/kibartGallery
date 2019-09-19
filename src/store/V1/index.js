import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

/* eslint-disable no-console */

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "kibart-app",
  storage: window.sessionStorage
  // reducer: state => ({ post: state.post, user: state.user })
});

export default new Vuex.Store({
  state: {
    status: "",
    navlinks: [
      {
        title: "Home",
        path: "/",
        pathname: "home",
        icon: "mdi-home"
      },
      {
        title: "Kibart Gallery",
        path: "/kibart",
        pathname: "kibart",
        icon: "mdi-camera",
        color: "green"
      },
      // {
      //   title: "Gallery",
      //   path: "/gallery",
      //   pathname: "gallery",
      //   icon: "mdi-camera"
      // },
      // {
      //   title: "Account",
      //   path: "/sign-in",
      //   pathname: "upload",
      //   icon: "mdi-account"
      // },
      {
        title: "About",
        path: "/about",
        pathname: "about",
        icon: "mdi-book-information-variant"
      }
    ],
    kibart: [],
    lazyurl: require("@/assets/over-min.png")
  },
  getters: {
    status: state => {
      return state.status;
    },
    kibart: state => {
      return state.kibart;
    }
  },
  mutations: {
    SET_STATUS: (state, newValue) => {
      state.status = newValue;
    },
    UNSET_STATUS: state => {
      state.status = "";
    }
  },
  actions: {
    setStatus: ({ commit, state }, newValue) => {
      commit("SET_STATUS", newValue);
      return state.status;
    },
    unsetStatus: ({ commit, state }) => {
      commit("UNSET_STATUS");
      return state.status;
    }
  },
  plugins: [vuexPersist.plugin]
});
