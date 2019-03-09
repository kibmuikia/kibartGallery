import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // mutations: {
  //   // .
  //   toggleFlagStore(state) {
  //     // mutate state
  //     state.viewPreloaderFlag = !state.viewPreloaderFlag;
  //   }
  // },

  // .

  state: {
    message: "",
    // other state
    viewPreloaderFlag: true
  },
  getters: {
    message: state => {
      return state.message;
    },
    // other getters
    viewPreloaderFlag: state => {
      return state.viewPreloaderFlag;
    }
  },
  mutations: {
    SET_MESSAGE: (state, newValue) => {
      state.message = newValue;
    },
    // other mutations
    TOGGLE_PRELOADERFLAG: state => {
      // setTimeout(() => {
      //   // store.commit("TOGGLE_PRELOADERFLAG");
      //   state.viewPreloaderFlag = !state.viewPreloaderFlag;
      //   // eslint-disable-next-line
      //   console.log(`toggle to :: [ ${state.viewPreloaderFlag} ]`);
      // }, 100);
      state.viewPreloaderFlag = !state.viewPreloaderFlag;
      // eslint-disable-next-line
      console.log(`TOGGLE !!! :: [ ${state.viewPreloaderFlag} ]`);
    },
    ON_PRELOADERFLAG: state => {
      state.viewPreloaderFlag = true;
      // eslint-disable-next-line
      console.log(`ON ! :: [ ${state.viewPreloaderFlag} ]`);
    },
    OFF_PRELOADERFLAG: state => {
      state.viewPreloaderFlag = false;
      // eslint-disable-next-line
      console.log(`OFF !! :: [ ${state.viewPreloaderFlag} ]`);
    }
  },
  actions: {
    setMessage: ({ commit, state }, newValue) => {
      commit("SET_MESSAGE", newValue);
      return state.message;
    }
    // other actions
  }

  // .
});
