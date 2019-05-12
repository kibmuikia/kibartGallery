import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: localStorage
  // reducer: state => ({ post: state.post, user: state.user })
});

export const store = new Vuex.Store({
  state: {
    status: "",
    // other state
    user: {}
  }, //end-[ state ]
  getters: {
    status: state => {
      return state.status;
    },
    // other getters
    user: state => {
      return state.user;
    }
  }, //end-[ getters ]
  mutations: {
    SET_STATUS: (state, newValue) => {
      state.status = newValue;
    },
    // other mutations
    SET_USER: (state, newUser) => {
      state.user = newUser;
    },
    UNSET_USER: state => {
      state.user = {};
    }
  }, //end-[ mutations ]
  actions: {
    setStatus: ({ commit, state }, newValue) => {
      commit("SET_STATUS", newValue);
      return state.status;
    },
    // other actions
    setUser: ({ commit, state }, newUser) => {
      commit("SET_USER", newUser);
      return state.user;
    },
    unsetUser: ({ commit, state }) => {
      commit("UNSET_USER");
      return state.user;
    }
  }, //end-[ actions ]
  plugins: [vuexPersist.plugin]
});
