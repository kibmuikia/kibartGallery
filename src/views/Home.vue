<template>
  <div>
    <!-- Banner -->
    <section id="banner">
      <div class="inner">
        <h1 class="kibtitle2 animated slideInUp kibAni">
          Welcome, To KibArt Gallery
        </h1>
        <p class="animated slideInUp kibAni">
          Sharing the love for art 🙂
        </p>
        <ul class="actions animated slideInUp kibAni" style="list-style: none;">
          <li>
            <a class="" @click="$vuetify.goTo(target, options)">
              <!-- class="scrolly" -->
              Proceed
            </a>
          </li>
        </ul>
      </div>
    </section>

    <v-container fluid>
      <v-row>
        <v-col cols="12" class="mx-auto">
          <v-card>
            <v-card-title>
              <span class="mx-auto kibtitle2">Art</span>
            </v-card-title>
            <v-card-text>
              <p class="body-1 text-center">
                "To me, Art is an expression of one’s personal emotions that
                cannot be confined to one definition. It takes on endless forms
                and can be interpreted in multiple ways through diverse
                perspectives. It can range from a performance to a painting to
                even a landscape. It’s a therapeutic form of release that does
                not necessarily need words."
                <br />
                - <strong>Avery Singer</strong> .
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="mx-auto"
                text
                color="primary"
                to="/kibart"
                id="homeinfo"
              >
                To Gallery
              </v-btn>
              <v-btn class="mx-auto" text color="success" to="/about">
                About Me
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- <hGallery /> -->
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// import hGallery from "../components/V1/homeGallery";
// import utils from "@/utils/V1";

let SELF;
export default {
  name: "",
  title: "Home | Kibart Gallery", // Home | Glorious Delights
  components: {
    // hGallery
  },
  props: {},
  data() {
    return {
      target: "#homeinfo",
      options: {
        duration: 400,
        // offset: -100,
        easing: "easeInQuad"
      }
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {
    // utils.showAlert("Information", "Site Currently Under Construction", "");
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.kibAni {
  animation-duration: 1.75s;
  /* animation-delay: 2s; */
  /* animation-iteration-count: infinite; */
}
</style>
