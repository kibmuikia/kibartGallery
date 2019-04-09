<template>
  <div app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      v-touch="{
        right: () => {
          drawer = !drawer;
        }
      }"
    >
      <v-avatar
        v-if="menuPhotoUrl"
        size="150"
        class="mt-4 ml-5 indigo lighten-3"
      >
        <v-img
          :src="menuPhotoUrl"
          :lazy-src="imageUrlLazy"
          :alt="currentuser.displayName"
          contain
        ></v-img>
      </v-avatar>
      <v-img
        v-else
        :src="require('../assets/think.svg')"
        class="mt-4"
        contain
        height="100"
      ></v-img>
      <!-- . -->
      <v-list>
        <v-list-tile v-if="userflag">
          <v-list-tile-content>
            <v-list-tile-title class="text-xs-center title font-weight-light">
              Artist - {{ currentuser.displayName }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="navigateTo('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile @click="navigateTo('/gallery')">
          <v-list-tile-action>
            <v-icon>pageview</v-icon>
            <font-awesome-icon icon="pencil-alt" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Gallery</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile @click="navigateTo('/gallery')">
          <v-list-tile-action>
            <font-awesome-icon icon="pencil-alt" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Gallery</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigateTo('/about')">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- . -->
        <v-list-group prepend-icon="account_box" v-if="!userflag">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  Account
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile @click="navigateTo('/auth/artist/signin')">
            <v-list-tile-action>
              <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign In</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            @click="navigateTo('/auth/artist/signup')"
            v-if="!userflag"
          >
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign Up</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> </v-list-group
        ><!-- end-group-accounts -->
        <!-- . -->

        <!-- . -->
        <v-list-group prepend-icon="settings" v-if="userflag">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  Your Profile
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile @click="navigateTo('/upload-image')" v-if="userflag">
            <v-list-tile-action>
              <v-icon>cloud_upload</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Upload Your Art</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="signout" v-if="userflag">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> </v-list-group
        ><!-- end-group-profile -->
        <!-- . -->
      </v-list>
    </v-navigation-drawer>
    <!-- . -->
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>KibArt</span>
        <span class="font-weight-light">Gallery</span>
      </v-toolbar-title>
    </v-toolbar>
    <!-- . -->
  </div>
</template>

<script>
/* eslint-disable no-console */
import fire from "@/fire/V1";
import utils from "@/utils/V1";
export default {
  name: "main-toolbar-component",
  data() {
    return {
      drawer: false,
      userflag: false,
      menuPhotoUrl: "",
      status: "",
      imageUrlLazy: require("@/assets/ball-triangle.svg")
    }; //end-return
  }, //end-data
  methods: {
    navigateTo(path) {
      // console.log(path);
      this.drawer = !this.drawer;
      this.$router.push(path);
    },
    async signout() {
      await fire.auth
        .signOut()
        .then(() => {
          console.log("Now Signed-OUT !");
          this.$store.dispatch("unsetUser");
          this.drawer = !this.drawer;
          utils.showAlert("Status", "Signed Out", "info");
          this.$router.push("/");
        })
        .catch(e => {
          this.status = e.message;
          console.error(e);
        });
    },
    getUrl(path) {
      console.log(`Got path[ ${path} ]`);
      let imageUrl = "";
      let storageRef = fire.storage.ref();
      // let self = this;
      storageRef
        .child(path)
        .getDownloadURL()
        .then(url => {
          imageUrl = url;
          // console.log(`\timageUrl[ -[${typeof imageUrl}] --  ${imageUrl}  - ]`);
          return (this.menuPhotoUrl = imageUrl);
        })
        .catch(err => {
          console.error(err);
        });
      // return imageUrl;
    }
  }, //end-methods
  created() {
    // .
  }, //end-created
  computed: {
    currentuser: function() {
      let self = this;
      let gotuser = this.$store.getters.user;
      let check = utils.isEmpty(gotuser);
      if (check) {
        // gotuser object is empty thus NO user is present
        self.userflag = false;
        console.log(
          `NO User PRESENT! check[${check}] - userflag[${this.userflag}]`
        );
      } else {
        // gotuser object has data
        self.userflag = true;
        console.log(
          `In computed[toolbar] : gotuser--> [ ${gotuser} ] -- userflag[${
            this.userflag
          }] -- check[${check}]`
        );
        // console.log(gotuser);
      }
      return gotuser;
    }
  }, //end-computed
  watch: {
    menuPhotoUrl: function() {
      console.log(`menuPhotoUrl is now :: ${this.menuPhotoUrl}`);
    },
    currentuser: function() {
      console.log(`\t\tcurrentuser has just changed !`);
      // console.log(this.currentuser);
    },
    userflag: function() {
      if (this.userflag) {
        console.log(`User's photo-url --> ${this.currentuser.photoURL}`);
        this.getUrl(this.currentuser.photoURL);
      } else {
        this.menuPhotoUrl = "";
      }
    }
  }
};
</script>

<style scoped></style>
