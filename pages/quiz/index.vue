<template>
  <div class="quiz-content">
    <!-- <Notification :message="this.error" v-if="error" /> -->
    <div class="heading3" style="text-align: center; color: #fff">
      Question {{ this.counter + 1 }} of
      {{ this.quiz.length }}
    </div>
    <!-- base timer goes here  -->
    <div style="margin-top: 60px">
      <BaseTimer class="center" :key="rebuildbasetimer" />
    </div>
    <div v-if="showFeedback" class="subheading4" style="color: #fff">
      <div
        v-if="!isCorrect"
        class="text-center heading3 animate__animated animate__fadeInLeft"
        align-v="center"
        style="color: #fff"
      >
        😢 Wrong answer, the correct answer is
        {{ this.correctChoice }}.
        <img src="~/assets/loading.gif" alt="" height="70" width="80" />
        <div style="color: #ffb500">Loading next question...</div>
      </div>
      <div
        v-if="isCorrect"
        class="text-center heading3 animate__animated animate__fadeInRight"
        align-v="center"
        style="color: #fff"
      >
        🤗 You seleceted the correct answer.<img
          src="~/assets/loading.gif"
          alt=""
          height="70"
          width="80"
        />
        <div style="color: #ffb500">Loading next question...</div>
      </div>
    </div>
    <b-row>
      <b-col>
        <p v-if="$fetchState.pending" class="container center-align-content">
          <span class="loading"></span>
        </p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else class="card-content">
          <div class="question-title">
            {{ this.quiz[this.counter].question }}
          </div>
          <div class="grid-container resize-choices">
            <div
              class="choices"
              v-for="item in this.quiz[this.counter].choices"
              :key="item.label"
            >
              <center>
                <p class="field">
                  <button
                    class="outline-button-cyan click"
                    id="answerBtn"
                    v-on:click="showCorrectAnswer(item.correct, item.choice)"
                    :disabled="isDisabled"
                  >
                    <span v-if="item.correct" class="text-choice">
                      {{ item.choice }} . {{ item.answer_text }}</span
                    >
                    <span v-else class="text-choice">
                      {{ item.choice }} . {{ item.answer_text }}
                    </span>
                  </button>
                </p>
              </center>
            </div>
          </div>
          <br />
          <br />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
import BaseTimer from "../../components/BaseTimer.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 7;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 20;

