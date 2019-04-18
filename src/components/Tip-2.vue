<template>
  <v-snackbar
    v-model="showValue"
    multi-line
    right
    top
    vertical
    :color="color"
    class="black--text"
    :timeout="timeout"
  >
    {{ information }}
    <v-btn color="pink" flat @click="show = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
/* eslint-disable no-console */
import { serverBus } from "@/main";
export default {
  name: "tip-information-component-v2",
  props: ["information", "show", "color"],
  data() {
    return {
      timeout: 3500,
      showValue: ""
    };
  },
  watch: {
    show: function() {
      // console.log(`show, updated to [ ${this.show} ]`);
      return (this.showValue = this.show);
    },
    showValue: function() {
      // console.log(`showValue, updated to [ ${this.showValue} ]`);
      if (this.showValue === false) {
        // console.log("\tresetTip event");
        serverBus.$emit("resetTip");
      }
    }
  },
  computed: {
    // .
  }, //end-computed
  created() {
    // .
  }
};
</script>

<style scoped>
/*.*/
</style>
