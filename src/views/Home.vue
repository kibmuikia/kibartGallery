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
            <a href="#galleries" class="button alt scrolly big">View</a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Gallery -->
    <!-- <section id="galleries">
      <div class="gallery">
        <header class="special">
          <h2>What's New</h2>
        </header>

        <div class="content">
          <div class="media">
            <a href="../assets/images/fulls/01.jpg"
              ><img
                src="../assets/images/thumbs/01.jpg"
                alt=""
                title="This right here is a caption."
            /></a>
          </div>
          <div class="media">
            <a href="../assets/images/fulls/05.jpg"
              ><img
                src="../assets/images/thumbs/05.jpg"
                alt=""
                title="This right here is a caption."
            /></a>
          </div>
          <div class="media">
            <a href="../assets/images/fulls/09.jpg"
              ><img
                src="../assets/images/thumbs/09.jpg"
                alt=""
                title="This right here is a caption."
            /></a>
          </div>
          <div class="media">
            <a href="../assets/images/fulls/02.jpg"
              ><img
                src="../assets/images/thumbs/02.jpg"
                alt=""
                title="This right here is a caption."
            /></a>
          </div>
        </div>

        <footer>
          <a @click="navigateTo('/gallery')" class="button big">Full Gallery</a>
        </footer>
      </div>
    </section> -->

    <hGallery />
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import hGallery from "../components/V1/homeGallery";

let SELF;
export default {
  name: "",
  title: "", // Home | Glorious Delights
  components: {
    hGallery
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
  mounted() {}
};
</script>

<style scoped>
/*.*/
</style>
