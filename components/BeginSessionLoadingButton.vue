<template>
  <b-overlay
    :show="loading"
    rounded
    opacity="0.6"
    spinner-small
    spinner-variant="primary"
    class="d-inline-block"
    @hidden="onHidden"
  >
    <b-button
      class="rounded-button-cyan subheading4"
      ref="button"
      :disabled="busy"
      @click="
        // callback($event);
        onClick();
        activateTeamQuiz();
      "
      style="width: 260px"
    >
      {{ buttonText }}
    </b-button>
  </b-overlay>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ls from "localstorage-slim";
import axios from "axios";
export default {
  data() {
    return {
      busy: this.disabled === "true" ? true : false,
      loading: false,
      timeout: null,
      show: false,
      isSunday: false,
      mswaliUserId: this.$store.state.mswaliId,
      disabledUser: this.$store.state.canNotify,
      teadID: this.$store.state.userDetails.tournament.data.roles.team_id,
    };
  },
  props: {
    buttonText: String,
    showIcon: String,
    showloading: String,
    disabled: String,
  },
  mounted() {
    if (this.showIcon == "true") {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  computed: {
    ...mapState({
      walletBalance: "walletBalance",
      userCredits: "userCredits",
      canWinStatus: "canWinStatus",
      sessionDetails: "sessionDetails",
      triviaQuestions: "triviaQuestions",
    }),
  },
  methods: {
    ...mapActions({
      persistwalletBalance: "persistwalletBalance",
      persistUserCredits: "persistUserCredits",
      persistCanWinStatus: "persistCanWinStatus",
      persistSessionDetails: "persistSessionDetails",
      persistTriviaQuestions: "persistTriviaQuestions",
    }),
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    setTimeout(callback) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        callback();
      }, 60000);
    },
    onHidden() {
      // Return focus to the button
      this.$refs.button.focus();
    },
    onClick() {
      this.busy = true;
      this.loading = true;
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
        this.loading = true;
      });
    },
    callback: function (e) {
      this.$emit("click", e);
    },
    showIconFunc() {
      this.showIcon == "true" ? (this.show = true) : (this.show = false);
    },
    async activateTeamQuiz() {
      const res = await axios.post(
        `/apiproxy/tournament-play/activate-quiz&user_id=${this.mswaliUserId}&team_id=${this.teadID}`,
      );
      await this.$store.dispatch("delayFiveSeconds");
      await this.successToast();
      // window.location.reload();
    },
    async fetchWalletBalance() {
      try {
        await this.persistwalletBalance("");
        await this.persistUserCredits("");
        let mswaliUserId = this.$store.state.mswaliId;
        let getbalanceproxy = `get-balance&user_id=${mswaliUserId}`;
        let response = await this.$axios.get(
          `/apiproxy/api/${getbalanceproxy}`,
        );
        let walletBalanceFromAPI = await Math.trunc(response.data.data);
        let walletCreditsFromAPI = await response.data.credit_balance;
        await this.persistwalletBalance(walletBalanceFromAPI);
        await this.persistUserCredits(walletCreditsFromAPI);
        this.walletBalanceFromAPI = this.$store.state.walletBalance;
      } catch (e) {
        this.errorToast();
      }
    },
    async fetchSessionQuestions(sessionID) {
      try {
        let sessionID = this.$store.state.sessionDetails.session.id.toString();
        let soloplayproxy = `tournament-play/fetch-trivia-questions&session_id=${sessionID}`;
        let sessionQuestionsResponse = await this.$axios.get(
          `/apiproxy/${soloplayproxy}`,
        );
        ls.set("triviaQuestionsList", sessionQuestionsResponse.data.data, {
          encrypt: true,
        });
        // await this.persistTriviaQuestions(sessionQuestionsResponse.data.data);
        await this.persistTriviaQuestions(ls.get("triviaQuestionsList"));
      } catch (e) {
        this.errorToast();
        console.error(e);
      }
    },
    sessionIsNotLiveToast(toaster) {
      this.$bvToast.toast(
        `The game will be on from 10AM-10PM, check later thanks`,
        {
          title: `Session is not Live`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    errorGettingSessionToast(toaster) {
      this.$bvToast.toast(
        `We encoutered a problem while setting up your game, please try later`,
        {
          title: `Error`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    errorToast(toaster) {
      this.$bvToast.toast(
        `We encountered an error while processing your request, try again later`,
        {
          title: `Error`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    infoToast(toaster) {
      this.$bvToast.toast(`Please wait as, game starts in a few seconds`, {
        title: `Game starting shortly`,
        variant: "info",
        toaster: toaster,
        solid: true,
      });
    },
    successToast(toaster) {
      this.$bvToast.toast(`You have started the quiz successfully!`, {
        title: `Game Activated Successfully`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
    },
    loadAccountToast(toaster) {
      this.$bvToast.toast(`Deposit to wallet to play mSwali`, {
        title: `Insufficient Balance`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    errorBuyToast(toaster) {
      this.$bvToast.toast(
        `Sorry, we encountered an error while trying to buy your suscription`,
        {
          title: `Error`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    noActiveSubscriptionToast(toaster) {
      this.$bvToast.toast(
        `Sorry, you do not have an active subscription. Redirecting to buy subscription page shortly...`,
        {
          title: `No active subscriptions`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    async deductGameSession() {
      // deduct a session from the user
      let deductsessionproxy = `api/deduct-free-games&user_id=${this.mswaliUserId}`;
      let deductGameSessionResponse = await this.$axios.post(
        `/apiproxy/${deductsessionproxy}`,
      );
      if (
        deductGameSessionResponse.data.status_message ===
          "daily plan balance updated" ||
        deductGameSessionResponse.data.status_message === "daily games balance "
      ) {
        await this.infoToast();
        await this.$store.dispatch("delayTwoSeconds");
        await this.$router.push("/quiz");
      } else {
        await this.errorToast();
        await this.$store.dispatch("delayFiveSeconds");
        await this.$router.push("/home");
      }
    },
    async navigateToQuiz() {
      // make sure you have reset your state to no values
      this.$store.commit("updateQuizScore", "");
      this.$store.commit("updateQuizWrongs", "");
      this.$store.commit("updateQuizTimeouts", "");
      // step 1 fetch game session for this user ---> done on otp/index.vue ln 288 and stored in state
      let mswaliUserId = this.$store.state.mswaliId;
      // start loading
      try {
        if (this.disabledUser === 0) {
          await this.persistSessionDetails("");
          let sessionresponseurl = `tournament-play/get-tournament-session&user_id=${this.mswaliUserId}`;
          let sessionResponse = await this.$axios.get(
            `/apiproxy/${sessionresponseurl}`,
          );
          // check if session has alredy been played/marked as complete
          if (sessionResponse.data.session.is_assigned === 0) {
            await this.persistSessionDetails(sessionResponse.data);
            await this.persistCanWinStatus(
              this.$store.state.sessionDetails.can_win,
            );
            this.banner = await this.$store.state.sessionDetails.banner;
            this.prize = await this.$store.state.sessionDetails.rate;
            let gameRate = this.$store.state.sessionDetails.session.rate;
            let sessionID = this.$store.state.sessionDetails.session.id;
            let isSessionLive = this.$store.state.sessionDetails.live;

            // check if it is sunday for the bible quiz
            var date = new Date();
            switch (date.getDay()) {
              case 0:
                this.isSunday = true;
                break;
              default:
                this.isSunday = false;
            }
            // step 2 check if the game session is live for user to play
            if (isSessionLive || this.isSunday) {
              // step 3 check if rate is > 0 or = 0
              if (gameRate > 0) {
                // step 4 check if user has active subscriptions
                let checkplanurl = `api/check-plan-status&user_id=${mswaliUserId}`;
                let userSubscriptionStatus = await this.$axios.get(
                  `/apiproxy/${checkplanurl}`,
                );
                let getbalanceproxy = `api/get-balance&user_id=${mswaliUserId}`;
                let userWalletBalance = await this.$axios.get(
                  `/apiproxy/${getbalanceproxy}`,
                );
                let creditsbalance = await Math.trunc(
                  userWalletBalance.data.credit_balance,
                );
                // step 5 play with credits logic starts here
                if (creditsbalance > 0) {
                  // subtract a credit from user balance
                  let playwithcreditsurl = `api/play-with-credit&user_id=${mswaliUserId}`;
                  let creditDeduct = await this.$axios.post(
                    `/apiproxy/${playwithcreditsurl}`,
                  );
                  if (
                    creditDeduct.data.message == "credit redeemed successfully"
                  ) {
                    // if user has credits serve the questions and deduct a credit
                    await this.fetchSessionQuestions(sessionID);
                    await this.persistUserCredits(
                      parseInt(this.$store.state.userCredits) - 1,
                    );
                    // finish loading
                    await this.$router.push("/quiz");
                    // save questions to serve in quiz page
                  } else {
                    this.problemPlayingWithCreditToast();
                  }
                } else {
                  // step 6 if user has an active subscription serve the questions
                  if (userSubscriptionStatus.data) {
                    await this.fetchSessionQuestions(sessionID);
                    await this.fetchWalletBalance();
                    await this.deductGameSession();
                    // deduct a session from the user
                  } else {
                    this.noActiveSubscriptionToast();
                    await this.$store.dispatch("delayFiveSeconds");
                    this.$router.push("/buy-subscription");
                  }
                }
              } else if (gameRate == 0) {
                await this.fetchSessionQuestions(sessionID);
                // stop loading
                await this.$router.push("/quiz");
              }
            } else {
              // stop loading
              this.sessionIsNotLiveToast();
              await this.$store.dispatch("delayTwoSeconds");
              window.location.reload();
            }
          } else {
            this.errorGettingSessionToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else if (this.disabledUser === 1) {
          // stop loading
          this.errorGettingSessionToast();
          // await this.$store.dispatch("delayTwoSeconds");
          // window.location.reload();
        }
      } catch (e) {
        // stop loading
        this.errorGettingSessionToast();
        // await this.$store.dispatch("delayTwoSeconds");
        // window.location.reload();
      }
    },
  },
};
</script>
