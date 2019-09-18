<template>
  <section>
    <div class="inner">
      <header>
        <h1>Upload Your Artwork</h1>
      </header>

      <UploadForm />
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import UploadForm from "../../../components/V1/uploadform";

let SELF;
export default {
  name: "upload-image-view",
  title: "", // Home | Glorious Delights
  components: {
    UploadForm
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
