<template>
  <div app>
    <!-- <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar> -->

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-img
        :src="require('../assets/think.svg')"
        class="mt-4"
        contain
        height="100"
      ></v-img>
      <!-- . -->
      <v-list>
        <v-list-tile @click="navigateTo('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigateTo('/gallery')">
          <v-list-tile-action>
            <!-- <v-icon>pageview</v-icon> -->
            <font-awesome-icon icon="pencil-alt" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Gallery</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigateTo('/about')">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- . -->
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>KibArt</span>
        <span class="font-weight-light">Gallery</span>
      </v-toolbar-title>
    </v-toolbar>
    <!-- . -->
  </div>
</template>

<script>
export default {
  name: "main-toolbar-component",
  data() {
    return {
      drawer: false
    }; //end-return
  }, //end-data
  methods: {
    navigateTo(path) {
      // eslint-disable-next-line
      // console.log(path);
      this.drawer = !this.drawer;
      this.$router.push(path);
    }
  } //end-methods
};
</script>

<style scoped></style>
