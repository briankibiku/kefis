<template>
  <section class="purple-bg">
    <div style="width: 300px; padding-top: 30px" class="center-align-content">
      <div class="otp-header">
        <div>
          <img
            class="Logo"
            width="200"
            height="43"
            src="~/assets/logos/mSwali-cyan.png"
          />
          <br /><br />
          <h3 style="color: #fff">Awesome try on your quiz</h3>
          <br />
        </div>
      </div>

      <p class="outline-button-cyan">Correct: {{ this.correctAttempts }}</p>
      <p class="outline-button-cyan">Failed: {{ this.totalFailed }}</p>
      <p class="outline-button-cyan">Timeouts: {{ this.totalTimeouts }}</p>
      <p class="outline-button-cyan">Not Attempted: {{ this.unAttempted }}</p>
      <!-- <p class='result-detail'> Not Attempted: {{this.token}} </p>  -->

      <p>
        Points Earned: <strong> {{ this.myScore }} </strong>
      </p>

      <div class="t-section">
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
          @hidden="onHidden"
        >
          <b-button
            type="submit"
            @click.stop.prevent="
              onSubmit();
              onClick();
            "
            ref="button"
            :disabled="busy"
            form="otp-form"
            style="width: 300px"
            class="outline-button-cyan ml-10 mr-10"
          >
            <span class="btn-label"><center>Continue</center></span>
          </b-button></b-overlay
        >
      </div>
    </div>
  </section>
</template>

<script>
import RoundedCyanLoadingButton from "./Buttons/RoundedCyanLoadingButton.vue";
export default {
  head() {
    return {
      title: "verify",
      meta: [],
    };
  },
  data() {
    return {
      busy: false,
      myScore: this.$store.getters.calculteScore,
      correctAttempts: this.$store.state.trivia_score.correct,
      wrongAttempts: this.$store.state.trivia_score.wrong,
      totalFailed: this.$store.state.trivia_score.wrong,
      totalTimeouts: this.$store.state.trivia_score.timeouts,
      unAttempted: 0,
      // token: nuxtStorage.localStorage.getItem('Token')
    };
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  methods: {
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    onHidden() {
      // Return focus to the button
      this.$refs.button.focus();
    },
    setTimeout(callback) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        callback();
      }, 60000);
    },
    onClick() {
      this.busy = true;
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
      });
    },
    async onSubmit() {
      if (this.correctAttempts === 9 && this.wrongAttempts === 0) {
        let awardPrize = this.$store.state.sessionDetails.session.prize;
        let mswaliUserId = this.$store.state.mswaliId;
        let sessionID = this.$store.state.sessionDetails.session.id;
        // update trackwinner
        //let trackUserResponse = await this.$axios.post(
        //   `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/post-winner&user_id=${mswaliUserId}&session_id=${sessionID}`,
        // );
        console.log(trackUserResponse);
        // award winner game play amount of the session
        // let awardUserResponse = await this.$axios.post(
        // `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/give-prize&user_id=${mswaliUserId}&amount=${awardPrize}`,
        //  );
        // console.log(awardPrize);
        //console.log(awardUserResponse);
        this.$store.commit("updateQuizScore", "");
        this.$store.commit("updateQuizWrongs", "");
        this.$store.commit("updateQuizTimeouts", "");
        this.makeToast(), await this.$store.dispatch("delayTwoSeconds");
        this.$router.push("/home");
      } else {
        this.$store.commit("updateQuizScore", "");
        this.$store.commit("updateQuizWrongs", "");
        this.$store.commit("updateQuizTimeouts", "");
        this.makeToast(), await this.$store.dispatch("delayTwoSeconds");
        this.$router.push("/home");
      }
    },
    makeToast(toaster) {
      this.$bvToast.toast("Thanks and see you again.", {
        title: `Come again`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
    },
  },
  components: { RoundedCyanLoadingButton },
};
</script>

<style scoped>
.result-score {
  height: 20px;
  font-size: 15px;
  color: #fff;
  margin-top: 10px;
  padding: 20px 40px;
  width: 60%;
}
p {
  color: #fff;
}
</style>
