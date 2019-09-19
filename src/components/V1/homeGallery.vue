<template>
  <v-container class="" id="galleries">
    <v-row class="">
      <v-col cols="12" sm="8" offset-sm="2" class="">
        <v-card>
          <p class="headline text-center">
            Kibart Gallery
          </p>
          <v-container class="">
            <v-row>
              <v-col v-for="n in 2" :key="n" class="d-flex child-flex" cols="6">
              <!-- <v-col v-for="(art, index) in artwork" :key="index" class="d-flex child-flex" cols="6"> -->
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    lazy-src="@/assets/over-min.png"
                    aspect-ratio="1"
                    class="deep-orange lighten-4"
                  >
                    <!-- :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`" -->
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
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="4" offset="5">
        <v-btn color="primary" class="" to="/kibart" style="cursor: pointer;">
          More
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import fire from "@/fire/V1";
import utils from "@/utils/V1";

let SELF;
export default {
  name: "home-gallery-component",
  title: "", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      artwork: [],
    };
  },
  methods: {
    async getKibart() {
      // .

      let kibartRef = fire.db.collection('kibart');
      let allKibart = await kibartRef.get()
        .then(querySnapshot => {
          querySnapshot.forEach(async doc => {
            console.log(doc.id, '=>', doc.data());
            let url = await SELF.getUrl( doc.data().location.t_partial );
            let gotdocument = utils.extend(
                {
                  thumb_url: url
                },
                doc.data()
              );
            SELF.artwork.push( gotdocument );
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        // .
    },//end-getKibart
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
    }// end-getUrl
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {
    SELF.getKibart();
  },
  mounted() {}
};
</script>

<style scoped>
/*.*/
</style>
