<template>
  <v-form
    v-model="valid"
    id="form-sign-up"
    ref="formSignUp"
    @submit.prevent="processForm"
    enctype="multipart/form-data"
  >
    <v-container>
      <v-layout align-center justify-center row wrap/>
        <v-flex xs12> <h4 class="subheading">Sign Up Form</h4> </v-flex>
        <v-flex xs12>
          <v-btn color="primary" type="submit" :loading="loadingflag">
            Submit Details
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: "sign-up-form-component",
  data() {
    return {
      valid: null,
      loadingflag: false
    }
  },
  methods: {
    processForm() {
      console.log( 'entered method[ processForm ]' );
    }
  }
};
</script>

<style scoped></style>
