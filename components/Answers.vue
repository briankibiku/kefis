<template>
  <div>
    <div class="row">
      <div>
        <div
          v-if="userHasNeverPlayed"
          class="center-align-item text-center"
          style="width: 240px"
        >
          <div>
            <img src="~/assets/win_big.png" alt="" />
            <div class="heading3 text-center">
              You have not played mSwali yet. play to view your answers
            </div>
            <RoundedCyanArrowButton
              @click="navigateToHome()"
              buttonText="Play Quiz"
            />
          </div>
        </div>
        <div v-if="!userHasNeverPlayed">
          <div class="d-flex flex-direction-row">
            <b-table
              striped
              hover
              :items="this.mergedAnswersList"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
            ></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RoundedCyanArrowButton from "./Buttons/RoundedCyanArrowButton.vue";
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
      userAnswers: [],
      items: [
        {
          question: [],
          answer: [],
          label: [],
          picked: [],
        },
      ],
      answerfields: [{ key: "picked", label: "Your Ans" }],
      fields: [
        "question",
        { key: "answer", label: "Answer" },
        { key: "label", label: "Correct Choice" },
        { key: "picked", label: "Your Choice" },
      ],
    };
  },
  mounted() {
    this.fecthAnswers();
  },
  computed: {
    ...mapState({
      userAnswersPayload: "userAnswersPayload",
    }),
    rows() {
      return this.questionAnswers.length;
    },
  },
  methods: {
    ...mapActions({ startPersistance: "startPersistance" }),
    refreshPage() {
      this.$router.push("/my-answers");
    },
    async fecthAnswers() {
      let loggedINPhone = this.$store.state.loggedinUserPhone;
      this.userAnswers = await this.$axios.$get(
        `/apiproxy/solo-play/show-my-answers&msisdn=${loggedINPhone}`,
      );
      let userAnswersz = { resp: [] };
      for (let i = 0; i < this.userAnswers.resp.length; i++) {
        if (this.userAnswers.choices_picked[i].timeout === 1) {
          this.items[0].picked.push({ picked: "Timeout" });
        } else if (this.userAnswers.choices_picked[i].timeout === 0) {
          this.items[0].picked.push({
            picked: this.userAnswers.choices_picked[i].picked,
          });
        }
      }
      this.mergedAnswersList = this.userAnswers.resp.map((item, i) =>
        Object.assign({}, item, this.items[0].picked[i]),
      );
      if (this.userAnswers.has_played) {
        this.questionAnswers2 = this.userAnswers.resp;
        // this.fillItemsList();
      } else {
        this.userHasNeverPlayed = true;
      }
    },
    async navigateToHome() {
      this.$router.push("/home");
    },
    async fillItemsList() {
      for (let i = 0; i < this.userAnswers.choices_picked.length; i++) {
        this.items[0].picked.push(this.userAnswers.choices_picked[i].picked);
        this.items[0].question.push(this.userAnswers.resp[i].question);
        this.items[0].answer.push(this.userAnswers.resp[i].answer);
        this.items[0].label.push(this.userAnswers.resp[i].label);
      }
    },
  },
  components: { RoundedCyanArrowButton },
};
</script>
