<template>
  <section>
    <div class="inner">
      <header>
        <h1>Gallery</h1>
      </header>

      <v-card class="mx-auto" max-width="344">
        <v-card-text>
          <div class="text--primary">
            image preview
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="deep-purple accent-4">
            In Full
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "gallery-all-component",
  title: "", // Home | Glorious Delights
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
/*.*/
</style>
