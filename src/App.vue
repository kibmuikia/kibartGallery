<template>
  <v-app>
    <Nav />

    <v-content>
      <!-- <div class="page-wrap"> -->
      <!-- <section id="main"> -->
      <router-view></router-view>
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
  })
};
</script>
