<template>
  <v-footer class="grey lighten-2">
    <div class="flex-grow-1"></div>
    <div>&copy; {{ new Date().getFullYear() }}</div>
    <div class="pl-3">Kibuthi Allan</div>
  </v-footer>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "",
  title: "", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      //
    };
  },
  methods: {
    // .
  },
  computed: {},
  watch: {},
  beforeCreate() {
    SELF = this;
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
#footer {
  /* background-color: blueviolet; */
  color: black;
}
</style>
