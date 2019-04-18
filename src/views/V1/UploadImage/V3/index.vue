<template>
  <v-layout align-center justify-center row fill-height wrap>
    <v-flex xs12 md12>
      <router-link
        to="/artist/profile"
        color=""
        style="text-decoration:none; color:white;"
      >
        <v-chip v-ripple>
          <v-icon>keyboard_arrow_left</v-icon>
          Your Profile
        </v-chip>
      </router-link>
      <UploadImageForm />
    </v-flex>
    <!-- . -->
    <v-flex xs12 md8 v-if="your_artwork.length > 0">
      <h3 class="text-xs-center pb-1">Your Art Work</h3>
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(artitem, index) in your_artwork"
          :key="index"
        >
          <div slot="header">
            <h6 class="title font-weight-light">
              <v-avatar size="35">
                <v-img
                  :lazy-src="imageUrlLazy"
                  :src="artitem.artLocation.full"
                  alt="artitem.artTitle"
                ></v-img>
              </v-avatar>
              {{ artitem.artTitle }}
            </h6>
          </div>
          <v-card>
            <v-card-text class="pa-0">
              <v-layout row wrap>
                <v-flex xs6 v-if="artitem.artDesc" class="">
                  <p class="subheading pl-3">
                    {{ artitem.artDesc }}
                    <!-- {{ artitem.artUrls[1]  -->
                  </p>
                </v-flex>
                <v-flex xs8 v-else>
                  <p class="subheading pl-3">No Description Available</p>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs4 class=" text-xs-center">
                  <v-btn icon flat small @click="editArtWork(artitem, index)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    flat
                    small
                    color="warning"
                    @click="
                      showDeleteDialog(
                        artitem.docID,
                        artitem.artTitle,
                        artitem.artLocation
                      )
                    "
                  >
                    <v-icon>delete_outline</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- . -->
    </v-flex>
    <v-flex xs12 v-else>
      <p class="subheading text-xs-center">
        You currently do not have any art work
      </p>
    </v-flex>
    <!-- . -->
    <v-dialog v-model="dialog" max-width="300" persistent>
      <v-card>
        <v-card-title class="headline">
          Delete Confirmation !
        </v-card-title>

        <v-card-text class="subheading">
          Are you sure you want to delete,<br />
          [- <strong>{{ dialogData.arttitle }}</strong> -] ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="orange darken-1" flat @click="closeDeleteDialog">
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            flat
            :loading="loading"
            @click="deleteArtWork(dialogData.artid, dialogData.artpaths)"
          >
            <!-- deleteArtWork(docid, imagelocations, indexvalue) -->
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- . -->
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import UploadImageForm from "@/components/UploadImageForm/V2/";

import fire from "@/fire/V1";
import utils from "@/utils/V1";

export default {
  name: "upload-image-view-v3",
  components: {
    UploadImageForm
  }, //end-components
  data() {
    return {
      user: {},
      your_artwork: [],
      loading: false,
      dialog: false,
      dialogData: {},
      imageUrlLazy: require("@/assets/rings.svg")
    }; //end-return
  }, //end-data
  methods: {
    editArtWork(artitem, index) {
      console.log(artitem);
      let docID = artitem.docID;
      // console.log(
      //   `Doc[ ${docID} ]-title[ ${artitem.artTitle}]-UID[ ${artitem.userID} ]`
      // );
      // toUpdate: artitem
      this.$router.push({
        name: "EditArtWork",
        params: { key: docID }
      });
    },
    closeDeleteDialog() {
      this.dialogData = {};
      this.dialog = false;
    }, //end-closeDeleteDialog
    showDeleteDialog(docid, arttitle, imagelocations) {
      this.dialogData.arttitle = arttitle;
      this.dialogData.artid = docid;
      this.dialogData.artpaths = imagelocations;
      console.log(this.dialogData);
      this.dialog = true;
    }, //end-showDeleteDialog
    deleteArtWork(docid, imagelocations) {
      this.loading = true;
      let self = this;
      console.log(`\tDoc[ ${docid} ]`);
      let storageRef = fire.storage.ref();
      let artfileRef = storageRef.child(`${imagelocations.partial}`);
      artfileRef
        .delete()
        .then(() => {
          console.log(
            `image successfully deleted[ ${imagelocations.partial} ]`
          );
          fire.db
            .collection("artworks_v2")
            .doc(docid)
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
              self.loading = false;
              self.closeDeleteDialog();
              utils.showAlert(
                "Success",
                "Art work successfully deleted!",
                "success"
              );
            })
            .catch(err => {
              console.error(err);
              self.loading = false;
              utils.showAlert("Document Delete Error", err.message, "error");
            });
        })
        .catch(err => {
          console.error(err);
          self.loading = false;
          utils.showAlert("Image Delete Error", err.message, "error");
        });
    }, //end-deleteArtWork
    getUser() {
      if (
        utils.isEmpty(this.$store.getters.user) ||
        this.$store.getters.user.emailVerified != true
      ) {
        this.user = null;
        let msg = "No User Available or Not Yet Verified.Redirecting to signin";
        throw new Error(msg);
      } else {
        // Object is NOT empty (would return false in this example)
        // user is also Verified
        this.user = this.$store.getters.user;
        console.log(
          `In View[ UploadImage ], User=>[ ${this.user.email} ]-present`
        );
      }
    }, //end-getUser
    getArtWork() {
      let self = this;
      fire.db
        .collection("artworks_v2") // artworks_v2 artworks
        .where("userID", "==", this.user.uid)
        .onSnapshot(
          snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
              if (change.type == "added") {
                // console.log(`Doc[${change.doc.id}], ${change.type}`);
                let gotdocument = {
                  ...change.doc.data(),
                  docID: change.doc.id
                };
                self.your_artwork.push(gotdocument);
                // console.log(self.your_artwork);
              } //end-if-added
              if (change.type == "removed") {
                console.log(`\tDoc[${change.doc.id}] has been removed`);
                self.your_artwork = self.your_artwork.filter(
                  (value, index, arr) => {
                    // console.log(`Found-docID[${value.docID}] -- to-Remove[${change.doc.id}]`);
                    return value.docID != change.doc.id;
                  }
                );
              }
            }); //end-forEach
          },
          error => {
            console.error("Listener failed :: ", error);
          }
        ); //end-onSnapShot
    } //end-getArtWork
  }, //end-methods
  created() {
    // console.log(this.$route.params);
    this.getUser();
    this.getArtWork();
    if (this.$route.params.status) {
      let status = this.$route.params.status;
      utils.showAlert("Success", status, "success");
    }
  } //end-created
};
</script>

<style scoped>
/*.*/
</style>
