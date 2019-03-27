<template>
  <v-layout
    align-center
    justify-center
    row
    text-xs-center
    wrap
    class="landingView"
  >
    <!-- <v-flex xs12 md12>

    </v-flex> -->

    <v-flex xs12 md12 mb-4>
      <v-img
        :src="require('../assets/A.svg')"
        class=""
        contain
        height="200"
      ></v-img>
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome to KibArt Gallery
      </h1>
      <p class="subheading font-weight-regular pa-2">
        I am showcasing samples of art pieces,
        <br />that I have done over time.
        <!-- <a href="https://community.vuetifyjs.com" target="_blank"
          >Discord Community</a> -->
        <br />
        <v-btn v-on:click="viewGallery">
          View Gallery
        </v-btn>
      </p>
    </v-flex>

    <!-- <v-flex mb-5 xs12>
      <h2 class="headline font-weight-bold mb-3">What's next?</h2>

      <v-layout justify-center>
        <a
          v-for="(next, i) in whatsNext"
          :key="i"
          :href="next.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ next.text }}
        </a>
      </v-layout>
    </v-flex>

    <v-flex xs12 mb-5>
      <h2 class="headline font-weight-bold mb-3">Important Links</h2>

      <v-layout justify-center>
        <a
          v-for="(link, i) in importantLinks"
          :key="i"
          :href="link.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ link.text }}
        </a>
      </v-layout>
    </v-flex>

    <v-flex xs12 mb-5>
      <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

      <v-layout justify-center>
        <a
          v-for="(eco, i) in ecosystem"
          :key="i"
          :href="eco.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ eco.text }}
        </a>
      </v-layout>
    </v-flex> -->
  </v-layout>
</template>

<script>
// eslint-disable-next-line
import utils from "@/utils/V1";

export default {
  name: "landing-view-component",
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuetifyjs.com"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  }), //end-data
  methods: {
    viewGallery() {
      // utils.showAlert("Information", "Gallery under development.", "info");
      this.$router.push("/gallery");
    } //end-viewGallery
    // navigateTo(path) {
    //   viewGallery() {
    //   // eslint-disable-next-line
    //   // console.log(path);
    //   this.$router.push(path);
    // }
  }
};
</script>

<style scoped>
/*.*/
</style>
