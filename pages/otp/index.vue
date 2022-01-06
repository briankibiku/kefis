<template>
  <div class="row">
    <div class="overlay" v-if="successfulLogin">
      <div style="margin: 20px">
        <div class="custom-modal">
          <div
            style="
              width: 60px;
              height: 60px;
              background-color: #00a86b;
              text-align: center;
              margin-bottom: 20px;
              margin: 0 auto;
              display: flex;
              border-radius: 20em;
              justify-content: center;
              align-items: center;
            "
          >
            <font-awesome-icon
              class="fa-2x"
              :icon="['fas', 'check']"
              style="color: #fff"
            />
          </div>
          <div class="heading3" style="color: #000; padding-top: 20px">
            All set !
          </div>
          <div class="heading5" style="color: #000">You are good to go...</div>
        </div>
        <button class="rounded-button-cyan" @click="goToHomePage()">
          <div class="subheading4">
            Proceed
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
        </button>
      </div>
    </div>
    <div class="overlay" v-if="loading">
      <div style="margin: 20px">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!successfulLogin" class="row">
      <div id="col1" class="bg-image d-none d-sm-block">
        <MswaliExplained />
      </div>
      <div id="col2">
        <div style="margin: 0 auto; min-height: 100vh">
          <div class="centered-container">
            <div>
              <div class="otp-header">
                <div>
                  <div class="player-container"></div>
                  <p
                    style="
                      color: #160d3d;
                      text-align: center;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    Waiting for verification sent to <br />
                    {{ this.$store.state.signUpPhone }}
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
                      type="number"
                      placeholder=". . . ."
                      v-model="signUpOTP"
                      required
                      maxlength="4"
                      style="text-align: center"
                    />
                  </div>
                </form>
              </div>

              <p
                v-if="!showResendBtn"
                style="text-align: center; padding-bottom: 20px; color: #160d3d"
              >
                Resend OTP in
                <span style="color: red">{{ remainingTime }}</span>
              </p>
              <div v-if="showResendBtn">
                <button
                  class="heading4"
                  style="
                    font-weight: bold;
                    padding-bottom: 20px;
                    background-color: transparent;
                    border: none;
                    color: red;
                  "
                  @click="resendOTP()"
                >
                  Resend OTP
                </button>
              </div>

              <button class="rounded-button-cyan" @click="verifyOTP()">
                <div class="subheading4">
                  Verify
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const TIME_LIMIT = 60;
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  head: {
    title: "Verify phone",
  },
  data() {
    return {
      signUpPhone: "",
      signUpOTP: this.signUpOTP,
      resendPhoneNumber: "",
      timePassed: 0,
      showResendBtn: false,
      userName: "",
      phoneNumber: "",
      successfulLogin: false,
      loading: false,
    };
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
        this.timePassed = 0;
        this.startTimer();
      }
    },
  },

  mounted() {
    this.startTimer();
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
    }),
    remainingTime() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return TIME_LIMIT - this.timePassed;
    },
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    onTimesUp() {
      this.showResendBtn = true;
      return this.showResendBtn;
    },
    makeToast(toaster, variant = null) {
      this.$bvToast.toast("You entered an incorrect OTP, please retry.", {
        title: `Wrong OTP`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
    resendOTPErrorToast(toaster, variant = null) {
      this.$bvToast.toast(
        "We encountered a problem while resending the OTP, please retry.",
        {
          title: `Resend OTP error`,
          variant: variant,
          toaster: toaster,
          solid: true,
        },
      );
    },
    goToHomePage() {
      return this.$router.push("/home");
    },
    // resend OTP happens here
    async resendOTP() {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };

      try {
        this.resendPhoneNumber = this.$store.state.signUpPhone;
        const res = await axios.get(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/generate-otp&msisdn=${this.resendPhoneNumber}`,
          config,
        );
        console.log(this.resendPhoneNumber);
        await this.$store.commit("updateSignUpOTP", res);
        this.showResendBtn = false;
      } catch (err) {
        this.resendOTPErrorToast();
      }
    },
    verifyOTPError(toaster, variant = "danger") {
      this.$bvToast.toast("You entered a wrong OTP, please retry", {
        title: `Wrong OTP entered`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
    // verify OTP happens here
    async verifyOTP() {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };

      try {
        this.loading = true;
        this.signUpPhone = this.$store.state.signUpPhone;
        // verify OTP
        const res = await axios.get(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/verify-otp&msisdn=${this.signUpPhone}&code=${this.signUpOTP}`,

          config,
        );

        // assign user name and phone from state
        this.phoneNumber = await this.$store.state.signUpPhone;
        this.userName = await this.$store.state.signUpName;
        if (res.data.is_valid) {
          // sign up new user using their phone and username
          const result = await axios.get(
            `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/register-user&username=${this.userName}&account_number=${this.phoneNumber}`,
            config,
          );
          this.loading = false;
          // update user authentication status
          await this.authenticateUser(true);
          // redirect to home page
          this.successfulLogin = true;
        } else {
          await this.app.$toast;
        }
      } catch (err) {
        this.loading = false;
        this.verifyOTPError();
      }
    },

    ...mapActions({
      peristAuthentication: "peristAuthentication",
    }),
    async authenticateUser() {
      await this.peristAuthentication(true);
    },
  },
};
</script>
<style scoped>
p,
h6 {
  color: #fff;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#col1 {
  width: 50%;
}
#col2 {
  width: 50%;
}
</style>
