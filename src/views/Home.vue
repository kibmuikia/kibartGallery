<template>
  <div>
    <!-- Banner -->
    <section id="banner">
      <div class="inner">
        <h1>Welcome, To KibArt Gallery</h1>
        <p>
          Where creativity reigns supreme
        </p>
        <ul class="actions">
          <li>
            <a href="#homeinfo" class="scrolly kibscrolly">
              <!-- <v-icon>mdi-anchor</v-icon> -->
              Proceed
            </a>
            <!-- <a href="/kibart" class="button alt">View</a> -->
          </li>
        </ul>
      </div>
    </section>

    <v-container fluid>
      <v-row>
        <v-col cols="12" class="mx-auto">
          <v-card>
            <v-card-title>
              <span class="mx-auto">Art</span>
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
              <v-btn
                class="mx-auto"
                text
                color="success"
                to="/about"
                id="homeinfo"
              >
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
      //
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
  }
};
</script>

<style scoped>
/* .kibscrolly {
  ouline: 1px solid white;
  color: green;
} */
</style>
