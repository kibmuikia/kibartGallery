<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3>Artist SignUp View</h3>
      <p>The artist shall provide detail in order to be verified</p>
    </v-flex>
    <v-flex xs12>
      <SignUpForm />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

// import UploadImageForm from "@/components/UploadImageForm/V1/";
import SignUpForm from "@/components/SignUpForm/V1/";

export default {
  name: "artist-sign-up-view",
  components: {
    SignUpForm
  }
};
</script>

<style scoped></style>
