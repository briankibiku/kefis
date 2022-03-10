<template>
  <b-overlay
    :show="busy"
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
        navigateToQuiz();
      "
      style="width: 240px; background-color: #ffb500"
    >
      {{ buttonText }}
      <font-awesome-icon v-if="show" :icon="['fas', 'arrow-right']" />
    </b-button>
  </b-overlay>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      busy: false,
      timeout: null,
      show: false,
    };
  },
  props: {
    buttonText: String,
    showIcon: String,
    showloading: String,
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
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
      });
    },
    callback: function (e) {
      this.$emit("click", e);
    },
    showIconFunc() {
      this.showIcon == "true" ? (this.show = true) : (this.show = false);
    },
    async fetchWalletBalance() {
      await this.persistwalletBalance("");
      await this.persistUserCredits("");
      let mswaliUserId = this.$store.state.mswaliId;
      let getbalanceproxy = `get-balance&user_id=${mswaliUserId}`;
      let response = await this.$axios.get(`/api/${getbalanceproxy}`);
      console.log("Fetching wallet balance");
      console.log(response.data);
      let walletBalanceFromAPI = await Math.trunc(response.data.data);
      let walletCreditsFromAPI = await response.data.credit_balance;
      await this.persistwalletBalance(walletBalanceFromAPI);
      await this.persistUserCredits(walletCreditsFromAPI);
      this.walletBalanceFromAPI = this.$store.state.walletBalance;
    },
    async fetchSessionQuestions(sessionID) {
      let soloplayproxy = `solo-play/fetch-questions&session_id=${sessionID}  `;
      let sessionQuestionsResponse = await this.$axios.get(
        `/apiproxy/${soloplayproxy}`,
      );
      await this.persistTriviaQuestions(sessionQuestionsResponse.data.data);
    },
    async deductGameSession() {
      // deduct a session from the user
      let deductsessionproxy = `api/deduct-free-games&user_id=${this.mswaliUserId}`;
      let deductGameSessionResponse = await this.$axios.post(
        `/apiproxy/api${deductsessionproxy}`,
      );
      if (
        deductGameSessionResponse.data.status_message ===
        "daily plan balance updated"
      ) {
        console.log("Playing with existing subscription");
        await this.infoToast();
        await this.$store.dispatch("delayFiveSeconds");
        await this.$router.push("/quiz");
      } else {
        await this.errorToast();
        await this.$store.dispatch("delayFiveSeconds");
        await this.$router.push("/home");
      }
    },
    async navigateToQuiz() {
      // step 1 fetch game session for this user ---> done on otp/index.vue ln 288 and stored in state
      let mswaliUserId = this.$store.state.mswaliId;
      // start loading
      this.$nuxt.$loading.start();
      try {
        let sessionresponseurl = `solo-play/get-solo-session&user_id=${this.mswaliUserId}`;
        let sessionResponse = await this.$axios.get(
          `/apiproxy/${sessionresponseurl}`,
        );
        console.log("EARTH HACKED BY UKRAINE.............");
        console.log(sessionResponse);
        await this.persistSessionDetails(sessionResponse.data);
        await this.persistCanWinStatus(
          this.$store.state.sessionDetails.can_win,
        );
        this.banner = await this.$store.state.sessionDetails.banner;
        this.prize = await this.$store.state.sessionDetails.rate;
        let gameRate = this.$store.state.sessionDetails.session.rate;
        let sessionID = this.$store.state.sessionDetails.session.id;
        let isSessionLive = this.$store.state.sessionDetails.session.id;
        console.log("sessionID " + sessionID);
        // step 2 check if the game session is live for user to play
        if (isSessionLive) {
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
            // step 5 play with credits logic starts here
            if (userWalletBalance.data.credit_balance > 0) {
              // subtract a credit from user balance
              let playwithcreditsurl = `api/play-with-credit&user_id=${mswaliUserId}`;
              let creditDeduct = await this.$axios.post(
                `/apiproxy/${playwithcreditsurl}`,
              );
              if (creditDeduct.data.message == "credit redeemed successfully") {
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
                // deduct a session from the user
                await this.deductGameSession();
              } else {
                // step 7 if user has NO subscription check if user can afford buying a subscription starting with 200 else 100 else game rate. If true serve questions
                // credit user for 10 games if bal >= 200 else credit for 4 games if bal >= 100 else credit gamerate
                if (userWalletBalance.data.data >= 200) {
                  // credit user 200
                  let gameplay200url = `api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=200`;
                  let creditUserResponse = await this.$axios.post(
                    `/apiproxy/${gameplay200url}`,
                  );
                  console.log(creditUserResponse);
                  // subscribe to 10 sessions
                  let premiumplanurl = `api/premium-daily-plan&user_id=${this.mswaliUserId}`;
                  let premiumPlanResponse = await this.$axios.post(
                    `/apiproxy/${premiumplanurl}`,
                  );
                  console.log(premiumPlanResponse);
                  if (
                    basicPlanResponse.data.status_message ===
                    "daily plan activated"
                  ) {
                    // after buying a subscription serve the questions
                    await this.fetchSessionQuestions(sessionID);
                    await this.fetchWalletBalance();
                    this.loading = false;
                    await this.deductGameSession();
                  } else {
                    this.errorBuyToast();
                  }
                } else if (userWalletBalance.data.data >= 100) {
                  // credit user 100
                  let gameplay100url = `api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=100`;
                  let gamePlayResponse = await this.$axios.post(
                    `/apiproxy/${gameplay100url}`,
                  );
                  if (gamePlayResponse.data == null) {
                    console.log("Buying 100 KES subscription");
                    // subscribe to 4 sessions
                    let dailtplanurl = `api/daily-plan&user_id=${this.mswaliUserId}`;
                    let basicPlanResponse = await this.$axios.post(
                      `/apiproxy/${dailtplanurl}`,
                    );
                    if (
                      basicPlanResponse.data.status_message ===
                      "daily plan activated"
                    ) {
                      // serve questions if daily plan was bought sucessfully
                      await this.fetchSessionQuestions(sessionID);
                      // stop loading
                      await this.deductGameSession();
                    } else {
                      this.errorBuyToast();
                    }
                  } else {
                    console.log("100 sub not bught");
                    this.errorBuyToast();
                  }
                } else if (userWalletBalance.data.data > gameRate) {
                  // step 6 if user has no credits and wallet balance >= rate notify user of insufficient balance
                  // TODO: deduct the balance froom the wallet
                  console.log("Buying 50 boob subscription");
                  let gameratesubscriptionurl = `api/game-play&user_id=${this.mswaliUserId}&amount=50`;
                  let dailyPlanResponse = await this.$axios.post(
                    `/apiproxy/${gameratesubscriptionurl}`,
                  );
                  if (dailyPlanResponse.data == null) {
                    await this.fetchWalletBalance();
                    await this.fetchSessionQuestions(sessionID);
                    await this.infoToast();
                    await this.$store.dispatch("delayFiveSeconds");
                    await this.$router.push("/quiz");
                  } else {
                    await this.errorToast();
                  }
                } else if (userWalletBalance.data.data < gameRate) {
                  // stop loading
                  this.$nuxt.$loading.finish();
                  this.loadAccountToast();
                }
              }
            }
          } else if (gameRate == 0) {
            await this.fetchSessionQuestions(sessionID);
            console.log(freeSessionQuestions.data.data);
            // stop loading
            this.$nuxt.$loading.finish();
            await this.$router.push("/quiz");
          }
        } else {
          // stop loading
          this.sessionIsNotLiveToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      } catch (e) {
        // stop loading
        this.sessionIsNotLiveToast();
        await this.$store.dispatch("delayTwoSeconds");
        window.location.reload();
      }
    },
  },
};
</script>
