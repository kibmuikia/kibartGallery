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
    basiclinks: [
      {
        title: "Home",
        path: "/",
        pathname: "home"
      },
      {
        title: "About",
        path: "/about",
        pathname: "about"
      }
    ]
  },
  getters: {
    status: state => {
      return state.status;
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
