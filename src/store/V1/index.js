import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import utils from "@/utils/V1";
import fire from "@/fire/V1";

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "kibart-gallery-app",
  storage: window.sessionStorage
  // reducer: state => ({ post: state.post, user: state.user })
});

export default new Vuex.Store({
  state: {
    status: "null",
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
    },
    ADD_KIBART: (state, newValue) => {
      state.kibart.push(newValue);
    },
    EMPTY_KIBART: state => {
      state.kibart = [];
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
    },
    addKibartAction: async ({ commit, state }) => {
      let kibartRef = fire.db.collection("kibart");
      await kibartRef.onSnapshot(
        querySnapshot => {
          querySnapshot.docChanges().forEach(async change => {
            let thumbUrl = await utils.getUrl(
              change.doc.data().location.t_partial
            );
            let gotdocument = utils.extend(
              {
                thumb_url: thumbUrl,
                fullurl: change.doc.data().location.full
              },
              change.doc.data()
            );
            // SELF.artwork.push(gotdocument);
            commit("ADD_KIBART", gotdocument);
          });
        },
        e => {
          console.log("Error in [ addKibartAction ]");
          console.error(e);
        }
      );
    }
  },
  plugins: [vuexPersist.plugin]
});
