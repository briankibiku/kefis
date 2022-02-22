<template>
  <div>
    <div class="row">
      <div class="col-3" style="padding-left: 90px; padding-top: 60px">
        <div style="text-align: left">
          <NuxtLink to="/home">
            <LogoPurple style="height: 27px; width: 120px" />
          </NuxtLink>
        </div>
        <LargeScreenNavBar />
      </div>
      <div class="col-9">
        <div v-if="userHasNeverPlayed" style="width: 240px">
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
          <p class="centered-container" v-if="$fetchState.pending">
            <b-spinner label="Spinning"></b-spinner>
          </p>
          <p v-else-if="$fetchState.error">
            An error occurred while fetching data
          </p>
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
        // { key: "picked", label: "Your Choice" },
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
    // "0722377917";
    this.userAnswers = await fetch(
      `http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=solo-play/show-my-answers&msisdn=${loggedINPhone}`,
    ).then((res) => res.json());
    if (this.userAnswers.has_played) {
      this.questionAnswers2 = this.userAnswers.resp;
      this.fillItemsList();
    } else {
      this.userHasNeverPlayed = true;
    }
  },
  methods: {
    ...mapActions({ startPersistance: "startPersistance" }),
    refreshPage() {
      this.$router.push("/my-answers");
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
