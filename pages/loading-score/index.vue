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
    };
  },
  mounted() {
    this.updateScore();
    setTimeout(() => {
      this.navigateToResults();
    }, 5000);
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
        // console.log(parsedobj);
        // let trivia = ls.get("encryptedUserAnswers", { decrypt: true });
        let decodedResponse = JSON.stringify(this.userAnswersList);
        // post answers to backend
        let postAnswerToBackendResponse = await this.$axios.post(
          `/apiproxy/solo-play/update-session-score&resp=${decodedResponse}`,
        );
        if (postAnswerToBackendResponse.data.message === "response saved") {
          console.log("answers posted ✔️");
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
            answerPayload.userAnswersList[i].question_number,
            answerPayload.userAnswersList[i].correctAnswer,
            answerPayload.userAnswersList[i].picked,
            answerPayload.userAnswersList[i].question_id,
          );
        }
        // console.log("🐛🐛");
        let correctAttempts = this.$store.state.trivia_score.correct;
        if (correctAttempts == 9) {
          await this.awardWinner();
        }
      } catch (e) {
        console.log(e);
        console.log("Posting answers to backend error");
      }
      //
    },
    async awardWinner() {
      let correctAttempts = this.$store.state.trivia_score.correct;
      try {
        if (correctAttempts == 9) {
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
          console.log("winner AWARDED ✔️");
          this.$store.commit("updateQuizScore", "");
          this.$store.commit("updateQuizWrongs", "");
          this.$store.commit("updateQuizTimeouts", "");
        } else {
          console.log("you are not a winner");
        }
      } catch (e) {
        console.log("Error encountered while awarding winner");
      }
    },
    async updateAnswerOnState(
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
        console.log("session closed ✔️");
        this.showLoadingScore = false;
        await this.persistTriviaQuestions("");
        await this.persistupdateUserAnswers("");
        this.$store.commit("userAnswers", "");
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
