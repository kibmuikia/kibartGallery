<template>
  <v-app dark>
    <v-content>
      <Toolbar />

      <v-container fill-height fluid>
        <!-- <router-view></router-view> -->

        <transition name="fade">
          <PreloadSpinner v-if="flag" />
        </transition>

        <transition name="fadeLeftBig">
          <router-view></router-view>
        </transition>
      </v-container>

      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
require("vue2-animate/dist/vue2-animate.min.css");
import PreloadSpinner from "./components/PreloadSpinner";

export default {
  name: "App",
  components: {
    Toolbar,
    Footer: () => import("@/components/Footer"),
    PreloadSpinner
    // PreloaderSpinner
  },
  data() {
    return {
      // viewPreloaderFlag: this.$store.state.viewPreloaderFlag,
      // flag: this.$store.getters.viewPreloaderFlag
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
    }
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      // react to route changes...
      // console.log(to, from);
      // eventBus.$emit("onEntityChanged",to.path);
      // this.toggleLoader();
      this.toggleFlag();
      // toggleFlag
      // console.log("beforeUpdate: called");
      // eventBus.$emit("renderForm");
      // eventBus.$emit("formClear");
      // console.log(`after: ${from.toString()}, to: ${to}`, this.$route.path);
    }
  },
  created() {
    // this.toggleLoader();
    this.toggleFlag();
    // toggleFlag
    // eventBus.$on("toggleSnackbar", data => this.toggleSnackbar(data));
  }
  // mounted() {
  //   // this.showFlagValue();
  // }
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
  // watch: {
  //   // kilometers: function(val) {
  //   //   this.kilometers = val;
  //   //   this.meters = val * 1000;
  //   // },
  //   flagWatched: this.showFlagValue()
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
