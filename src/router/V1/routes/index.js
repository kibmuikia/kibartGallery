// import AuthenticationLayout from "../../../views/V1/layouts/AuthenticationLayout";

// import SignUp from "../../../views/V1/components/Auth/SignUp";

import Home from "../../../views/Home.vue";
import About from "../../../views/About.vue";
import NotFound from "../../../views/404Not";
import Gallery from "../../../views/V1/Gallery/V1";
import Gallery2 from "../../../views/V1/Gallery/V2";
import ArtistWorkView from "../../../views/V1/Gallery/V2/oneview.vue";
// import UploadImage from "../../../views/V1/UploadImage/V1";
import UploadImage from "../../../views/V1/UploadImage/V2";
import ArtistSignUp from "../../../views/V1/Auth/Artist/SignUp/V1";
import ArtistSignIn from "../../../views/V1/Auth/Artist/SignIn/V1";
import ArtistProfile from "../../../views/V1/Auth/Artist/Profile/V1";
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
    path: "/gallery-v1",
    name: "Gallery",
    component: Gallery,
    meta: {
      title: "Gallery-V1 | KibArt Gallery"
    }
  },
  {
    path: "/gallery",
    name: "Gallery2",
    component: Gallery2,
    meta: {
      title: "Gallery | KibArt Gallery"
    }
  }, // ArtistWorkView
  {
    path: "/artist-artwork",
    name: "ArtistWorkView",
    component: ArtistWorkView,
    meta: {
      title: "Artist's ArtWork | KibArt Gallery"
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
      title: "Edit Art | KibArt Gallery",
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
  },
  {
    path: "/artist/profile",
    name: "ArtistProfile",
    component: ArtistProfile,
    meta: {
      title: "Artist Profile | KibArt Gallery",
      requiresAuth: true
    }
  }
  // AuthenticationRoutes,
  // DashboardRoutes,

  // {path: '*', component: NotFound}
];
