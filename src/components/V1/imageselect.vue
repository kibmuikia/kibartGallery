<template>
  
  <v-row class="">
    <!-- . -->

    <v-col col="6" class="">

      <label for="imageinput" style="cursor: pointer;">
        <p v-if="labelText" class="text-center body-1">
          {{ labelText }}
          <!-- . -->
          <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    text
                    icon
                    class=""
                    color="red lighten-2"
                    @click="resetInput"
                    v-on="on"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Remove/Deselect Image</span>
              </v-tooltip>
          <!-- . -->
        </p>
        
        <!-- . -->

        <p v-else class="text-center body-1">
          Choose an image
          <!-- . -->
          <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    text
                    small
                    icon
                    class=""
                    color="blue lighten-2"
                    @click="selectionTip"
                    v-on="on"
                  >
                    <v-icon>mdi-alert-circle</v-icon>
                  </v-btn>
                </template>
                <span>View Recommendation</span>
              </v-tooltip>
          <!-- . -->
        </p>
      </label>

    </v-col>

    <v-col col="6" v-if="previewSrc" class="">
      <v-avatar size="120" class="" style="left: 20%;">
        <v-img :src="previewSrc" alt="Selected Image"></v-img>
      </v-avatar>
    </v-col>

    <!-- . -->

    <!-- . -->
    <input
      id="imageinput"
      name="imageinput"
      type="file"
      accepts="image/*"
      v-on:change="processImage($event.target)"
      class="hide-input-file"
    />
    <!-- . -->
  </v-row>

</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import utils from "@/utils/V1";
import { serverBus } from "@/main";

let SELF;
export default {
  name: "image-select-component",
  title: "", // Home | Glorious Delights
  components: {},
  props: {
    size: Number
  },
  data() {
    return {
      labelText: null,
      image: null,
      previewSrc: null
    };
  },
  methods: {
    processImage(inputdata) {
      SELF.image = inputdata.files[0];
      
      let imagesize = (SELF.image.size / 1024 / 1024).toFixed(4); //in MB
      // let check = ( SELF.size / 1024 ).toFixed(4);
      console.log( `org[ ${SELF.image.size} ]-[ ${imagesize} ]-check[ ${SELF.size} ]` );
      // console.log( `org[ ${SELF.size} ]-[ ${check} ]` );

      if( imagesize > SELF.size ) {
        utils.showAlert( "Error", "Selected image LARGER than recommendation", "error" );
        SELF.resetInput();
      } else {
        SELF.labelText = `Selected: [ ${SELF.image.name.substring(
          0,
          16
        )}... ]`;
        let reader = new FileReader();
        reader.onload = function(e) {
          SELF.previewSrc = e.target.result;
          serverBus.$emit("imageSelected", SELF.image);
        };
        reader.readAsDataURL( SELF.image );
      }

    },
    resetInput() {
      this.image = null;
      this.labelText = null;
      this.previewSrc = null;
      serverBus.$emit("imageReset");
    }, //end-resetInput
    selectionTip() {
      utils.showAlert( "Image Size Recommendation", `Select an image that is less than ${SELF.size}MB.`, "" );
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {
    // .
  },
  mounted() {}
};
</script>

<style scoped>
.hide-input-file {
  width: 0.11px;
  height: 0.11px;
  position: absolute;
  z-index: -10;
  opacity: 0;
}
</style>
