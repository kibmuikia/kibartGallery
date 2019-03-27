<template>
  <v-layout row wrap>
    <v-flex xs12 style="">
      <v-form
        v-model="valid"
        id="form-sign-in"
        ref="formSignIn"
        @submit.prevent="processForm"
      >
        <v-container>
          <v-layout align-center justify-center row wrap>
            <v-flex xs12>
              <h4 class="subheading text-xs-center">Artist Sign In</h4>
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
            <v-flex xs12>
              <v-btn color="primary" type="submit" :loading="loadingflag">
                Sign In
              </v-btn>
              <v-btn color="lightgreen" @click="checkUser">
                Check User
              </v-btn>
              <v-btn color="red" @click="signout">
                Sign Out
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import fire from "@/fire/V1";
import utils from "@/utils/V1";

export default {
  name: "artist-sign-in-view",
  data() {
    return {
      loadingflag: false,
      valid: null,
      user: {
        displayname: "",
        email: "",
        password: "",
        photo: null
      },
      rules: {
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
    }; //end-return
  }, //end-data
  methods: {
    async processForm() {
      this.loadingflag = true;
      console.log("\tentered SignIn-processForm !");
      if (!this.$refs.formSignIn.validate()) {
        this.loadingflag = false;
        utils.showAlert("Error", "Invalid data", "error");
        throw new Error("Invalid form data");
      } //end-if-valid data
      // try {
      await fire.auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          this.loadingflag = false;
          console.log("response after process-signIn");
          console.log(data);
          this.resetForm();
          utils.showAlert("Success", "You are now signed-In", "success");
        })
        .catch(e => {
          this.loadingflag = false;
          console.error(e);
          utils.showAlert("Error", e.message, "error");
        });
      // } catch (err) {
      // this.loadingflag = false;
      // console.error(err);
      // }
    }, //end-processForm
    async checkUser() {
      try {
        let currentuser = await fire.auth.currentUser;
        if (currentuser) {
          console.log("Found current is :: ");
          console.log(currentuser);
        } else {
          throw new Error("No currentuser to check");
        }
      } catch (err) {
        console.error(err);
      }
    },
    async signout() {
      await fire.auth
        .signOut()
        .then(data => {
          console.log("response after process-signOUT");
          console.log(data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    resetForm() {
      var self = this;
      //Iterate through each object field, key is name of the object field`
      Object.keys(this.user).forEach(function(key) {
        self.user[key] = "";
      });
      this.$refs.formSignIn.resetValidation();
      // this.$refs.formSignIn.reset();
    } //end-resetForm
  } //end-methods
}; //end-export
</script>

<style scoped>
/*.*/
</style>
