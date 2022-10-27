import Vue from "vue";
import Router from "vue-router";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

Vue.use(Router);

const router = new Router({
  // ...
});
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "mswali-pwa",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    css: ["~/assets/main.css"],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:400,500,600,700,800",
      },
    ],
  },
  // Disable server side rendering
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.css", "animate.css/animate.min.css"],
  loading: "~/components/Loading.vue",

  loading: {
    color: "purple",
    height: "5px",
  },
  // disable server side rendering
  // ssr: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/persistedState.client.js" },
    "~/plugins/salutations.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/pwa", "@nuxtjs/google-fonts", "@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxt/http",
    // "@nuxtjs/firebase",
    "@nuxtjs/sentry",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["fab"],
          },
        ],
      },
    ],
  ],
  // firebase FCM starts here

  // firebase: {
  //   lazy: false,
  //   config: {
  //     apiKey: "AIzaSyB_uPwm93FtfTGJ8JJ38RpRwQyEWdd4_Oc",
  //     authDomain: "mswali-1171e.firebaseapp.com",
  //     projectId: "mswali-1171e",
  //     storageBucket: "mswali-1171e.appspot.com",
  //     messagingSenderId: "746446534026",
  //     appId: "1:746446534026:web:89c4f2b9cabf1a82080473",
  //     measurementId: "G-BQVPFSMG80",
  //     databaseURL: "https://mswali-1171e-default-rtdb.firebaseio.com/",
  //   },
  //   onFirebaseHosting: false,
  //   services: {
  //     messaging: true,
  //   },
  // },
  axios: {
    proxy: true,
  },
  // proxy: {
  //   "/apiproxy/": {
  //     target: `http://197.248.4.233/mswali/mswali_app/backend/web/index.php?r=`,
  //     // target: `http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=`,
  //     pathRewrite: { "^/apiproxy/": "" },
  //     changeOrigin: true,
  //   },
  //   "/api/": { 
  //     target: `http://161.35.6.91/audios/`,
  //     pathRewrite: { "^/api/": "" },
  //     changeOrigin: true,
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // pwa: {
  //   workbox: {
  //     importScripts: ["/firebase-auth-sw.js"],
  //     // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
  //     // only set this true for testing and remember to always clear your browser cache in development
  //     dev: false,
  //   },
  // },
};
