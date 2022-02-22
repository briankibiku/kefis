<template>
  <div>
    <div class="overlay-home" v-if="loading">
      <div style="margin: 20px">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
        <div>Loading...</div>
      </div>
    </div>
    <!--Big screen device code begins here-->
    <div
      v-if="!loading"
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
            <RoundedCyanLoadingButton
              @click="navigateToQuiz()"
              buttonText="Start Quiz"
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
          <div
            class="padding-top-20 padding-left-60 d-flex justify-content-around"
          >
            <div class="row" style="flex-direction: column">
              <div class="row d-flex justify-content-start">
                <div>
                  <div class="heading33 padding-right-20">
                    {{ this.greetings }}
                    {{ this.$store.state.loggedinUserName }}!
                  </div>
                  <div class="subheading22">
                    {{
                      this.$store.state.loggedinUserPhone.replace(/^.{3}/g, "0")
                    }}
                  </div>
                </div>
                <div
                  style="
                    margin-bottom: 20px;
                    padding: 20px;
                    width: 50vw;
                    border-radius: 15px;
                    box-shadow: 0 0 50px #ccc;
                  "
                >
                  <div class="d-flex justify-content-between">
                    <div class="heading4">Wallet Balance</div>
                    <div>
                      <b-button
                        style="background-color: transparent; border: none"
                        @click="toggleShowBalance()"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'eye']"
                          style="color: #91919f"
                        />
                      </b-button>
                    </div>
                  </div>
                  <div class="heading2" v-if="showBalance">
                    KES {{ this.walletBalanceFromAPI }}
                  </div>
                  <div v-if="!showBalance">
                    <div
                      class="heading4"
                      style="
                        font-size: 24px;
                        font-weight: 800;
                        font-family: 'Nunito Sans', sans-serif;
                        color: #160d3d;
                      "
                    >
                      ******
                    </div>
                  </div>
                  <div class="subheading4">
                    Credits: {{ this.creditsBalanceFromState }}
                  </div>
                </div>
              </div>
              <!--Statistics area, quiz passed, fastest times go here-->
              <StatsCards />
            </div>
          </div>
          <!--Nudge area promotions go here-->
          <div class="scrollable" style="display: flex; flex-direction: row">
            <img src="~/assets/promo.svg" height="320px" />
            <img src="~/assets/promo_two.svg" height="320px" />
            <img src="~/assets/promo_three.svg" height="320px" />
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>

    <!--Small screen device code begins here-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none" v-if="!loading">
      <div class="painted-background" style="padding: 20px">
        <NavigationBar />
        <div class="row" style="vertical-align: top">
          <div class="d-flex justify-content-between">
            <div class="column left">
              <b-avatar variant="light"></b-avatar>
            </div>

            <div class="column middle" style="text-align: left">
              <div class="heading3">
                {{ this.greetings }}{{ this.$store.state.loggedinUserName }}!
              </div>
              <div class="subheading2">
                {{ this.$store.state.loggedinUserPhone.replace(/^.{3}/g, "0") }}
              </div>
            </div>
            <a href="/notifications">
              <div
                class="column right"
                style="
                  background-color: #160d3d;
                  width: 50px;
                  height: 50px;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  display: flex;
                  border-radius: 10px;
                "
              >
                <font-awesome-icon
                  :icon="['fas', 'bell']"
                  style="color: #fff"
                /></div
            ></a>
          </div>
          <div class="centered-container">
            <div class="row" style="width: 100%; margin-inline: 20px">
              <div class="col">
                <!-- wallet card go here -->
                <div class="wallet-card">
                  <div class="d-flex justify-content-between">
                    <div class="subheading1">Wallet Balance</div>
                    <div>
                      <b-button
                        style="background-color: transparent; border: none"
                        @click="toggleShowBalance()"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'eye']"
                          style="color: #91919f"
                        />
                      </b-button>
                    </div>
                  </div>
                  <div class="heading2" v-if="showBalance">
                    KES {{ this.walletBalanceFromAPI }}
                  </div>
                  <div v-if="!showBalance">
                    <div
                      class="heading4"
                      style="
                        font-size: 24px;
                        font-weight: 800;
                        font-family: 'Nunito Sans', sans-serif;
                        color: #160d3d;
                      "
                    >
                      ******
                    </div>
                  </div>
                  <div class="subheading4">
                    Credits: {{ this.creditsBalanceFromState }}
                  </div>
                </div>
                <!-- start quiz button -->
                <div
                  class="col"
                  style="
                    margin-inline: 20px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                  "
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

                <!-- stats card go here -->
                <div
                  class="scrollable"
                  style="display: flex; flex-direction: row"
                >
                  <StatsCards />
                </div>
                <!-- promo & ads card go here -->
                <div
                  class="scrollable"
                  style="display: flex; flex-direction: row"
                >
                  <img src="~/assets/promo.svg" height="220px" />
                  <img src="~/assets/promo_two.svg" height="220px" />
                  <img src="~/assets/promo_three.svg" height="220px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NudgeArea from "../../components/NudgeArea.vue";
