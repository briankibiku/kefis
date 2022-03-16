<template>
  <div class="col d-flex justify-content-around">
    <div class="row" style="flex-direction: column">
      <div class="text-center">
        <img
          class="center-align-item"
          src="~/assets/subscription.png"
          alt="buy subscription"
          height="120"
          width="120"
        />
      </div>
      <div class="heading2 text-center">Buy Subscription</div>
      <div class="subheading text-center">
        Select plan you wish to buy today
      </div>
      <div class="d-flex flex-row heading4 justify-content-center">
        <ConfirmationModal
          buttonText="Buy 1 session for KES 50/= and play"
          title="Buy 1 session"
          body="Buy 1 play session for KES 50/= and play"
          action="success"
          @click="buydailyPlan()"
        />
      </div>
      <div
        class="d-flex flex-row padding-10 justify-content-center heading4"
        style="margin-bottom: 10px"
      >
        <ConfirmationModal
          buttonText="Buy 4 sessions for KES 100/= and play"
          title="Buy 4 sessions"
          body="Buy 4 play sessions for KES 100/= and play"
          action="success"
          @click="buyBasicPlan()"
        />
        <div style="padding-right: 10px"></div>
        <ConfirmationModal
          buttonText="Buy 8 sessions for KES 200/= and play"
          title="Buy 8 sessions"
          body="Buy 8 play sessions for KES 200/= and play"
          action="success"
          @click="buyPremiumPlan()"
        />
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      mswaliUserId: this.$store.state.mswaliId,
      loggedInUserNumber: this.$store.state.loggedinUserPhone,
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
        title: `Game starting shortly`,
        variant: "info",
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
    async fetchSessionQuestions(sessionID) {
      let soloplayproxy = `solo-play/fetch-questions&session_id=${sessionID}  `;
      let sessionQuestionsResponse = await this.$axios.get(
        `/apiproxy/${soloplayproxy}`,
      );
      await this.persistTriviaQuestions(sessionQuestionsResponse.data.data);
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
        await this.persistSessionDetails(sessionResponse.data);
        await this.persistCanWinStatus(
          this.$store.state.sessionDetails.can_win,
        );
        let gameRate = this.$store.state.sessionDetails.session.rate;
        let sessionID = this.$store.state.sessionDetails.session.id;
        let isSessionLive = this.$store.state.sessionDetails.live;
        if (isSessionLive) {
          if (userWalletBalance.data.data >= 50) {
            // step 6 if user has no credits and wallet balance >= rate notify user of insufficient balance
            // TODO: deduct the balance froom the wallet
            let gameratesubscriptionurl = `api/game-play&user_id=${this.mswaliUserId}&amount=50`;
            let dailyPlanResponse = await this.$axios.post(
              `/apiproxy/${gameratesubscriptionurl}`,
            );
            if (dailyPlanResponse.data == null) {
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
            if (gamePlayResponse.data == null) {
              // subscribe to 4 sessions
              let dailtplanurl = `api/daily-plan&user_id=${this.mswaliUserId}`;
              let basicPlanResponse = await this.$axios.post(
                `/apiproxy/${dailtplanurl}`,
              );
              if (
                basicPlanResponse.data.status_message === "daily plan activated"
              ) {
                // serve questions if daily plan was bought sucessfully
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
          if (userWalletBalance >= 200) {
            this.loading = true;
            // credit user 200
            let gameplay200response = await this.$axios.post(
              `/apiproxy/api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=200`,
            );
            if (gameplay200response.data == null) {
              // subscribe to 10 sessions
              let premiumPlanResponse = await this.$axios.post(
                `/apiproxy/api/premium-daily-plan&user_id=${this.mswaliUserId}`,
              );
              if (
                premiumPlanResponse.data.status_message ==
                "premium plan activated"
              ) {
                // serve questions if daily plan was bought sucessfully
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
