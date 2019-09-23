<template>
  <v-navigation-drawer
    v-model="drawer"
    mini-variant
    mini-variant-width="50"
    dark
    permanent
    app
    style=""
  >
    <!-- . -->

    <v-list-item class="mb-2">
      <v-list-item-avatar>
        <v-img src="@/assets/kiblogo.png" class="mt-4 pa-2">
          <!-- src="https://randomuser.me/api/portraits/men/85.jpg" -->
        </v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="(link, index) in navlinks"
        :key="index"
        link
        @click="navigateTo(link.path)"
      >
        <!-- <v-tooltip right color="grey">
          <template v-slot:activator="{ on }"> -->
        <v-list-item-icon>
          <v-icon v-if="link.color" :color="link.color">{{ link.icon }}</v-icon>
          <v-icon v-else>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <!-- </template> -->

        <!-- <span> {{ link.title }} </span>
        </v-tooltip> -->
      </v-list-item>
    </v-list>

    <!-- . -->
  </v-navigation-drawer>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { mapState } from "vuex";

let SELF;
export default {
  name: "navigation-component-v1",
  title: "", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  computed: mapState(["navlinks"]),
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {
    // .
  }
};
</script>

<style scoped>
/*.*/
</style>
