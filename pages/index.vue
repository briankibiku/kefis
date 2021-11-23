<template>
  <div style="margin: 0 auto; min-height: 100vh; background-color: #160d3d">
    <div class="centered-container">
      <div class="row">
        <div class="col">
          <div
            class="winner-container"
            height="220"
            width="200"
            style="background-color: #ffb500"
          ></div>
          <br />
          <LogoCyan />
          <br />

          <button class="rounded-button-cyan" @click="navigate()">
            <div class="subheading4">
              Get started
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </div>
          </button>
          <br />
          <p>@copyright mSwali 2021</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Purple from "../components/Logo/Purple.vue";
export default {
  head() {
    return {
      title: "Home",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Work Sans",
        },
        {
          href: " https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
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
    makeToast(toaster, variant = null) {
      this.$bvToast.toast("Dev at work to bring this feature", {
        title: `Coming soon!`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
  },
  components: { Purple },
};
</script>

<style>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  outline: none;
}

input[type="text"]:focus {
  border: 2px solid #1ceded;
}
p {
  background-position: bottom;
  color: #bbb;
  padding-top: 2em;
}
</style>
