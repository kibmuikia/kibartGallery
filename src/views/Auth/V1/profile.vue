<template>
  <section>
    <div class="inner">
      <header>
        <h1>Your Profile</h1>
      </header>

      <v-card class="mx-auto" max-width="344">
        <v-card-text>
          <div class="text--primary">
            Your profile information
          </div>
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "profile-view",
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
