<template>
  <div class="container">
    <p v-if="$fetchState.pending">
      <b-spinner label="Spinning"></b-spinner>
    </p>
    <p v-else-if="$fetchState.error">An error occurred while fetching data</p>
    <div v-else>
      <div class="heading3">Your Answers</div>
      <b-table
        striped
        hover
        :items="this.questionAnswers"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>

      <p class="mt-3">
        Current Page: <b> {{ currentPage }} </b>
      </p>
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
      userAnswersPayload: {},
      choicesPicked: [],
      questionAnswers: [],
      answersPayloadSet: this.$store.state.userAnswersPayloadSet,
      fields: [
        "question",
        "answer",
        { key: "label", label: "Correct Choice" },
        { key: "picked", label: "Your Choice" },
      ],
    };
  },

  computed: {
    ...mapState({
      persistedAnswers: "persistedAnswers",
    }),
  },
  async fetch() {
    this.userAnswersPayload = await fetch(
      "http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=0724609783",
    ).then((res) => res.json());
  },
  mounted() {
    if (
      this.persistedAnswers !== null &&
      this.$store.state.persistedAnswers !== null
    ) {
      console.log("Fetched answers from state!!");
      console.log(this.$store.state.userAnswersPayloadSet);

      // retrieve the user answers from state
      // this.choicesPicked = this.$store.state.persistedAnswers.choices_picked;
      // this.questionAnswers = this.$store.state.persistedAnswers.resp;
      this.choicesPicked = this.$store.state.answersResponse.choices_picked;
      this.questionAnswers = this.$store.state.answersResponse.resp;

    } else {
      this.fetchAnswersFromState();
    }
  },
  methods: {
    // persist to vuex store
    ...mapActions({
      persistAnswersState: "persistAnswersState",
    }),
    fetchAnswersFromState() {
      // check if any answers were already fetched and stored in state
      if (this.answersPayloadSet === false) {
        console.log(this.$store.state.userAnswersPayloadSet);
        console.log("Didn't fetched answers from state!!");
        //   Storing of usconsoleer answers payload to state
        this.persistAnswersState(this.userAnswersPayload);
        this.choicesPicked =
          this.$store.state.persistedAnswers.choices_picked;
        console.log(this.choicesPicked);
        console.log("Hello wold");
        this.questionAnswers = this.$store.state.persistedAnswers.resp;
        Array.prototype.push.apply(this.choicesPicked, this.questionAnswers);
        // let mergedResp = this.choicesPicked + this.questionAnswers;
      }
    },
  },

  computed: {
    rows() {
      return this.questionAnswers.length;
    },
  },
};
</script>
