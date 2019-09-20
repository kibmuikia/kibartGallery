<template>
  <!-- <div class="about">
    <h1>This is an about page</h1>
  </div> -->

  <div>
    <!-- Header -->
    <!-- <header id="header">
      <div>KibArt Gallery <span>by Kibuthi Allan</span></div>
    </header> -->

    <!-- Section -->
    <section>
      <div class="inner">
        <header>
          <h1 class="kibtitle2">About</h1>
        </header>

        <v-card max-width="360" class="mx-auto">
          <v-card-title>
            <span class="mx-auto kibtitle"> Kibuthi Muikia </span>
          </v-card-title>
          <v-card-text class="body-1">
            <p>
              I am a self taught pencil artist.
            </p>
            <p>
              Art is simply epic!
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="success"
              href="https://instagram.com/kibmuikia"
              class="mx-auto"
              target="_blank"
            >
              View Instagram
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card max-width="360" class="mt-4 mx-auto mb-2">
          <v-card-title>
            <span class="mx-auto kibtitle"> Kibart Gallery </span>
          </v-card-title>
          <v-card-text class="body-1">
            <p>
              Developed this site as my effort to promote the love for art.
            </p>
            <p>
              All are welcome
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" to="/kibart" class="mx-auto">
              Gallery
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "about-view",
  title: "About | Kibart Gallery", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      //
    };
  },
  methods: {
    // .
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
/* . */
</style>
