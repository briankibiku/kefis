<template>
  <div>
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      style="padding: 40px"
    >
      <div class="row" style="padding-left: 50px">
        <!--Big screen sidebar navigation starts here-->
        <div
          id="col1"
          style="
            justify-content: center;
            align-items: center;
            text-align: center;
          "
        >
          <div style="text-align: left">
            <NuxtLink to="/home">
              <LogoPurple style="height: 27px; width: 120px" />
            </NuxtLink>
          </div>
          <LargeScreenNavBar />
        </div>
        <!--Big screen sidebar navigation starts here-->

        <!--Search bar / Start quiz button / Profile -->
        <div id="col2">
          <div class="d-flex justify-content-around" style="height: 50px">
            <form action="" class="padding-right-10">
              <div class="form-group">
                <input
                  class="rounded-border-input"
                  type="text"
                  placeholder="Search quiz..."
                  style="margin-bottom: 10px"
                />
              </div>
            </form>
            <RoundedGoldLoadingButton
              buttonText="Play NOW to WIN"
              style="font-size: 24px; font-weight: bold"
            />
            <div class="d-flex align-items-center" style="flex-direction: row">
              <b-button class="text-button margin-horizontal-20" @click="">
                <b-avatar variant="light"></b-avatar>
                <div class="subheading4"></div>
              </b-button>
              <div class="heading4">
                {{ this.$store.state.loggedinUserName }}
              </div>
            </div>
          </div>

          <!-- salutations, wallet card, statistics cards go here -->
          <div class="padding-top-20">
            <div class="row" style="flex-direction: column">
              <template>
                <!-- We want header content here -->
                <slot name="large-screen"></slot>
              </template>

              <!--Statistics area, quiz passed, fastest times go here-->
            </div>
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>

    <!--Small screen device code begins here-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="painted-background" style="padding: 20px">
        <NavigationBar />
        <div v-if="!smallandbigrequired">
          <template>
            <slot name="large-screen"></slot>
          </template>
        </div>
        <div v-if="smallandbigrequired">
          <template>
            <!-- We want header content here -->
            <slot name="small-screen"></slot>
          </template>

          <!-- start quiz button -->
          <div
            class="col"
            style="margin-inline: 20px; padding-top: 10px; padding-bottom: 10px"
          >
            <RoundedCyanArrowButton
              @click="navigateToQuiz()"
              buttonText="Start Quiz"
              style="
                position: fixed;
                bottom: 0;
                margin-block: 20px;

                /* And if you want the div to be full-width: */
                right: 0;
                left: 0;
                z-index: 9999;
                padding: 15px;
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RoundedCyanLoadingButton from "./Buttons/RoundedCyanLoadingButton.vue";
import RoundedGoldLoadingButton from "./RoundedGoldLoadingButton.vue";
export default {
  data() {
    return {
      overallPoints: "2,000",
      userProfile: {},
      lastName: this.$store.state.loggedinUserName,
      phoneNumber: this.$store.state.loggedinUserPhone,
      showHideSpinner: true,
      largeScreen: true,
      loading: false,
      greetings: "",
      showBalance: false,
      mswaliUserId: this.$store.state.mswaliId,
      walletBalanceFromAPI: this.$store.state.walletBalance,
      banner: "",
      prize: "",
      smallandbigrequired: false,
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.fetchWalletBalance();
      if (this.requiresSmallAndLargeScreenViews === "false") {
        this.smallandbigrequired = false;
      } else {
        this.smallandbigrequired = true;
      }
    } else {
      this.navigateToLogin();
    }
  },
  props: { requiresSmallAndLargeScreenViews: String },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      mswaliId: "mswaliId",
      walletBalance: "walletBalance",
      sessionDetails: "sessionDetails",
      triviaQuestions: "triviaQuestions",
      userCredits: "userCredits",
      canWinStatus: "canWinStatus",
    }),
  },
  methods: {
    ...mapActions({
      peristAuthentication: "peristAuthentication",
      persistMswaliId: "persistMswaliId",
      persistwalletBalance: "persistwalletBalance",
      persistSessionDetails: "persistSessionDetails",
      persistTriviaQuestions: "persistTriviaQuestions",
      persistUserCredits: "persistUserCredits",
      persistCanWinStatus: "persistCanWinStatus",
    }),
    toggleShowBalance() {
      if (this.showBalance) {
        this.showBalance = false;
      } else {
        this.showBalance = true;
      }
    },
    navigateToLogin() {
      return this.$router.push("/login");
    },

    paidSessionToast(toaster) {
      this.$bvToast.toast(`Buy credits to play`, {
        title: `Credits Required`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    problemPlayingWithCreditToast(toaster) {
      this.$bvToast.toast(`We encountered an error while trying to startyou`, {
        title: `Error`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    paidSessionToast(toaster) {
      this.$bvToast.toast(`Buy credits to play`, {
        title: `Credits Required`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    successBuyToast(toaster) {
      this.$bvToast.toast(
        `You have subscribed to regular game plan at 50 KES`,
        {
          title: `Subscription Successful`,
          variant: "success",
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
    sessionIsNotLiveToast(toaster) {
      this.$bvToast.toast(`The game will be on from 10AM-10PM, check later`, {
        title: `Session is not Live`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
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
    loadAccountToast(toaster) {
      this.$bvToast.toast(`Deposit to wallet to play mSwali`, {
        title: `Insufficient Balance`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    networkErrorToast(toaster) {
      this.$bvToast.toast(`Check your internet connection and try again`, {
        title: `No internet`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    async daySalutatuins() {
      var d = new Date();
      var time = d.getHours();

      if (time < 12) {
        this.greetings = "Morning ";
      } else if (time == 12) {
        this.greetings = "Afternoon ";
      } else if (time > 13 && time < 18) {
        this.greetings = "Afternoon ";
      } else if (time == 18) {
        this.greetings = "Evening ";
      } else if (time > 18) {
        this.greetings = "Evening ";
      }
      return this.greetings;
    },
    async fetchWalletBalance() {
      await this.persistwalletBalance("");
      await this.persistUserCredits("");
      let mswaliUserId = this.$store.state.mswaliId;
      let getbalanceproxy = `get-balance&user_id=${mswaliUserId}`;
      let response = await this.$axios.get(`/apiproxy/api/${getbalanceproxy}`);
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
      let deductsessionproxy = `deduct-free-games&user_id=${this.mswaliUserId}`;
      let deductGameSessionResponse = await this.$axios.post(
        `/apiproxy/api${deductsessionproxy}`,
      );
      if (
        deductGameSessionResponse.data.status_message ===
        "daily plan balance updated"
      ) {
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
        await this.persistSessionDetails(sessionResponse.data);
        await this.persistCanWinStatus(
          this.$store.state.sessionDetails.can_win,
        );
        this.banner = await this.$store.state.sessionDetails.banner;
        this.prize = await this.$store.state.sessionDetails.rate;
        let gameRate = this.$store.state.sessionDetails.session.rate;
        let sessionID = this.$store.state.sessionDetails.session.id;
        let isSessionLive = this.$store.state.sessionDetails.session.id;
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
                  // subscribe to 10 sessions
                  let premiumplanurl = `api/premium-daily-plan&user_id=${this.mswaliUserId}`;
                  let premiumPlanResponse = await this.$axios.post(
                    `/apiproxy/${premiumplanurl}`,
                  );
                  if (
                    basicPlanResponse.data.status_message ===
                    "daily plan activated"
                  ) {
                    // after buying a subscription serve the questions
                    await this.fetchSessionQuestions(sessionID);
                    await this.fetchWalletBalance();
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
                      this.$nuxt.$loading.finish();
                      await this.deductGameSession();
                    } else {
                      this.errorBuyToast();
                    }
                  } else {
                    this.errorBuyToast();
                  }
                } else if (userWalletBalance.data.data > gameRate) {
                  // step 6 if user has no credits and wallet balance >= rate notify user of insufficient balance
                  // TODO: deduct the balance froom the wallet
                  let gameratesubscriptionurl = `api/game-play&user_id=${this.mswaliUserId}&amount=50`;
                  let dailyPlanResponse = await this.$axios.post(
                    `/apiproxy/${gameratesubscriptionurl}`,
                  );
                  if (dailyPlanResponse.data == null) {
                    await this.fetchWalletBalance();
                    await this.fetchSessionQuestions(sessionID);
                    await this.deductGameSession();
                  } else {
                    await this.errorToast();
                  }
                } else if (userWalletBalance.data.data < gameRate) {
                  // stop loading
                  this.loadAccountToast();
                }
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
      } catch (e) {
        // stop loading
        this.networkErrorToast();
        await this.$store.dispatch("delayTwoSeconds");
        window.location.reload();
      }
    },
  },
  components: {
    RoundedCyanLoadingButton,
    RoundedGoldLoadingButton,
  },
};
</script>

<style scoped>
.column {
  float: left;
  padding: 10px;
  height: 150px; /* Should be removed. Only for demonstration */
}

.left,
.right {
  width: 30%;
}

.middle {
  width: 40%;
  margin-inline: 5px;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
}
#col1 {
  width: 20%;
}
#col2 {
  width: 80%;
}
.heading33 {
  font-size: 1.5vw;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}

.subheading22 {
  font-size: 1vw;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
</style>
