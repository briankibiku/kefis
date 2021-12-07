<template>
  <div class="purple-container">
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
      <!-- <form id="otp-form" method="post">
        <input
          type="number"
          size="20"
          onin
          maxlength="4"
          placeholder="Enter OTP"
          pattern="[0-9]{4}"
          v-model="otpValue"
          style="border: none;
            padding: 10px;
            border-radius: 8px;
            background-color: white;"
          required
        />
      </form> -->
    </div>

    <div>
      <p>Didn't receive the code? <a href="">Resend OTP</a></p>
    </div>

    <div class="otp-btn-div padding-vertical-20">
      <!-- <b-button
        type="submit"
        href="/home"
        form="otp-form"
        class="outline-button"
        style="
          background-color: #160d3d;
          color: cyan;
          border-color: cyan;
          border-radius: 4px;
          max-width: 230px
        "
      >
        <span class="btn-label">Verify</span>
      </b-button> -->
    </div>
    <div class="otp-footer"></div>
  </div>
</template>

<script>
export default {
  head() {
    return {};
  },

  data() {
    return {
      otpValue: this.otpValue,
      valueOne: this.valueOne,
      valueTwo: this.valueTwo,
      valueThree: this.valueThree,
      valueFour: this.valueFour,
      phone: this.$store.getters.phone,
      profileData: [],
    };
  },

  methods: {
    async onSubmit() {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/verify-otp&code=${this.codeInput()}&msisdn=${
            this.phone
          }`,
          config
        );

        if (res.data.is_valid) {
          console.log(this.codeInput());
          this.$router.push("/trivia");
        } else {
          this.$router.push("/signup");
          /// show a notification error
        }
      } catch (err) {
        // console.log("error occured...");
        // console.log(this.phone);
        // console.log(err);
      }
    },

    codeInput() {
      // return [this.valueOne, this.valueTwo, this.valueThree,this.valueFour].join();
      const result = this.otpValue;
      // this.valueOne + this.valueTwo + this.valueThree + this.valueFour;
      return result;
    },

    codeNotification() {
      $this.$notify({
        group: "foo",
        title: "Code Verification",
        text: "Invalid Code",
      });
    },
  },
};
</script>

<style scoped>
h4,
h5 {
  color: cyan;
}
</style>
