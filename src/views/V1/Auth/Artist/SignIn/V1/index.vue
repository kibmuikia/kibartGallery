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
              <v-btn @click="resetForm">
                Reset Form
              </v-btn>
              <v-btn color="" @click="navigateTo('/auth/artist/signup')">
                Do not have an account, Sign Up
              </v-btn>
              <v-btn color="lightgreen" @click="checkUser">
                Check User
              </v-btn>
              <v-btn color="brown" @click="checkUserStore">
                Check User Store
              </v-btn>
              <v-btn color="red" @click="signout">
                Sign Out
              </v-btn>
              <v-btn color="" @click="navigateTo('/upload-image')">
                Upload Your ArtWork
              </v-btn>
            </v-flex>
            <v-flex v-if="status">
              <p class="subheading">{{ status }}</p>
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
// import { serverBus } from "@/main";

export default {
  name: "artist-sign-in-view",
  data() {
    return {
      loadingflag: false,
      valid: null,
      status: "",
      user: {},
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
    navigateTo(path) {
      // eslint-disable-next-line
      // console.log(path);
      this.drawer = !this.drawer;
      this.$router.push(path);
    },
    async processForm() {
      this.loadingflag = true;
      let self = this;
      // console.log("\tentered SignIn-processForm !");
      if (!this.$refs.formSignIn.validate()) {
        this.loadingflag = false;
        this.status = "Invalid Form Data";
        utils.showAlert("Error", this.status, "error");
        throw new Error("Invalid form data");
      } //end-if-valid data
      // try {
      await fire.auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          // console.log(data);
          // console.log(data.user);
          this.status = "Successful Sign-IN";
          self.user = {
            displayName: data.user.displayName,
            email: data.user.email,
            emailVerified: data.user.emailVerified,
            photoURL: data.user.photoURL,
            uid: data.user.uid
          };
          if (this.$store.dispatch("setUser", self.user)) {
            this.checkUserStore();
            utils.showAlert("Success", this.status, "success");
            this.resetForm();
            this.loadingflag = false;
          } else {
            throw new Error("Dispatch to set user in store FAILED");
          }
          // Using the server bus
          // serverBus.$emit("gotuser", user);
        })
        .catch(e => {
          this.loadingflag = false;
          this.status = e.message;
          console.error(e);
          utils.showAlert("Error", e.message, "error");
        });
      // } catch (err) {
      // this.loadingflag = false;
      // console.error(err);
      // }
    }, //end-processForm
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    checkUserStore() {
      this.user = this.$store.getters.user;
      if (this.isEmpty(this.user)) {
        this.status = "User-object is EMPTY thus No User Available";
        console.error(this.status);
      } else {
        // Object is NOT empty (would return false in this example)
        console.log(`In View[ SignIn ], User=>[ ${this.user} ]`);
        console.log(this.user);
        this.status = `from STORE, displayName = ${this.user.displayName} .`;
      }
    },
    async checkUser() {
      try {
        let currentuser = await fire.auth.currentUser;
        if (currentuser) {
          this.status = `Current user[via auth()] is, ${
            currentuser.displayName
          }`;
          console.log(this.status);
          console.log(currentuser);
        } else {
          this.status = "No current-User available";
          throw new Error(this.status);
        }
      } catch (err) {
        console.error(err);
      }
    },
    async signout() {
      await fire.auth
        .signOut()
        .then(() => {
          this.status = "Now Signed-OUT !";
          this.$store.dispatch("unsetUser");
          this.resetForm();
        })
        .catch(e => {
          this.status = e.message;
          console.error(e);
        });
    },
    resetForm() {
      this.user = {};
      this.$refs.formSignIn.reset();
      this.$refs.formSignIn.resetValidation();
      // var self = this;
      //Iterate through each object field, key is name of the object field`
      // Object.keys(this.user).forEach(function(key) {
      //   self.user[key] = "";
      // });
    } //end-resetForm
  } //end-methods
}; //end-export
</script>

<style scoped>
/*.*/
</style>
