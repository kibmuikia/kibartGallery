<template>
  <v-form
    v-model="valid"
    id="kibUploadForm"
    ref="formKibUpload"
    @submit.prevent="upload"
  >
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card class="pa-4">
            <p class="text-center body-1">
              Use to upload KibArt Artwork.
            </p>
            <v-card-text>
              <v-text-field
                v-model="art.title"
                label="Title"
                :counter="15"
                autofocus
                ref="titleInput"
              ></v-text-field>

              <v-textarea
                solo
                v-model="art.description"
                label="Description"
                class="mt-2"
                :counter="140"
                ref="descInput"
              ></v-textarea>

              <ImageSelect v-bind:size="3" />
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col col="6" class="">
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mx-auto"
                    type="submit"
                    :loading="loadingflag"
                  >
                    Upload
                  </v-btn>
                </v-col>

                <v-col col="6" class="">
                  <v-btn small color="error" class="mx-auto" @click="reset">
                    Reset Form
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
          <v-card
            v-if="status"
            class="mx-auto py-2 my-2 grey--text text--darken-2"
            flat
          >
            <p class="body-1 text-center mx-auto">
              {{ status }}
            </p>
          </v-card>
          <v-card>
            <v-card-actions>
              <v-btn
                @click="$router.push('/kibart')"
                class="mx-auto"
                text
                color="primary"
                small
                >Kibart Artwork
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-4">
            <v-card-actions>
              <v-btn
                class="mx-auto"
                text
                color="success"
                small
                target="_blank"
                href="https://www.iloveimg.com/compress-image"
                >Compress Image
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- https://www.iloveimg.com/compress-image  -->
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import ImageSelect from "./imageselect.vue";
import { serverBus } from "@/main";
import fire from "@/fire/V1";
import utils from "@/utils/V1";

let SELF;
export default {
  name: "kibart-upload-form-component",
  title: "Upload Kibart",
  components: {
    ImageSelect
  },
  props: {},
  data() {
    return {
      valid: false,
      loadingflag: false,
      art: {
        title: null,
        description: null,
        image: null
      },
      status: "Form Ready"
    };
  },
  methods: {
    async upload() {
      if (SELF.art.title == null) {
        utils.showAlert("Invalid", "Enter a title", "error");
        SELF.$refs.titleInput.focus();
      } else if (SELF.art.description == null) {
        utils.showAlert("Invalid", "Enter a description", "error");
        SELF.$refs.descInput.focus();
      } else if (SELF.art.image == null) {
        utils.showAlert("Invalid", "Choose an image", "error");
      } else {
        // .
        utils.showAlert("Now Processing", "", "success");
        SELF.loadingflag = true;

        let id = utils.makeId(SELF.art.title);

        let storageRef = fire.storage.ref();
        let filename = SELF.art.image.name.split(".");
        // filename = `${SELF.art.title.replace(/\s+/g, "")}.${filename[1]}`;
        filename = `${id}.${filename[1]}`;
        let kibartRef = storageRef.child(`kibart/${id}/${filename}`);
        let thumbRefPath = `kibart/${id}/thumb_${filename}`;
        let uploadTask = kibartRef.put(SELF.art.image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            SELF.status = `Image upload is ${progress.toFixed(1)}% done.`;
          },
          error => {
            SELF.loadingflag = false;
            SELF.status = "Failed: Image upload error";
            utils.showAlert("Error", SELF.status, "error");
            console.error(error);
          },
          async () => {
            SELF.status = "Upload complete! Now, registering art-work";
            try {
              let imagepath = uploadTask.snapshot.ref.location.path;
              let fullURL = await uploadTask.snapshot.ref.getDownloadURL();
              let artwork = {
                title: SELF.art.title,
                description: SELF.art.description,
                location: {
                  full: fullURL,
                  f_partial: imagepath,
                  t_partial: thumbRefPath
                }
              }; //end-artwork
              await fire.db
                .collection("kibart")
                .doc(id)
                .set(artwork)
                .then(() => {
                  SELF.loadingflag = false;
                  SELF.status = `Successful registration of, ${SELF.art.title}`;
                  utils.showAlert(
                    "Success",
                    "Artwork uploaded and registered",
                    "success"
                  );
                  SELF.reset();
                })
                .catch(e => {
                  SELF.loadingflag = false;
                  SELF.status = `Unsuccessful registration of, ${
                    SELF.art.title
                  }`;
                  utils.showAlert("Error", SELF.status, "error");
                  console.error(e);
                });
            } catch (e) {
              SELF.loadingflag = false;
              SELF.status = e.message;
              utils.showAlert("Error", SELF.status, "error");
              console.log(e);
            }
          }
        );

        // .
      } //end-else
    }, //end-upload()
    reset() {
      SELF.art.title = null;
      SELF.$refs.titleInput.focus();
      SELF.art.description = null;
      SELF.art.image = null;
      serverBus.$emit("reset_image_input");
      SELF.loadingflag = false;
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {
    window.scrollTo(0, 0);
    serverBus.$on("imageSelected", image => {
      SELF.art.image = image;
    });
    serverBus.$on("imageReset", () => {
      SELF.art.image = null;
    });
  }
};
</script>

<style scoped>
/*.*/
</style>
