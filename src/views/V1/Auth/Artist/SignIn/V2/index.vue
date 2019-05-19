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
          <v-layout align-center justify-center col wrap>
            <v-flex xs12>
              <h4 class="subheading text-xs-center">Artist Sign In</h4>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                v-model="user.email"
                label="E-mail"
                :rules="rules.emailRules"
                required
                type="email"
                autofocus
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                v-model="user.password"
                label="Password"
                :rules="rules.passwordRules"
                required
                type="password"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-btn color="primary" type="submit" :loading="loadingflag">
                Sign In
              </v-btn>
              <v-btn @click="resetForm" color="warning">
                Reset Form
              </v-btn>
              <v-btn color="" @click="navigateTo('/auth/artist/signup')">
                No account?
                <v-icon color="green">keyboard_arrow_right</v-icon> Sign Up
              </v-btn>
            </v-flex>
            <v-flex v-if="status">
              <p class="subheading text-xs-center">{{ status }}</p>
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
  name: "artist-sign-in-view-v2",
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
    async processForm() {
      this.loadingflag = true;
      let self = this;
      if (!this.$refs.formSignIn.validate()) {
        this.loadingflag = false;
        this.status = "Invalid Form Data";
        utils.showAlert("Error", this.status, "error");
        // throw new Error("Invalid form data");
        return this.status;
      } //end-if-valid data
      try {
        let signin = await fire.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        if (signin.user.emailVerified != true) {
          this.status = "Please Verify Your Account!";
          utils.showAlert("Error", "Account Not Verified", "error");
          // throw new Error("Account Not Verified");
          this.loadingflag = false;
          return this.status;
        }
        let userRef = fire.db
            .collection("users")
            .doc(signin.user.email.replace(/[^a-zA-Z0-9]/g, "")),
          userDoc = await userRef.get();
        console.log(userDoc);
        if (userDoc.exists) {
          console.log("Document data:", userDoc.data());
          self.user = {
            displayName: signin.user.displayName,
            email: signin.user.email,
            emailVerified: signin.user.emailVerified,
            photoURL: userDoc.data().userPhoto,
            uid: signin.user.uid,
            about: userDoc.data().userAbout
          };
          // self.user = userDoc.data();
          console.log(self.user);
          if (this.$store.dispatch("setUser", self.user)) {
            self.loadingflag = false;
            utils.showAlert("Success", this.status, "success");
            this.resetForm();
            // this.navigateTo("/artist/profile");
          } else {
            console.error("Sign process halted due to error");
          }
        } else {
          console.log("No such document!");
        }

        // this.status = "Successful Sign-IN";
        // self.user = {
        //   displayName: signin.user.displayName,
        //   email: signin.user.email,
        //   emailVerified: signin.user.emailVerified,
        //   photoURL: signin.user.photoURL,
        //   uid: signin.user.uid
        // };
        // .
      } catch (error) {
        console.error(error);
        self.loadingflag = false;
        self.status = `Invalid User `;
        utils.showAlert("Error", self.status, "error");
        return self.status;
      } // end-try-catch
      // .
    }, //end-processForm()
    resetForm() {
      this.user = {};
      this.$refs.formSignIn.reset();
      this.$refs.formSignIn.resetValidation();
    }, //end-resetForm
    navigateTo(path) {
      this.$router.push(path);
    } //end-navigateTo()
  }, //end-methods
  created() {} //end-created
}; //end-export

// . end-script
</script>

<style scoped></style>
