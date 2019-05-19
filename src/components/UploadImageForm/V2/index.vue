<template>
  <v-form
    id="form-image-upload-v2"
    ref="formImageUpload_V2"
    @submit.prevent="processUpload"
    enctype="multipart/form-data"
    class=""
  >
    <v-layout align-center justify-space-around row wrap class="" pa-1>
      <v-flex xs12 class="text-xs-center mb-2">
        <p class="title font-weight-light py-2">Upload Your Artwork</p>
      </v-flex>
      <v-flex xs12 md6 class="mb-2 pa-1">
        <v-text-field
          v-model="art.title"
          label="ArtWork Title"
          :rules="rules.title"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md8 class="mb-2 pa-1">
        <v-text-field
          v-model="art.description"
          label="ArtWork Description"
          :rules="rules.description"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md8 class="mb-2 pt-2">
        <ImageInput ref="imageinput" />
      </v-flex>
      <v-flex xs12 md8 class="text-xs-center mb-2 pa-1">
        <v-btn color="success" type="submit" :loading="loadingflag">
          Upload Art
        </v-btn>
        <v-btn color="warning" @click="resetForm">
          Reset Form
        </v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center mb-2" v-if="status">
        <p class="subheading font-weight-light py-2">{{ status }}</p>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
import ImageInput from "@/components/ImageInput/V2/";
import { serverBus } from "@/main";
import utils from "@/utils/V1";
import fire from "@/fire/V1";
// const UUID = require("uuid-v4");

export default {
  name: "upload-image-form-component-v2",
  components: {
    ImageInput
  },
  data() {
    return {
      art: {
        title: "",
        description: "",
        storagepath: ""
      },
      rules: {
        title: [
          v => !!v || "Name is required",
          v => v.length <= 50 || "Name must be less than 50 characters"
        ],
        description: [
          v => v.length <= 200 || "Name must be less than 200 characters"
        ]
      },
      user: {},
      imagedata: null,
      loadingflag: false,
      status: ""
    }; //end-return
  }, //end-data
  methods: {
    processUpload() {
      // .
      this.loadingflag = true;
      console.log("\tprocessing art upload !");
      if (!this.imagedata) {
        this.loadingflag = false;
        this.status = "Ensure you have selected an image";
        utils.showAlert("Image Error", this.status, "error");
        throw new Error(this.status);
      } //end-if-image
      if (!this.$refs.formImageUpload_V2.validate()) {
        this.loadingflag = false;
        this.status = "Ensure your title and description are valid";
        utils.showAlert("Error", this.status, "error");
        throw new Error(this.status);
      } //end-if-valid
      let storageRef = fire.storage.ref();
      let filenameSplit = this.imagedata.name.split(".");
      let filename = `${this.art.title.replace(/\s+/g, "")}.${
        filenameSplit[1]
      }`;
      let artworkRef = storageRef.child(
          `artwork/${this.user.uid}/${this.art.title}/${filename}`
        ),
        thumbRefPath = `artwork/${this.user.uid}/${
          this.art.title
        }/thumb_${filename}`;

      let uploadTask = artworkRef.put(this.imagedata);
      let self = this;
      // let imagepath = "";
      // let fullURL = "";
      uploadTask.on(
        "state_changed",
        snapshot => {
          // 1. 'state_changed' observer, called any time the state changes
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          self.status = `Upload is ${progress.toFixed(1)}% done.`;
          // console.log(self.status);
        },
        error => {
          // Handle unsuccessful uploads
          self.loadingflag = false;
          self.status = "Unsuccessful upload of your art-work";
          utils.showAlert("Error", self.status, "error");
          console.error(error);
        },
        async () => {
          // Handle successful uploads on complete
          self.status = "Upload complete! Now, registering your art-work";
          try {
            let imagepath = uploadTask.snapshot.ref.location.path;
            let fullURL = await uploadTask.snapshot.ref.getDownloadURL();
            let artwork = {
              userID: self.user.uid,
              artTitle: self.art.title,
              artDesc: self.art.description,
              artLocation: {
                full: fullURL,
                partial: imagepath,
                partialThumb: thumbRefPath
              }
            }; //end-artwork
            console.log(artwork);
            // let docRef = await fire.db.collection("artworks_v2").add(artwork);
            await fire.db
              .collection("artworks_v3")
              .doc(self.titleID)
              .set(artwork)
              .then(() => {
                self.loadingflag = false;
                self.status = `Successful registration of, ${self.art.title}`;
                utils.showAlert("Success", self.status, "success");
                self.resetForm();
              })
              .catch(error => {
                self.loadingflag = false;
                self.status = `Unsuccessful registration of, ${self.art.title}`;
                console.log(self.status);
                console.error(error);
              });

            // if (docRef.id) {
            //   console.log(docRef);
            //   self.loadingflag = false;
            //   self.status = `Successful registration of, ${self.art.title}`;
            //   utils.showAlert("Success", self.status, "success");
            //   self.resetForm();
            // } else {
            //   self.loadingflag = false;
            //   self.status = `Unsuccessful registration of, ${self.art.title}`;
            //   console.error(self.status);
            // }
          } catch (err) {
            self.loadingflag = false;
            console.error(err);
            self.status = err.message;
            utils.showAlert("Error", err.message, "error");
          } //end-try-catch
        } //end-complete-upload
      ); //end-uploadTask
      // .
    }, //end-processUpload
    resetForm() {
      serverBus.$emit("reset-image-input");
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.art).forEach(function(key) {
        self.art[key] = "";
      });
      this.$refs.formImageUpload_V2.resetValidation();
    } //end-resetForm
  }, //end-methods
  computed: {
    titleID: function() {
      let original = this.art.title;
      // Removing Special Characters :: str.replace(/[^\w\s]/gi, '')
      let touse = original
        .replace(/\s+/g, "")
        .toLowerCase()
        .replace(/[^\w\s]/gi, "");
      console.log(`original[ ${original} ], to-use[ ${touse} ]`);
      return touse;
    } //end-titleID
    // filteredNames() {
    //   let filter = new RegExp(this.findName, "i");
    //   return this.names.filter(el => el.match(filter));
    // }
  }, //end-computed
  created() {
    this.user = this.$store.getters.user;
  }, //end-created()
  mounted() {
    // serverBus.$on("imagesSelected", data => {
    //   console.log("\tevent[ imagesSelected ] received !!");
    //   let filesize = (data[0].size / 1024 / 1024).toFixed(4); //in MB
    //   if (data.length === 1 && filesize <= 3.55) {
    //     this.imagedata = data[0];
    //     console.log(this.imagedata.name);
    //   } else {
    //     this.imagedata = null;
    //     serverBus.$emit("invalid-image", "Please select another image");
    //   }
    // });
    // imageSelected
    serverBus.$on("imageSelected", data => {
      console.log("\tevent[ imageSelected ] received !!");
      // console.log(data);
      let filesize = (data.size / 1024 / 1024).toFixed(4); //in MB
      if (filesize <= 3.109) {
        // console.log("\tvalid image");
        this.imagedata = data;
        // console.log(this.imagedata.name);
      } else {
        this.imagedata = null;
        serverBus.$emit(
          "invalid-image",
          "Selected image exceeds allowed limit[ 3 MB ]. Please select another image"
        );
      }
    });
    // resetImage
    serverBus.$on("resetImage", () => {
      this.imagedata = null;
    });
  } //end-mounted
};
</script>

<style scoped>
/*.*/
</style>
