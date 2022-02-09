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

        <div id="col2">
          <!-- salutations, wallet card, statistics cards go here -->
          <div class="d-flex flex-row" style="margin-inline: 10em">
            <div class="col centered-container d-flex justify-content-around">
              <div class="row" style="flex-direction: column">
                <div class="heading3 padding-right-20">Buy Subscription</div>
                <div class="subheading3">Select plan you wish to buy today</div>

                <div
                  class="d-flex flex-row padding-10 justify-content-between"
                  style="margin-bottom: 10px"
                >
                  <b-button
                    class="rounded-button-cyan"
                    style="margin-right: 20px"
                    @click="buyBasicPlan()"
                  >
                    <div class="subheading4">Buy 4 sessions for KES 100/=</div>
                  </b-button>
                  <b-button
                    class="rounded-button-cyan"
                    @click="buyPremiumPlan()"
                  >
                    <div class="subheading4">Buy 8 sessions for KES 200/=</div>
                  </b-button>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>
    <div class="d-block d-sm-none d-none d-sm-block d-md-none" v-if="!loading">
      <div class="painted-background" style="padding: 20px">
        <NavigationBar />
        <div class="d-flex flex-row">
          <div class="col centered-container d-flex justify-content-around">
            <div class="row" style="flex-direction: column">
              <div class="heading3 padding-right-20">Buy Subscription</div>
              <div class="subheading3">Select plan you wish to buy today</div>

              <div
                class="d-flex flex-row padding-10 justify-content-between"
                style="margin-bottom: 10px"
              >
                <RoundedCyanArrowButton
                  @click="buyBasicPlan()"
                  buttonText="Buy 4 sessions for KES 100/="
                  showIcon="false"
                  style="margin-right: 20px; padding: 15px"
                />
                <RoundedCyanArrowButton
                  @click="buyPremiumPlan()"
                  buttonText="Buy 8 sessions for KES 200/="
                  showIcon="false"
                  style="padding: 15px"
                />
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
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
      return this.$router.push("/login");
    },
    async buyBasicPlan() {
      let userWalletBalance = this.$store.state.walletBalance;
      try {
        if (userWalletBalance >= 100) {
          this.loading = true;
          // credit user 100
          let creditUserResponse = await this.$axios.post(
            `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=100`,
          );
          console.log(creditUserResponse);
          // subscribe to 4 sessions
          let basicPlanResponse = await this.$axios.post(
            `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/daily-plan&user_id=${this.mswaliUserId}`,
          );
          console.log(basicPlanResponse);
          if (basicPlanResponse.data.status_message == "daily plan activated") {
            this.successBuyToast();
            await this.$store.dispatch("delayFiveSeconds");
            await this.$router.push("/home");
          } else {
            this.errorBuyToast();
          }
          console.log(basicPlanResponse);
        } else {
          this.failedBuyToast();
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
            `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/game-play&user_id=${this.mswaliUserId}&msisdn=${this.loggedInUserNumber}&gateway=INTERNAL&amount=200`,
          );
          console.log(creditUserResponse);
          // subscribe to 10 sessions
          let premiumPlanResponse = await this.$axios.post(
            `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/premium-daily-plan&user_id=${this.mswaliUserId}`,
          );
          console.log(premiumPlanResponse);
          if (
            premiumPlanResponse.data.status_message == "premium plan activated"
          ) {
            this.successBuyToast();
            await this.$store.dispatch("delayFiveSeconds");
            await this.$router.push("/home");
          } else {
            this.errorBuyToast();
          }
          console.log(premiumPlanResponse);
        } else {
          this.failedBuyToast();
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
  components: { RoundedCyanArrowButton },
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
