<template>
  <div style="margin: 0 auto; min-height: 100vh">
    <div class="centered-container">
      <div style="width: 240px">
        <LogoPurple />
        <br /><br />
        <img
          src="~/assets/shared/win.png"
          class="img-fluid"
          alt="Responsive image"
        />
        <br /><br />
        <div class="heading2">Welcome to mSwali</div>
        <div class="text1">
          Enter your phone number and a user name to sign up
        </div>
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
          <div class="subheading4">
            Sign up
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
        </button>

        <div class="subheading5" style="color: #bbb; padding-top: 20px">
          Have an account already?
          <a href="/login" class="subheading5">LOGIN</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "not_accepted",
      show_error: false,
      isLoading: false,
    };
  },
  methods: {
    showLoading() {
      this.isLoading = true;
    },
    navigate() {
      return this.$router.push("/otp");
    },
    termsAccepted(status) {
      return this.$router.push("/home");
      if (status == "accepted") {
        console.log(value);
        console.log("Terms all accepted");
      } else {
        console.log(value);
        console.log("Terms ! accepted");
        show_error = true;
      }
    },
  },
};
</script>
