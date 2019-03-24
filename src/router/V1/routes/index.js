// import AuthenticationLayout from "../../../views/V1/layouts/AuthenticationLayout";

// import SignUp from "../../../views/V1/components/Auth/SignUp";

import Home from "../../../views/Home.vue";
import About from "../../../views/About.vue";
import NotFound from "../../../views/404Not";
import Gallery from "../../../views/V1/Gallery/V1";
import UploadImage from "../../../views/V1/UploadImage/V1";

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
      title: "KibArt Gallery | Welcome"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "KibArt Gallery | About"
    }
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "KibArt Gallery | NotFound"
    }
  },
  { path: "*", redirect: "/notfound" },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
    meta: {
      title: "KibArt Gallery | Gallery"
    }
  },
  {
    path: "/upload-image",
    name: "UploadImage",
    component: UploadImage,
    meta: {
      title: "KibArt Gallery | Art Upload"
    }
  }
  // AuthenticationRoutes,
  // DashboardRoutes,

  // {path: '*', component: NotFound}
];
