<!-- <template>
  <v-footer app height="auto" inset>
    <v-container fluid class="pa-2">
      <v-layout justify-center row wrap>
        <v-flex xs5 md1>
          <span class="body-1">&copy; 2019</span>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs5 md3>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs12 md4>
              <h4 class="subheading">Developed by:</h4>
            </v-flex>
            <v-flex xs12 md4 class="">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    href="https://www.twitter.com/muikiaallan"
                    target="_blank"
                    small
                    flat
                    color="blue"
                    v-on="on"
                    class="pa-1"
                  >
                    M.Allan
                  </v-btn>
                </template>
                <span>Twitter Link, Muikia Allan</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template> -->

<template>
  <v-footer class="footer" dark height="auto">
    <v-layout class="" justify-center column>
      <v-flex xs12 md12>
        <v-card flat tile class="text-xs-center">
          <v-card-text>
            <v-btn
              href="https://www.twitter.com/muikiaallan"
              target="_blank"
              icon
              class="light-blue lighten-2"
            >
              <font-awesome-icon
                :icon="{ prefix: 'fab', iconName: 'twitter' }"
              ></font-awesome-icon>
            </v-btn>
          </v-card-text>

          <!-- <v-card-text class="">
            <p class="subheading">
              “Art enables us to find ourselves and lose ourselves at the same
              time.”
              <br />
              - Thomas Merton
            </p>
          </v-card-text> -->

          <v-divider></v-divider>

          <v-card-text class="">
            <v-layout align-center justify-center row fill-height>
              <v-flex xs3 md2>
                <span class="body-1"> &copy;2019</span>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs7 md3>
                <span class="body-1">
                  Developed by: Muikia Allan
                </span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: "main-footer-component",
  data() {
    return {
      // .
    }; //end-return
  }, //end-data
  methods: {
    //func
  } //end-methods
};
</script>

<style scoped></style>
