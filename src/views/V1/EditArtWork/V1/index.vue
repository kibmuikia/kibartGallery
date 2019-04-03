<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex xs12 md12>
      <EditArtWorkForm v-if="artwork" :artwork="artwork" />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import EditArtWorkForm from "@/components/EditArtWorkForm/V1/";
import fire from "@/fire/V1";
import utils from "@/utils/V1";

export default {
  name: "EditArtWorkFormView",
  components: {
    EditArtWorkForm
  }, //end-components
  data() {
    return {
      key: null,
      artwork: null
    }; //end-return
  }, //end-data
  methods: {
    extend(obj, src) {
      Object.keys(src).forEach(function(key) {
        obj[key] = src[key];
      });
      return obj;
    }
  }, //end-methods
  created() {
    // console.log(this.$route.params);
    this.key = this.$route.params.key;
    console.log(`Key[docID]-[ ${this.key} ]`);
    let self = this;
    const ref = fire.db.collection("artworks").doc(this.key);
    ref.get().then(doc => {
      if (doc.exists) {
        let gotdocument = self.extend({ docID: self.key }, doc.data());
        self.artwork = gotdocument;
        // console.log("Found document!");
        // console.log(self.artwork);
      } else {
        console.error("No Such Document !!");
        utils.showAlert("Error", "No Such Document", "error");
      }
    });
  } //end-created
}; //end-export
</script>

<style scoped>
/*.*/
</style>
