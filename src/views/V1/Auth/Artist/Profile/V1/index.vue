<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card elevation="8" class="card_bg">
        <v-layout column align-center justify-center>
          <v-flex xs12 class="pa-0 ma-0">
            <v-avatar
              size="125"
              color="green accent-1"
              style="transform: translateY(-30%);"
              class="kibshadow pa-1"
            >
              <v-img
                :src="fullurl"
                :lazy-src="imageUrlLazy"
                :alt="artist.userName"
              ></v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs12>
            <v-card-title>
              <div>
                <h3 class="headline text-xs-center mb-3">
                  {{ artist.userName }}
                </h3>
                <p class="subheading">{{ artist.userAbout }}</p>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex xs12>
            <!-- <v-tooltip bottom> -->
            <!-- <template v-slot:activator="{ on }"> -->
            <router-link to="/upload-image">
              <v-btn color="info" flat>View Your Art</v-btn>
            </router-link>
            <v-btn
              flat
              icon
              class="opacityPulse-css"
              color="info"
              @click="
                showTip(
                  'Click button and get to upload your artwork and view them'
                )
              "
            >
              <v-icon>info</v-icon>
            </v-btn>
            <!-- </template> rotating-css -->
            <!-- <span class="subheading" -->
            <!-- >Get to upload, view and modify your artwork</span -->
            <!-- > -->
            <!-- </v-tooltip> -->
            <Tip :information="theTip" :show="show" />
          </v-flex>
        </v-layout>
      </v-card>
      <!-- <v-card>
        <v-layout row wrap>
          <v-flex xs5 class="pa-2">
            <v-avatar size="125">
              <v-img
                :src="fullurl"
                :lazy-src="imageUrlLazy"
                :alt="artist.userName"
              ></v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline text-xs-center">{{ artist.userName }}</div>
                <div class="subheading font-italic">{{ artist.userAbout }}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card> -->
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import fire from "@/fire/V1";
import Tip from "@/components/Tip";
require("@/assets/infinite.css");

export default {
  name: "profile-main-view",
  components: {
    Tip
  },
  data() {
    return {
      userRef: fire.db.collection("users"),
      artist: {},
      fullurl: "",
      imageUrlLazy: require("@/assets/rings.svg"),
      show: null,
      theTip: ""
    };
  },
  methods: {
    showTip(text) {
      // this.show = true;
      // setTimeout(func|code, [delay], [arg1], [arg2], ...)
      this.show = true;
      this.theTip = text;
      console.log(this.show);
      let self = this;
      setTimeout(() => {
        self.show = false;
        // console.log(self.show);
      }, 3000);
    },
    async getUrl(path) {
      // console.log(`\tGot path[ ${path} ]`);
      let imageUrl = "";
      let storageRef = fire.storage.ref();
      // let self = this;
      await storageRef
        .child(path)
        .getDownloadURL()
        .then(url => {
          // console.log(`\timageUrl[ -[${typeof imageUrl}] --  ${imageUrl}  - ]`);
          imageUrl = url;
        })
        .catch(err => {
          console.error(err);
        });

      if (typeof imageUrl === "string" && imageUrl != "") {
        // console.log(`\timageUrl[ -[${typeof imageUrl}] --  ${imageUrl}  - ]`);
        return imageUrl;
      }
    }, //end-getUrl
    getUser(objectUser) {
      // this.userRef
      let self = this;
      this.userRef.where("userID", "==", objectUser.uid).onSnapshot(
        snapshot => {
          let changes = snapshot.docChanges();
          changes.forEach(change => {
            if (change.type == "added") {
              // console.log(`Doc[${change.doc.id}], ${change.type}`);
              self.artist = change.doc.data();
              self.getUrl(change.doc.data().userPhoto).then(url => {
                // console.log(`Got url userPhoto --> ${url}`);
                // self.artist.userPhoto_full = url;
                self.fullurl = url;
              });
            }
          });
        },
        error => {
          console.error("Listener failed :: ", error);
        }
      );
      // console.log(self.artist);
    } //end-getUser
  },
  created() {
    this.getUser(this.$store.getters.user);
  },
  watch: {
    artist: function() {
      console.log("\tartist just updated");
      // console.log(this.artist);
    },
    show: function() {
      // if (this.show === true) {
      //   this.show = null;
      // }
    }
  } //end-watch
};
</script>

<style scoped>
/*@import "@/src/assets/infinite.css";*/

.kibshadow {
  -webkit-box-shadow: -1px 1px 8px 1px rgba(171, 171, 171, 0.8);
  -moz-box-shadow: -1px 1px 8px 1px rgba(171, 171, 171, 0.8);
  box-shadow: -1px 1px 8px 1px rgba(171, 171, 171, 0.8);
}

/*.*/

.rotating-css {
  animation: rotating 2s linear;
  animation-iteration-count: infinite;
}
.opacityPulse-css {
  animation: opacityPulse 2s ease-out;
  animation-iteration-count: infinite;
  opacity: 1;
}
.opacityPulse-css:hover {
  animation: none;
}
/*.*/
.pulse {
  /*margin: 100px;
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #cca92c;*/
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
.card_bg {
  /*background-color: #565656;*/
  background-image: url("~@/assets/topography.svg");
}
/*.*/
</style>
