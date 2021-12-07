<template>
  <div class="purple-bg">
    <div class="otp-header padding-vertical-20">
      <div>
        <p style="color: cyan; font-weight: bold; font-size: 20px">
          Waiting for verification of <br />
          {{ this.$store.state.visitor_info[0].phone }}
        </p>
        <p style="color: cyan">We've sent the code to you mobile phone</p>
        <img
          class="otp-envelop padding-all-20"
          width="100.5"
          height="97"
          src="~/assets/envelop.png"
        />
        <h6>Enter 4 digit code</h6>
      </div>
    </div>

    <div class="form-section padding-all-20">
      <form id="otp-form" method="post">
        <input
          type="number"
          size="20"
          onin
          maxlength="4"
          placeholder="Enter OTP"
          pattern="[0-9]{4}"
          v-model="otpValue"
          style="
            border: none;
            padding: 10px;
            border-radius: 8px;
            background-color: white;
          "
          required
        />
      </form>
    </div>

    <div>
      <p>Didn't receive the code? <a href="">Resend OTP</a></p>
    </div>

    <div class="otp-btn-div padding-vertical-20">
      <b-button
        type="submit"
        href="/home"
        form="otp-form"
        class="outline-button"
        style="
          background-color: #160d3d;
          color: cyan;
          border-color: cyan;
          border-radius: 4px;
          max-width: 200px;
        "
      >
        <span class="btn-label">Verify</span>
      </b-button>
    </div>
    <div class="otp-footer"></div>
  </div>
</template>

<style scoped>

p,
h6 {
  color: #fff;
}
</style>
