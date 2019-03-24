<template>
  <v-form
    v-model="valid"
    id="form-image-upload"
    ref="formImageUpload"
    @submit.prevent="processForm"
    enctype="multipart/form-data"
  >
    <v-container>
      <v-layout align-center justify-center column fill-height>
        <v-flex xs12 md4>
          <h2>Upload your Art-Work</h2>
        </v-flex>
        <v-flex xs12 md6>
          <ImageInput ref="imageinput" />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            v-model="arttitle"
            label="ArtWork Title"
            :rules="titleRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md12>
          <v-text-field
            v-model="artdescription"
            label="ArtWork Description"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-btn color="success" type="submit" :loading="loadingflag">
            Upload Art
          </v-btn>
        </v-flex>
        <v-flex v-if="storagepaths" xs12 md12 class="pa-2">
          <ul>
            <li v-for="(path, index) in storagepaths" :key="index">
              {{ path }}
            </li>
          </ul>
        </v-flex>
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
      user: {
        name: "kibart"
      },
      titleRules: [
        v => !!v || "Name is required",
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],
      loadingflag: false,
      storagepaths: []
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

      if (this.filesdata) {
        if (!this.$refs.formImageUpload.validate()) {
          this.snackbarinfo = "Invalid!";
          this.loadingflag = false;
          this.snackbar = true;
          return false;
        }

        console.log(
          `form-submit event triggered.Next, processing the form-data. filesdata is VALID`
        );
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
            filename = `${this.arttitle}-${i}.${filenameSplit[1]}`;
            // console.log(`Name of file[-${i}-] :: [ ${filename} ].`);
            let filename_for_modified = `${this.arttitle}-${i}-small.${
              filenameSplit[1]
            }`;
            let fileModified = null;
            // Create a reference to 'artwork/imagename.extension[jpg,png,gif]'
            let artworkRef = storageRef.child(
              `artwork/${this.user.name}/${this.arttitle}/${filename}`
            );
            let artworkRefModified = storageRef.child(
              `artwork/${this.user.name}/${
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
                  console.error("state NOT successful");
                } //end-else
              })
              .catch(e => {
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
                      console.error(err);
                    }
                  });
                })
                .catch(err => {
                  console.error("jimp failed");
                  console.error(err);
                });
            }; //end-onloadend
            readerJimpUse.onerror = function(e) {
              console.error("Failed file read: " + e.toString());
            };

            if (i == self.filesdata.length - 1) {
              self.loadingflag = false;
              console.log("\t[loop done]all files handles");
            }
          } else {
            console.error("[ file ] invalid");
          }
        } //end-for
      } else {
        this.loadingflag = false;
        utils.showAlert(
          "Error",
          "You must choose at atleast one image file, in order to be able to proceed with the upload",
          "error"
        );
      }
    } //end-processForm
  },
  created() {
    // Using the server bus
    serverBus.$on("imagesSelected", fd => {
      this.filesdata = fd;
      // console.log("created()->serverBus.on[imagesSelected] running !!");
      // console.log(this.filesdata);
    });
  },
  watch: {
    storagepaths: function() {
      // console.log(this.storagepaths);
    },
    arttitle: function() {
      // str = str.replace(/\s+/g, '');
      this.arttitle = this.arttitle.replace(/\s+/g, "");
    }
  }
}; //end-export
</script>

<style scoped>
#form-image-upload {
  /*width: 100%;*/
}
</style>
