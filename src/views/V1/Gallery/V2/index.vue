<template>
  <v-layout app wrap align-center justify-center row class="">
    <v-flex xs12 md5>
      <v-card
        color="grass-l"
        class="white--text mb-3"
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
          <v-flex xs5 class="pa-2">
            <!-- <v-img :src="user.userPhotoUrl" height="125px" contain></v-img> -->
            <v-avatar size="100" color="">
              <v-img
                :src="kibartMain.userPhotoUrl"
                :lazy-src="imageUrlLazy"
                :alt="kibartMain.userName"
              ></v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3 grass-d">
          View My Gallery
          <v-spacer></v-spacer>
          <v-btn icon flat @click="viewArtistWork(kibartMain)">
            <v-icon>arrow_forward_ios</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p v-else>Kib-Art Not Available</p>
      <!-- . -->
      <v-layout row wrap align-center justify-center v-if="users.length > 0">
        <v-flex xs12 v-for="(user, i) in users" :key="i" class="mb-3">
          <v-card color="bitter-sweet-l" class="white--text">
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
            <v-card-actions class="pa-3 bitter-sweet-d">
              <div>Explore {{ user.userName }}'s Gallery</div>
              <v-spacer></v-spacer>
              <v-btn icon flat @click="viewArtistWork(user)">
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- <v-carousel hide-delimiters height="auto">
            <v-carousel-item v-for="(user, i) in users" :key="i">
              <v-card class="text-xs-center">
                <v-img :src="user.userPhotoUrl" height="250"></v-img>
                <v-card-title primary-title>
                  <p class="title">{{ user.userName }}</p>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="orange" @click="viewArtistWork(user)">
                    Explore
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel> -->
        </v-flex>
      </v-layout>
      <p v-else class="subheading">No user is registered yet.</p>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import fire from "@/fire/V1";
import utils from "@/utils/V1";

export default {
  name: "gallery-component-v2",
  components: {
    // .
  },
  data() {
    return {
      imageUrlLazy: require("@/assets/rings.svg"),
      // ball-triangle.svg loading_dna.gif rings.svg gooey-spinner.svg
      users: [],
      artworks: [],
      kibartMain: {}
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
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(async doc => {
            // console.log("cycling thru [users]docs to get doc.data()");
            // console.log(doc.data().userPhoto);
            let url = await self.getUrl(doc.data().userPhoto);
            // console.log(` url -- [ ${typeof url} ] .. ` + url);

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

    // async getUserData(uid) {
    //   await fireAdmin.admin
    //     .auth()
    //     .getUser(uid)
    //     .then(userRecord => {
    //       console.log("Successfully fetched user data:", userRecord.toJSON());
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // }
  },
  created() {
    this.getUsers();
    if (this.$route.params.status) {
      utils.showAlert("Status", this.$route.params.status, "info");
    }
  },
  watch: {
    users: function() {
      console.log("\tUSERS just changed value to ::");
      console.log(this.users);
    },
    kibartMain: function() {
      console.log("\tkibartMain is now ::");
      console.log(this.kibartMain);
    },
    artworks: function() {
      console.log("artworks value just changed ::");
      // console.log(this.artworks);
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
