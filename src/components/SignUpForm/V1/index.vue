<template>
  <v-form
    v-model="valid"
    id="form-sign-up"
    ref="formSignUp"
    @submit.prevent="processForm"
    enctype="multipart/form-data"
  >
    <v-container>
      <v-layout align-center justify-center row wrap>
        <v-flex xs12>
          <h4 class="subheading text-xs-center">Artist Sign Up Form</h4>
        </v-flex>
        <v-flex xs12 md5>
          <v-text-field
            v-model="user.displayname"
            label="Display Name"
            :rules="rules.nameRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md5>
          <v-text-field
            v-model="user.email"
            label="E-mail"
            :rules="rules.emailRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md5>
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="rules.passwordRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md5>
          <v-text-field
            v-model="user.confirm_password"
            label="Confirm Password"
            :rules="rules.passwordRules"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md12>
          <ImageInput ref="userphoto" />
        </v-flex>
        <v-flex xs12>
          <v-btn color="primary" type="submit" :loading="loadingflag">
            Submit Details
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
import { serverBus } from "@/main";
import ImageInput from "@/components/ImageInput/V1/";
import utils from "@/utils/V1";
import fire from "@/fire/V1";

export default {
  name: "sign-up-form-component",
  components: {
    ImageInput
  },
  data() {
    return {
      valid: null,
      loadingflag: false,
      user: {
        displayname: "",
        email: "",
        password: "",
        confirm_password: "",
        photo: null
      },
      rules: {
        nameRules: [
          v => !!v || "Display Name is required",
          v => v.length <= 50 || "Display Name must be less than 50 characters"
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
      }
    };
  },
  methods: {
    async processForm() {
      this.loadingflag = true;
      let self = this;
      console.log("entered method[ processForm ]");
      if (
        !this.$refs.formSignUp.validate() ||
        this.user.photo == null ||
        this.user.photo.length !== 1
      ) {
        this.loadingflag = false;
        utils.showAlert("Error", "Invalid data", "error");
        throw new Error("Invalid form data");
      } //end-if-valid data
      if (this.user.password !== this.user.confirm_password) {
        this.loadingflag = false;
        let msg = "Invalid Password[Not Same]";
        utils.showAlert("Error", msg, "error");
        throw new Error(msg);
      } //end-if-password-check
      // console.log(this.user);
      //this.arttitle.replace(/\s+/g, "");
      let uname = this.user.displayname.replace(/\s+/g, "").toLowerCase();
      // console.log(uname);
      await fire.auth
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          if (data.user) {
            console.log("In data.user if function");
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
                      .then(data => {
                        self.loadingflag = false;
                        this.resetForm();
                        utils.showAlert(
                          "Success",
                          "You are now Registered",
                          "success"
                        );
                        console.log(`updateProfile process DONE!`);
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
            throw new Error("User Issue Raised");
          }
        })
        .catch(e => {
          self.loadingflag = false;
          console.log(e);
          let errormessage = e.message;
          throw errormessage;
        });
    },
    resetForm() {
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.user).forEach(function(key) {
        self.user[key] = "";
      });
      this.$refs.formSignUp.resetValidation();
      // this.$refs.formSignUp.reset();
    } //end-resetForm
  },
  created() {
    // Using the server bus
    serverBus.$on("imagesSelected", fd => {
      // (files[x].size/1024)/1024).toFixed(4); // MB
      let filesize = (fd[0].size / 1024 / 1024).toFixed(4); //in MB
      // console.log(filesize);
      if (fd.length === 1 && filesize <= 2.0) {
        this.user.photo = fd;
      } else {
        let msg =
          "Select ONE image ONLY! and ensure its size is BELOW or equal to 2MB";
        utils.showAlert("Error", msg, "error");
        throw new Error(msg);
      }
    });
  }
};
</script>

<style scoped></style>
