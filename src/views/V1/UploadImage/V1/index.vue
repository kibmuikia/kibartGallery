<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex xs12 md12>
      <UploadImageForm />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import UploadImageForm from "@/components/UploadImageForm/V1/";
// import fire from "@/fire/V1";

export default {
  name: "upload-image-view",
  components: {
    UploadImageForm
  }, //end-components
  data() {
    return {
      user: {
        name: "kibart"
      }
    }; //end-return
  }, //end-data
  methods: {
    getArtWork() {
      // Create a root reference
      // let storageRef = fire.storage.ref();
      // Create a reference to 'artwork/imagename.extension[jpg,png,gif]'
      // let artworkRef = storageRef.child(`artwork/${this.user.name}/${filename}`);
      // let artworkRef = storageRef.child(`artwork/${this.user.name}/`);
    }
  }, //end-methods
  mounted() {}, //end-mounted
  watch: {}, //end-watch
  created() {}
}; //end-export
</script>

<style scoped>
/*.*/
</style>
