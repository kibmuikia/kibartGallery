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
    <!-- <v-flex xs12 text-xs-center>
      <h2>All the about information shall be placed here.</h2>
    </v-flex> -->

    <v-flex xs12 md3>
      <v-card elevation="5" color="grey lighten-1">
        <v-img
          :src="require('../assets/art-3-kibart.png')"
          height="200"
        ></v-img>

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
          :src="require('../assets/art-1-whatever.jpg')"
          height="200"
        ></v-img>
        <!-- src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" -->

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
        <v-img :src="require('../assets/art-2-honey.jpg')" height="200"></v-img>

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
export default {
  name: "about-view",
  data() {
    return {
      show: false,
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  } //end-data
}; //end-export
</script>

<style scoped>
/*.*/
</style>
