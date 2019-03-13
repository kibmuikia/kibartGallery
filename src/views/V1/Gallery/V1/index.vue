<template>
  <v-layout app wrap align-center fill-height row class="">
    <!-- align-center justify-space-around row fill-height wrap light-blue lighten-4 -->
    <v-flex xs12 md12 text-xs-center class="black--text">
      <!-- green lighten-2 -->
      <!-- <h2 class="py-2">Gallery</h2> -->
      <v-layout align-center justify-space-around row fill-height wrap>
        <!-- . -->
        <v-flex
          v-for="artCard in artCards"
          :key="artCard.title"
          xs12
          md4
          my-3
          mx-1
        >
          <v-card light max-width="400" hover>
            <v-img :src="artCard.imageUrl" height="200"></v-img>
            <!-- :src="" src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="1.60"-->

            <v-card-text class="pt-2 pb-0">
              <!-- <h3 class="headline mb-0">Kangaroo Valley Safari</h3> -->

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
              <!-- <div>{{ card_text }}</div> -->
            </v-card-text>

            <v-card-actions class="">
              <!-- <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>-->
              <!-- <v-btn icon color="green">
                <v-icon>home</v-icon>
              </v-btn> -->
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
                  <network network="facebook" class="shareIconWrap mx-2">
                    <!-- <i class="fa fa-facebook"></i> Facebook -->
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'facebook' }"
                    ></font-awesome-icon>
                    <!-- Facebook -->
                  </network>
                  <network network="pinterest" class="shareIconWrap mx-2">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'pinterest' }"
                    ></font-awesome-icon>
                  </network>
                  <!-- <network network="telegram" class="shareIconWrap">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'telegram' }"
                    ></font-awesome-icon>
                  </network> -->
                  <network network="twitter" class="shareIconWrap mx-2">
                    <font-awesome-icon
                      :icon="{ prefix: 'fab', iconName: 'twitter' }"
                    ></font-awesome-icon>
                  </network>
                  <!-- <network network="whatsapp" class="shareIconWrap">
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
export default {
  name: "gallery-component",
  data() {
    return {
      artCards: [
        {
          title: "I See You",
          imageUrl: require("@/assets/galleryimages/findingDory.jpeg"),
          desc: ""
        },
        {
          title: "Culture",
          imageUrl: require("@/assets/galleryimages/africa.jpeg"),
          desc: ""
        },
        {
          title: "Golden Age",
          imageUrl: require("@/assets/galleryimages/gargoyles.jpeg"),
          desc: ""
        },
        {
          title: "With Age...",
          imageUrl: require("@/assets/galleryimages/kratosBoxed.png"),
          desc: ""
        },
        {
          title: "Lilo N' Stich",
          imageUrl: require("@/assets/galleryimages/lilonstitch.jpeg"),
          desc: ""
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
      // eslint-disable-next-line
      console.log(this.artCards);
    },
    toggleDialog(title) {
      // eslint-disable-next-line
      // console.log(
      //   `received title :: [ ${title} ] :: dialog[ ${
      //     this.dialog
      //   } ] :: dialogData[ ${this.dialogData} ]`
      // );
      let filteredCards = this.artCards.filter(function(artCard) {
        return artCard.title == title;
      });
      this.dialogData = filteredCards;
      // eslint-disable-next-line
      // console.log(this.dialogData[0].title);
      this.dialog = true;
    }
  }, //end-methods
  mounted() {
    // this.showArtCards();
  }
}; //end-export
</script>

<style scoped>
.shareIconWrap {
  /*margin-left: 20px;
  margin-right: 20px;
  background-color: blue !important;*/
}
</style>
