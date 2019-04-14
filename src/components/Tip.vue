<template>
  <v-snackbar
    v-model="show"
    multi-line
    right
    top
    vertical
    color="white"
    class="black--text"
  >
    <!-- :timeout="timeout" -->
    <!-- :left="x === 'left'" :bottom="y === 'bottom'" :vertical="mode === 'vertical'" -->
    {{ information }}
    <v-btn color="pink" flat @click="show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "tip-information-component",
  props: ["information", "show"],
  data() {
    return {
      // timeout: 3000,
      // snackbar: false,
      // y: "top",
      // x: null,
      mode: ""
    };
  },
  watch: {
    show: function() {
      // .
    }
  },
  created() {
    // .
  }
};
</script>

<style scoped>
/*.*/
</style>
