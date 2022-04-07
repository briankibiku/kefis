<template>
  <div class="centered-container">
    <div>
      <img src="~/assets/cogs.gif" alt="" height="140" width="140" />
      <div class="heading3">Processing your score...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz: [],
      wrongScore: 0,
      correctScore: 0,
      timeouts: 0,
      mswaliUserId: this.$store.state.mswaliId,
      sessionID: this.$store.state.sessionDetails.session.id,
      userAnswersList: this.$store.state.userAnswers,
    };
  },
  mounted() {
    setTimeout(() => {
      this.navigateToResults();
      this.updateScore();
      this.endSessionFunction();
    }, 2000);
  },
  async fetch() {
    this.quiz = this.$store.state.triviaQuestions;
  },

  methods: {
    updateScore() {
      try {
        for (var i = 0; i < this.quiz.length; i++) {
          // illegal bandit should be removed once feature is stable
          this.updateAnswerOnBackend(
            this.userAnswersList[i].question_number,
            this.userAnswersList[i].correctAnswer,
            this.userAnswersList[i].selectedchoice,
            this.userAnswersList[i].question_id,
          );
          console.log(`Done positing answer for QN: ${i}`);
        }
      } catch (e) {
        console.log(e);
        console.log("Posting answers to backend error");
      }
      //
    },
    async updateAnswerOnBackend(
      questionNumber,
      answer,
      selectedchoice,
      questionId,
    ) {
      // let questionId = this.quiz[this.counter].question_id;
      let answerValue;
      let timeoutValue;
      if (answer === 1) {
        answerValue = 1;
        timeoutValue = 0;
        this.correctScore += 1;
        await this.$store.commit("updateQuizScore", this.correctScore);
      } else if (answer === 0) {
        answerValue = 0;
        timeoutValue = 0;
        this.wrongScore += 1;
        await this.$store.commit("updateQuizWrongs", this.wrongScore);
      } else if (answer === "timeout") {
        answerValue = 0;
        timeoutValue = 1;
        this.timeouts += 1;
        await this.$store.commit("updateQuizTimeouts", this.timeouts);
      } else if (answer == "") {
      }
      let updateQuestionAnswer = await this.$axios.put(
        `/apiproxy/solo-play/update-score&session_id=${this.sessionID}&question_id=${questionId}&user_id=${this.mswaliUserId}&user_response=timeout&user_text=${selectedchoice}&question=${questionNumber}&timeout=${timeoutValue}&correct=${answerValue}`,
      );
      console.log(updateQuestionAnswer);
      console.log("Answer posted to backend");
    },
    async endSessionFunction() {
      try {
        let markplayedsessionurl = `solo-play/mark-played-session&user_id=${this.mswaliUserId}&session_id=${this.sessionID}`;
        let markPlayedSession = await this.$axios.post(
          `/apiproxy/${markplayedsessionurl}`,
        );
        let postplayerinsessionurl = `solo-play/post-player-in-session&user_id=${this.mswaliUserId}&session_id=${this.sessionID}`;
        let trackPlayerSession = await this.$axios.post(
          `/apiproxy/${postplayerinsessionurl}`,
        );
        let markfinishdgameurl = `solo-play/mark-finished-game&user_id=${this.mswaliUserId}&session_id=${this.sessionID}`;
        let markFinishedGame = await this.$axios.post(
          `/apiproxy/${markfinishdgameurl}`,
        );
        this.showLoadingScore = false;
      } catch (e) {
        console.log(e);
        console.log("Error marking session as complete");
      }
    },
    navigateToResults() {
      this.$router.push("/results");
    },
  },
};
</script>
