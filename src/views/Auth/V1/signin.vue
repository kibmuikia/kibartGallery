<template>
  <section>
    <div class="inner">
      <header>
        <h1>Sign In</h1>
      </header>

      <!-- <v-card class="mx-auto" max-width="344">
        <v-card-text>
          <div class="text--primary">
            The Sign In form
          </div>
        </v-card-text>
      </v-card> -->

      <SignInForm />
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import SignInForm from "../../../components/V1/signinform";

let SELF;
export default {
  name: "sign-in-view",
  title: "", // Home | Glorious Delights
  components: {
    SignInForm
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
