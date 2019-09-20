<template>
  <!-- . -->

  <v-container class="" v-if="artwork.length > 0">
    <v-row class="">
      <v-col cols="12" sm="8" offset-sm="2" class="">
        <v-card>
          <v-container class="">
            <v-row>
              <!-- <v-col v-for="n in 2" :key="n" class="d-flex child-flex" cols="6"> -->
              <v-col
                v-for="(art, index) in artwork"
                :key="index"
                class="d-flex child-flex"
                cols="6"
              >
                <!-- <template v-slot:activator="{ on }"> -->
                <v-card flat tile class="d-flex" @click="onaImage(art)">
                  <!-- .start Image -->
                  <v-img
                    :src="art.location.full"
                    :lazy-src="art.thumb_url"
                    aspect-ratio="1"
                    class="grey lighten-3 kibimage"
                  >
                    <!-- :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`" -->
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="deep-orange lighten-2"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <!-- .end Image -->
                </v-card>
                <!-- </template> -->
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- . -->
    <div v-if="show">
      <ViewImage :show="show" v-bind:imagedata="toview" />
    </div>
    <!-- . -->
  </v-container>
  <v-container v-else>
    <!-- <p class="mx-auto display-1">
      Loading...
    </p> -->
    <v-row>
      <v-col cols="4" class="mx-auto">
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

// import ViewImage from "viewimage.vue";

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
      // lazy: SELF.$store.state.lazyurl
      // lazy: require("@/assets/over-min.png")
    };
  },
  methods: {
    onaImage(image) {
      SELF.show = true;
      SELF.toview = image;
      // console.log( typeof SELF.toview );
      // console.log( SELF.toview.title );
    }, //end-onaImage
    async getKibart() {
      // .

      let kibartRef = fire.db.collection("kibart");
      let allKibart = await kibartRef
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(async doc => {
            // console.log(doc.id, '=>', doc.data());
            let url = await SELF.getUrl(doc.data().location.t_partial);
            let gotdocument = utils.extend(
              {
                thumb_url: url
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
      let imageUrl = "";
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
  watch: {},
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
