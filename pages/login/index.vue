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
        <div class="heading2">Login to your Account</div>
        <div class="text1">with your phone number</div>
        <br />
        <form action="">
          <div class="form-group">
            <input
              class="rounded-border-input"
              type="text"
              placeholder="+25470 12 123 456"
            />
          </div>
        </form>
        <button class="rounded-button-cyan" @click="navigate()">
          <div class="subheading4">
            Login
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("products", [
      "maskedPhone",
    ]),
  },
  methods: {
    navigate() {
      return this.$router.push("/otp");
    },
  },
};
</script>
