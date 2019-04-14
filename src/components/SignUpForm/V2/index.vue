<template>
  <v-layout column align-center justify-center class="">
    <v-flex xs12 class="pa-2">
      <h4 class="subheading text-xs-center">Artist Sign Up Form</h4>
    </v-flex>
    <v-flex xs12 class="">
      <p
        class="subheading text-xs-center light-blue--text text--lighten-2 py-2"
        v-if="status"
      >
        {{ status }}
      </p>
      <v-form
        v-model="valid"
        id="form-sign-up"
        ref="formSignUp"
        @submit.prevent="processForm"
        enctype="multipart/form-data"
      >
        <!-- . form-Start -->
        <v-stepper v-model="e6" vertical>
          <!-- . -->
          <v-stepper-step :complete="e6 > 1" step="1">
            Provide your details
            <small class="green--text text--accent-2">
              all are required
            </small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-card color="" class="" height="">
              <v-card-text>
                <v-layout row wrap align-center justify-space-around>
                  <v-flex xs12 md5>
                    <v-text-field
                      v-model="user.displayname"
                      label="Display Name"
                      :rules="rules.nameRules"
                      required
                      ref="userNameInput"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md5>
                    <v-text-field
                      v-model="user.email"
                      type="email"
                      label="E-mail"
                      :rules="rules.emailRules"
                      required
                      ref="userEmailInput"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md5>
                    <v-text-field
                      v-model="user.password"
                      label="Password"
                      :rules="rules.passwordRules"
                      required
                      type="password"
                      ref="userPasswordInput"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md5>
                    <v-text-field
                      v-model="user.confirm_password"
                      label="Confirm Password"
                      :rules="rules.passwordRules"
                      required
                      type="password"
                      ref="userPasswordConfirmInput"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-btn color="primary" @click="checkStepOne">Proceed</v-btn>
            <!-- <v-btn flat>Cancel</v-btn> e6 = 2 -->
          </v-stepper-content>
          <v-stepper-step :complete="e6 > 2" step="2">
            Choose your profile picture
            <small class="green--text text--accent-2">
              A picture is required !
            </small>
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card>
              <v-card-text>
                <v-layout row wrap align-center>
                  <v-flex xs12 md12>
                    <ImageInput ref="userphoto" />
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-btn flat icon color="warning" @click="e6 = 1">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn color="primary" @click="checkStepTwo">Proceed</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Write something about yourself
            <small class="green--text text--accent-2">
              description is required
            </small>
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card>
              <v-card-text>
                <v-layout row wrap align-center justify-center>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="user.about"
                      label="About You"
                      :rules="rules.aboutRules"
                      required
                      ref="userAboutInput"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <!-- <v-card-actions>
                <v-layout row wrap align-center justify-space-around>
                  <v-flex xs12 class="">

                  </v-flex>
                </v-layout>
              </v-card-actions> -->
            </v-card>
            <!-- <v-btn color="primary" @click="e6 = 4">Continue</v-btn> -->
            <!-- <v-btn flat>Cancel</v-btn> -->
            <v-btn flat icon color="warning" @click="e6 = 2">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn color="primary" type="submit" :loading="loadingflag">
              Register
            </v-btn>
            <!-- <v-btn @click="resetForm" color="warning">
              Reset Form
            </v-btn> -->
          </v-stepper-content>
          <!-- . -->
        </v-stepper>
        <!-- . form-End -->
      </v-form>
      <v-btn small @click="navigateTo('/auth/artist/signin')">
        Have an account?
        <v-icon color="green">keyboard_arrow_right</v-icon> Sign In
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import ImageInput from "@/components/ImageInput/V1/";
import utils from "@/utils/V1";
import { serverBus } from "@/main";
import fire from "@/fire/V1";

