<template>
  <v-layout
    class="about"
    app
    align-center
    justify-space-around
    row
    fill-height
    wrap
  >
    <v-flex xs12 md10>
      <v-card color="grey darken-1">
        <v-card-title primary-title>
          <div>
            <div class="headline">Kibart Gallery</div>
            <span class="">Spreading the joy of art</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Muikia.K.Allan</v-list-tile-title>
            </v-list-tile-content>

            <v-layout align-center justify-end>
              <v-btn icon color="" flat @click="cardShow = !cardShow">
                <!-- @click="cardShow = !cardShow" -->
                <v-icon>
                  {{ cardShow ? "keyboard_arrow_down" : "keyboard_arrow_up" }}
                  <!-- keyboard_arrow_down -->
                </v-icon>
              </v-btn>
              <!-- <v-icon class="mr-1">mdi-heart</v-icon> -->
              <!-- <span class="subheading">256</span> -->
              <!-- <span class="mr-1">·</span> -->
              <!-- <v-icon class="mr-1">mdi-share-variant</v-icon> -->
              <!-- <span class="subheading">45</span> -->
            </v-layout>
          </v-list-tile>
        </v-card-actions>
        <v-scale-transition mode="out-in" origin="center center">
          <!-- <v-flex xs12> -->
          <v-card-text v-show="cardShow">
            <div>
              <div class="title grey--text text--lighten-2">About</div>
              <span class="subheading">
                To simply put it, I love art. With this in mind, I have
                developed this online artspace, where I and other fellow artists
                can get a chance to share our art pieces with the world. Welcome
                and may you enjoy viewing the art collections.
              </span>
            </div>
          </v-card-text>
          <!-- </v-flex> -->
        </v-scale-transition>
      </v-card>
    </v-flex>

    <v-flex xs12 md3>
      <v-card elevation="5" color="grey lighten-1">
        <v-img
          :src="aboutimages.three.url"
          :lazy-src="imageUrlLazy"
          height="200"
        ></v-img>
        <!-- :src="require('../assets/art-3-kibart.png')" -->

        <v-card-text>
          <p class="subheading black--text">
            “Art enables us to find ourselves and lose ourselves at the same
            time.”
            <br />
            - <strong>Thomas Merton</strong> .
          </p>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md3>
      <v-card elevation="5" color="grey lighten-1">
        <v-img
          :src="aboutimages.one.url"
          :lazy-src="imageUrlLazy"
          height="200"
        ></v-img>
        <!-- :src="require('../assets/art-1-whatever.jpg')" -->
        <v-card-text>
          <p class="subheading black--text">
            "The purpose of art is washing the dust of daily life off our
            souls."
            <br />
            - <strong>Pablo Picasso</strong> .
          </p>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md4>
      <v-card elevation="5" color="grey lighten-1">
        <v-img
          :src="aboutimages.two.url"
          height="200"
          :lazy-src="imageUrlLazy"
        ></v-img>
        <!-- :src="require('../assets/art-2-honey.jpg')" -->
        <v-card-text>
          <p class="subheading black--text">
            "To me, Art is an expression of one’s personal emotions that cannot
            be confined to one definition. It takes on endless forms and can be
            interpreted in multiple ways through diverse perspectives. It can
            range from a performance to a painting to even a landscape. It’s a
            therapeutic form of release that does not necessarily need words."
            <br />
            - <strong>Avery Singer</strong> .
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import fire from "@/fire/V1";
// import utils from "@/utils/V1";

export default {
  name: "about-view",
  data() {
    return {
      // :src="require('../assets/art-3-kibart.png')"
      // :src="require('../assets/art-1-whatever.jpg')"
      // :src="require('../assets/art-2-honey.jpg')"
      show: false,
      cardShow: false,
      imageUrlLazy: require("@/assets/rings.svg"),
      aboutimages: {
        one: {
          ref: "site/about-page/art-1-whatever.jpg",
          url: ""
        },
        two: {
          ref: "site/about-page/art-2-honey.jpg",
          url: ""
        },
        three: {
          ref: "site/about-page/art-3-kibart.png",
          url: ""
        }
      }
    };
  }, //end-data
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
    let self = this;
    this.getUrl(this.aboutimages.one.ref).then(url => {
      console.log(url);
      self.aboutimages.one.url = url;
    });
    this.getUrl(this.aboutimages.two.ref).then(url => {
      // console.log(url);
      self.aboutimages.two.url = url;
    });
    this.getUrl(this.aboutimages.three.ref).then(url => {
      // console.log(url);
      self.aboutimages.three.url = url;
    });
  },
  watch: {
    aboutimages: function() {
      console.log(`\taboutimages just updated`);
    }
  }
}; //end-export
</script>

<style scoped>
/*.*/
</style>
