<template>
  <div class="centered-container">
    <div>
      <img src="~/assets/cogs.gif" alt="" height="140" width="140" />
      <div class="heading3">Processing your score...</div>
    </div>
  </div>
</template>

<script>
import ls from "localstorage-slim";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      quiz: [],
      wrongScore: 0,
      correctScore: 0,
      timeouts: 0,
      mswaliUserId: this.$store.state.mswaliId,
      sessionID: this.$store.state.sessionDetails.session.id,
      userAnswersList: ls.get("encryptedUserAnswers", { decrypt: true }),
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      timeoutedAnswersCount: 0,
    };
  },
  mounted() {
    this.updateScore();
  },
  async fetch() {
    this.quiz = this.$store.state.triviaQuestions;
  },

  computed: {
    ...mapState({
      triviaQuestions: "triviaQuestions",
      userAnswers: "userAnswers",
    }),
  },
  methods: {
    ...mapActions({
      persistTriviaQuestions: "persistTriviaQuestions",
      persistupdateUserAnswers: "persistupdateUserAnswers",
    }),
    async updateScore() {
      try {
        // let trivia = ls.get("encryptedUserAnswers", { decrypt: true });
        let decodedResponse = JSON.stringify(this.userAnswersList);
        // post answers to backend
        let postAnswerToBackendResponse = await this.$axios.post(
          `/apiproxy/tournament-play/update-session-score&resp=${decodedResponse}`,
        );
        if (postAnswerToBackendResponse.data.message === "response saved") {
          try {
            this.endSessionFunction();
          } catch (e) {
            console.log("Error ending session");
          }
        } else {
          console.log("The answers could not be saved");
        }
        for (var i = 0; i < this.userAnswersList.userAnswersList.length; i++) {
          let answerPayload = this.userAnswersList;
          await this.updateAnswerOnState(
            answerPayload.userAnswersList[i].correctAnswer,
          );
        }
        // await this.awardWinner();
        await this.$store.dispatch("delayTwoSeconds");
        await this.navigateToResults();
      } catch (e) {
        console.log(e);
        await this.$store.dispatch("delayTwoSeconds");
        await this.navigateToResults();
      }
      //
    },
    async awardWinner() {
      let correctAttempts = this.$store.state.trivia_score.correct;
      try {
        let trivia = ls.get("triviaQuestionsList", { decrypt: true });
        if (correctAttempts == trivia.length) {
          let awardPrize = this.$store.state.sessionDetails.session.prize;
          let mswaliUserId = this.$store.state.mswaliId;
          let sessionID = this.$store.state.sessionDetails.session.id;
          // update trackwinner
          let trackUserResponse = await this.$axios.post(
            `/apiproxy/solo-play/post-winner&user_id=${mswaliUserId}&session_id=${sessionID}`,
          );
          // award winner game play amount of the sessionl
          let awardUserResponse = await this.$axios.post(
            `/apiproxy/api/give-prize&user_id=${mswaliUserId}&amount=${awardPrize}`,
          );
        } else {
        }
      } catch (e) {
        console.log("Error encountered while awarding winner");
      }
    },
    async updateAnswerOnState(answer) {
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
    },
    async endSessionFunction() {
      try {
        let postplayerinsessionurl = `solo-play/post-player-in-session&user_id=${this.mswaliUserId}&session_id=${this.sessionID}`;
        let trackPlayerSession = await this.$axios.post(
          `/apiproxy/${postplayerinsessionurl}`,
        );
        let markplayedsessionurl = `solo-play/mark-played-session&user_id=${this.mswaliUserId}&session_id=${this.sessionID}`;
        let markPlayedSession = await this.$axios.post(
          `/apiproxy/${markplayedsessionurl}`,
        );
        let markfinishdgameurl = `solo-play/mark-finished-game&user_id=${this.mswaliUserId}&session_id=${this.sessionID}`;
        let markFinishedGame = await this.$axios.post(
          `/apiproxy/${markfinishdgameurl}`,
        );
        this.showLoadingScore = false;
        await this.persistTriviaQuestions("");
        await this.persistupdateUserAnswers("");
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
