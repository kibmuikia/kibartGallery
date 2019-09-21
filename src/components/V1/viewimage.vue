<template>
  <!-- . -->

  <v-bottom-sheet v-model="sheet" inset persistent>
    <v-sheet class="text-center px-4 py-2" height="auto">
      <h3 class="mx-auto headline py-2">
        {{ imagedata.title }}
      </h3>

      <v-card class="my-2">
        <v-img
          :src="imagedata.fullurl"
          :lazy-src="imagedata.thumb_url"
          aspect-ration="1"
          class="grey lighten-3"
          max-height="380"
          contain
          :alt="imagedata.title"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="green accent-2">
              </v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>

      <p class="mx-auto body-1 py-2">
        {{ imagedata.description }}
      </p>
      <v-btn class="mt-2" text color="error" @click="sheet = false"
        >close</v-btn
      >
    </v-sheet>
  </v-bottom-sheet>

  <!-- . -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { serverBus } from "@/main";

let SELF;
export default {
  name: "view-image-component",
  title: "",
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true
    },
    imagedata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sheet: false
    };
  },
  methods: {
    // .
  },
  computed: {},
  watch: {
    show: function() {
      return (SELF.sheet = SELF.show);
    },
    sheet: function() {
      if (SELF.sheet === false) {
        serverBus.$emit("resetSheet");
      }
    },
    imagedata: function() {
      // console.log( SELF.imagedata );
    }
  },
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
/*.*/
</style>
