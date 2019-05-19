<template>
  <v-layout column align-center justify-center class="">
    <v-flex xs12 class="pa-2">
      <h4 class="subheading text-xs-center">Artist Sign Up Form</h4>
    </v-flex>
    <v-flex xs12 class="">
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
                      autofocus
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
      <p
        class="subheading text-xs-center light-blue--text text--lighten-2 py-2"
        v-if="status"
      >
        {{ status }}
      </p>
      <v-btn small @click="navigateTo('/auth/artist/signin')">
        Have an account?
        <v-icon color="green">keyboard_arrow_right</v-icon> Sign In
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import ImageInput from "@/components/ImageInput/V2/";
import utils from "@/utils/V1";
import { serverBus } from "@/main";
import fire from "@/fire/V1";

// emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: "sign-up-v3-component",
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
        about: "",
        fullurl: {
          main: null,
          thumb: null
        }
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
    async processForm() {
      let msg = "";
      if (!this.$refs.userAboutInput.validate()) {
        this.$refs.userAboutInput.focus();
        msg = "Ensure your description is valid";
        this.status = msg;
        utils.showAlert("Error", msg, "error");
      } else {
        // .
        this.loadingflag = true;
        let self = this,
          uname = this.user.displayname.replace(/\s+/g, "").toLowerCase();
        try {
          this.status = `Registering user :: ${uname}`;
          console.log(`\t${this.status} *`);
          let createUser = await fire.auth.createUserWithEmailAndPassword(
            this.user.email,
            this.user.password
          );
          // console.log(createUser.user);

          let storageRef = fire.storage.ref();
          let pic = this.user.photo,
            filename = pic.name.split(".");
          filename = `${uname}.${filename[1]}`;
          let usersPhotoRef = storageRef.child(
              `users/${createUser.user.uid}/${filename}`
            ),
            usersPhotoRefThumb = storageRef.child(
              `users/${createUser.user.uid}/thumb_${filename}`
            );
          // console.log(`userPhotoRef :: ${usersPhotoRef} *`);
          let uploadTask = usersPhotoRef.put(pic),
            progress = null;
          uploadTask.on(
            "state_changed",
            snapshot => {
              progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              self.status = `profile photo upload progress :: ${progress.toFixed(
                1
              )}`;
              console.log(self.status);
            },
            error => {
              self.loadingflag = false;
              self.status = error.message;
              console.error(error);
            },
            async () => {
              console.log(`upload finished :: ${progress}`);
              self.status = `Finishing upload process.`;
              try {
                self.user.fullurl.main = await uploadTask.snapshot.ref.getDownloadURL();
                console.log(self.user.fullurl.main);
                console.time("getThumbUrl");
                self.user.fullurl.thumb = await usersPhotoRefThumb.getDownloadURL();
                console.timeEnd("getThumbUrl");
                console.log(`thumbnail-full-url :: ${self.user.fullurl.thumb}`);
                self.status = `Upload complete, now finishing up registration process.`;
                console.log(`\t${self.status}`);
                // .
                let updateProfileTask = await createUser.user.updateProfile({
                  displayName: self.user.displayname,
                  photoURL: self.user.fullurl.main
                });
                let writeToFirestore = await fire.db
                  .collection("users")
                  .doc(self.user.email.replace(/[^a-zA-Z0-9]/g, ""))
                  .set({
                    userName: self.user.displayname,
                    userPhoto: self.user.fullurl,
                    userEmail: self.user.email,
                    userAbout: self.user.about,
                    userID: createUser.user.uid
                  });
                // console.log(
                //   `Document for, ${uname} written with ID: ${
                //     writeToFirestore.id
                //   }`
                // );
                // console.log(`Document for, ${uname} written !`);
                createUser.user
                  .sendEmailVerification()
                  .then(() => {
                    self.loadingflag = false;
                    self.status = `Registration complete, check your mail and verify your account`;
                    utils.showAlert(
                      "Success",
                      "Registration complete !",
                      "success"
                    );
                  })
                  .catch(e => {
                    utils.showAlert("Error", e.message, "error");
                    console.error(e);
                  });
                // .
              } catch (error) {
                self.loadingflag = false;
                console.error(error);
                utils.showAlert("Error", error.message, "error");
              }
            }
          ); // end-uploadTask.on
          // .
          // this.loadingflag = false;
        } catch (error) {
          this.loadingflag = false;
          console.error(error);
          utils.showAlert("Error", error.message, "error");
        }
        // . end-main-if-else
      }
    }, //end-processForm
    resetForm() {
      console.log(`\tresetting form`);
      serverBus.$emit("reset-image-input");
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.user).forEach(function(key) {
        self.user[key] = "";
      });
      this.$refs.formSignUp.resetValidation();
      this.status = "";
    }, //end-resetForm
    navigateTo(path) {
      this.$router.push(path);
    }, //end-navigateTo
    signout() {
      fire.auth
        .signOut()
        .then(() => {
          console.log(
            "Signed-OUT user, since creating him/her creates an authenticated user."
          );
          // this.$store.dispatch("unsetUser");
        })
        .catch(e => {
          this.status = e.message;
          console.error(e);
        });
    } //end-signout
  }, //end-methods
  created() {
    // Using the server bus
    // serverBus.$on("imagesSelected", fd => {
    //   let filesize = (fd[0].size / 1024 / 1024).toFixed(4); //in MB
    //   // console.log(filesize);
    //   if (fd.length === 1 && filesize <= 2.6) {
    //     this.user.photo = fd[0];
    //   } else {
    //     this.user.photo = null;
    //     let msg =
    //       "Select ONE image ONLY! and ensure its size is BELOW or equal to 2MB";
    //     utils.showAlert("Error", msg, "error");
    //     serverBus.$emit("invalid-image", "Please select another image");
    //   }
    // });
  }, //end-created
  mounted() {
    serverBus.$on("imageSelected", data => {
      console.log("\tevent[ imageSelected ] received !!");
      // console.log(data);
      let filesize = (data.size / 1024 / 1024).toFixed(4); //in MB
      if (filesize <= 0.5109) {
        console.log("\tvalid User image");
        // this.user.photo = fd[0];
        this.user.photo = data;
        // this.imagedata = data;
        // console.log(this.imagedata.name);
      } else {
        this.user.photo = null;
        serverBus.$emit(
          "invalid-image",
          "Selected image exceeds allowed limit[ 0.5 MB ]. Please select another image"
        );
      }
    });
    serverBus.$on("resetImage", () => {
      this.user.photo = null;
    });
  } //end-mounted
};
</script>

<style scoped>
/*.*/
</style>
