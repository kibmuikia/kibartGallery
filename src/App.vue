<template>
  <v-app class="">
    <!-- . -->

    <Nav />

    <v-content>
      <v-scale-transition origin="center center" mode="out-in">
        <router-view></router-view>
      </v-scale-transition>
    </v-content>

    <Footer />
    <!-- . -->

    <v-snackbar
      v-model="snackWithButtons"
      :timeout="timeout"
      bottom
      left
      class="snack"
    >
      {{ snackWithBtnText }}
      <v-spacer />
      <v-btn dark text color="#00f500" @click.native="refreshApp">
        {{ snackBtnText }}
      </v-btn>
      <v-btn icon @click="snackWithButtons = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <!-- . -->
  </v-app>
</template>

<script>
/* eslint-disable no-console */

import Nav from "./components/V1/navigation";
import Footer from "./components/V1/footer";

// let SELF;
export default {
  name: "App",
  components: {
    Nav,
    Footer
  },
  data: () => ({
    registration: null,
    refreshing: false,
    snackBtnText: "",
    snackWithBtnText: "",
    snackWithButtons: false,
    timeout: 0,
  }),
  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  },
  beforeCreate() {
    // SELF = this;
  },
  created() {
    // .
  },
  mounted() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // if( document ){
    //   // console.log( 'present' );
    //   // console.log( document );
    //   try{
    //     document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    //   } catch( e ) {
    //     console.error( 'adding eventlistener failed' );
    //     console.error( e );
    //   }
    // }

    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }
};
</script>

<style>
@import "./assets/css/kibmain.css";

.kibtitle {
  font-family: "Indie Flower", cursive;
  font-size: 1.35em;
}
.kibtitle2 {
  font-family: "Barrio", cursive;
  font-size: 2em;
  letter-spacing: 0.2em;
}
.kibtitle3 {
  font-family: "Caesar Dressing", cursive;
  font-size: 2em;
  letter-spacing: 0.2em;
}
/* Provide better right-edge spacing when using an icon button there. */
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>
