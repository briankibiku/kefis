<template>
  <div class="purple-bg">
    <div class="centered-container">
      <div class="row">
        <div class="col">
          <div class="winner-container"></div>
          <br />
          <LogoCyan style="height: 35px; width: 150px" />
          <br />
          <br />
          <p>@copyright mSwali {{ this.currentYear }}</p>
          <p>v0.0.1</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Purple from "../components/Logo/Purple.vue";
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
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
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      if (this.$store.state.isAuthenticated) {
        setTimeout(() => (window.location.href = "/home"), 500);
      } else {
        setTimeout(() => (window.location.href = "/email-login"), 5000);
      }
    });
  },
  methods: {},
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
