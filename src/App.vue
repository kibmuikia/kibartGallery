<template>
  <v-app class="">
    <!-- . -->

    <Nav />

    <v-content>

      <v-scale-transition origin="center center" mode="out-in">
        <router-view></router-view>
      </v-scale-transition>

    </v-content>

    <Footer />

    <!-- . -->
  </v-app>
</template>

<script>
import Nav from "./components/V1/navigation";
import Footer from "./components/V1/footer";

// let SELF;
export default {
  name: "App",
  components: {
    Nav,
    Footer
  },
  data: () => ({
    //
  }),
  methods: {
    // .
  },
  beforeCreate() {
    // SELF = this;
  },
  created() {
    // .
  },
  mounted() {
    // .
  }
};
</script>

<style>
@import './assets/css/kibmain.css';

.kibtitle {
  font-family: "Indie Flower", cursive;
  font-size: 1.35em;
}
.kibtitle2 {
  font-family: "Barrio", cursive;
  font-size: 2em;
  letter-spacing: 0.2em;
}
.kibtitle3 {
  font-family: "Caesar Dressing", cursive;
  font-size: 2em;
  letter-spacing: 0.2em;
}
</style>
