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
    style=""
  >
    <v-card flat style="transform:translateY(-20%);" :color="color">
      <v-card-text>
        {{ information }}
        <v-btn color="grey lighten-1" icon @click="show = false" class="my-2">
          <v-icon class="pa-1" color="grey darken-3">close</v-icon>
          <!-- grey darken-2 -->
        </v-btn>
      </v-card-text>
    </v-card>
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
.kibcard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  /*background: red;*/
  width: auto;
  border-radius: 6px;
}
.kibcard {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
