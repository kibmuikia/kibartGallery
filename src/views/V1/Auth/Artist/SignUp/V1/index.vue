<template>
  <v-layout row wrap>
    <v-flex xs12 class="">
      <SignUpForm />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import SignUpForm from "@/components/SignUpForm/V3/";

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
    // .
  },
  created: function() {
    // .
  }
}; //end-export
</script>

<style scoped></style>
