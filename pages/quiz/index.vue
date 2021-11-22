<template>
  <div class="d-flex">
    <div v-if="showResults">I am results component</div>
    <div v-else>
      <div class="outer-wrapper container-fluid pl-0 pr-0">
        <div class="quiz-content">
          <!-- <Notification :message="this.error" v-if="error" /> -->
          <h1 style="text-align: center">
            Question-{{ this.counter + 1 }} of
            {{ this.quiz.length }}
          </h1>

          <b-row>
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
                <div class="question-item">
                  <p class="question-title text-center">
                    {{ this.quiz[this.counter].question }}
                  </p>
                </div>

                <div class="grid-container">
                  <div
                    class="choices"
                    v-for="item in this.quiz[this.counter].choices"
                    :key="item.label"
                  >
                    <center>
                      <p class="field">
                        <a
                          class="button"
                          v-on:click="goToNextQuestion(item.correct)"
                        >
                          <span v-if="item.correct" class="text-choice">
                            {{ item.choice }} . {{ item.answer_text }}</span
                          >
                          <span v-else class="text-choice">
                            {{ item.choice }} . {{ item.answer_text }}
                          </span>
                        </a>
                      </p>
                    </center>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="quiz-footer d-flex vh-20">
          <div
            class="
              footer-timer
              col
              d-flex
              justify-content-center
              align-items-center
              text-center
            "
          >
            <!-- <p>{{ this.$store.getters.calculteScore }} </p> -->
            <div>
              <p v-if="!$fetchState.pending">
                <center>
                  <BaseTimer />
                </center>
              </p>
              <a
                @click="showMsgBoxTwo"
                style="color: #bbb; padding-bottom: 20px"
                >Quit</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    this.quiz = await this.$store.state.test_quiz.data;
    // this.dummyQuiz = await fetch(
    //   "http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=api/fetch-all-questions"
    // ).then((res) => res.json());
    console.log(this.quiz);
    this.$store.commit("updateTrivia", this.quiz);
    console.log(this.$store.state.test_quiz.data);
  },
};
</script>

<style scoped>
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
  color: #1ceded;
  font-size: 20px;
  justify-content: center;
  /* text-align-last:justify; */
  font-style: normal;
  font-weight: 800;
  line-height: 36px;

  /* or 150% */
  letter-spacing: 0.03em;
}
</style>
