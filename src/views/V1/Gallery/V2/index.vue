<template>
  <v-layout app wrap align-center justify-center row class="">
    <v-flex xs12 md8>
      <!-- <h6 class="title font-weight-light">New Gallery View</h6> -->
      <v-card class="mb-3">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>card_text</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12>
          <v-carousel hide-delimiters height="auto">
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-card width="">
                <v-img :src="item.src" height="250"></v-img>
                <v-card-title primary-title>
                  <p>Display Name</p>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import fire from "@/fire/V1";
import fireAdmin from "@/fireAdmin/V1";
// import utils from "@/utils/V1";

export default {
  name: "gallery-component-v2",
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      artworks: []
    };
  },
  methods: {
    async getArtWorks() {
      let artworksRef = fire.db.collection("artworks");
      let artworks = [];
      let self = this;
      await artworksRef
        .get()
        .then(querySnapshot => {
          // console.log(querySnapshot);
          querySnapshot.docs.forEach(doc => {
            // console.log("cycling thru docs to get doc.data()");
            console.log(doc.data().userID);
            artworks.push(doc.data());
            self.getUserData(doc.data().userID);
          });
        })
        .catch(err => {
          console.error(err);
        });
      // console.log("\tShowing artworks::");
      // console.log(artworks);
      if (artworks.length != 0) {
        return artworks;
      }
    },
    async getUserData(uid) {
      await fireAdmin.admin
        .auth()
        .getUser(uid)
        .then(userRecord => {
          console.log("Successfully fetched user data:", userRecord.toJSON());
        })
        .catch(err => {
          console.error(err);
        });
      /*
        admin.auth().getUser(uid)
          .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully fetched user data:', userRecord.toJSON());
          })
          .catch(function(error) {
            console.log('Error fetching user data:', error);
          });

              */
    }
  },
  created() {
    this.artworks = this.getArtWorks();
    console.log(`Created func: showing this.artworks :: [ ${this.artworks} ]`);
    console.log(this.artworks);
  }
};
</script>

<style scoped></style>
