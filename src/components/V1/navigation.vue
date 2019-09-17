<template>
  <nav id="nav">
    <ul>
      <li>
        <a class="active" @click="navigateTo('/')">
          <span class="icon fa-home"></span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon fa-camera-retro"></span>
        </a>
      </li>
      <li>
        <a @click="navigateTo('/about')">
          <span class="icon fa-file-text-o"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "navigation-component-v1",
  title: "", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      //
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
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
/*.*/
</style>
