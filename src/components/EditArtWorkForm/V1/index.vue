<template>
  <v-form
    v-model="valid"
    id="form-edit-artwork"
    ref="formEditArtWork"
    @submit.prevent="processForm"
    enctype="multipart/form-data"
    class=""
  >
    <v-container fluid>
      <v-layout align-center justify-center row wrap>
        <v-flex xs12>
          <h2 class="text-xs-center">Edit your Art-Work</h2>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="artitem.artTitle"
            label="ArtWork Title"
            :rules="titleRules"
          ></v-text-field>
        </v-flex>
        <!-- <v-flex xs12 md6>
            <ImageInput ref="imageinput" />
          </v-flex> -->
        <v-flex xs12>
          <v-text-field
            v-model="artitem.artDesc"
            label="ArtWork Description"
            :rules="descriptionRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-btn color="success" type="submit" :loading="loadingflag">
            Edit ArtWork
          </v-btn>
          <v-btn color="" @click="resetForm">
            Reset Form
          </v-btn>
        </v-flex>
        <v-flex xs12 v-if="status">
          <p class="subheading">{{ status }}</p>
        </v-flex>
        <!-- <v-flex v-if="storagepaths" xs12 md12 class="pa-2">
          <ul>
            <li v-for="(path, index) in storagepaths" :key="index">
              {{ path
            </li>
          </ul>
        </v-flex> -->
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import fire from "@/fire/V1";
// import utils from "@/utils/V1";

export default {
  name: "EditArtWorkFormComponent",
  props: {
    artwork: Object
  },
  data() {
    return {
      // key: this.$route.params.id,
      // artitem: {
      //   title: this.artwork.artTitle,
      //   description: this.artwork.artDesc
      // },
      artitem: this.artwork,
      valid: null,
      loadingflag: false,
      status: "",
      titleRules: [
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],
      descriptionRules: [
        v => v.length <= 200 || "Name must be less than 200 characters"
      ]
    }; //end-return
  }, //end-data
  methods: {
    processForm() {
      this.loadingflag = true;
      console.log("\tprocessing edit !");
      console.log(
        `[${this.artitem.docID}]--Received:: title[ ${
          this.artitem.artTitle
        } ], desc[ ${this.artitem.artDesc} ].`
      );
      let artworkUpdate = {
        userID: this.artitem.userID,
        artTitle: this.artitem.artTitle,
        artDesc: this.artitem.artDesc,
        artLocation: this.artitem.artLocation
      };
      // console.log(artworkUpdate);
      let self = this;
      const updateRef = fire.db
        .collection("artworks_v2")
        .doc(this.artitem.docID);
      updateRef
        .set(artworkUpdate)
        .then(docRef => {
          self.artitem = {};
          artworkUpdate = {};
          self.loadingflag = false;
          this.$router.push({
            name: "UploadImage",
            params: { status: "Update Successful" }
          });
        })
        .catch(error => {
          self.loadingflag = false;
          console.error(error);
          alert("Error updating art-work: ", error);
        });
    }, //end-processForm
    resetForm() {
      this.$refs.formEditArtWork.resetValidation();
      this.artitem = {};
      console.log("Form has been reset");
    } //end-resetForm
  }, //end-methods
  created() {
    // console.log(this.artwork);
    // console.log(this.artitem);
  } //end-created
}; //end-export
</script>

<style scoped>
/*.*/
</style>
