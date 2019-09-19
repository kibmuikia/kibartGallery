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
  title: "Home | Kibart Gallery", // Home | Glorious Delights
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
