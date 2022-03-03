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
  css: ["~/assets/main.css"],
  loading: '~/components/Loading.vue',

  loading: {
    color: 'purple',
    height: '5px',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/persistedState.client.js" }, "~/plugins/fetchbalance.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/pwa", "@nuxtjs/google-fonts"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    '@nuxtjs/proxy',
    '@nuxt/http',
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
  axios: {
    proxy: true,
  },

  proxy: {
    "/api/": {
      target: `http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=api`,
      pathRewrite: { "^/api/": "" },
      changeOrigin: true,
    },
    "/apiproxy/": {
      target: `http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=`,
      pathRewrite: { "^/apiproxy/": "" },
      changeOrigin: true,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  pwa: {
    mobileAppIOS: true,
    mobileApp: true,
    icon: false // disables the icon module
  }
};