import StatsCards from "../../components/StatsCards.vue";
import LoadingBar from "../../components/LoadingBar.vue";
import Outline from "../../components/Buttons/Outline.vue";
import Flat from "../../components/Buttons/Flat.vue";
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
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
      creditsBalanceFromState: this.$store.state.userCredits,
      banner: "",
      prize: "",
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.loading = true;
      this.daySalutatuins();
      this.fetchWalletBalance();
      this.loading = false;
    } else {
      this.navigateToLogin();
    }
  },
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
    async updatefreeSession() {
      let mswaliUserId = this.$store.state.mswaliId;
      let response = await $http.$put(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/reduce-free-games&user_id=${this.mswaliUserId}`,
      );
      console.log(mswaliUserId);
      console.log(response);
      console.log("EARTH HACKED:::::::::::::::::::::::::::::::::;");
    },
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
      let response = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-balance&user_id=${mswaliUserId}`,
      );
      console.log("Fetching wallet balance");
      console.log(response.data);
      let walletBalanceFromAPI = await Math.trunc(response.data.data);
      let walletCreditsFromAPI = await response.data.credit_balance;
      await this.persistwalletBalance(walletBalanceFromAPI);
      await this.persistUserCredits(walletCreditsFromAPI);
      this.walletBalanceFromAPI = this.$store.state.walletBalance;
    },
    async fetchSessionQuestions(sessionID) {
      let sessionQuestionsResponse = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/fetch-questions&session_id=${sessionID}`,
      );
      await this.persistTriviaQuestions(sessionQuestionsResponse.data.data);
    },
    async deductGameSession() {
      // deduct a session from the user
      let deductGameSessionResponse = await this.$axios.post(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/deduct-free-games&user_id=${this.mswaliUserId}`,
      );
      if (
        deductGameSessionResponse.data.status_message ===
        "daily plan balance updated"
      ) {
        console.log("Playing with existing subscription");
        this.loading = true;
        await this.infoToast();
        await this.$store.dispatch("delayFiveSeconds");
        this.loading = false;
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
        let sessionResponse = await this.$axios.get(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=solo-play/get-solo-session&user_id=${this.mswaliUserId}`,
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
        console.log("sessionID " + sessionID);
        // step 2 check if the game session is live for user to play
        if (isSessionLive) {
          // step 3 check if rate is > 0 or = 0
          if (gameRate > 0) {
            // step 4 check if user has active subscriptions
            let userSubscriptionStatus = await this.$axios.get(
              `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/check-plan-status&user_id=${mswaliUserId}}`,
            );
            let userWalletBalance = await this.$axios.get(
              `http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=api/get-balance&user_id=${mswaliUserId}`,
            );
            // step 5 play with credits logic starts here
            if (userWalletBalance.data.credit_balance > 0) {
              // subtract a credit from user balance
              let creditDeduct = await this.$axios.post(
                `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/play-with-credit&user_id=${mswaliUserId}`,
              );
              if (creditDeduct.data.message == "credit redeemed successfully") {
                // if user has credits serve the questions and deduct a credit
                await this.fetchSessionQuestions(sessionID);
                console.log("TRACKING EARTH HACKED ::::::::::::::::::");
                await this.persistUserCredits(
                  parseInt(this.$store.state.userCredits) - 1,
                );
                // finish loading
                this.$nuxt.$loading.finish();
                await this.$router.push("/quiz");
                // save questions to serve in quiz page
              } else {
                console.log(
                  "We encountered a problem while trying to redeem your credits, kindly try again later.",
                );
                this.problemPlayingWithCreditToast();
              }
            } else {
              // step 6 if user has an active subscription serve the questions
              if (userSubscriptionStatus.data) {
                await this.fetchSessionQuestions(sessionID);
                await this.fetchWalletBalance();
                this.loading = false;
                console.log("User has an active subscription");
                // deduct a session from the user
                await this.deductGameSession();
              } else {
                console.log("Starting to buy::::::::::::::::::;; subscription");
                // step 7 if user has NO subscription check if user can afford buying a subscription starting with 200 else 100 else game rate. If true serve questions
                // credit user for 10 games if bal >= 200 else credit for 4 games if bal >= 100 else credit gamerate
                if (userWalletBalance.data.data >= 200) {
                  // credit user 200
                  let creditUserResponse = await this.$axios.post(
                    `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=200`,
                  );
                  console.log(creditUserResponse);
                  // subscribe to 10 sessions
                  let premiumPlanResponse = await this.$axios.post(
                    `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/premium-daily-plan&user_id=${this.mswaliUserId}`,
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
                  let gamePlayResponse = await this.$axios.post(
                    `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=100`,
                  );
                  if (gamePlayResponse.data == null) {
                    console.log("Buying 100 KES subscription");
                    // subscribe to 4 sessions
                    let basicPlanResponse = await this.$axios.post(
                      `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/daily-plan&user_id=${this.mswaliUserId}`,
                    );
                    console.log(basicPlanResponse);
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
                    console.log("100 sub not bught");
                    this.errorBuyToast();
                  }
                } else if (userWalletBalance.data.data > gameRate) {
                  // step 6 if user has no credits and wallet balance >= rate notify user of insufficient balance
                  // TODO: deduct the balance froom the wallet
                  console.log("Buying 50 boob subscription");
                  let dailyPlanResponse = await this.$axios.post(
                    `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/game-play&user_id=${this.mswaliUserId}&amount=50`,
                  );
                  if (dailyPlanResponse.data == null) {
                    await this.fetchWalletBalance();
                    await this.fetchSessionQuestions(sessionID);
                    await this.deductGameSession();
                  } else {
                    await this.errorToast();
                    console.log(
                      "Problem faced while buying daily plan subscription",
                    );
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
  components: {
    NudgeArea,
    StatsCards,
    LoadingBar,
    Outline,
    Flat,
    RoundedCyanArrowButton,
    RoundedCyanLoadingButton,
  },
};
</script>

<style scoped>
.centered-container {
  width: 100%;
  max-width: 600px;
  background-size: contain;
  margin: 0 auto;
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container-fluid-edited {
  width: auto;
  padding: 20px;
}
.column {
  float: left;
  padding: 10px;
  height: 150px; /* Should be removed. Only for demonstration */
}
.scrollable {
  max-width: 100%;
  overflow-x: scroll;
}

.left,
.right {
  width: 30%;
}

.middle {
  width: 40%;
  margin-inline: 5px;
}

.wallet-card {
  background: #fff;
  padding: 10px;
  margin: 20px;
  box-sizing: border-box;
  border-radius: 6px;
}
.stats-card {
  background: #fff;
  padding: 10px;
  margin-left: 30px;
  border-radius: 6px;
  text-align: center;
  justify-content: center;
  align-items: center;
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
/* Small Devices, Phones and Desktop screens*/
@media only screen and (min-width: 780px) {
  .container-fluid-edited {
    padding-left: 200px;
    padding-right: 200px;
  }
}
@media only screen and (min-width: 1024px) {
  .container-fluid-edited {
    padding-left: 300px;
    padding-right: 300px;
  }
}

.winner-container {
  background-image: url("~/assets/win.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 200px;
  background-color: #160d3d;
  background-position: bottom;
  background-size: contain;
}
</style>
