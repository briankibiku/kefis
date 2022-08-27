<template>
  <div>
    <div class="overlay-home" v-if="successfulLogin">
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
            <!--
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
            -->
          </div>
        </button>
      </div>
    </div>
    <div class="overlay-home" v-if="loading">
      <div style="margin: 20px">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
        <div>Loading...</div>
      </div>
    </div>
    <div v-if="!successfulLogin" id="row">
      <div id="col1" class="bg-image d-none d-lg-block">
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
                      color: #fff;
                      text-align: center;
                      font-weight: bold;
                      font-size: 20px;
                    "
                  >
                    Waiting for verification sent to <br />
                    {{ this.$store.state.userDetails.personal.email }}
                  </p>
                  <p style="color: #fff; text-align: center">
                    We've sent the code to your email
                  </p>
                </div>
              </div>

              <div class="form-section">
                <input
                  class="rounded-border-input"
                  type="number"
                  placeholder=". . . ."
                  v-model="signUpOTP"
                  required
                  maxlength="4"
                  style="text-align: center"
                  v-on:keyup.enter="verifyEmailOTP"
                />
              </div>

              <p
                v-if="!showResendBtn"
                style="text-align: center; padding-bottom: 20px; color: #fff"
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
              <RoundedCyanLoadingButton
                :key="rebuildverifybutton"
                buttonText="Verify"
                @click="verifyEmailOTP()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const TIME_LIMIT = 180;
