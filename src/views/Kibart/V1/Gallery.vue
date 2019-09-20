<template>
  <section>
    <div class="inner">
      <header>
        <h1 class="kibtitle2">Kibart Gallery</h1>
      </header>

      <Gallery />
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Gallery from "../../../components/V1/gallery.vue";

let SELF;
export default {
  name: "kibart-Gallery-view",
  title: "Kibart Gallery",
  components: {
    Gallery
  },
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
/*.*/
</style>
