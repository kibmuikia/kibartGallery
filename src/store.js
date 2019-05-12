import Vue from "vue";
import Vuex from "vuex";

/* eslint-disable no-console */

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: ""
    // other state
  }, //end-[ state ]
  getters: {
    message: state => {
      return state.message;
    }
    // other getters
  }, //end-[ getters ]
  mutations: {
    SET_MESSAGE: (state, newValue) => {
      state.message = newValue;
    }
    // other mutations
  }, //end-[ mutations ]
  actions: {
    setMessage: ({ commit, state }, newValue) => {
      commit("SET_MESSAGE", newValue);
      return state.message;
    }
    // other actions
  } //end-[ actions ]
}); //end-export