export default {
  name: "sign-up-v2-component",
  components: {
    ImageInput
  },
  data() {
    return {
      valid: null,
      e6: 1,
      user: {
        displayname: "",
        email: "",
        password: "",
        confirm_password: "",
        photo: null,
        about: ""
      },
      rules: {
        nameRules: [
          v => !!v || "Display Name is required",
          v => v.length <= 50 || "Display Name must be less than 50 characters",
          v => v.length >= 3 || "Display Name must be more than 3 characters"
        ],
        aboutRules: [
          v => !!v || "Please provide a short description about yourself",
          v =>
            v.length <= 250 || "Display Name must be less than 250 characters"
        ],
        emailRules: [
          v => !!v || "Email is required",
          v =>
            /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
              v
            ) || "E-mail must be valid"
        ],
        passwordRules: [
          v => !!v || "Password is required",
          v =>
            v.length >= 6 ||
            "Password must be equal to or more than 6 characters"
        ]
      },
      loadingflag: false,
      status: ""
    }; //end-return
  }, //end-data
  methods: {
    checkStepOne() {
      let msg = "";
      if (!this.$refs.userNameInput.validate()) {
        this.$refs.userNameInput.focus();
        msg = "Ensure display name is valid";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else if (this.user.password !== this.user.confirm_password) {
        this.$refs.userPasswordConfirmInput.focus();
        msg = "Ensure both passwords are the same";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else if (!this.$refs.userEmailInput.validate()) {
        // !this.$refs.formSignUp.validate() userPasswordConfirmInput
        this.$refs.userEmailInput.focus();
        msg = "Ensure email is valid";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else if (!this.$refs.userPasswordInput.validate()) {
        this.$refs.userPasswordInput.focus();
        msg = "Ensure password is valid";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else if (!this.$refs.userPasswordConfirmInput.validate()) {
        this.$refs.userPasswordConfirmInput.focus();
        msg = "Ensure confirm-password is valid";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else {
        msg = `You, [ ${
          this.$refs.userNameInput.value
        } ], may proceed to select your profile picture!`;
        this.status = msg;
        this.e6 = 2;
      }
    }, //end-checkStepOne
    checkStepTwo() {
      // e6 = 3 this.$refs.userNameInput.value userphoto
      let msg = "";
      if (this.user.photo === null) {
        msg = "Ensure you have selected ONE picture";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else {
        msg = `You, [ ${
          this.$refs.userNameInput.value
        } ], may proceed to provide a short description about yourself!`;
        this.status = msg;
        this.e6 = 3;
      }
    }, //end-checkStepTwo
    processForm() {
      let msg = "";
      if (!this.$refs.userAboutInput.validate()) {
        this.$refs.userAboutInput.focus();
        msg = "Ensure your description is valid";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else {
        // .
        this.loadingflag = true;
        let self = this;
        let uname = this.user.displayname.replace(/\s+/g, "").toLowerCase();
        fire.auth
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(data => {
            if (data.user) {
              let user = data.user;
              console.log(user);
              let uid = user.uid;
              let pic = self.user.photo[0];
              let filename = pic.name;
              filename = filename.split(".");
              filename = `${uname}.${filename[1]}`;
              let picurl = "";
              // Create a root reference
              let storageRef = fire.storage.ref();
              // Create a reference to 'users/usernameID/imagename.extension[jpg,png,gif]'
              let usersPhotoRef = storageRef.child(`users/${uid}/${filename}`);

              usersPhotoRef
                .put(pic)
                .then(snapshot => {
                  if (snapshot.state === "success") {
                    picurl = snapshot.ref.location.path;
                    if (picurl) {
                      user
                        .updateProfile({
                          displayName: self.user.displayname,
                          photoURL: picurl
                        })
                        .then(() => {
                          fire.db
                            .collection("users")
                            .add({
                              userName: self.user.displayname,
                              userPhoto: picurl,
                              userEmail: self.user.email,
                              userAbout: self.user.about,
                              userID: uid
                            })
                            .then(docRef => {
                              console.log(
                                "Document written with ID: ",
                                docRef.id
                              );
                              console.log(`updateProfile process DONE!`);
                            })
                            .catch(err => {
                              console.error(
                                "Error adding User-document: ",
                                err
                              );
                            });
                          user
                            .sendEmailVerification()
                            .then(() => {
                              self.loadingflag = false;
                              self.status = `Registration of [ ${
                                self.user.displayname
                              } ] Successfully, Verification of Account Now Required!`;
                              // utils.showAlert(
                              //   "Success",
                              //   "Access Your Email To Verify Your Account",
                              //   "success"
                              // );
                              this.resetForm();
                              this.signout();
                              this.$router.push({
                                name: "ArtistSignIn",
                                params: { registrationStatus: self.status }
                              });
                            })
                            .catch(e => {
                              utils.showAlert("Error", e.message, "error");
                              console.error(e);
                            });
                        })
                        .catch(e => {
                          self.loadingflag = false;
                          console.error(e);
                        });
                    }
                  } else {
                    self.loadingflag = false;
                    console.log("\tDifferent state received !");
                  }
                })
                .catch(e => {
                  self.loadingflag = false;
                  console.error(e);
                });
            } else {
              self.loadingflag = false;
              self.status = "User issue raised";
            }
          })
          .catch(err => {
            self.loadingflag = false;
            self.status = err.message;
            utils.showAlert("Error", err.message, "error");
          });
        // .
      }
    }, //end-processForm
    resetForm() {
      console.log(`\tresetting form`);
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.user).forEach(function(key) {
        self.user[key] = "";
      });
      this.$refs.formSignUp.resetValidation();
    }, //end-resetForm
    navigateTo(path) {
      this.$router.push(path);
    }, //end-navigateTo
    signout() {
      fire.auth
        .signOut()
        .then(() => {
          // this.status = "Now Signed-OUT !";
          console.log(
            "Signed-OUT user, since creating him/her creates an authenticated user."
          );
          // this.$store.dispatch("unsetUser");
          // this.resetForm();
        })
        .catch(e => {
          this.status = e.message;
          console.error(e);
        });
    } //end-signout
  }, //end-methods
  created() {
    // Using the server bus
    serverBus.$on("imagesSelected", fd => {
      // (files[x].size/1024)/1024).toFixed(4); // MB
      let filesize = (fd[0].size / 1024 / 1024).toFixed(4); //in MB
      // console.log(filesize);
      if (fd.length === 1 && filesize <= 2.0) {
        this.user.photo = fd;
      } else {
        this.user.photo = null;
        let msg =
          "Select ONE image ONLY! and ensure its size is BELOW or equal to 2MB";
        utils.showAlert("Error", msg, "error");
        throw new Error(msg);
      }
    });
  }
};
</script>

<style scoped>
/*.*/
</style>
