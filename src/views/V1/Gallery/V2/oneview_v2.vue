<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 md6 class="">
      <div>
        <!-- <v-breadcrumbs :items="views" divider=">"></v-breadcrumbs> -->
        <router-link
          to="/gallery"
          color=""
          style="text-decoration:none; color:white;"
        >
          <v-chip v-ripple>
            <v-icon>keyboard_arrow_left</v-icon>
            Main Gallery
          </v-chip>
        </router-link>
      </div>
      <h3 v-if="artist.userName" class="text-xs-center pa-2">
        {{ artist.userName }} <small> Gallery </small>
      </h3>
      <h3 v-else class="text-xs-center pa-2">No Artist</h3>
      <v-layout
        row
        wrap
        align-center
        justify-center
        v-if="your_artwork.length > 0"
      >
        <v-flex
          xs12
          sm8
          md5
          v-for="(artitem, i) in your_artwork"
          :key="i"
          class="ma-1"
        >
          <v-card height="350">
            <v-img
              :lazy-src="imageUrlLazy"
              :src="artitem.artLocation.full"
              :alt="artitem.artTitle"
              height="170"
              @click="toggleSheet(artitem.artTitle)"
              v-ripple
            ></v-img>
            <v-card-text>
              <h2 class="text-xs-right">{{ artitem.artTitle }}</h2>
              <span class="subheading text-xs-center" v-if="artitem.artDesc">
                {{ artitem.artDesc.substring(0, 50) }}...
              </span>
              <span class="subheading" v-else> No Description Available </span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="toggleSheet(artitem.artTitle)">
                View <v-icon>fullscreen</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <h3 v-else>No Art Work Available</h3>
    </v-flex>
    <!-- . -->
    <v-bottom-sheet
      v-model="sheet"
      v-for="(artitem, i) in sheetData"
      :key="i"
      inset
    >
      <v-card class="pa-1" light>
        <h5 class="text-xs-center headline font-weight-light black--text py-2">
          {{ artitem.artTitle }}
        </h5>
        <v-img
          :lazy-src="imageUrlLazy"
          :src="artitem.artLocation.full"
          :alt="artitem.artTitle"
          max-height="350"
          class="px-1"
          contain
        ></v-img>
        <v-card-text v-if="artitem.artDesc">
          <p class="subheading text-xs-center">{{ artitem.artDesc }}</p>
        </v-card-text>
        <v-card-actions class="">
          <!-- <v-btn>Click</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn
            flat
            icon
            @click="sheet = false"
            color="red lighten-2"
            class=""
          >
            <v-icon>close</v-icon>
          </v-btn>
          <!-- <social-sharing
            url="https://kibart-gallery.firebaseapp.com/"
            :title="
              `View, [ ${artitem.artTitle} ], this art piece in KibArt Gallery.`
            "
            description="`View, [ ${artitem.artTitle} ], this art piece in KibArt Gallery.`"
            quote="Art enables us to find ourselves and lose ourselves at the same
              time. Welcome to KibArt Gallery !!"
            hashtags="art,pencilart"
            twitter-user="muikiaallan"
            :media="artCard.imageUrl"
            inline-template
          >
            <network network="twitter" class="mx-2">
              <font-awesome-icon
                :icon="{ prefix: 'fab', iconName: 'twitter' }"
              ></font-awesome-icon>
            </network>
            <network network="facebook" class="mx-2">
              <font-awesome-icon
                :icon="{ prefix: 'fab', iconName: 'facebook' }"
              ></font-awesome-icon>
            </network>
            <network network="pinterest" class="mx-2">
              <font-awesome-icon
                :icon="{ prefix: 'fab', iconName: 'pinterest' }"
              ></font-awesome-icon>
            </network>
          </social-sharing> -->
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import fire from "@/fire/V1";
import utils from "@/utils/V1";

export default {
  name: "an-artist-artwork-view",
  data() {
    return {
      imageUrlLazy: require("@/assets/ball-interwind.svg"),
      // ball-triangle.svg loading_dna.gif rings.svg gooey-spinner.svg ball-interwind.svg
      artist: null,
      your_artwork: [],
      sheet: false,
      sheetData: null,
      views: [
        {
          text: "Main Gallery",
          disabled: false,
          href: "gallery"
        }
      ]
    };
  },
  methods: {
    getArtWorks(userid) {
      let artworksRef = fire.db.collection("artworks_v2");
      let self = this;
      artworksRef.where("userID", "==", userid).onSnapshot(
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
              console.log(self.your_artwork);
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
        },
        error => {
          console.error("Listener failed :: ", error);
        }
      );
    }, // end-getArtWorks
    toggleSheet(title) {
      console.log(`\tViewing art-item-->[ ${title} ]`);
      let showartitem = this.your_artwork.filter(function(artwork) {
        return artwork.artTitle == title;
      });
      console.log(showartitem);
      this.sheetData = showartitem;
      this.sheet = true;
    } //end-toggleSheet
  },
  created() {
    // console.log(this.$route.params);
    if (this.$route.params.artistData) {
      this.artist = this.$route.params.artistData;
    } else {
      console.error("Invalid User");
      this.$router.push({
        name: "ArtistWorkView",
        params: { status: "Invalid Artist" }
      });
    }
  }, //end-created
  watch: {
    artist: function() {
      console.log(`\treceived artist :: ${this.artist.userName}`);
      // console.log(this.artist);
      this.getArtWorks(this.artist.userID);
    },
    your_artwork: function() {
      console.log(`\tyour_artwork, current value ::`);
      console.log(this.your_artwork);
    }
  } //end-watch
};
</script>

<style scoped>
/*.*/
</style>
