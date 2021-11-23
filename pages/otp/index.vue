<template>
  <div style="margin: 0 auto; min-height: 100vh">
    <div class="centered-container">
      <div style="width: 300px">
        <div class="otp-header">
          <div>
            <div class="winner-container" height="220" width="200"></div>
            <p
              style="
                color: #160d3d;
                text-align: center;
                font-weight: bold;
                font-size: 20px;
              "
            >
              Waiting for verification sent to <br />
              +274 70 348788
            </p>
            <p style="color: #160d3d; text-align: center">
              We've sent the code to you mobile phone
            </p>
          </div>
        </div>

        <div class="form-section">
          <form action="">
            <div class="form-group">
              <input
                class="rounded-border-input"
                type="text"
                placeholder=". . . ."
                style="text-align: center"
              />
            </div>
          </form>
        </div>

        <div class="heading4" style="text-align: center; padding-bottom: 20px">
          Code expires in
          <span style="color: red">00:56</span>
        </div>

        <button class="rounded-button-cyan" @click="navigate()">
          <div class="subheading4">
            Verify
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
        </button>

        <div class="heading4" style="text-align: center; padding-top: 10px">
          Didn't receive the code?
          <a class="heading4" style="font-weight: bold" href="">Resend OTP</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    navigate() {
      return this.$router.push("/home");
    },
  },
};
</script>
<style scoped>
p,
h6 {
  color: #fff;
}
</style>
