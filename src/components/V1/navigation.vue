<template>
  <!-- <nav id="nav">
    <ul>
      <li>
        <a class="active" @click="navigateTo('/')">
          <span class="icon fa-home"></span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon fa-camera-retro"></span>
        </a>
      </li>
      <li>
        <a @click="navigateTo('/about')">
          <span class="icon fa-file-text-o"></span>
        </a>
      </li>
    </ul>
  </nav> -->

  <v-navigation-drawer
    v-model="drawer"
    mini-variant
    mini-variant-width="60"
    dark
    permanent
    app
  >
    <!-- . -->

    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg" class="mt-4"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="(link, index) in navlinks" :key="index" link>
        <v-list-item-icon @click="navigateTo(link.path)">
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
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
