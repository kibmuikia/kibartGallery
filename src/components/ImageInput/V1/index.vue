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
              color="blue lighten-2"
              @click="snackbar = true"
              @mouseenter="
                snackbarinfo =
                  'Preferably small sized[ equal to or less than 2MB ] images to gurantee upload, for now.'
              "
              class=""
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
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      top="top"
    >
      {{ snackbarinfo }}
      <v-btn flat icon color="pink lighten-1" dark @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import { serverBus } from "@/main";

export default {
  name: "image-input-component",
  props: [],
  data() {
    return {
      filesdata: null,
      snackbar: false,
      mode: "multi-line",
      // y: "top",
      timeout: 4000,
      snackbarinfo:
        "Preferably small sized[ equal to or less than 2MB ] images to gurantee upload, for now.",
      labeltext: "Choose Art-Work File(s)"
    }; //end-return
  }, //end-data
  methods: {
    processImage(inputdata) {
      // console.log("data is present/changed");
      // console.log(inputdata);
      this.filesdata = inputdata.files;
      let numfiles = this.filesdata.length;
      this.snackbarinfo = `You have selected [ ${numfiles} ] files`;
      this.snackbar = true;
      this.labeltext = `[ ${numfiles} ] files selected`;
      // console.log(this.filesdata);
      // Using the server bus
      serverBus.$emit("imagesSelected", this.filesdata);
    } //end-processImage
  }, //end-methods
  watch: {}, //end-watch
  computed: {}, //end-computed
  created() {
    // .
  }, //end-created
  mounted() {} //end-mounted
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
  background-color: #4caf50; /* Green */
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
.labeltextwrap:hover {
  box-shadow: 0 5px 8px 0 rgba(255, 255, 255, 0.2),
    0 3px 12px 0 rgba(255, 255, 255, 0.19);
}
</style>
