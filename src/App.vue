<template>
  <v-app dark>
    <v-content>
      <Toolbar />

      <v-container fill-height fluid>
        <!-- <router-view></router-view> -->

        <!-- <transition name="fade"> -->
        <v-fade-transition mode="out-in">
          <PreloadSpinner v-if="flag" />
        </v-fade-transition>
        <!-- </transition> -->

        <!-- <transition name="fadeLeftBig"> -->
        <v-scale-transition origin="center center" mode="out-in">
          <router-view></router-view>
        </v-scale-transition>
        <!-- </transition> -->
      </v-container>

      <Footer />
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

import Toolbar from "./components/Toolbar";
require("vue2-animate/dist/vue2-animate.min.css");
import PreloadSpinner from "./components/PreloadSpinner";
// import { serverBus } from "@/main";

export default {
  name: "App",
  components: {
    Toolbar,
    Footer: () => import("@/components/Footer"),
    PreloadSpinner
  },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    toggleFlag() {
      this.flag = true;
      let self = this;
      setTimeout(() => {
        self.flag = !self.flag;
      }, 1200);
    },
    trackPage() {
      this.$ga.page(this.$router);
      // console.log("page tracked");
    }
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      // .
      // react to route changes...
      // console.log(to, from);
      this.toggleFlag();
      this.trackPage();
      // console.log("beforeUpdate: called");
      // eventBus.$emit("renderForm");
      // eventBus.$emit("formClear");
      // console.log(`after: ${from.toString()}, to: ${to}`, this.$route.path);
    }
  },
  created() {
    this.toggleFlag();
  },
  mounted() {
    // this.showFlagValue();
    // Using the server bus
    // serverBus.$on("gotuser", receiveduser => {
    //   console.log("created()->serverBus.on[gotuser] running !!");
    //   console.log(receiveduser);
    //   this.$store.dispatch("setUser");
    //   this.user = this.$store.user;
    //   this.filesdata = fd;
    //   console.log(this.filesdata);
    // });
  }
  // computed: {
  //   // a computed getter
  //   flagComputed: function() {
  //     // `this` points to the vm instance
  //     // return this.message.split('').reverse().join('')
  //     // return this.$store.getters.viewPreloaderFlag;
  //     let flag = this.$store.getters.viewPreloaderFlag;
  //     return this.flag;
  //   }
  // }
};
</script>

<style scoped>
/*.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8  {
  opacity: 0;
}*/
</style>
