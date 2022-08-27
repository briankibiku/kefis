<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <!--Big screen device code begins here-->
        <div
          class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
          style="padding: 40px"
        >
          <div class="row" style="padding-left: 0px">
            <div>
              <!-- salutations, wallet card, statistics cards go here -->
              <div class="d-flex flex-row" style="margin: auto">
                <BuySubscriptionComponent />
              </div>
            </div>
            <!--Search bar / Start quiz button / Profile  Ends here-->
          </div>
        </div>
        <div class="d-block d-sm-none d-none d-sm-block d-md-none">
          <div class="d-flex flex-row">
            <div class="col centered-container d-flex justify-content-around">
              <BuySubscriptionComponent />
            </div>
          </div>
        </div>
      </template>
    </AppWrapper>
  </div>
</template>

<script>
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import AppWrapper from "../../components/AppWrapper.vue";
import BuySubscriptionComponent from "../../components/BuySubscriptionComponent.vue";
export default {
  data() {
    return {
      text: `
          You have deposited Kshs 100.00
        `,
      mswaliUserId: this.$store.state.mswaliId,
      loggedInUserNumber: this.$store.state.loggedinUserPhone,
      loading: false,
    };
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
    }
  },
  methods: {
    navigateToLogin() {
      return this.$router.push("/email-login");
    },
    showMsgBoxTwo(prize) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(`Are you sure you want to buy ${prize} subscription?`, {
          title: "Quit quiz?",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          cancelVariant: "light",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (prize === 100) {
            this.buyBasicPlan();
          } else if (prize === 200) {
            this.buyPremiumPlan();
          }
        })
        .catch((err) => {
          // An error occurred
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
    async buydailyPlan() {
      let mswaliUserId = this.$store.state.mswaliId;
      let getbalanceproxy = `api/get-balance&user_id=${mswaliUserId}`;
      let userWalletBalance = await this.$axios.get(
        `/apiproxy/${getbalanceproxy}`,
      );
      if (userWalletBalance.data.data >= 50) {
        // step 6 if user has no credits and wallet balance >= rate notify user of insufficient balance
        // TODO: deduct the balance froom the wallet
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
          await this.$store.dispatch("delayFiveSeconds");
        }
      } else if (userWalletBalance.data.data < gameRate) {
        // stop loading
        this.loadAccountToast();
        await this.$store.dispatch("delayTwoSeconds");
        window.location.reload();
      }
    },
    async buyBasicPlan() {
      let userWalletBalance = this.$store.state.walletBalance;
      try {
        if (userWalletBalance >= 100) {
          this.loading = true;
          // credit user 100
          let creditUserResponse = await this.$axios.post(
            `/apiproxy/api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=100`,
          );
          // subscribe to 4 sessions
          let basicPlanResponse = await this.$axios.post(
            `/apiproxy/api/daily-plan&user_id=${this.mswaliUserId}`,
          );
          if (basicPlanResponse.data.status_message == "daily plan activated") {
            this.successBuyToast();
            await this.$store.dispatch("delayFiveSeconds");
            await this.$router.push("/home");
          } else {
            this.errorBuyToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else {
          this.failedBuyToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      } catch (e) {}
    },
    async buyPremiumPlan() {
      let userWalletBalance = this.$store.state.walletBalance;
      try {
        if (userWalletBalance >= 200) {
          this.loading = true;
          // credit user 200
          let creditUserResponse = await this.$axios.post(
            `/apiproxy/api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=200`,
          );
          // subscribe to 10 sessions
          let premiumPlanResponse = await this.$axios.post(
            `/apiproxy/api/premium-daily-plan&user_id=${this.mswaliUserId}`,
          );
          if (
            premiumPlanResponse.data.status_message == "premium plan activated"
          ) {
            this.successBuyToast();
            await this.$store.dispatch("delayFiveSeconds");
            await this.$router.push("/home");
          } else {
            this.errorBuyToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } else {
          this.failedBuyToast();
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
  components: {
    RoundedCyanArrowButton,
    ConfirmationModal,
    AppWrapper,
    BuySubscriptionComponent,
  },
};
</script>

<style scoped>
.hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #000;
  margin: 1em 0;
  padding: 0;
}
.left,
.right {
  padding-left: 40px;
  width: 25%;
}

.middle {
  width: 50%;
}
.column {
  float: left;
  padding: 10px;
  height: 150px; /* Should be removed. Only for demonstration */
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
</style>
