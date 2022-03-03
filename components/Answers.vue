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
              :items="this.userAnswers.resp"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
            ></b-table>

            <b-table
              striped
              hover
              :items="this.userAnswers.choices_picked"
              :fields="answerfields"
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
      answerfields: [{ key: "picked", label: "Your Choice" }],
      fields: [
        "question",
        "answer",
        { key: "label", label: "Choice" },
        // { key: "picked", label: "Your Choice" },
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
      console.log(this.userAnswers);
      if (this.userAnswers.has_played) {
        this.questionAnswers2 = this.userAnswers.resp;
        this.fillItemsList();
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
      console.log("Herooku");
      console.log(this.items);
    },
  },
  components: { RoundedCyanArrowButton },
};
</script>
