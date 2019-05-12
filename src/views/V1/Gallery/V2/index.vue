<template>
  <v-layout app wrap align-center justify-center row class="">
    <v-flex xs12 md5>
      <v-card
        color="blue-grey lighten-3"
        class="black--text mb-3"
        v-if="kibartMain.userName"
      >
        <!-- cyan darken-2 -->
        <v-layout>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ kibartMain.userName }}</div>
                <div>{{ kibartMain.userAbout }}</div>
                <!-- <div>(2014)</div> -->
              </div>
            </v-card-title>
          </v-flex>
          <v-flex xs5 class="">
            <!-- <v-img :src="user.userPhotoUrl" height="125px" contain></v-img> -->
            <v-avatar size="120" color="" class="ml-4">
              <v-img
                :src="kibartMain.userPhotoUrl"
                :lazy-src="imageUrlLazy"
                :alt="kibartMain.userName"
              ></v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3 blue-grey lighten-4">
          View My Gallery
          <v-spacer></v-spacer>
          <v-btn icon color="black" flat @click="viewArtistWork(kibartMain)">
            <v-icon>arrow_forward_ios</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- <div v-else class="text-xs-center mb-3">
        <v-chip>Loading Kib-Art</v-chip>
      </div> -->
      <vcl-facebook
        v-else
        :speed="speed"
        secondary="#a0d468"
        class="mb-3"
      ></vcl-facebook>

      <!-- . -->
      <v-layout row wrap align-center justify-center v-if="users.length > 0">
        <!-- <v-flex xs12>
          <p>search function here</p>
        </v-flex> -->
        <v-flex xs12 v-for="(user, i) in users" :key="i" class="mb-3">
          <v-card color="blue-grey lighten-4" class="black--text">
            <!-- cyan darken-2 -->
            <v-layout>
              <v-flex xs5 class="pa-2">
                <!-- <v-img :src="user.userPhotoUrl" height="125px" contain></v-img> -->
                <v-avatar size="100" color="">
                  <v-img
                    :src="user.userPhotoUrl"
                    :lazy-src="imageUrlLazy"
                    :alt="user.userName"
                  ></v-img>
                </v-avatar>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{ user.userName }}</div>
                    <div>{{ user.userAbout }}</div>
                    <!-- <div>(2014)</div> -->
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3 blue-grey lighten-3">
              <div>Explore {{ user.userName }}'s Gallery</div>
              <v-spacer></v-spacer>
              <v-btn icon color="black" flat @click="viewArtistWork(user)">
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <div v-else class="text-xs-center mt-1">
        <v-chip>Loading registered users</v-chip>
      </div> -->
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import fire from "@/fire/V1";
import utils from "@/utils/V1";

import { VclFacebook } from "vue-content-loading";

export default {
  name: "gallery-component-v2",
  components: {
    VclFacebook
  },
  data() {
    return {
      imageUrlLazy: require("@/assets/rings.svg"),
      // ball-triangle.svg loading_dna.gif rings.svg gooey-spinner.svg
      users: [],
      // artworks: [],
      kibartMain: {},
      speed: 1
    };
  },
  methods: {
    viewArtistWork(user) {
      // console.log(`Got id-->[ ${user} ]`);
      // console.log(user);
      this.$router.push({
        name: "ArtistWorkView",
        params: { artistData: user }
      });
    },
    async getUrl(path) {
      // console.log(`Got path[ ${path} ]`);
      let imageUrl = "";
      let storageRef = fire.storage.ref();
      await storageRef
        .child(path)
        .getDownloadURL()
        .then(url => {
          imageUrl = url;
          // console.log(`\tthen-running ... imageUrl[ -  ${imageUrl}  - ]`);
        })
        .catch(err => {
          console.error(err);
        });
      return imageUrl;
    },
    async getUsers() {
      let usersRef = fire.db.collection("users");
      let self = this;
      await usersRef
        .orderBy("userName")
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(async doc => {
            // console.log("cycling thru [users]docs to get doc.data()");
            // console.log(doc.data().userPhoto);
            let url = await self.getUrl(doc.data().userPhoto);
            // let url = "";
            // self.getUrl(doc.data().userPhoto).then(goturl => {
            //   console.log(`goturl -- [ ${typeof goturl} ] .. [ ${goturl} ]`);
            //   // url = goturl;
            //   return (url = goturl);
            // });
            // console.log(`\tNow url is --[ ${url} ]`);

            let gotdocument = utils.extend(
              {
                userPhotoUrl: url
              },
              doc.data()
            );
            if (doc.data().userEmail === "muikiaa@gmail.com") {
              self.kibartMain = gotdocument;
            } else {
              self.users.push(gotdocument);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    this.getUsers();
    if (this.$route.params.status) {
      utils.showAlert("Status", this.$route.params.status, "info");
    }
  },
  watch: {
    users: function() {
      console.log("\tUSERS just updated ::");
      // console.log(this.users);
    },
    kibartMain: function() {
      console.log("\tkibartMain is now ::");
      console.log(this.kibartMain);
    }
  } //end-watch
};
</script>

<style scoped>
.bitter-sweet-l {
  background-color: #fc6e51 !important;
}
.bitter-sweet-d {
  background-color: #e9573f !important;
}
.grass-l {
  background-color: #a0d468 !important;
}
.grass-d {
  background-color: #8cc152 !important;
}
</style>
