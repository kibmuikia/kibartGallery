<template>
  <v-layout
    align-center
    justify-center
    row
    text-xs-center
    wrap
    class="landingViewWrap"
  >
    <!-- . -->
    <v-flex xs12 md12 mb-4 pa-1>
      <v-img
        :src="require('../assets/landingPage/kib-art-orange.png')"
        class=""
        contain
        height="200"
      ></v-img>
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome to KibArt Gallery
      </h1>
      <p class="title font-weight-light pa-2">
        An art space, where artists ride
        <br />the waves of creativity.
        <br />
        <v-btn v-on:click="viewGallery" flat color="success">
          View Gallery
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </p>
    </v-flex>
    <!-- . -->
  </v-layout>
</template>

<script>
// eslint-disable-next-line
import utils from "@/utils/V1";

export default {
  name: "landing-view-component",
  data: () => ({
    // .
  }), //end-data
  methods: {
    viewGallery() {
      // utils.showAlert("Information", "Gallery under development.", "info");
      this.$router.push("/gallery");
    } //end-viewGallery
  } //end-methods
};
</script>

<style scoped>
.landingViewWrap {
  background-image: url("../assets/landingPage/pencil-blackboard.jpg");
  background-position: bottom center;
  background-size: cover;
  background-attachment: fixed;
}
@media only screen and (max-width: 768px) {
  .landingViewWrap {
    background-size: 160% 100%;
    background-position: 30% 0%;
    background-attachment: scroll;
  }
}
</style>
