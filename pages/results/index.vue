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
      <div class="heading3" style="color: #fff">
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

      <p class="heading3">
        Points Earned: <strong> {{ this.myScore }} </strong>
      </p>
      <p class="heading3">
        Give
        <u><a href="/feedback" style="color: #ffff00">feedback</a></u>
      </p>
      <div>
        <div>
          <img src="~/assets/twitter.png" height="30" width="30" alt="" />
          <a :href="shareOnTwitter" target="blank" style="color: #fff"
            >Share on Twitter</a
          >
        </div>
        <button
          class="text-button"
          style="color: #bbb; margin-top: 20px"
          @click="onSubmit()"
        >
          <span class="btn-label" style="color: #fff"
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
      shareOnTwitter: `https://twitter.com/intent/tweet?text=I%20scored%20${this.$store.state.trivia_score.correct}/10%20on%20mSwali.%20To%20learn%20and%20WIN%20play%20mSwali%20at%20https://quiz.mswali.co.ke&hashtags=mSwali`,
      // token: nuxtStorage.localStorage.getItem('Token')
    };
  },
  mounted() {
    window.location.hash = "no-back-button";
    // Again because Google Chrome doesn't insert
    // the first hash into the history
    window.location.hash = "Again-No-back-button";

    window.onhashchange = function () {
      window.location.hash = "no-back-button";
    };
  },
  methods: {
    async onSubmit() {
      this.$store.commit("updateQuizScore", "");
      this.$store.commit("updateQuizWrongs", "");
      this.$store.commit("updateQuizTimeouts", "");
      this.makeToast(), await this.$store.dispatch("delayTwoSeconds");
      this.$router.push("/home");
    },
    async onNavigateToFeedback() {
      this.$store.commit("updateQuizScore", "");
      this.$store.commit("updateQuizWrongs", "");
      this.$store.commit("updateQuizTimeouts", "");
      this.makeToast(), await this.$store.dispatch("delayTwoSeconds");
      this.$router.push("/feedback");
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
