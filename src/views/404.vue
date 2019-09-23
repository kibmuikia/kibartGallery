<template>
  <!-- . -->

  <section>
    <div class="inner">
      <!-- . -->
      <header>
        <h1 class="kibtitle2 animated slideInRight">Page Not Found</h1>
      </header>

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
            <!-- . -->
            <v-card class="mx-auto animated slideInUp">
              <v-card-title>
                <span class="mx-auto kibtitle"> Warning ! </span>
              </v-card-title>
              <v-card-text class="body-1">
                <p>
                  The page you have entered does not exist.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn text to="/" color="primary" class="mx-auto">
                  Back Home
                </v-btn>
              </v-card-actions>
            </v-card>
            <!-- . -->
          </v-col>
        </v-row>
      </v-container>
      <!-- . -->
    </div>
  </section>

  <!-- . -->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "page-not-found-view",
  title: "Page Not Found | Kibart",
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
