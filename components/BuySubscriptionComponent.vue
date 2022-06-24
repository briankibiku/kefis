<template>
  <div class="col d-flex justify-content-around">
    <div class="row" style="flex-direction: column">
      <div class="text-center">
        <img
          class="center-align-item"
          src="~/assets/subscription.png"
          alt="buy subscription"
          height="100"
          width="100"
        />
      </div>
      <div class="heading2 text-center">Buy Subscription</div>
      <div class="subheading text-center" style="padding-bottom: 10px">
        Select plan you wish to buy today
      </div>
      <div class="d-flex flex-row heading4 justify-content-center">
        <ConfirmationModal
          class="subscription-card"
          buttonText="Buy 1 play session for KES 50/= and proceed to play now"
          title="Confirm purchase"
          body="Buy 1 play session for KES 50/= and proceed to play now"
          action="success"
          isTextBtn="true"
          @click="buydailyPlan()"
          style="color: #fff"
        />
      </div>
      <div
        class="d-flex flex-row padding-10 justify-content-center heading4"
        style="margin-bottom: 10px"
      >
        <ConfirmationModal
          class="subscription-card"
          buttonText="Buy 4 play sessions for KES 100/= and proceed to play now"
          title="Confirm purchase"
          body="Buy 4 play sessions for KES 100/= and proceed to play now"
          action="success"
          isTextBtn="true"
          @click="buyBasicPlan()"
        />
        <div style="padding-right: 10px"></div>
        <ConfirmationModal
          class="subscription-card"
          buttonText="Buy 10 play sessions for KES 200/= and proceed to play now"
          title="Confirm purchase"
          body="Buy 10 play sessions for KES 200/= and proceed to play now"
          action="success"
          isTextBtn="true"
          @click="buyPremiumPlan()"
        />
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ls from "localstorage-slim";
export default {
  data() {
    return {
      mswaliUserId: this.$store.state.mswaliId,
      loggedInUserNumber: this.$store.state.loggedinUserPhone,
      disabledUser: this.$store.state.canNotify,
    };
  },
  computed: {
    ...mapState({
      canWinStatus: "canWinStatus",
      sessionDetails: "sessionDetails",
      triviaQuestions: "triviaQuestions",
    }),
  },
  methods: {
    ...mapActions({
      persistCanWinStatus: "persistCanWinStatus",
      persistSessionDetails: "persistSessionDetails",
      persistTriviaQuestions: "persistTriviaQuestions",
    }),
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
        title: `Subscription bought successfully`,
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
    sessionIsNotLiveToast(toaster) {
      this.$bvToast.toast(`The game will be on from 10AM-10PM, check later`, {
        title: `Session is not Live`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    async fetchSessionQuestions() {
      let sessionID = this.$store.state.sessionDetails.session.id.toString();
      let soloplayproxy = `solo-play/fetch-trivia-questions&session_id=${sessionID}`;
      let sessionQuestionsResponse = await this.$axios.get(
        `/apiproxy/${soloplayproxy}`,
      );

      ls.set("triviaQuestionsList", sessionQuestionsResponse.data.data, {
        encrypt: true,
      });
      await this.persistTriviaQuestions(ls.get("triviaQuestionsList"));
    },
    async fetchSessionDetails() {
      // if (this.disabledUser === 0) {
      // fetch session details
      let sessionresponseurl = `solo-play/get-solo-session&user_id=${this.mswaliUserId}`;
      let sessionResponse = await this.$axios.get(
        `/apiproxy/${sessionresponseurl}`,
      );
      return sessionResponse.data.session.id;
      // } else if (this.disabledUser === 1) {
      //   // stop loading
      //   this.errorGettingSessionToast();
      //   await this.$store.dispatch("delayTwoSeconds");
      //   window.location.reload();
      // }
    },
    async buydailyPlan() {
      try {
        let getbalanceproxy = `api/get-balance&user_id=${this.mswaliUserId}`;
        let userWalletBalance = await this.$axios.get(
          `/apiproxy/${getbalanceproxy}`,
        );
        // fetch session details
        let sessionresponseurl = `solo-play/get-solo-session&user_id=${this.mswaliUserId}`;
        let sessionResponse = await this.$axios.get(
          `/apiproxy/${sessionresponseurl}`,
        );
        await this.persistSessionDetails("");
        await this.persistSessionDetails(sessionResponse.data);
        await this.persistCanWinStatus(
          this.$store.state.sessionDetails.can_win,
        );
        let gameRate = this.$store.state.sessionDetails.session.rate;
        let sessionID = this.$store.state.sessionDetails.session.id;
        let isSessionLive = this.$store.state.sessionDetails.live;
        if (isSessionLive) {
          if (userWalletBalance.data.data >= gameRate) {
            // step 6 if user has no credits and wallet balance >= rate notify user of insufficient balance
            // TODO: deduct the balance froom the wallet
            let gameratesubscriptionurl = `api/game-play&user_id=${this.mswaliUserId}&amount=50`;
            let dailyPlanResponse = await this.$axios.post(
              `/apiproxy/${gameratesubscriptionurl}`,
            );
            if (dailyPlanResponse.data.status) {
              let sessionID = await this.fetchSessionDetails();
              await this.fetchSessionQuestions(sessionID);
              await this.infoToast();
              await this.$store.dispatch("delayFiveSeconds");
              await this.$router.push("/quiz");
            } else {
              await this.errorToast();
              await this.$store.dispatch("delayFiveSeconds");
            }
          } else if (userWalletBalance.data.data < gameRate) {
            // stop loading
            this.loadAccountToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else {
          //   defer player from buying sub before games is on
          await this.sessionIsNotLiveToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      } catch (e) {
        await this.errorToast();
      }
    },
    async buyBasicPlan() {
      try {
        let getbalanceproxy = `api/get-balance&user_id=${this.mswaliUserId}`;
        let userWalletBalance = await this.$axios.get(
          `/apiproxy/${getbalanceproxy}`,
        );
        // fetch session details
        let sessionresponseurl = `solo-play/get-solo-session&user_id=${this.mswaliUserId}`;
        let sessionResponse = await this.$axios.get(
          `/apiproxy/${sessionresponseurl}`,
        );
        await this.persistSessionDetails(sessionResponse.data);
        await this.persistCanWinStatus(
          this.$store.state.sessionDetails.can_win,
        );
        let sessionID = this.$store.state.sessionDetails.session.id;
        let isSessionLive = this.$store.state.sessionDetails.live;
        if (isSessionLive) {
          if (userWalletBalance.data.data >= 100) {
            // credit user 100
            let gameplay100url = `api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=100`;
            let gamePlayResponse = await this.$axios.post(
              `/apiproxy/${gameplay100url}`,
            );
            if (gamePlayResponse.data.status) {
              // subscribe to 4 sessions
              let dailyplanurl = `api/daily-plan&user_id=${this.mswaliUserId}`;
              let basicPlanResponse = await this.$axios.post(
                `/apiproxy/${dailyplanurl}`,
              );
              if (
                basicPlanResponse.data.status_message === "daily plan activated"
              ) {
                // serve questions if daily plan was bought sucessfully
                let sessionID = await this.fetchSessionDetails();
                await this.fetchSessionQuestions(sessionID);
                await this.infoToast();
                await this.$store.dispatch("delayTwoSeconds");
                await this.$router.push("/quiz");
              } else {
                this.errorBuyToast();
                await this.$store.dispatch("delayTwoSeconds");
              }
            } else {
              this.errorBuyToast();
              await this.$store.dispatch("delayTwoSeconds");
            }
          } else {
            this.failedBuyToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else {
          //session is not live
          await this.sessionIsNotLiveToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      } catch (e) {}
    },
    async buyPremiumPlan() {
      try {
        let getbalanceproxy = `api/get-balance&user_id=${this.mswaliUserId}`;
        let userWalletBalance = await this.$axios.get(
          `/apiproxy/${getbalanceproxy}`,
        );
        // fetch session details
        let sessionresponseurl = `solo-play/get-solo-session&user_id=${this.mswaliUserId}`;
        let sessionResponse = await this.$axios.get(
          `/apiproxy/${sessionresponseurl}`,
        );
        await this.persistSessionDetails(sessionResponse.data);
        await this.persistCanWinStatus(
          this.$store.state.sessionDetails.can_win,
        );
        let sessionID = this.$store.state.sessionDetails.session.id;
        let isSessionLive = this.$store.state.sessionDetails.live;
        if (isSessionLive) {
          if (userWalletBalance.data.data >= 200) {
            // credit user 200
            let gameplay200url = `api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=200`;
            let gameplay200response = await this.$axios.post(
              `/apiproxy/${gameplay200url}`,
            );
            if (gameplay200response.data.status) {
              // subscribe to 10 sessions
              let premiumplanurl = `api/premium-daily-plan&user_id=${this.mswaliUserId}`;
              let premiumPlanResponse = await this.$axios.post(
                `/apiproxy/${premiumplanurl}`,
              );
              if (
                premiumPlanResponse.data.status_message ===
                "daily plan activated"
              ) {
                // serve questions if daily plan was bought sucessfully
                let sessionID = await this.fetchSessionDetails();
                await this.fetchSessionQuestions(sessionID);
                await this.infoToast();
                await this.$store.dispatch("delayTwoSeconds");
                await this.$router.push("/quiz");
              } else {
                this.errorBuyToast();
                await this.$store.dispatch("delayTwoSeconds");
              }
            } else {
              this.errorBuyToast();
              await this.$store.dispatch("delayTwoSeconds");
            }
          } else {
            this.failedBuyToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else {
          //session is not live
          await this.sessionIsNotLiveToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      } catch (e) {}
    },
    successBuyToast(toaster) {
      this.$bvToast.toast(`You bought mSwali subscription successfully`, {
        title: `Subscription Successfully`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
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
    errorBuyToast(toaster) {
      this.$bvToast.toast(
        `Sorry, we encountered an error while trying to buy your subcription`,
        {
          title: `Error`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    failedBuyToast(toaster) {
      this.$bvToast.toast(
        `Top up your wallet to buy a subscription to play mSwali`,
        {
          title: `Insufficient Balance`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
  },
};
</script>

<style>
.subscription-card {
  margin-bottom: 20px;
  padding: 10px;
  width: 30vw;
  border-radius: 15px;
  box-shadow: 0 0 50px #ccc;
}
</style>
