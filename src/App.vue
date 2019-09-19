<template>
  <v-app class="kibwrap">
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
  }),
  mounted() {
    // .
  }
};
</script>

<style>
.kibwrap {
  /* width: 100%;
  margin: 0 auto; */
}

/* 422423782@qq.com */
/* Htx123654 */
</style>
