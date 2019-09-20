<template>
  <!-- . -->

  <v-container class="" v-if="artwork.length > 0">
    <v-row class="">
      <v-col cols="12" sm="8" offset-sm="2" class="">
        <v-card>
          <v-container class="">
            <v-row>
              <v-col
                v-for="(art, index) in artwork"
                :key="index"
                class="d-flex child-flex"
                cols="6"
              >
                <v-card class="d-flex" @click="onaImage(art)">
                  <v-img
                    src=""
                    :lazy-src="art.thumb_url"
                    aspect-ratio="1"
                    class="grey lighten-3 kibimage"
                    height="100%"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <!-- <v-progress-circular
                          indeterminate
                          color="grey"
                        ></v-progress-circular> -->
                        <v-btn
                          small
                          class="mx-auto caption"
                          color=""
                          v-if="art.title.length > 6"
                        >
                          {{ art.title.slice(0, 5) + "..." }}
                        </v-btn>
                        <v-btn small class="mx-auto caption" color="" v-else>
                          {{ art.title }}
                        </v-btn>
                      </v-row>
                    </template>
                  </v-img>
                  <!-- .end Image -->
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- . -->
    <div v-show="show">
      <ViewImage :show="show" v-bind:imagedata="toview" />
    </div>
    <!-- . -->
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="5" class="mx-auto">
        <v-progress-circular
          indeterminate
          color="light-green"
          class="mx-auto"
          size="100"
          width="6"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>

  <!-- . -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { serverBus } from "@/main";
import fire from "@/fire/V1";
import utils from "@/utils/V1";

let SELF;
export default {
  name: "gallery-component",
  title: "",
  components: {
    ViewImage: () => import("@/components/V1/viewimage")
  },
  props: {},
  data() {
    return {
      artwork: [],
      show: false,
      toview: {},
      dataSize: null
      // lazy: SELF.$store.state.lazyurl
      // lazy: require("@/assets/over-min.png")
    };
  },
  methods: {
    onaImage(image) {
      SELF.toview = image;
      SELF.show = true;
    }, //end-onaImage
    async getKibart() {
      // .

      let kibartRef = fire.db.collection("kibart");
      let allKibart = await kibartRef
        .get()
        .then(querySnapshot => {
          // console.log( querySnapshot.size );
          SELF.dataSize = querySnapshot.size;
          querySnapshot.forEach(async doc => {
            // console.log(doc.id, '=>', doc.data());
            let thumbUrl = await SELF.getUrl(doc.data().location.t_partial);
            let gotdocument = utils.extend(
              {
                thumb_url: thumbUrl,
                fullPicha: {},
                fullurl: doc.data().location.full
              },
              doc.data()
            );
            SELF.artwork.push(gotdocument);
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      // .
    }, //end-getKibart
    async getUrl(path) {
      let imageUrl = "",
        image = "";
      let storageRef = fire.storage.ref();
      await storageRef
        .child(path)
        .getDownloadURL()
        .then(url => {
          imageUrl = url;
        })
        .catch(err => {
          console.error(err);
        });
      return imageUrl;
    } // end-getUrl
  },
  computed: {},
  watch: {
    artwork: function() {
      // console.log( SELF.artwork.length );
      // // if( SELF.artwork.length == SELF.dataSize ) {
      // if( SELF.artwork.length > 0 ) {
      //   console.log( SELF.artwork );
      //   SELF.artwork.forEach( async (image,index) => {
      //     let picha = await fetch(image.location.full).then(r => r.blob());
      //     const reader = new FileReader();
      //     reader.readAsDataURL(picha);
      //     reader.onloadend = function() {
      //       // result includes identifier 'data:image/png;base64,' plus the base64 data
      //       image.fullPicha = reader.result;
      //     };
      //     console.log( image.fullPicha );
      //   } );
      // }
    }
  },
  beforeCreate() {
    SELF = this;
  },
  created() {
    SELF.getKibart();
  },
  mounted() {
    serverBus.$on("resetSheet", () => {
      SELF.show = false;
      SELF.toview = {};
    });
  }
};
</script>

<style scoped>
.kibimage {
  background-image: url("../../assets/over-min.png");
  background-size: contain;
  background-position: center;
}
</style>
