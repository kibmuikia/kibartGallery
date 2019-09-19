<template>
<!-- . -->

  <v-container class="">
    <v-row class="">
      <v-col cols="12" sm="8" offset-sm="2" class="">
        <v-card>
          <v-container class="">
            <v-row>
              <!-- <v-col v-for="n in 2" :key="n" class="d-flex child-flex" cols="6"> -->
              <v-col v-for="(art, index) in artwork" :key="index" class="d-flex child-flex" cols="6">
                <v-card flat tile class="d-flex">
                  <!-- .start Image -->
                  <v-img
                    :src="art.location.full"
                    lazy-src="@/assets/over-min.png"
                    aspect-ratio="1"
                    class="deep-orange lighten-4"
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
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

<!-- . -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// import { serverBus } from "@/main";
import fire from "@/fire/V1";
// import utils from "@/utils/V1";

let SELF;
export default {
  name: "gallery-component",
  title: "",
  components: {},
  props: {},
  data() {
    return {
      artwork: []
    };
  },
  methods: {
    async getKibart() {
      // .

      let kibartRef = fire.db.collection('kibart');
      let allKibart = await kibartRef.get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            SELF.artwork.push( doc.data() );
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        // .
    },//end-getKibart
    async getUrl(path) {}// end-getUrl
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {
    SELF.getKibart();
  }
};
</script>

<style scoped>
/*.*/
</style>
