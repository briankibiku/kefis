<template>
  <div class="container">
    <div class="centered-container" v-if="userHasNeverPlayed">
      <div>
        <img src="~/assets/win_big.png" alt="" />
        <div class="heading3">
          You have not played mSwali yet. play to view your answers
        </div>
        <RoundedCyanArrowButton
          @click="navigateToQuiz()"
          buttonText="Play Quiz"
        />
        <div>
          <a href="/home" style="color: #bbb">Back</a>
        </div>
      </div>
    </div>
    <div v-if="!userHasNeverPlayed">
      <p class="centered-container" v-if="$fetchState.pending">
        <b-spinner label="Spinning"></b-spinner>
      </p>
      <p v-else-if="$fetchState.error">An error occurred while fetching data</p>
      <div v-else>
        <div class="heading3" style="margin-top: 30px; margin-bottom: 10px">
          <a href="/home">
            <font-awesome-icon
              :icon="['fas', 'chevron-left']"
              style="color: #160d3d; margin-left: 20px; margin-right: 40px"
            />
          </a>
          Your Answers
          <b-button
            class="primary-button"
            style="width: 100px; height: 40px"
            @click="refreshPage()"
          >
            Refresh
          </b-button>
        </div>
        <b-table
          striped
          hover
          :items="this.userAnswers.resp"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
        ></b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>

        <a href="/home" style="color: #bbb">Back</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
export default {
  data() {
    return {
      phoneNumber: "",
      perPage: 10,
      currentPage: 1,
      choicesPicked: [],
      questionAnswers: [],
      mergedAnswersList: [],
      userHasNeverPlayed: false,
      isTable: false,
      picked: [],
      userAnswers: {},
      items: [
        {
          question: [],
          answer: [],
          label: [],
          picked: [],
        },
      ],
      fields: [
        "question",
        "answer",
        { key: "label", label: "Correct Choice" },
        { key: "picked", label: "Your Choice" },
      ],
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      userAnswersPayload: "userAnswersPayload",
    }),
    rows() {
      return this.questionAnswers.length;
    },
  },
  async fetch() {
    let loggedINPhone = this.$store.state.loggedinUserPhone;
    // "0721619818";
    this.userAnswers = await fetch(
      `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=${loggedINPhone}`,
    ).then((res) => res.json());
    this.questionAnswers2 = this.userAnswers.resp;
    this.fillItemsList();
  },
  methods: {
    ...mapActions({ startPersistance: "startPersistance" }),
    refreshPage() {
      window.location.reload();
    },
    async fillItemsList() {
      for (let i = 0; i < this.userAnswers.choices_picked.length; i++) {
        this.items[0].picked.push(this.userAnswers.choices_picked[i].picked);
        this.items[0].question.push(this.userAnswers.resp[i].question);
        this.items[0].answer.push(this.userAnswers.resp[i].answer);
        this.items[0].label.push(this.userAnswers.resp[i].label);
      }
      console.log("Herooku");
      console.log(this.items);
    },
  },
  components: { RoundedCyanArrowButton },
};
</script>
