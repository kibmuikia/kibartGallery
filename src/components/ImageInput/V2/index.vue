<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 md8>
      <label for="imageinput" style="cursor: pointer;">
        <v-layout row align-center justify-space-around wrap class="pa-1">
          <v-flex xs12 md6 class="lbl-btn">
            <p class="text-xs-center subheading pt-2 px-1" v-if="labelText">
              {{ labelText }}
              <v-btn
                small
                icon
                class=""
                color="red lighten-2"
                @click="resetInput"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </p>
            <p class="text-xs-center subheading pt-2" v-else>
              Choose an image
              <v-btn
                flat
                small
                icon
                class="opacityPulse-css"
                color="blue lighten-2"
                @click="selectionTip"
              >
                <v-icon>info</v-icon>
              </v-btn>
            </p>
          </v-flex>
          <v-flex xs12 md5 class="text-xs-center pa-1" v-if="previewSrc">
            <v-avatar size="120" class="">
              <v-img :src="previewSrc" alt="preview image"></v-img>
              <!-- :lazy-src="imageUrlLazy" -->
            </v-avatar>
          </v-flex>
        </v-layout>
      </label>
    </v-flex>
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
    <Tip :information="tip.info" :show="tip.show" :color="tip.color" />
    <!-- . -->
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
require("@/assets/infinite.css");
import Tip from "@/components/Tip-2";
import { serverBus } from "@/main";

export default {
  name: "image-input-v2",
  components: {
    Tip
  }, //end-components
  data() {
    return {
      labelText: "",
      gotimage: null,
      previewSrc: null,
      tip: {
        info: "",
        show: false,
        color: ""
      }
    }; //end-return
  }, //end-data
  methods: {
    processImage(inputdata) {
      // console.log(inputdata);
      this.gotimage = inputdata.files[0];
      console.log(`\tprocessing image-[ ${this.gotimage.name} ]`);
      // console.log(this.gotimage);
      this.labelText = `Selected: [ ${this.gotimage.name.substring(
        0,
        16
      )}... ]`;
      let reader = new FileReader(),
        self = this;
      reader.onload = function(e) {
        // $('#blah').attr('src', e.target.result);
        self.previewSrc = e.target.result;
        // console.log(self.previewSrc);
        serverBus.$emit("imageSelected", self.gotimage);
      };
      reader.readAsDataURL(this.gotimage);
    }, //end-processImage
    resetInput() {
      this.gotimage = null;
      this.labelText = "";
      this.previewSrc = null;
      serverBus.$emit("resetImage");
    }, //end-resetInput
    selectionTip() {
      this.tip.info =
        "Select one image. Preferably small in size to ensure successfull upload";
      this.tip.show = true;
      this.tip.color = "info";
    }, //end-selectionTip
    showTip(info, color) {
      this.tip.info = info;
      this.tip.show = true;
      this.tip.color = color;
    } //end-showTip
  }, //end-methods
  mounted() {
    serverBus.$on("resetTip", () => {
      this.tip.show = false;
    });
    serverBus.$on("invalid-image", data => {
      this.resetInput();
      this.showTip(data, "error");
    });
    serverBus.$on("reset-image-input", () => {
      this.resetInput();
    });
  } //end-mounted
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
.lbl-btn {
  transition: all 0.6s;
  border: 2px solid lightgreen;
  border-radius: 6px;
  overflow: hidden;
}
.lbl-btn:hover {
  border-radius: 30px;
  -moz-box-shadow: 0px 5px 25px -9px rgba(255, 255, 255, 0.57);
  -webkit-box-shadow: 0px 5px 25px -9px rgba(255, 255, 255, 0.57);
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
