<template>
  <div>
    <div v-if="showLoadingScore" class="centered-container">
      <div>
        <img src="~/assets/cogs.gif" alt="" height="140" width="140" />
        <div class="heading3">Processing your score...</div>
      </div>
    </div>
    <div class="purple-bg" v-if="this.quiz.length > 0 && !showLoadingScore">
      <!-- <Notification :message="this.error" v-if="error" /> -->
      <div
        class="heading3 purple_bg"
        style="text-align: center; margin-bottom: 10px; color: #ffff00"
      >
        Question {{ this.counter + 1 }} of
        {{ this.quiz.length }}
      </div>
      <!-- base timer goes here  -->
      <div v-if="!isDisabled" style="margin-top: 60px">
        <BaseTimer class="center" :key="rebuildbasetimer" />
      </div>
      <div v-if="showFeedback" class="subheading4" style="color: #fff">
        <div
          v-if="showTimeout"
          class="text-center answer_display center-align-item heading3 animate__animated animate__tada"
          align-v="center"
        >
          <!--<img src="~/assets/cancel.png" alt="" height="40" width="40" />-->
          <div>
            😢 Timeout! You ran out of time to answer the question
            <div
              v-if="this.counter + 1 != this.quiz.length"
              class="text-center heading4"
            >
              <!--
              <div>
                <div class="rainbow-text">Fun Fact</div>
              {{ funFact }}
            </div>
              -->
            </div>
            <div
              v-if="this.counter + 1 == this.quiz.length"
              style="color: #ffb500"
            >
              Loading your results...
            </div>
          </div>

          <!--
            <img src="~/assets/loading.gif" alt="" height="90" width="100" />
          -->
        </div>
        <div
          v-if="!isCorrect && !showTimeout"
          class="text-center answer_display center-align-item heading3 animate__animated animate__tada"
          align-v="center"
        >
          <!--<img src="~/assets/cancel.png" alt="" height="40" width="40" />-->
          <div>
            😢 Wrong answer, the correct answer is
            {{ this.correctChoice }}
            <div
              v-if="this.counter + 1 != this.quiz.length"
              class="text-center heading4"
            >
              <!--
              <div>
                <div class="rainbow-text">Fun Fact</div>
              {{ funFact }}
            </div>
              -->
            </div>
            <div
              v-if="this.counter + 1 == this.quiz.length"
              style="color: #ffb500"
            >
              Loading your results...
            </div>
          </div>

          <!--
            <img src="~/assets/loading.gif" alt="" height="90" width="100" />
          -->
        </div>
        <div
          v-if="isCorrect && !showTimeout"
          class="text-center answer_display center-align-item heading3 animate__animated animate__tada"
          align-v="center"
        >
          <!--
          <img src="~/assets/win_emoji.png" alt="" height="40" width="55" />
        -->
          <div>
            😀 You seleceted the correct answer.
            <div
              v-if="this.counter + 1 != this.quiz.length"
              class="text-center heading4"
            >
              <!--
              <div>
                <div class="rainbow-text">Fun Fact</div>
              {{ funFact }}
            </div>
          -->
            </div>
            <div
              v-if="this.counter + 1 == this.quiz.length"
              style="color: #ffb500"
            >
              Loading your results...
            </div>
          </div>
          <!--
            <img src="~/assets/loading.gif" alt="" height="90" width="100" />
          -->
        </div>
      </div>
      <div class="text-center">
        <div v-if="this.quiz[this.counter].media === 'IMAGE'">
          <img
            :src="this.quiz[this.counter].media_link"
            alt=""
            height="100"
            width="230"
          />
        </div>

        <div v-if="this.quiz[this.counter].media === 'AUDIO' && !isDisabled">
          <img src="~/assets/soundbar.gif" alt="" height="100" width="230" />
        </div>

        <div class="question-title">
          {{ this.quiz[this.counter].question }}
        </div>
        <br />
        <div
          class=""
          v-for="item in this.quiz[this.counter].choices"
          :key="item.label"
        >
          <p class="field">
            <button
              class="choices-container text-left"
              style="padding-left: 30px"
              v-on:click="showCorrectAnswer(item.correct, item.choice)"
              :disabled="isDisabled"
            >
              <span v-if="item.correct">
                {{ item.choice }} . {{ item.answer_text }}</span
              >
              <span v-else> {{ item.choice }} . {{ item.answer_text }} </span>

              <img
                v-if="item.correct === 1 && isDisabled"
                src="~/assets/check.png"
                alt=""
                height="25"
                width="25"
                style="margin-left: 10px"
              />
              <img
                v-if="
                  item.correct === 0 &&
                  isDisabled &&
                  selectedAnswer === item.choice
                "
                src="~/assets/cancel.png"
                alt=""
                height="25"
                width="25"
                style="margin-left: 10px"
              />
            </button>
          </p>
        </div>
        <button
          class="continue-btn"
          v-if="isDisabled && !hideNextButton"
          @click="loadNextQuestion()"
        >
          Next Question
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            style="color: #160d3d"
          />
        </button>
        <br />
        <br />
      </div>
      <div v-if="this.quiz[this.counter].media === 'AUDIO' && !isDisabled">
        <audio autoplay>
          <source :src="this.quiz[this.counter].media_link" type="audio/mp3" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
