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
    <v-flex xs12 md8 v-if="your_artwork.length > 0">
      <h3 class="text-xs-center pb-1">Your Art Work</h3>
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(artitem, index) in your_artwork"
          :key="index"
        >
          <div slot="header">
            <h6 class="title font-weight-light">
              <v-avatar size="30" color="" v-if="artitem.artUrls">
                <v-img
                  :lazy-src="artitem.artUrls[0]"
                  :src="artitem.artUrls[1]"
                  alt="artitem.artTitle"
                ></v-img>
                <!-- src="https://vuetifyjs.com/apple-touch-icon-180x180.png" -->
              </v-avatar>
              {{ artitem.artTitle }}
              <!-- {{ artitem.artUrls[1]  -->
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
                    <!-- deleteArtWork(artitem.docID, artitem.artLocation, index) -->
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
    <v-dialog v-model="dialog" max-width="300">
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
            @click="deleteArtWork(dialogData.artid, dialogData.imagelocations)"
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

import UploadImageForm from "@/components/UploadImageForm/V1/";
import fire from "@/fire/V1";
import utils from "@/utils/V1";

export default {
  name: "upload-image-view",
  components: {
    UploadImageForm
  }, //end-components
  data() {
    return {
      user: {},
      your_artwork: [],
      loading: false,
      dialog: false,
      dialogData: {}
    }; //end-return
  }, //end-data
  methods: {
    async editArtWork(artitem, index) {
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
      // console.log(this.dialogData);
      this.dialog = false;
    }, //end-closeDeleteDialog
    showDeleteDialog(docid, arttitle, imagelocations) {
      this.dialogData.arttitle = arttitle;
      this.dialogData.artid = docid;
      this.dialogData.imagelocations = imagelocations;
      // console.log(this.dialogData);
      this.dialog = true;
    }, //end-showDeleteDialog
    async deleteArtWork(docid, imagelocations) {
      this.loading = true;
      let self = this;
      console.log("delete process starting");
      console.log(`Doc[ ${docid} ]`);
      let storageRef = fire.storage.ref();
      imagelocations.forEach(async location => {
        console.log(location);
        let artfileRef = storageRef.child(`${location}`);
        await artfileRef
          .delete()
          .then(() => {
            console.log(`successfully deleted[ ${location} ]`);
          })
          .catch(error => {
            console.error(`Failed to delete[ ${location} ]`);
            console.error(error);
          });
      });
      await fire.db
        .collection("artworks")
        .doc(docid)
        // .where("userID", "==", this.user.uid)
        // .where("artTitle", "==", title)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          self.closeDeleteDialog();
          utils.showAlert(
            "Success",
            "Art work successfully deleted!",
            "success"
          );
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    getUrl(array) {
      let imageUrls = [];
      let storageRef = fire.storage.ref();
      array.forEach(async (currentValue, index, arr) => {
        // console.log(currentValue);
        await storageRef
          .child(currentValue)
          .getDownloadURL()
          .then(url => {
            // console.log(url);
            imageUrls.push(url);
          })
          .catch(err => {
            console.error(err);
          });
      });
      if (imageUrls[0] != "undefined" && imageUrls[1] != "undefined") {
        return imageUrls;
      } else {
        console.log(imageUrls);
        return false;
      }
    },
    async getArtWork() {
      let self = this;
      await fire.db
        .collection("artworks")
        .where("userID", "==", this.user.uid)
        .onSnapshot(
          snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
              if (change.type == "added") {
                console.log(`Doc[${change.doc.id}], ${change.type}`);
                // console.log(change.doc.data());
                // artLocation
                // array.forEach(function(currentValue, index, arr), thisValue)
                // storageRef.child('images/stars.jpg').getDownloadURL().then
                // function here
                let urls = self.getUrl(change.doc.data().artLocation);
                // console.log(urls);
                let gotdocument = utils.extend(
                  {
                    docID: change.doc.id,
                    artUrls: urls
                  },
                  change.doc.data()
                );
                self.your_artwork.push(gotdocument);
                console.log(self.your_artwork);
                // }
              } else if (change.type == "removed") {
                console.log(`\tDoc[${change.doc.id}] has been removed`);
                self.your_artwork = self.your_artwork.filter(
                  (value, index, arr) => {
                    // console.log(`Found-docID[${value.docID}] -- to-Remove[${change.doc.id}]`);
                    return value.docID != change.doc.id;
                  }
                );
              }
            });
            // console.log(self.your_artwork);
          },
          error => {
            console.error("Listener failed :: ", error);
          }
        );
    },
    getUser() {
      this.user = this.$store.getters.user;
      if (utils.isEmpty(this.user) || this.user.emailVerified != true) {
        let msg = "No User Available or Not Yet Verified.Redirecting to signin";
        console.error(msg);
        alert(msg);
        // this.$router.push({
        //   name: "ArtistSignIn",
        //   params: { status: "Invalid User" }
        // });
        throw new Error(msg);
      } else {
        // Object is NOT empty (would return false in this example)
        // user is also Verified
        console.log(
          `In View[ UploadImage ], User=>[ ${this.user.email} ]-present`
        );
        // console.log(this.user);
      }
    }
  }, //end-methods
  mounted() {}, //end-mounted
  watch: {}, //end-watch
  created() {
    // console.log(this.$route.params);
    this.getUser();
    this.getArtWork();
    if (this.$route.params.status) {
      let status = this.$route.params.status;
      utils.showAlert("Success", status, "success");
    }
  }
}; //end-export
</script>

<style scoped>
/*.*/
</style>