import axios from "axios";
import { mapState, mapActions } from "vuex";
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
export default {
  head: {
    title: "Verify phone",
  },
  data() {
    return {
      signUpPhone: this.$store.state.loggedinUserPhone,
      signUpOTP: "",
      signUpEmail:this.$store.state.userDetails.personal.email,
      resendPhoneNumber: "",
      timePassed: 0,
      showResendBtn: false,
      userName: "",
      phoneNumber: "",
      successfulLogin: false,
      loading: false,
      rebuildverifybutton: 0,
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
      loggedinUserName: "loggedinUserName",
      loggedinUserPhone: "loggedinUserPhone",
      mswaliId: "mswaliId",
      userCredits: "userCredits",
      walletBalance: "walletBalance",
      sessionDetails: "sessionDetails",
      canNotify: "canNotify",
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
    ...mapActions({
      peristAuthentication: "peristAuthentication",
      peristUserPhone: "peristUserPhone",
      peristUserName: "peristUserName",
      persistMswaliId: "persistMswaliId",
      persistwalletBalance: "persistwalletBalance",
      persistUserCredits: "persistUserCredits",
      persistSessionDetails: "persistSessionDetails",
      peristCanNotify: "peristCanNotify",
    }),
    async verifyEmailOTP(){
      if(!!this.signUpOTP){
        try {           
          // verify email OTP
          const res = await axios.get(
            `/apiproxy/corporate-tunnel/verify-otp&email=${this.signUpEmail}&code=${this.signUpOTP}`,
          );
          if(res.data.is_valid === true){
            await this.getuserName()
            // update user authentication status
            await this.authenticateUser(true);
            // navigate to home page
            await this.navigateToHome()
          }
          
        } catch (error) {
          
        }
      }
    },
    forceRerender() {
      this.rebuildverifybutton += 1;
    },
    navigateToHome() {
      this.$router.push("/home");
    },
    navigateToLogin() {
      this.$router.push("/email-login");
    },
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    onTimesUp() {
      this.showResendBtn = true;
      return this.showResendBtn;
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
    async goToHomePage() {
      await this.$router.push("/home");
    },
    // resend OTP happens here
    async resendOTP() {
      const config = {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        this.resendPhoneNumber = this.$store.state.signUpPhone;
        const res = await axios.get(
          `/apiproxy/api/generate-otp&msisdn=${this.resendPhoneNumber}`,
          config,
        );
        await this.$store.commit("updateSignUpOTP", res);
        this.showResendBtn = false;
        window.location.reload();
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
    verifyrequestError(toaster, variant = "danger") {
      this.$bvToast.toast(
        "We encountered an error while trying to verify your OTP, please retry again",
        {
          title: `Error`,
          variant: variant,
          toaster: toaster,
          solid: true,
        },
      );
    },
    emptyOTPFieldError(toaster) {
      this.$bvToast.toast("Enter OTP field, it is required", {
        title: `OTP field required`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    async getuserName() {
      this.phoneNumber = this.$store.state.signUpPhone;
      let userProfile = await axios.get(
        `/apiproxy/api/get-user&username=mast&account_number=${this.signUpEmail}`,
      );
      let userName = userProfile.data.data.name;
      // persist phone number to state
      let phoneNumberFromApi = userProfile.data.data.account_number;
      await this.peristUserPhone(this.$store.state.userDetails.email);
      // update mSwali user id to state
      let mswaliIdfromApi = userProfile.data.data.id;
      await this.persistMswaliId(mswaliIdfromApi);
      await this.fetchWalletBalance(mswaliIdfromApi);
      // split complete user name and use their last name
      let splitName = userName.indexOf(" ");
      let lastNameFromApi = userName
        .slice(splitName + 1, userName.length)
        .trim();
      // persist username to state
      await this.peristUserName(lastNameFromApi);
      let canNotifyUser = userProfile.data.data.disabled;
      await this.peristCanNotify(canNotifyUser);
      this.lastName = this.$store.state.loggedinUserName;
      this.phoneNumber = this.$store.state.loggedinUserPhone;
    },
    async fetchWalletBalance(mswaliUserId) {
      let fetchbalanceproxy = `get-balance&user_id=${mswaliUserId}`;
      let response = await this.$axios.get(
        `/apiproxy/api/${fetchbalanceproxy}`,
      );
      let walletBalanceFromAPI = await Math.trunc(response.data.data);
      let walletCreditsFromAPI = await response.data.credit_balance;
      await this.persistwalletBalance(walletBalanceFromAPI);
      await this.persistUserCredits(walletCreditsFromAPI);
      this.walletBalanceFromAPI = this.$store.state.walletBalance;
    },
    // verify OTP happens here
    async verifyOTP() {
      this.$router.push("/home");
      this.authenticateUser(true);
      const config = {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      if (!!this.signUpOTP) {
        try {
          // start loading
          this.signUpPhone = this.$store.state.signUpPhone;
          // verify OTP
          const res = await axios.get(
            `/apiproxy/api/verify-otp&msisdn=${this.signUpPhone}&code=${this.signUpOTP}`,
            config,
          );
          // assign user name and phone from state
          this.phoneNumber = await this.$store.state.signUpPhone;
          this.userName = await this.$store.state.signUpName;
          if (res.data.is_valid) {
            // sign up new user using their phone and username
            let registernewuserproxy = `register-user&username=${this.userName}&account_number=${this.phoneNumber}`;
            const result = await axios.get(
              `/apiproxy/api/${registernewuserproxy}`,
              config,
            );
            // update user authentication status
            await this.authenticateUser(true);
            if (this.$store.state.isExistingUser) {
              // if it is not a new user redirect to home k
              await this.getuserName();
              // stop loading
              await this.goToHomePage();
            } else {
              // if it is first time user redirect to modal and continue from home
              await this.getuserName();
              // stop loading
              await this.goToHomePage();
            }
          } else {
            this.verifyOTPError();
            this.forceRerender();
          }
        } catch (err) {
          // stop loading
          this.verifyrequestError();
          this.forceRerender();
        }
      } else {
        this.emptyOTPFieldError();
        this.forceRerender();
      }
    },
    async authenticateUser() {
      await this.peristAuthentication(true);
    },
  },
  components: { RoundedCyanArrowButton, RoundedCyanLoadingButton },
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
  width: 100%;
  background-color: #160d3d;
}
</style>
