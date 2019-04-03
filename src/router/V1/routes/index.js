// import AuthenticationLayout from "../../../views/V1/layouts/AuthenticationLayout";

// import SignUp from "../../../views/V1/components/Auth/SignUp";

import Home from "../../../views/Home.vue";
import About from "../../../views/About.vue";
import NotFound from "../../../views/404Not";
import Gallery from "../../../views/V1/Gallery/V1";
import Gallery2 from "../../../views/V1/Gallery/V2";
// import UploadImage from "../../../views/V1/UploadImage/V1";
import UploadImage from "../../../views/V1/UploadImage/V2";
import ArtistSignUp from "../../../views/V1/Auth/Artist/SignUp/V1";
import ArtistSignIn from "../../../views/V1/Auth/Artist/SignIn/V1";
import EditArtWork from "../../../views/V1/EditArtWork/V1";

// let AuthenticationRoutes = {
//   path: "/auth",
//   component: AuthenticationLayout,
//   children: [
//     {
//       path: "sign-up",
//       name: "SignUp",
//       component: SignUp
//     },
//     {
//       path: "sign-in",
//       name: "SignIn",
//       component: SignIn
//     }
//   ]
// };

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Welcome | KibArt Gallery"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About | KibArt Gallery"
    }
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "NotFound | KibArt Gallery"
    }
  },
  { path: "*", redirect: "/notfound" },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
    meta: {
      title: "Gallery | KibArt Gallery"
    }
  },
  {
    path: "/gallery-v2",
    name: "Gallery2",
    component: Gallery2,
    meta: {
      title: "Gallery-V2 | KibArt Gallery"
    }
  },
  {
    path: "/upload-image",
    name: "UploadImage",
    component: UploadImage,
    meta: {
      title: "Art Upload | KibArt Gallery",
      requiresAuth: true
    }
  },
  {
    path: "/artwork/edit",
    name: "EditArtWork",
    component: EditArtWork,
    meta: {
      title: "Edit | KibArt Gallery",
      requiresAuth: true
    }
  },
  {
    path: "/auth/artist/signup",
    name: "ArtistSignUp",
    component: ArtistSignUp,
    meta: {
      title: "Artist SignUp | KibArt Gallery"
    }
  },
  {
    path: "/auth/artist/signin",
    name: "ArtistSignIn",
    component: ArtistSignIn,
    meta: {
      title: "Artist SignIn | KibArt Gallery"
    }
  }
  // AuthenticationRoutes,
  // DashboardRoutes,

  // {path: '*', component: NotFound}
];
