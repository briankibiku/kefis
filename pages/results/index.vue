<template>
  <section class="purple-bg">
    <div
      style="width: 300px; padding-top: 30px"
      class="center-align-content-body"
    >
      <div class="otp-header">
        <div>
          <img
            class="Logo"
            width="200"
            height="42"
            src="~/assets/logos/mSwali-cyan.png"
          />
          <br /><br />
          <div class="heading2" style="color: #fff">
            Awesome try on your quiz
          </div>
          <br />
        </div>
      </div>
      <div class="heading2" style="color: #fff">
        <div>
          <img src="~/assets/correct.png" alt="" height="40" width="40" />
          Correct : {{ this.correctAttempts }}
        </div>
        <br />
        <div>
          <img src="~/assets/cancel.png" alt="" height="40" width="40" />
          Failed : {{ this.totalFailed }}
        </div>
        <br />
        <div>
          <img src="~/assets/timeout.png" alt="" height="40" width="40" />
          Timeout : {{ this.totalTimeouts }}
        </div>
      </div>
      <br />

      <p class="heading2">
        Points Earned: <strong> {{ this.myScore }} </strong>
      </p>
      <div>
        <RoundedGoldLoadingButton
          @click="onSubmit()"
          buttonText="Play Again"
          style="font-size: 24px; font-weight: bold; margin-bottom: 20px"
        />
        <b-button
          type="submit"
          @click="onSubmit()"
          href="https://mswali.co.ke/?page_id=198"
          target="blank"
          form="otp-form"
          style="width: 240px"
          class="outline-button-cyan"
        >
          <span class="btn-label"><center>Give Feedback</center></span>
        </b-button>
        <button
          class="text-button"
          style="color: #bbb; margin-top: 20px"
          @click="onSubmit()"
        >
          <span class="btn-label"
            ><center>
              Go to Home Page
              <font-awesome-icon
                :icon="['fas', 'chevron-right']"
                style="color: #fff"
              /></center
          ></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import RoundedGoldLoadingButton from "../../components/RoundedGoldLoadingButton.vue";
export default {
  head() {
    return {
      title: "verify",
      meta: [],
    };
  },
  data() {
    return {
      myScore: this.$store.getters.calculteScore,
      correctAttempts: this.$store.state.trivia_score.correct,
      totalFailed: this.$store.state.trivia_score.wrong,
      totalTimeouts: this.$store.state.trivia_score.timeouts,
      unAttempted: 0,
      // token: nuxtStorage.localStorage.getItem('Token')
    };
  },
  methods: {
    async onSubmit() {
      if (this.correctAttempts == 9) {
        let awardPrize = this.$store.state.sessionDetails.session.prize;
        let mswaliUserId = this.$store.state.mswaliId;
        let sessionID = this.$store.state.sessionDetails.session.id;
        // update trackwinner
        let trackUserResponse = await this.$axios.post(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/post-winner&user_id=${mswaliUserId}&session_id=${sessionID}`,
        );
        // award winner game play amount of the session
        let awardUserResponse = await this.$axios.post(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/give-prize&user_id=${mswaliUserId}&amount=${awardPrize}`,
        );
      } else {
        this.$store.commit("updateQuizScore", "");
        this.$store.commit("updateQuizWrongs", "");
        this.$store.commit("updateQuizTimeouts", "");
        // track user
        // let trackUserResponse = await this.$axios.post(
        //   `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/post-winner&user_id=${mswaliUserId}&session_id=${sessionID}`,
        // );
        this.makeToast(), await this.$store.dispatch("delayTwoSeconds");
        this.$router.push("/home");
      }
    },
    makeToast(toaster) {
      this.$bvToast.toast("Thanks for playing, please play again", {
        title: `Good bye`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
    },
  },
  components: { RoundedGoldLoadingButton },
};
</script>

<style scoped>
.center-align-content-body {
  margin: auto;
  width: auto;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}
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
