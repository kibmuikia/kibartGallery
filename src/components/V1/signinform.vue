<template>
  <v-form v-model="valid" id="signinForm" ref="form_signin">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card class="pa-4">
            <p class="text-center headline">
              Enter your credentials
            </p>
            <v-card-text>
              <v-text-field
                v-model="nickname"
                label="Nickname"
                :counter="15"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :counter="20"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col col="6">
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mx-2"
                    @click="signin"
                  >
                    Sign In
                  </v-btn>
                </v-col>

                <v-col col="6">
                  <v-btn small color="error" class="mx-1" @click="reset">
                    Reset Form
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-actions>
              <v-btn
                @click="$router.push('/sign-up')"
                text
                class="ml-4 my-2"
                color="secondary"
                small
                >No Account,<br />
                Sign Up ></v-btn
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

let SELF;
export default {
  name: "sign-in-form-component",
  title: "", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      valid: false,
      nickname: null,
      password: null
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
