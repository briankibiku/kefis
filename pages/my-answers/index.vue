<template>
  <div class="container">
    <div v-if="userHasNeverPlayed">
      <div>You have not played mSwali yet. play to view your answers</div>
    </div>
    <div v-if="!userHasNeverPlayed">
      <div class="heading3">
        Your Answers
        <button
          class="primary-button"
          style="width: 100px; height: 40px"
          @click="refreshPage"
        >
          Refresh
        </button>
      </div>
      <b-table
        striped
        hover
        :items="this.questionAnswers2"
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
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      phoneNumber: "",
      perPage: 10,
      currentPage: 1,
      choicesPicked: [],
      questionAnswers: [],
      choicesPicked2: [],
      questionAnswers2: [],
      mergedAnswersList: [],
      userHasNeverPlayed: false,
      userAnswers: {},
      answersPayloadSet: this.$store.state.userAnswersPayloadSet,
      items: [
        {
          question: "What is the meaning of the word Nairobi?",
          answer: "Cool waters",
          label: "A",
          picked: "B",
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
  mounted() {
    if (this.userAnswersPayload == null && !this.userAnswers.has_played) {
      console.log("Fetched from state!!");
      this.choicesPicked = this.$store.state.userAnswersPayload.choices_picked;
      this.questionAnswers = this.$store.state.userAnswersPayload.resp;
      console.log(this.userAnswersPayload);
      for (let i = 0; i <= this.choicesPicked.length; i++) {}
    } else if (this.userAnswers.has_played) {
      this.userHasNeverPlayed = true;
    } else {
      console.log("FAILED to fetch from state!!");
      this.startPersistanceNow();
    }
  },
  computed: {
    ...mapState({
      userAnswersPayload: "userAnswersPayload",
    }),
    rows() {
      return this.questionAnswers.length;
    },
  },
  async fetch() {
    this.userAnswers = await fetch(
      "http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=0724609783",
    ).then((res) => res.json());
    console.log("Herooku");
    console.log(this.userAnswers.has_played);
    this.userAnswers = this.$store.state.answersResponse;
    this.choicesPicked2 = this.userAnswers.choices_picked;
    this.questionAnswers2 = this.userAnswers.resp;

    // for (let i = 0; i < 15; i++) {
    //   this.questionAnswers2.forEach((item) => {
    //     var result = questionAnswers2.map(function (el) {
    //       var o = Object.assign({}, el);
    //       o.isActive = this.choicesPicked2[i];
    //     });
    //   });
    //   console.log(this.questionAnswers2);
    // }
  },

  methods: {
    ...mapActions({ startPersistance: "startPersistance" }),
    startPersistanceNow() {
      this.$store.commit("updateUserAnswers", this.userAnswers);
      this.choicesPicked = this.$store.state.userAnswersPayload.choices_picked;
      this.questionAnswers = this.$store.state.userAnswersPayload.resp;
      this.startPersistance(this.userAnswersPayload);
    },
    async getUserAnswers() {
      this.phoneNumber = this.$store.state.loggedinUserPhone;
      this.userAnswers = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=${this.phoneNumber}`,
      );
      console.log("My answer now");
      console.log(this.userAnswers.has_played);
      return this.userAnswers.has_played;
    },
    refreshPage() {
      this.startPersistance(null);
      window.location.reload();
      this.startPersistance(this.userAnswers);
    },
  },
};
</script>
