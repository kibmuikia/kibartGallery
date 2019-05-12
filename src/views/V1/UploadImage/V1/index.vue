<template>
  <!-- <v-layout align-center justify-center column fill-height> -->
  <!-- <v-flex xs12 md12> -->
  <UploadImageForm />
  <!-- </v-flex> -->
  <!-- </v-layout> -->
</template>

<script>
/* eslint-disable no-console */

import UploadImageForm from "@/components/UploadImageForm/V1/";

export default {
  name: "upload-image-view",
  components: {
    UploadImageForm
  }, //end-components
  data() {
    return {
      user: {}
      // user: {
      //   name: "kibart"
      // }
    }; //end-return
  }, //end-data
  methods: {
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    getArtWork() {
      // Create a root reference
      // let storageRef = fire.storage.ref();
      // Create a reference to 'artwork/imagename.extension[jpg,png,gif]'
      // let artworkRef = storageRef.child(`artwork/${this.user.name}/${filename}`);
      // let artworkRef = storageRef.child(`artwork/${this.user.name}/`);
    },
    getUser() {
      this.user = this.$store.getters.user;
      if (this.isEmpty(this.user)) {
        let msg =
          "User-object is EMPTY thus No User Available.Redirect to signin";
        console.error(msg);
        alert(msg);
        // this.$router.push("/auth/artist/signin");
        // this.$router.push(path);
      } else {
        // Object is NOT empty (would return false in this example)
        console.log(
          `In View[ UploadImage ], User=>[ ${this.user.email} ]-present`
        );
        console.log(this.user);
      }
    }
  }, //end-methods
  mounted() {}, //end-mounted
  watch: {}, //end-watch
  created() {
    this.getUser();
  }
}; //end-export
</script>

<style scoped>
/*.*/
</style>
