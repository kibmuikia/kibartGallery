<template>
  <v-form v-model="valid" id="uploadForm" ref="form_upload">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card class="pa-4">
            <p class="text-center body-1">
              Use the form provided.
            </p>
            <v-card-text>
              <v-text-field
                v-model="art.title"
                label="Title"
                :counter="15"
              ></v-text-field>

              <ImageSelect v-bind:size="2" />
            </v-card-text>
            <v-card-actions>
              <v-row>

                <v-col col="6" class="">
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mx-2"
                    @click="upload"
                  >
                    Upload
                  </v-btn>
                </v-col>

                <v-col col="6" class=""> 
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
                @click="$router.push('/your-artwork')"
                class="ma-2"
                text
                color="primary"
                small
                >See your artwork
              </v-btn>
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

import ImageSelect from "./imageselect.vue";

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
      art: {
        title: null,
        description: null,
        image: null
      }
    };
  },
  methods: {
    async upload() {
      console.log("\t processing upload");
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
