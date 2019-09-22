<template>
  <div>
    <!-- Section -->
    <section>
      <div class="inner">
        <header>
          <h1 class="kibtitle2 animated slideInRight">About</h1>
        </header>

        <v-container fluid>
          <v-row>
            <!-- .  max-width="360" -->
            <v-col cols="12" md="6" class="mx-auto">
              <v-card class="mx-auto animated fadeInLeft">
                <v-card-title>
                  <span class="mx-auto kibtitle"> Kibuthi Allan </span>
                </v-card-title>
                <v-card-text class="body-1">
                  <p>
                    I am a self taught artist, currently using pencil as my
                    tool. I love art and the creative industry, general.
                  </p>
                  <p>
                    From its simplest to most complex form, Art is simply
                    epic🤯😄!
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="success"
                    href="https://instagram.com/kibmuikia"
                    class="mx-auto"
                    target="_blank"
                  >
                    View Instagram
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <!-- . max-width="360" -->
            <v-col cols="12" md="6" class="mx-auto">
              <v-card class="mx-auto animated fadeInRight">
                <v-card-title>
                  <span class="mx-auto kibtitle"> Kibart Gallery </span>
                </v-card-title>
                <v-card-text class="body-1">
                  <p>
                    This gallery, developed by me, showcases my artwork. It also
                    aims to promote the love and appreciation for art🎨 and the
                    creative industry.
                  </p>
                  <p>
                    All are welcome, Enjoy 😄
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary" to="/kibart" class="mx-auto">
                    Gallery
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <!-- . -->

            <v-col cols="12" class="mx-auto">
              <v-card class="animated fadeInUp">
                <v-card-title class="kibtitle">
                  <span class="mx-auto">
                    Need An Application Developed?
                  </span>
                </v-card-title>

                <v-card-text>
                  <p>
                    My Skills
                  </p>
                  <v-row justify="center" class="px-1">
                    <v-expansion-panels inset>
                      <!-- . -->
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          Web Development
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!-- . -->
                          <v-list-item
                            v-for="(skill, index) in webskills"
                            :key="index"
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ skill.type }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <v-progress-linear :value="skill.level">
                                </v-progress-linear>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <!-- . -->
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- . -->
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          Mobile Application
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!-- . -->
                          <v-list-item
                            v-for="(skill, index) in mobileskills"
                            :key="index"
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ skill.type }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <v-progress-linear :value="skill.level">
                                </v-progress-linear>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <!-- . -->
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <!-- . -->
                    </v-expansion-panels>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="primary"
                    class="mx-auto"
                    target="_blank"
                    href="mailto:muikiaa@gmail.com?subject=Enquiry"
                  >
                    Email Me
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- . -->
          </v-row>
        </v-container>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

let SELF;
export default {
  name: "about-view",
  title: "About | Kibart Gallery", // Home | Glorious Delights
  components: {},
  props: {},
  data() {
    return {
      webskills: [
        {
          type: "HTML5",
          level: 95
        },
        {
          type: "JavaScript",
          level: 80
        },
        {
          type: "CSS3",
          level: 70
        },
        {
          type: "VueJs",
          level: 80
        },
        {
          type: "Django",
          level: 85
        },
        {
          type: "Laravel",
          level: 70
        }
      ],
      mobileskills: [
        {
          type: "Flutter",
          level: 70
        },
        {
          type: "Android",
          level: 50
        }
      ]
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
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
/* . */
</style>
