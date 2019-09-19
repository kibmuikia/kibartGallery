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
          <h1>About</h1>
        </header>

        <v-card max-width="344" class="mx-auto">
          <v-card-title>Kibuthi Muikia</v-card-title>
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

        <v-card max-width="344" class="mt-4 mx-auto">
          <v-card-title>Kibart Gallery</v-card-title>
          <v-card-text class="body-1">
            <p>
              Developed this site as my effort to promote art.
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

        <!-- <p>
          Faucibus parturient mus phasellus vestibulum suspendisse dui vel
          ridiculus nibh diam placerat tellus scelerisque facilisi mus
          vestibulum arcu mus praesent in blandit. Conubia ullamcorper cum
          rhoncus vitae dapibus venenatis integer in donec egestas lacus nibh
          vestibulum habitasse accumsan parturient malesuada sociis auctor
          scelerisque vehicula urna eu proin euismod. Id facilisi suspendisse
          parturient leo mus condimentum natoque scelerisque ullamcorper odio
          tristique ultricies arcu ac condimentum facilisi scelerisque class
          commodo. Scelerisque sagittis magna mi duis iaculis id erat pharetra
          vestibulum condimentum hac suspendisse tempor leo aliquet penatibus
          parturient donec parturient parturient. Vehicula suspendisse sem a
          adipiscing est ad donec ultricies senectus magnis convallis a
          fringilla adipiscing vulputate dui elementum diam ipsum eleifend
          condimentum placerat facilisi viverra mollis scelerisque. Commodo cum
          vestibulum hendrerit sit condimentum at rutrum vulputate scelerisque
          erat convallis himenaeos consequat a hac ultrices nam vel suspendisse
          nascetur dictum vulputate sed at.
        </p>
        <h2>Ultricies Senectus Magnis</h2>
        <p>
          Scelerisque sagittis magna mi duis iaculis id erat pharetra vestibulum
          condimentum hac suspendisse tempor leo aliquet penatibus parturient
          donec parturient parturient. Vehicula suspendisse sem a adipiscing est
          ad donec ultricies senectus magnis convallis a fringilla adipiscing
          vulputate dui elementum diam ipsum eleifend condimentum placerat
          facilisi viverra mollis scelerisque. Commodo cum vestibulum hendrerit
          sit condimentum at rutrum vulputate scelerisque erat convallis
          himenaeos consequat a hac ultrices nam vel suspendisse nascetur dictum
          vulputate sed at.
        </p>-->
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
