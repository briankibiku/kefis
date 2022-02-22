<template>
  <div>
    <div v-if="showResults">
      <Results />
    </div>
    <div v-else>
      <div class="quiz-content">
        <!-- <Notification :message="this.error" v-if="error" /> -->
        <div class="heading3" style="text-align: center; color: #fff">
          Question {{ this.counter + 1 }} of
          {{ this.quiz.length }}
        </div>
        <!-- base timer goes here  -->
        <BaseTimer class="center" :key="rebuildbasetimer" />
        <b-row style="margin-top: 180px">
          <b-col>
            <p
              v-if="$fetchState.pending"
              class="container center-align-content"
            >
              <span class="loading"></span>
            </p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>
            <div v-else class="card-content">
              <div class="question-item">
                <p class="question-title text-center">
                  {{ this.quiz[this.counter].question }}
                </p>
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
                        v-on:click="
                          showCorrectAnswer(item.correct, item.choice)
                        "
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
              <div
                v-if="showFeedback"
                class="position-bottom subheading4"
                style="color: #fff"
              >
                <div v-if="!isCorrect">
                  You seleceted the wrong answer, the correct answer is
                  {{ this.correctChoice }}
                </div>
                <div v-if="isCorrect">You seleceted the correct answer</div>
              </div>
              <br />
              <div class="position-bottom">
                <a
                  @click="showMsgBoxTwo"
                  style=" padding-bottom: 20px"
                  >Pause</a
                >
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
import BaseTimer from "../../components/BaseTimer.vue";

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
      showResults: false,
      timePassed: 0,
      timerInterval: null,
    };
  },
  async fetch() {
    this.quiz = this.$store.state.triviaQuestions;
    // console.log(this.quiz);
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
        this.timePassed = 0;
        this.goToNextQuestion("timeout");
        this.timeoutToast();
        this.startTimer();
      }
    },
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
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

    timeoutToast(toaster) {
      this.$bvToast.toast(`You ran out of time while answering the question`, {
        title: `Times Up!`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    // show answer function
    async showCorrectAnswer(answer, selectedchoice) {
      console.log(answer);
      console.log(selectedchoice);
      console.log(this.quiz[this.counter].choices);
      this.showFeedback = true;
      // register correct choice before hand
      for (var i = 0; i < 4; i++) {
        if (this.quiz[this.counter].choices[i].correct === 1) {
          this.correctChoice = this.quiz[this.counter].choices[i].choice;
          console.log(this.correctChoice + "correct answer label");
        }
      }
      if (answer === 0) {
        // user selected wrong answer
        this.isCorrect = false;
      } else if (answer === 1) {
        // user selected correct answer
        this.isCorrect = true;
      }
      await this.$store.dispatch("delayTwoSeconds"),
        await this.goToNextQuestion(answer);
      this.forceRerender();
      this.showFeedback = false;
    },
    // Logic to loop through questions goes here
    async goToNextQuestion(correct) {
      // update answer using API
      await this.updateAnswerOnBackend(this.counter + 1, correct);
      // prevent counter from incrementing to 10
      if (this.counter < 8) {
        this.counter += 1;
      } else {
        this.showResults = true;
      }
    },
    async updateAnswerOnBackend(questionNumber, answer) {
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
        console.log("CORRECT ANSWER " + this.$store.state.trivia_score.correct);
      } else if (answer === 0) {
        answerValue = 0;
        timeoutValue = 0;
        this.wrongScore += 1;
        await this.$store.commit("updateQuizWrongs", this.wrongScore);
        console.log("WRONG ANSWER " + this.$store.state.trivia_score.wrong);
      } else if (answer === "timeout") {
        answerValue = 0;
        timeoutValue = 1;
        this.timeouts += 1;
        await this.$store.commit("updateQuizTimeouts", this.timeouts);
      } else if (answer == "") {
        console.log("Select answer to proceed");
      }
      let updateQuestionAnswer = await this.$axios.post(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/update-session-score&session_id=${sessionID}&question_id=${questionId}&user_id=${mswaliUserId}&user_response=timeout&user_text=A&question=${questionNumber}&timeout=${timeoutValue}&correct=${answerValue}`,
      );
      console.log("Answer API response" + questionNumber);
      console.log(updateQuestionAnswer);
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
    startTimer(timelapsed) {
      this.timerInterval = setInterval(
        () =>
          timelapsed
            ? this.timePassed - this.timePassed
            : (this.timePassed += 1),
        1000,
      );
    },
  },
  components: { RoundedCyanLoadingButton, BaseTimer },
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
.outer-wrapper {
  position: fixed;
  top: 0px;
  margin: 0px;
  margin-top: 20px;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center; /*horizontal centering*/
  justify-content: center; /*vertical centering*/
  flex-direction: row; /*keep the h3 above the textbox*/
  /* border:1px solid red; */
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
  font-size: 20px;
  justify-content: center;
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