export default {
  data() {
    return {
      counter: 0,
      mswaliUserId: this.$store.state.mswaliId,
      number: 1,
      quiz_score: 0,
      canWin: true,
      error: null,
      dummyQuiz: [],
      userAnswersList: [],
      correctChoice: "",
      quiz: [],
      boxTwo: "",
      wrongScore: 0,
      correctScore: 0,
      showFeedback: false,
      isCorrect: false,
      timeouts: 0,
      rebuildbasetimer: 0,
      timePassed: 0,
      timerInterval: null,
      isDisabled: false,
      canTimeout: true,
    };
  },
  async fetch() {
    this.quiz = this.$store.state.triviaQuestions;
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0 && this.canTimeout) {
        this.resetTimer();
        this.goToNextQuestion("timeout");
        this.timeoutToast();
        this.forceRerender();
      }
    },
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
    } else if (this.$store.state.triviaQuestions.length === 0) {
      // navigate to home page
      this.$router.push("/home");
    } else {
      this.startTimer();
    }
  },
  computed: {
    ...mapState({
      canWinStatus: "canWinStatus",
    }),
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },
    formattedTimeLeft() {
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
    timeFraction() {
      const rawTimeFraction = this.timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    },
    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    },
  },
  deforeDestroy() {
    this.disableButtonFunc(true);
    this.clearTimeout();
  },
  methods: {
    ...mapActions({
      persistCanWinStatus: "persistCanWinStatus",
    }),
    navigateToLogin() {
      return this.$router.push("/login");
    },
    forceRerender() {
      this.rebuildbasetimer += 1;
    },
    resetTimer() {
      this.onTimesUp();
      this.startTimer();
      this.timePassed = 0;
    },
    timeoutToast(toaster) {
      this.$bvToast.toast(`You ran out of time while answering the question`, {
        title: `Timeout!`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    // show answer function
    async showCorrectAnswer(answer, selectedchoice) {
      this.isDisabled = true;
      this.canTimeout = false;
      this.showFeedback = true;
      // register correct choice before hand
      for (var i = 0; i < 4; i++) {
        if (this.quiz[this.counter].choices[i].correct === 1) {
          this.correctChoice = this.quiz[this.counter].choices[i].choice;
        }
      }
      if (answer === 0) {
        // user selected wrong answer
        this.isCorrect = false;
      } else if (answer === 1) {
        // user selected correct answer
        this.isCorrect = true;
      }
      await this.$store.dispatch("delayFiveSeconds"),
        await this.goToNextQuestion(answer, selectedchoice);
      this.forceRerender();
      this.resetTimer();
      this.showFeedback = false;
    },
    // Logic to loop through questions goes here
    async goToNextQuestion(correct, selectedchoice) {
      // update answer using API
      await this.updateAnswerOnBackend(
        this.counter + 1,
        correct,
        selectedchoice,
      );
      this.isDisabled = false;
      this.canTimeout = true;
      // prevent counter from incrementing to 10
      if (this.counter < 8) {
        this.counter += 1;
      } else {
        let sessionID = this.$store.state.sessionDetails.session.id;
        let mswaliUserId = this.$store.state.mswaliId;
        let markplayedsessionurl = `solo-play/mark-played-session&user_id=${mswaliUserId}&session_id=${sessionID}`;
        let markPlayedSession = await this.$axios.post(
          `/apiproxy/${markplayedsessionurl}`,
        );
        let postplayerinsessionurl = `solo-play/post-player-in-session&user_id=${mswaliUserId}&session_id=${sessionID}`;
        let trackPlayerSession = await this.$axios.post(
          `/apiproxy/${postplayerinsessionurl}`,
        );
        console.log(trackPlayerSession);
        let markfinishdgameurl = `solo-play/mark-finished-game&user_id=${mswaliUserId}&session_id=${sessionID}`;
        let markFinishedGame = await this.$axios.post(
          `/apiproxy/${markfinishdgameurl}`,
        );
        console.log(markFinishedGame);
        this.$router.push("/results");
      }
    },
    async updateAnswerOnBackend(questionNumber, answer, selectedchoice) {
      let sessionID = this.$store.state.sessionDetails.session.id;
      let mswaliUserId = this.$store.state.mswaliId;
      let questionId = this.quiz[this.counter].question_id;
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
        `/apiproxy/solo-play/update-score&session_id=${sessionID}&question_id=${questionId}&user_id=${mswaliUserId}&user_response=timeout&user_text=${selectedchoice}&question=${questionNumber}&timeout=${timeoutValue}&correct=${answerValue}`,
      );
    },
    showMsgBoxTwo() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to quit quiz?", {
          title: "Quit quiz?",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          cancelVariant: "light",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          this.$router.push("/home");
        })
        .catch((err) => {
          // An error occurred
        });
    },
    // base timer methods go here

    onTimesUp() {
      clearInterval(this.timerInterval);
    },

    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
  },
  components: { RoundedCyanLoadingButton, BaseTimer, ConfirmationModal },
};
</script>

<style scoped>
.center {
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text-choice {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;

  /* identical to box height, or 100% */
  letter-spacing: 0.02em;
}
.resize-choices {
  width: auto;
  justify-content: center;
  text-align: center;
}
.quiz-content {
  /* position: absolute; */
  padding: 20px;
  margin-top: 0px;
  height: 100vh;
  width: 100%;
  background-color: #160d3d;
}
.card-content {
  padding: 10px;
  justify-content: center;
  text-align: center;
}
.question-title {
  color: #fff;
  font-size: 18px;
  /* text-align-last:justify; */
  font-style: normal;
  font-weight: 800;
  line-height: 36px;

  /* or 150% */
  letter-spacing: 0.03em;
}
.quiz-footer {
  position: absolute;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding: auto;
  bottom: 0px;
}
.base-timer {
  position: relative;
  width: 100px;
  height: 100px;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
}
</style>
