<template>
  <section>
    <div class="inner">
      <header>
        <h1>Sign Up</h1>
      </header>

      <SignUpForm />
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import SignUpForm from "../../../components/V1/signupform";

let SELF;
export default {
  name: "sign-up-view",
  title: "", // Home | Glorious Delights
  components: {
    SignUpForm
  },
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
/*.*/
</style>
