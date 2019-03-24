<template>
  <v-layout app wrap align-center fill-height row class="">
    <!-- align-center justify-space-around row fill-height wrap light-blue lighten-4 -->
    <!-- <v-flex xs12 md6 offset-md3>
      <ImageSpinner class="image__spinner" />
    </v-flex> -->
    <v-flex xs12 md12 text-xs-center class="black--text">
      <v-layout align-center justify-space-around row fill-height wrap>
        <!-- . -->
        <v-flex
          v-for="(artCard, index) in artCards"
          :key="artCard.title"
          xs12
          md4
          my-3
          mx-1
        >
          <v-card light max-width="400" hover>
            <v-card-title class="pa-0">
              <v-img
                :lazy-src="imageUrlLazy"
                :src="artCard.imageUrl"
                :alt="artCard.title"
                :id="index"
                height="200"
                class=""
              ></v-img>
            </v-card-title>

            <v-card-text class="pt-2 pb-0">
              <v-layout column text-xs-center>
                <v-flex xs12>
                  <h3 class="headline ">{{ artCard.title }}</h3>
                </v-flex>
                <v-flex xs12>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <!-- <v-btn color="primary" dark v-on="on">Button</v-btn> -->
                      <v-btn
                        flat
                        icon
                        color="orange"
                        v-on="on"
                        v-on:click="toggleDialog(artCard.title)"
                      >
                        <v-icon>fullscreen</v-icon>
                      </v-btn>
                    </template>
                    <span>View Image</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions class="">
              <!-- <v-btn flat color="orange">Share</v-btn> -->
              <social-sharing
                url="https://kibart-gallery.firebaseapp.com/"
                :title="
                  `View, [ ${
                    artCard.title
                  } ], this art piece in KibArt Gallery.`
                "
                description="`View, [ ${artCard.title} ], this art piece in KibArt Gallery.`"
                quote="Art enables us to find ourselves and lose ourselves at the same
              time. Welcome to KibArt Gallery !!"
                hashtags="art,pencilart"
                twitter-user="muikiaallan"
                :media="artCard.imageUrl"
                inline-template
              >
                <div>
                  <!-- <network network="email" class="shareIconWrap">
                    <i class="fa fa-envelope"></i> Email
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: 'envelope' }"
                    ></font-awesome-icon>
                  </network> -->
                  <network network="facebook" class="mx-2">
                    <!-- <i class="fa fa-facebook"></i> Facebook -->
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'facebook' }"
                    ></font-awesome-icon>
                    <!-- Facebook -->
                  </network>
                  <network network="pinterest" class="mx-2">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'pinterest' }"
                    ></font-awesome-icon>
                  </network>
                  <!-- <network network="telegram" class="">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'telegram' }"
                    ></font-awesome-icon>
                  </network> -->
                  <network network="twitter" class="mx-2">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'twitter' }"
                    ></font-awesome-icon>
                  </network>
                  <!-- <network network="whatsapp" class="">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'whatsapp' }"
                    ></font-awesome-icon>
                  </network> -->
                </div>
              </social-sharing>
              <!-- . -->
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- . -->
      </v-layout>
    </v-flex>

    <v-dialog
      v-model="dialog"
      width="500"
      v-for="cardInfo in dialogData"
      :key="cardInfo.title"
    >
      <v-card>
        <v-img :src="cardInfo.imageUrl"></v-img>
        <v-card-title class="headline" primary-title>
          {{ cardInfo.title }}
        </v-card-title>

        <v-card-text>
          {{ cardInfo.desc }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">
            Done Viewing
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

// import ImageItem from "@/components/ImageItem";

export default {
  name: "gallery-component",
  components: {
    // ImageItem
  },
  data() {
    return {
      imageUrlLazy: require("@/assets/loading_dna.gif"),
      artCards: [
        {
          title: "I See You",
          imageUrl: require("@/assets/galleryimages/findingDory.jpeg"),
          desc: "",
          id: "img-1"
        },
        {
          title: "Calm",
          imageUrl: require("@/assets/galleryimages/face_calm.jpeg"),
          desc: "",
          id: "img-2"
        },
        {
          title: "Golden Age",
          imageUrl: require("@/assets/galleryimages/gargoyles.jpeg"),
          desc: "",
          id: "img-3"
        },
        {
          title: "Culture",
          imageUrl: require("@/assets/galleryimages/africa.jpeg"),
          desc: "",
          id: "img-4"
        },
        {
          title: "With Age...",
          imageUrl: require("@/assets/galleryimages/kratosBoxed.png"),
          desc: "",
          id: "img-5"
        },
        {
          title: "Bull Horn Taking",
          imageUrl: require("@/assets/galleryimages/face_gorilla.jpeg"),
          desc: "",
          id: "img-6"
        },
        {
          title: "Lilo N' Stich",
          imageUrl: require("@/assets/galleryimages/lilonstitch.jpeg"),
          desc: "",
          id: "img-7"
        }
      ],
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      dialog: false,
      dialogData: null
    }; //end-return
  }, //end-data
  methods: {
    showArtCards() {
      console.log(this.artCards);
    },
    toggleDialog(title) {
      // console.log(
      //   `received title :: [ ${title} ] :: dialog[ ${
      //     this.dialog
      //   } ] :: dialogData[ ${this.dialogData} ]`
      // );
      let filteredCards = this.artCards.filter(function(artCard) {
        return artCard.title == title;
      });
      this.dialogData = filteredCards;
      // console.log(this.dialogData[0].title);
      this.dialog = true;
    }
  }, //end-methods
  mounted() {
    // this.showArtCards();
  }
}; //end-export
</script>

<style scoped></style>
