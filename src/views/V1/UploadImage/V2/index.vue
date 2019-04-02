<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex xs12 md12>
      <UploadImageForm />
    </v-flex>
    <v-flex xs12 v-if="your_artwork.length > 0">
      <h3 class="text-xs-center">Your Art Work</h3>
      <v-card v-for="(artitem, index) in your_artwork" :key="index" flat>
        <v-layout row wrap align-center justify-center class="pa-3 mb-1">
          <v-flex xs6 md6>
            {{ artitem.artTitle }}
          </v-flex>
          <v-flex xs3 md3>
            <v-btn icon flat>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3 md3>
            <v-btn
              icon
              flat
              @click="deleteArtWork(artitem.docID, artitem.artLocation, index)"
            >
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 v-else>
      <p class="subheading text-xs-center">
        You currently do not have any art work
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

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
      loading: false
      // user: {
      //   name: "kibart"
      // }
    }; //end-return
  }, //end-data
  methods: {
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    async deleteArtWork(docid, imagelocations, indexvalue) {
      this.loading = true;
      // let self = this;
      console.log("delete process starting");
      console.log(`Doc[ ${docid} ] at index[ ${indexvalue} ]`);
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
    extend(obj, src) {
      Object.keys(src).forEach(function(key) {
        obj[key] = src[key];
      });
      return obj;
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
                let gotdocument = self.extend(
                  { docID: change.doc.id },
                  change.doc.data()
                );
                self.your_artwork.push(gotdocument);
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
            console.log(self.your_artwork);
          },
          error => {
            console.error("Listener failed :: ", error);
          }
        );
      // Create a root reference
      // let storageRef = fire.storage.ref();
      // Create a reference to 'artwork/imagename.extension[jpg,png,gif]'
      // let artworkRef = storageRef.child(`artwork/${this.user.name}/${filename}`);
      // let artworkRef = storageRef.child(`artwork/${this.user.name}/`);
    },
    getUser() {
      this.user = this.$store.getters.user;
      if (this.isEmpty(this.user) || this.user.emailVerified != true) {
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
    this.getUser();
    this.getArtWork();
  }
}; //end-export
</script>

<style scoped>
/*.*/
</style>
