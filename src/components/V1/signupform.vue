<template>
  <v-form v-model="valid" id="signupForm" ref="form_signup">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card class="pa-4">
            <p class="text-center headline">
              Fill in the form and submit to register.
            </p>
            <v-card-text>
              <v-text-field
                v-model="nickname"
                label="Nickname"
                :counter="15"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email Address"
                :counter="100"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :counter="20"
              ></v-text-field>

              <v-text-field
                v-model="c_password"
                label="Confirm Password"
                :counter="20"
                class="mb-4"
              ></v-text-field>

              <ImageSelect v-bind:size=0.7 />

            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mx-2"
                @click="signin"
              >
                Sign In
              </v-btn>
              <v-btn small color="error" class="mx-1" @click="reset">
                Reset Form
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-actions>
              <v-btn
                @click="$router.push('/sign-in')"
                class="ma-2"
                text
                color="primary"
                small
                >Have an account, Sign In ></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import ImageSelect from './imageselect.vue';

let SELF;
export default {
  name: "sign-in-form-component",
  title: "",
  components: {
    ImageSelect
  },
  props: {},
  data() {
    return {
      valid: false,
      nickname: null,
      email: null,
      password: null,
      c_password: null
    };
  },
  methods: {
    async signin() {
      console.log("\t processing form");
    },
    reset() {
      console.log("\t resetting form");
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
