<template>
  <div class="pagepreloader overlay">
    <!-- v-if="toggleFlag" v-on:click="toggleFlag" v-bind:class="{ active: flag }" v-on:click="" v-if="flag"-->
    <!-- <div class="fingerprint-spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div> -->
    <div class="swapping-squares-spinner">
      <!-- :style="spinnerStyle" -->
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
  </div>
</template>

<script>
// To use minified css and js files instead of .vue single file components:
// import "epic-spinners/dist/lib/epic-spinners.min.css";
// import { FingerprintSpinner } from "epic-spinners/dist/lib/epic-spinners.min.js";

export default {
  name: "page-preloader-component",
  components: {}, //end-components
  data() {
    return {
      // viewPreloaderFlag: this.$store.state.viewPreloaderFlag,
      // flag: true
      // flag: this.$store.getters.viewPreloaderFlag
    }; //end-return
  }, //end-data
  methods: {
    // toggleFlag() {
    //   this.flag = !this.flag;
    //   // eslint-disable-next-line
    //   console.log(`clicked : ${this.flag}`);
    //   return this.flag;
    // }
  } //end-methods
}; //end-export
</script>

<style scoped>
/*.*/
.overlay {
  position: fixed; /* Sit on top of the page content */
  /*Hidden by default*/
  /*display: none; */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    255,
    253,
    208,
    0.4
  ); /* current-color--cream, Black background with opacity */
  z-index: 499; /* Specify a stack order in case you're using a different order for other elements */
}

.swapping-squares-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  /*font-size: 50px;*/
  /*color: white;*/
  /*display: block;*/
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer; /*Add a pointer on hover*/
}

.swapping-squares-spinner,
.swapping-squares-spinner * {
  box-sizing: border-box;
}

.swapping-squares-spinner {
  height: 65px;
  width: 65px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.swapping-squares-spinner .square {
  height: calc(65px * 0.25 / 1.3);
  width: calc(65px * 0.25 / 1.3);
  animation-duration: 1000ms;
  border: calc(65px * 0.04 / 1.3) solid #ff1d5e;
  margin-right: auto;
  margin-left: auto;
  position: absolute;
  animation-iteration-count: infinite;
}

.swapping-squares-spinner .square:nth-child(1) {
  animation-name: swapping-squares-animation-child-1;
  animation-delay: 500ms;
}

.swapping-squares-spinner .square:nth-child(2) {
  animation-name: swapping-squares-animation-child-2;
  animation-delay: 0ms;
}

.swapping-squares-spinner .square:nth-child(3) {
  animation-name: swapping-squares-animation-child-3;
  animation-delay: 500ms;
}

.swapping-squares-spinner .square:nth-child(4) {
  animation-name: swapping-squares-animation-child-4;
  animation-delay: 0ms;
}

@keyframes swapping-squares-animation-child-1 {
  50% {
    transform: translate(150%, 150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-2 {
  50% {
    transform: translate(-150%, 150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-3 {
  50% {
    transform: translate(-150%, -150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-4 {
  50% {
    transform: translate(150%, -150%) scale(2, 2);
  }
}

/*/*.fingerprint-spinner,
.fingerprint-spinner * {
  box-sizing: border-box;
}

.fingerprint-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  /*font-size: 50px;*/
/*color: white;*/
/*display: block;*/
/*transform: translate(-50%, -50%);*/
/*-ms-transform: translate(-50%, -50%);*/
/*cursor: pointer;  Add a pointer on hover */
/*}*/

/*.fingerprint-spinner {
  height: 64px;
  width: 64px;
  padding: 2px;
  overflow: hidden;
  position: relative;
}*/

/*.fingerprint-spinner .spinner-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #ff1d5e;
  animation: fingerprint-spinner-animation 1500ms
    cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}*/

/*.fingerprint-spinner .spinner-ring:nth-child(1) {
  height: calc(60px / 9 + 0 * 60px / 9);
  width: calc(60px / 9 + 0 * 60px / 9);
  animation-delay: calc(50ms * 1);
}

.fingerprint-spinner .spinner-ring:nth-child(2) {
  height: calc(60px / 9 + 1 * 60px / 9);
  width: calc(60px / 9 + 1 * 60px / 9);
  animation-delay: calc(50ms * 2);
}

.fingerprint-spinner .spinner-ring:nth-child(3) {
  height: calc(60px / 9 + 2 * 60px / 9);
  width: calc(60px / 9 + 2 * 60px / 9);
  animation-delay: calc(50ms * 3);
}

.fingerprint-spinner .spinner-ring:nth-child(4) {
  height: calc(60px / 9 + 3 * 60px / 9);
  width: calc(60px / 9 + 3 * 60px / 9);
  animation-delay: calc(50ms * 4);
}

.fingerprint-spinner .spinner-ring:nth-child(5) {
  height: calc(60px / 9 + 4 * 60px / 9);
  width: calc(60px / 9 + 4 * 60px / 9);
  animation-delay: calc(50ms * 5);
}

.fingerprint-spinner .spinner-ring:nth-child(6) {
  height: calc(60px / 9 + 5 * 60px / 9);
  width: calc(60px / 9 + 5 * 60px / 9);
  animation-delay: calc(50ms * 6);
}

.fingerprint-spinner .spinner-ring:nth-child(7) {
  height: calc(60px / 9 + 6 * 60px / 9);
  width: calc(60px / 9 + 6 * 60px / 9);
  animation-delay: calc(50ms * 7);
}

.fingerprint-spinner .spinner-ring:nth-child(8) {
  height: calc(60px / 9 + 7 * 60px / 9);
  width: calc(60px / 9 + 7 * 60px / 9);
  animation-delay: calc(50ms * 8);
}

.fingerprint-spinner .spinner-ring:nth-child(9) {
  height: calc(60px / 9 + 8 * 60px / 9);
  width: calc(60px / 9 + 8 * 60px / 9);
  animation-delay: calc(50ms * 9);
}*/

/*@keyframes fingerprint-spinner-animation {
  100% {
    transform: rotate(360deg);
  }
}*/
</style>