import ls from "localstorage-slim";
import { mapState, mapActions } from "vuex";
import BaseTimer from "../../components/BaseTimer.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
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
const TIME_LIMIT = 12;
export default {
  data() {
    return {
      funFact: "This is where our fun fact will appear",
      counter: 0,
      selectedAnswer: "",
      mswaliUserId: this.$store.state.mswaliId,
      sessionID: this.$store.state.sessionDetails.session.id,
      number: 1,
      quiz_score: 0,
      canWin: true,
      error: null,
      dummyQuiz: [],
      canTimeOut: true,
      userAnswersPayload: {
        userID: "",
        gamesessionID: "",
        userAnswersList: [],
      },
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
      showTimeout: true,
      showLoadingScore: false,
      hideNextButton: false,
      decryptedQuestions: [],
      correctChoice: "",
      decryptedChoices: [],
      audio_link: "",
    };
  },
  async fetch() {
    let trivia = ls.get("triviaQuestionsList", { decrypt: true });
    this.quiz = "";
    this.questions = trivia;
    this.decryptQuestions();
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0 && this.canTimeOut && this.showTimeout) {
        this.showCorrectAnswer("timeout");
        this.timeoutToast();
      }
    },
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
    } else if (typeof this.quiz[0] == "undefined") {
      // navigate to home page
      this.$router.push("/home");
    } else {
      window.location.hash = "no-back-button";
      // Again because Google Chrome doesn't insert
      // the first hash into the history
      window.location.hash = "Again-No-back-button";
      window.onhashchange = function () {
        window.location.hash = "no-back-button";
      };
      this.startTimer();
    }
  },
  computed: {
    ...mapState({
      userAnswers: "userAnswers",
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
    decryptQuestions() {
      let sessionID = this.$store.state.sessionDetails.session.id.toString();
      var CryptoJS = require("crypto-js");
      var Sha256 = CryptoJS.SHA256;
      var Hex = CryptoJS.enc.Hex;
      var Utf8 = CryptoJS.enc.Utf8;
      var Base64 = CryptoJS.enc.Base64;
      var AES = CryptoJS.AES;
      var secret_key = sessionID;
      var secret_iv = "SnJtNG96c3ZvRVV6WlU5MjhOOUZvUT09";
      var key = Sha256(secret_key).toString(Hex).substr(0, 32); // Use the first 32 bytes (see 2.)
      var iv = Sha256(secret_iv).toString(Hex).substr(0, 16);
      for (let i = 0; i < this.questions.length; i++) {
        // convert from Base64 to Utf8
        var questionBase64 = Base64.parse(this.questions[i].question).toString(
          Utf8,
        );
        //decrypt question
        var decryptedQuestion = AES.decrypt(questionBase64, Utf8.parse(key), {
          iv: Utf8.parse(iv),
        }).toString(Utf8);
        this.decryptedChoices = [];
        for (let j = 0; j < 4; j++) {
          // convert from Base64 to Utf8
          var correctBase64 = Base64.parse(
            this.questions[i].choices[j].correct,
          ).toString(Utf8);
          //decrypt correct
          var decryptedCorrect = AES.decrypt(correctBase64, Utf8.parse(key), {
            iv: Utf8.parse(iv),
          }).toString(Utf8);
          var decryptedCorrect =
            parseInt(decryptedCorrect) -
            parseInt(this.questions[i].choices[j].id);
          let decryptedChoiceObject = {
            id: this.questions[i].choices[j].id,
            choice: this.questions[i].choices[j].choice,
            answer_text: this.questions[i].choices[j].answer_text,
            correct: parseInt(decryptedCorrect),
            inserted_at: this.questions[i].choices[j].inserted_at,
            question_id: this.questions[i].choices[j].question_id,
          };
          this.decryptedChoices.push(decryptedChoiceObject);
        }
        console.log(this.questions[i].media_link);
        let decryptedQuestionObject = {
          question: decryptedQuestion,
          question_id: this.questions[i].question_id,
          session_id: this.questions[i].session_id,
          choices: this.decryptedChoices,
          media_link:
            this.questions[i].media === "AUDIO"
              ? `http://161.35.6.91/audios/${this.questions[i].media_link}`
              : this.questions[i].media_link,
          media: this.questions[i].media,
        };
        this.decryptedQuestions.push(decryptedQuestionObject);
      }
      this.quiz = this.decryptedQuestions;
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
      persistupdateUserAnswers: "persistupdateUserAnswers",
    }),
    async preventBack() {
      window.history.forward();
    },
    lastQuestion(question_num) {
      if (question_num != question_num) {
        return true;
      } else {
        return false;
      }
    },
    navigateToLogin() {
      return this.$router.push("/email-login");
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
        variant: "info",
        toaster: toaster,
        solid: true,
      });
    },
    diableTimeOut(answered) {
      answered ? (this.showTimeout = false) : (this.showTimeout = true);
    },
    // show answer function
    async showCorrectAnswer(answer, selectedchoice) {
      this.isDisabled = true;
      this.canTimeout = false;
      this.showFeedback = true;
      this.selectedAnswer = selectedchoice;
      this.diableTimeOut(true);
      // register correct choice before hand
      for (var i = 0; i < 4; i++) {
        if (this.quiz[this.counter].choices[i].correct === 1) {
          this.correctChoice = this.quiz[this.counter].choices[i].choice;
        }
      }
      if (answer == 0) {
        // user selected wrong answer
        this.isCorrect = false;
      } else if (answer == 1) {
        // user selected correct answer
        this.isCorrect = true;
      } else if (answer == "timeout") {
        this.showTimeout = true;
      }
      // await this.$store.dispatch("delayFourSeconds");,
      //   await this.goToNextQuestion(answer, selectedchoice);
      // prevent counter from incrementing to 10
      if (this.counter < this.quiz.length - 1) {
        let answerObject = {
          correctAnswer: answer,
          question_id: this.quiz[this.counter].question_id,
          question_number: this.counter,
          userResponse: this.userResponseLogic(answer),
          picked: selectedchoice ? selectedchoice : "timeout",
          correct: answer,
          timeout: this.userResponseLogic(answer) == "timeout" ? 1 : 0,
        };
        this.userAnswersPayload.userAnswersList.push(answerObject);
        // state values storing answers
        if (answer === 1) {
          this.correctScore += 1;
          await this.$store.commit("updateQuizScore", this.correctScore);
        } else if (answer === 0) {
          this.wrongScore += 1;
          await this.$store.commit("updateQuizWrongs", this.wrongScore);
        } else if (answer === "timeout") {
          // answerValue = 0;
          // timeoutValue = 1;
          this.timeouts += 1;
          await this.$store.commit("updateQuizTimeouts", this.timeouts);
        } else if (answer == "") {
        }
      } else if (this.counter <= this.quiz.length) {
        this.hideNextButton = true;
        // state values storing answers
        if (answer === 1) {
          this.correctScore += 1;
          await this.$store.commit("updateQuizScore", this.correctScore);
        } else if (answer === 0) {
          this.wrongScore += 1;
          await this.$store.commit("updateQuizWrongs", this.wrongScore);
        } else if (answer === "timeout") {
          // answerValue = 0;
          // timeoutValue = 1;
          this.timeouts += 1;
          await this.$store.commit("updateQuizTimeouts", this.timeouts);
        } else if (answer == "") {
        }

        this.hideNextButton = true;
        await this.$store.dispatch("delayFourSeconds");
        this.showLoadingScore = true;
        let answerObject = {
          correctAnswer: answer,
          question_id: this.quiz[this.counter].question_id,
          question_number: this.counter,
          userResponse: this.userResponseLogic(answer),
          picked: selectedchoice ? selectedchoice : "timeout",
          correct: answer,
          timeout: this.userResponseLogic(answer) == "timeout" ? 1 : 0,
        };
        this.userAnswersPayload.userAnswersList.push(answerObject);
        this.userAnswersPayload.userID = this.mswaliUserId;
        this.userAnswersPayload.gamesessionID = this.sessionID;
        let parsedobj = JSON.parse(JSON.stringify(this.userAnswersPayload));
        ls.set("encryptedUserAnswers", parsedobj, {
          encrypt: true,
        });
        await this.persistupdateUserAnswers(ls.get("triviaQuestionsList"));
        await this.$router.push("/loading-score");
      }
      // end of loading answer to state
    },
    async loadNextQuestion() {
      if (this.counter <= this.quiz.length) {
        this.counter += 1;
        this.isDisabled = false;
        this.canTimeout = true;
        this.showTimeout = false;
        this.forceRerender();
        this.resetTimer();
        this.showFeedback = false;
        this.diableTimeOut(false);
      }
    },
    userResponseLogic(correct) {
      if (correct === 1) {
        return "correct";
      } else if (correct === 0) {
        return "wrong";
      } else {
        return "timeout";
      }
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
    stopTimer() {
      this.timerInterval = setInterval(null);
    },
  },
  components: { RoundedCyanLoadingButton, BaseTimer, ConfirmationModal },
};
</script>

