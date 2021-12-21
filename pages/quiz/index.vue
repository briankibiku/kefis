<template>
  <div>
    <div v-if="showResults">
      <Results />
    </div>
    <div v-else>
      <div class="outer-wrapper container-fluid pl-0 pr-0">
        <div class="quiz-content">
          <!-- <Notification :message="this.error" v-if="error" /> -->
          <div class="heading3" style="text-align: center; color: #fff">
            Question {{ this.counter + 1 }} of
            {{ this.quiz.length }}
          </div>
          <div class="center">
            <BaseTimer />
          </div>

          <b-row style="margin-top: 120px">
            <b-col>
              <p
                v-if="$fetchState.pending"
                class="container center-align-content"
              >
                <span class="loading"></span>
              </p>
              <p v-else-if="$fetchState.error">An error occurred :(</p>
              <div v-else class="card-content">
                <div class="center-align-content">
                  <img
                    src="~/assets/music.jpeg"
                    width="200"
                    height="100"
                    alt=""
                  />
                </div>

                <div class="position-bottom">
                  <a
                    @click="showMsgBoxTwo"
                    style="color: #bbb; padding-bottom: 20px"
                    >Quit</a
                  >
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      counter: 0,
      number: 1,
      quiz_score: 0,
      wrong: 0,
      canWin: true,
      error: null,
      dummyQuiz: [],
      quiz: [],
      boxTwo: "",
      correctScore: 0,
      showResults: false,
    };
  },
  async fetch() {
    // this.quiz = await this.$store.state.test_quiz.data;
    this.quiz = await fetch(
      "http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/fetch-all-questions",
    ).then((res) => res.json());
    // this.quiz = this.quiz.data;
    await console.log("Questions");
    await console.log(this.quiz);
  },
  methods: {
    // Logic to loop through questions goes here
    goToNextQuestion(correct) {
      let nextQuestion = (this.counter += 1);
      if (correct) {
        this.correctScore = this.correctScore + 1;
        this.$store.commit("updateQuizScore", this.correctScore);
        console.log("Correct answers" + this.$store.state.trivia_score.correct);
      } else {
        this.wrong = this.wrong + 1;
        this.$store.commit("updateQuizWrongs", this.wrong);
        console.log("Wrong answers" + this.$store.state.trivia_score.wrong);
      }
      if (nextQuestion < this.quiz.length) {
        this.counter = nextQuestion;
      } else {
        this.showResults = true;
        console.log("Hello world");
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
  },
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
</style>
