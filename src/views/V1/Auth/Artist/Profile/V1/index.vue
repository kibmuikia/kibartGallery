<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12>
      <v-card>
        <v-layout row wrap>
          <v-flex xs5 class="pl-0">
            <v-avatar size="150">
              <v-img
                :src="artist.photoURL_full"
                :lazy-src="imageUrlLazy"
                :alt="artist.displayName"
              ></v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ artist.displayName }}</div>
                <div class="subheading">about the artist</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import fire from "@/fire/V1";

export default {
  name: "profile-main-view",
  components: {},
  data() {
    return {
      artist: {},
      imageUrlLazy: require("@/assets/rings.svg")
    };
  },
  methods: {
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
    }
  },
  created() {
    this.artist = this.$store.getters.user;
    let self = this;
    this.getUrl(this.artist.photoURL).then(url => {
      console.log(url);
      self.artist.photoURL_full = url;
      console.log(`just set full url --> [ ${self.artist.photoURl_full} ]`);
    });
  },
  watch: {} //end-watch
};
</script>

<style scoped>
/*.*/
</style>
