<template>
  <v-layout align-center justify-center column>
    <v-flex xs12 md12>
      <label for="imageinput" class="">
        <v-layout row align-center justify-center>
          <v-flex xs12 class="text-xs-center">
            <p class="subheading labeltextwrap pa-1">{{ labeltext }}</p>
          </v-flex>
          <v-flex xs12>
            <v-btn
              flat
              icon
              class="opacityPulse-css"
              color="blue lighten-2"
              @click="snackbar = true"
              @mouseenter="
                snackbarinfo =
                  'Ensure you choose one image file. Preferably small sized[ equal to or less than 2MB ] images to gurantee upload, for now.'
              "
            >
              <v-icon>info</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </label>
    </v-flex>

    <input
      id="imageinput"
      name="imageinput"
      type="file"
      multiple
      accepts="image/*"
      v-on:change="processImage($event.target)"
      class="hide-input-file"
    />

    <v-snackbar
      v-model="snackbar"
      multi-line
      right
      top
      vertical
      :color="snackbarColor"
      class="black--text"
      :timeout="timeout"
    >
      {{ snackbarinfo }}
      <v-btn flat icon color="black" dark @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- <Tip :information="theTip" :show="show" /> -->
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import { serverBus } from "@/main";
require("@/assets/infinite.css");
// import Tip from "@/components/Tip";

export default {
  name: "image-input-component",
  props: [],
  components: {
    // Tip
  },
  data() {
    return {
      filesdata: null,
      snackbar: false,
      snackbarColor: "",
      mode: "multi-line",
      // y: "top",
      timeout: 4000,
      snackbarinfo:
        "Ensure you choose one image file. Preferably small sized[ equal to or less than 2MB ] images to gurantee upload, for now.",
      labeltext: "Choose An Image"
    }; //end-return
  }, //end-data
  methods: {
    processImage(inputdata) {
      // console.log("data is present/changed");
      // console.log(inputdata);
      this.filesdata = inputdata.files;
      let numfiles = this.filesdata.length;
      this.snackbarinfo = `You have selected [ ${numfiles} ] files.[ ${
        this.filesdata[0].name
      } ]`;
      this.snackbarColor = "white";
      this.snackbar = true;
      this.labeltext = `[ ${numfiles} ] files selected`;
      // console.log(this.filesdata);
      // Using the server bus
      serverBus.$emit("imagesSelected", this.filesdata);
    }, //end-processImage
    resetInput() {
      // .
    }
  }, //end-methods
  watch: {}, //end-watch
  computed: {}, //end-computed
  created() {
    // .
  }, //end-created
  mounted() {
    serverBus.$on("reset-image-input", () => {
      this.filesdata = null;
      this.labeltext = "Choose An Image !";
    });
    // invalid-image
    serverBus.$on("invalid-image", data => {
      this.filesdata = null;
      this.labeltext = data;
      this.snackbarinfo = data;
      this.snackbarColor = "error";
      this.snackbar = true;
    });
  } //end-mounted
}; //end-export
</script>

<style scoped>
.hide-input-file {
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -10;
  opacity: 0;
}
.labeltextwrap {
  background-color: #aab2bd;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  color: black;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
.labeltextwrap:hover {
  /*box-shadow: 0 5px 8px 0 rgba(235, 235, 235, 0.2),
    0 3px 12px 0 rgba(235, 235, 235, 0.19);*/
  -webkit-box-shadow: -1px 2px 11px -2px rgba(79, 240, 135, 1);
  -moz-box-shadow: -1px 2px 11px -2px rgba(79, 240, 135, 1);
  box-shadow: -1px 2px 11px -2px rgba(79, 240, 135, 1);
}
.opacityPulse-css {
  animation: opacityPulse 2s ease-out;
  animation-iteration-count: infinite;
  opacity: 1;
}
.opacityPulse-css:hover {
  animation: none;
}
</style>
