<template>
  <v-app class="">
    <Nav />

    <v-content>
      <!-- <div class="page-wrap"> -->
      <!-- <section id="main"> -->
      <v-scale-transition origin="center center" mode="out-in">
        <router-view></router-view>
      </v-scale-transition>
      <!-- </section> -->
      <!-- </div> -->
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Nav from "./components/V1/navigation";
import Footer from "./components/V1/footer";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Nav,
    Footer
  },
  data: () => ({
    //
  }),
  mounted() {
    // .
  }
};
</script>

<style>
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