<style scoped>
.fun-fact {
  width: 30%;
  text-align: center;
}
.rainbow-text {
  background-image: linear-gradient(to left, violet, blue, red, blue);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 20px;
}
.center {
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.choices-container {
  background-color: beige;
  color: #160d3d;
  border-radius: 10px;
  border: none;
  padding: 10px;
  width: 80vw;
}
.continue-btn {
  background-color: #ffb500;
  color: #160d3d;
  border: none;
  /* margin-top: 10px; */
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  width: 80vw;
}
.text-choice {
  font-size: 1.2em;
  line-height: 14px;
  font-weight: 500;
  font-family: "Nunito Sans", sans-serif;
  /* identical to box height, or 100% */
  letter-spacing: 0.02em;
}
.resize-choices {
  width: auto;
  justify-content: center;
  text-align: center;
}
.quiz-content {
  padding: 20px;
  margin-top: 0px;
  min-height: 100vh;
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
@media only screen and (min-width: 600px) {
  .choices-container {
    background-color: beige;
    color: #160d3d;
    border-radius: 10px;
    border: none;
    padding: 10px;
    width: 30vw;
  }
  .continue-btn {
    background-color: #ffb500;
    color: #160d3d;
    border: none;
    /* margin-top: 10px; */
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    font-family: "Nunito Sans", sans-serif;
    width: 30vw;
  }
  .answer_display {
    color: #160d3d;
    margin-block: 5px;
    width: 40vw;
    text-align: center;
    background-color: beige;
    box-shadow: none;
    border-radius: 10px;
    padding: 15px;
  }
}
@media only screen and (max-width: 600px) {
  .answer_display {
    color: #160d3d;
    margin-block: 5px;
    width: 90%;
    text-align: center;
    background-color: beige;
    box-shadow: none;
    border-radius: 10px;
    padding: 15px;
  }
}
</style>
