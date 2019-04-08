<template>
  <v-form
    v-model="valid"
    id="form-image-upload"
    ref="formImageUpload"
    @submit.prevent="processForm"
    enctype="multipart/form-data"
    class=""
  >
    <v-container fluid>
      <v-layout align-center justify-center row wrap>
        <v-flex xs12>
          <h2 class="text-xs-center">Upload your Art-Work</h2>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            v-model="arttitle"
            label="ArtWork Title"
            :rules="titleRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md6>
          <ImageInput ref="imageinput" />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="artdescription"
            label="ArtWork Description"
            :rules="descriptionRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-btn color="success" type="submit" :loading="loadingflag">
            Upload Art
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

import { serverBus } from "@/main";
import ImageInput from "@/components/ImageInput/V1/";
import utils from "@/utils/V1";
import fire from "@/fire/V1";
import jimp from "jimp";

export default {
  name: "upload-image-form-component",
  components: {
    ImageInput
  },
  data() {
    return {
      valid: null,
      filesdata: null,
      arttitle: "",
      artdescription: "",
      user: {},
      // user: {
      //   name: "kibart"
      // },
      titleRules: [
        v => !!v || "Name is required",
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],
      descriptionRules: [
        v => v.length <= 200 || "Name must be less than 200 characters"
      ],
      loadingflag: false,
      storagepaths: [],
      status: ""
    };
  },
  methods: {
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
      else byteString = unescape(dataURI.split(",")[1]);
      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      // return new Blob([ia], { type: mimeString });
      // return new File([u8arr], filename, {type:mime});
      return new File([ia], "testname", { type: mimeString });
    },
    processForm() {
      this.loadingflag = true;

      if (this.filesdata && !this.isEmpty(this.user)) {
        if (!this.$refs.formImageUpload.validate()) {
          this.loadingflag = false;
          this.snackbarinfo = "Invalid!";
          this.snackbar = true;
          return false;
        }

        console.log(`Now processing artwork upload`);
        // console.log(this.filesdata);

        // Create a root reference
        let storageRef = fire.storage.ref();

        for (let i = 0; i < this.filesdata.length; i++) {
          let file = this.filesdata[i];

          if (file) {
            // console.log(file);
            let self = this;

            let filename = file.name;
            let filenameSplit = filename.split(".");
            filename = `${this.arttitle.replace(/\s+/g, "")}-${i}.${
              filenameSplit[1]
            }`;
            // console.log(`Name of file[-${i}-] :: [ ${filename} ].`);
            let filename_for_modified = `${this.arttitle.replace(
              /\s+/g,
              ""
            )}-${i}-small.${filenameSplit[1]}`;
            let fileModified = null;
            // Create a reference to 'artwork/imagename.extension[jpg,png,gif]'
            let artworkRef = storageRef.child(
              `artwork/${this.user.uid}/${this.arttitle}/${filename}`
            );
            let artworkRefModified = storageRef.child(
              `artwork/${this.user.uid}/${
                this.arttitle
              }/${filename_for_modified}`
            );

            artworkRef
              .put(file)
              .then(function(snapshot) {
                if (snapshot.state === "success") {
                  console.log(`[${snapshot.state}] Uploaded[${i}] ${filename}`);
                  let imagepath = snapshot.ref.location.path;
                  self.storagepaths.push(imagepath);
                } else {
                  self.loadingflag = false;
                  console.error("state NOT successful");
                } //end-else
              })
              .catch(e => {
                self.loadingflag = false;
                console.error("artworkRef FAILED");
                console.error(e);
              });

            let readerJimpUse = new FileReader();
            readerJimpUse.readAsDataURL(file);
            readerJimpUse.onloadend = function(e) {
              // console.log(e.target.result);
              jimp
                .read(e.target.result)
                .then(imageoriginal => {
                  let imageclone = imageoriginal.clone();
                  imageclone.scaleToFit(300, 300);
                  imageclone.blur(5);
                  imageclone.getBase64(jimp.AUTO, (err, res) => {
                    fileModified = self.dataURItoBlob(res);
                    if (fileModified) {
                      // console.log(fileModified);
                      artworkRefModified
                        .put(fileModified)
                        .then(snapshot => {
                          if (snapshot.state === "success") {
                            console.log(
                              `[${
                                snapshot.state
                              }] Uploaded[${i}] ${filename_for_modified}`
                            );
                            let imagepathModified = snapshot.ref.location.path;
                            self.storagepaths.push(imagepathModified);
                          } else {
                            self.loadingflag = false;
                            console.error("state NOT successful");
                          }
                        })
                        .catch(e => {
                          self.loadingflag = false;
                          alert("artworkRefModified FAILED");
                          console.error(e);
                        });
                    }
                    if (err) {
                      self.loadingflag = false;
                      console.error(err);
                    }
                  });
                })
                .catch(err => {
                  self.loadingflag = false;
                  console.error("jimp failed");
                  console.error(err);
                });
            }; //end-onloadend
            readerJimpUse.onerror = function(e) {
              self.loadingflag = false;
              console.error("Failed file read: " + e.toString());
            };
          } else {
            self.loadingflag = false;
            console.error("[ file ] invalid");
          }
        } //end-for
      } else {
        this.loadingflag = false;
        utils.showAlert(
          "Error",
          "You must choose at ONE image file and be a VALID user.",
          "error"
        );
      }
    }, //end-processForm
    resetForm() {
      this.$refs.formImageUpload.resetValidation();
      this.arttitle = "";
      this.artdescription = "";
      this.storagepaths = [];
      console.log("Form has been reset");
      // var self = this;
      //Iterate through each object field, key is name of the object field`
      // Object.keys(this.user).forEach(function(key) {
      //   self.user[key] = "";
      // });
      // this.$refs.formSignUp.reset();
    }, //end-resetForm
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
  },
  created() {
    // Using the server bus
    serverBus.$on("imagesSelected", fd => {
      let filesize = (fd[0].size / 1024 / 1024).toFixed(4); //in MB
      if (fd.length === 1 && filesize <= 2.0) {
        this.filesdata = fd;
      } else {
        utils.showAlert(
          "Error",
          "Choose Only One File and ensure its size is below 2MB",
          "error"
        );
      }
      // console.log("created()->serverBus.on[imagesSelected] running !!");
      // console.log(this.filesdata);
    });
    this.user = this.$store.getters.user;
  },
  watch: {
    storagepaths: function() {
      if (this.storagepaths.length == 2) {
        // console.log(this.storagepaths);
        // console.log(`title-[${this.arttitle}], desc[${this.artdescription}]`);
        let artwork = {
          userID: this.user.uid,
          // userName: this.user.displayName,
          // userPhoto: this.user.photoURL,
          artTitle: this.arttitle,
          artDesc: this.artdescription,
          artLocation: this.storagepaths
        };
        // console.log(artwork);
        fire.db
          .collection("artworks")
          .add(artwork)
          .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            // this.status = `Art-work[ ${
            //   artwork.artTitle
            // } ] uploaded successfully`;
            utils.showAlert("Success", this.status, "success");
            this.resetForm();
            this.loadingflag = false;
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
        /*
        artworks
// Add a new document with a generated id.
db.collection("cities").add({
    name: "Tokyo",
    country: "Japan"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
        */
      }
    }
    // arttitle: function() {
    //   // str = str.replace(/\s+/g, '');
    //   this.arttitle = this.arttitle.replace(/\s+/g, "");
    // }
  }
}; //end-export
</script>

<style scoped>
#form-image-upload {
  /*width: 100%;*/
}
</style>
