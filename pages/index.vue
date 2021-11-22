<template>
  <div>
    <div class="container-bg-image">
      <div>
        <LogoCyan />
        <br /><br />
        <button class="rounded-button" @click="navigate()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Home",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Work Sans",
        },
      ],
      meta: [
        {
          hid: "home",
          name: "home",
          content: "default page",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
  methods: {
    navigate() {
      return this.$router.push("/login");
    },
  },
};
</script>
