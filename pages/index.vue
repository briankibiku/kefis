<template>
  <div style="margin: 0 auto; min-height: 100vh">
    <div class="centered-container">
      <div style="width: 240px">
        <LogoPurple />
        <br /><br />
        <!-- <img src="~/assets/shared/win.png" alt="" height="150" width="230" /> -->
        <img
          src="~/assets/shared/win.png"
          class="img-fluid"
          alt="Responsive image"
        />
        <br /><br />
        <div class="heading2">Login to your Account</div>
        <div class="text1">with your phone number and name</div>
        <br />
        <form action="">
          <div class="form-group">
            <input
              class="rounded-border-input"
              type="text"
              placeholder="+25470 12 123 456"
            />
          </div>

          <div class="form-group">
            <input
              class="rounded-border-input"
              type="text"
              placeholder="Username"
            />
          </div>
        </form>
        <button class="rounded-button-cyan" @click="navigate()">
          <div class="subheading4">Login <i class="bi bi-arrow-right"></i></div>
        </button>
        <div class="subheading5" style="color: #bbb; padding-top: 20px">
          Don't have an account?
          <a href="/signup" class="subheading5">SIGN UP</a>
        </div>
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
    makeToast(toaster, variant = null) {
      this.$bvToast.toast("Dev at work to bring this feature", {
        title: `Coming soon!`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
  },
};
</script>

<style>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}

input[type="text"]:focus {
  border: 2px solid #1ceded;
}
</style>
