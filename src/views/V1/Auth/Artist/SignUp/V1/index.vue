<template>
  <v-layout row wrap>
    <!-- <v-flex xs12 style="">
      <h3>Artist SignUp View</h3>
      <p>The artist shall provide detail in order to be verified</p>
    </v-flex> -->
    <v-flex xs12 class="">
      <SignUpForm />
      <!-- <div id="firebaseui-auth-container"></div> -->
      <!-- <div id="loader">Loading...</div> -->
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import SignUpForm from "@/components/SignUpForm/V1/";
// import fire from "@/fire/V1";
// import firebaseui from "firebaseui"; // var firebaseui = require('firebaseui');

export default {
  name: "artist-sign-up-view",
  components: {
    SignUpForm
  },
  data() {
    return {
      // .
    };
  }, //end-data
  methods: {
    // startUi() {
    //   let ui = new firebaseui.auth.AuthUI(fire.auth); // Initialize the FirebaseUI Widget.
    //   let uiConfig = {
    //     callbacks: {
    //       // eslint-disable-next-line
    //       signInSuccessWithAuthResult: (authResult, redirectUrl) => {
    //         return true;
    //       },
    //       uiShown: () => {
    //         document.getElementById("loader").style.display = "none";
    //       }
    //     },
    //     signInFlow: "popup",
    //     signInSuccessUrl: "/gallery",
    //     signInOptions: [
    //       // firebase.auth.EmailAuthProvider.PROVIDER_ID
    //       // fire.auth.EmailAuthProvider.PROVIDER_ID
    //     ]
    //     // Terms of service url.
    //     // tosUrl: '<your-tos-url>',
    //     // Privacy policy url.
    //     // privacyPolicyUrl: '<your-privacy-policy-url>'
    //   };
    //   // The start method will wait until the DOM is loaded.
    //   // ui.start("#firebaseui-auth-container", uiConfig);
    //   fire.auth
    //     .createUserWithEmailAndPassword("muikiadroid@gmail.com", "password123")
    //     .catch(e => {
    //       console.error(e);
    //     });
    // } //end-startUi
  },
  created: function() {
    // this.startUi();
  }
}; //end-export
</script>

<style scoped></style>
