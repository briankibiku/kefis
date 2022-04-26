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
          <div
            class="padding-top-20 padding-left-60 d-flex justify-content-around"
          >
            <div class="row" style="flex-direction: column">
              <div class="row d-flex justify-content-start">
                <Salutations />
                <div class="wallet-card">
                  <div class="d-flex justify-content-between">
                    <div class="heading4">
                      Wallet Balance
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
                    <div class="subheading4">
                      Credits: {{ this.creditsBalanceFromState }}
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
                </div>
              </div>
              <!--Statistics area, quiz passed, fastest times go here-->
              <div>
                <img src="~/assets/stats.svg" alt="" height="220px" />
              </div>
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
      <div class="painted-background text-center">
        <NavigationBar />
        <!--Salutations go here-->
        <div class="row" style="padding: 20px; margin: auto">
          <div class="col-3">
            <b-avatar variant="light"></b-avatar>
          </div>
          <div class="col-6" style="text-align: left">
            <Salutations />
          </div>
          <div
            class="col-3"
            style="
              width: 50px;
              height: 50px;
              justify-content: center;
              align-items: center;
              text-align: center;
              display: flex;
              border-radius: 10px;
            "
          >
            <font-awesome-icon :icon="['fas', 'bell']" style="color: #160d3d" />
          </div>
        </div>
        <!--Day quiz info-->
        <div class="wallet-card text-center" style="margin: auto; width: 80%">
          <div>
            <div class="subheading2">
              {{ banner }}
            </div>
            <div class="center-align-content heading2 prize-card">
              KES {{ prize }}
            </div>
          </div>
        </div>
        <br />
        <!--Play Quiz button-->
        <RoundedGoldLoadingButton
          buttonText="Play NOW to WIN"
          showIcon="true"
          style="font-size: 24px; font-weight: bold"
        />
        <br />
        <br />
        <!-- wallet card go here -->
        <div class="wallet-card" style="margin: auto; width: 80%">
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
          <b-button class="outline-button" href="/deposit">Deposit</b-button>
        </div>
        <br />

        <!-- stats card go here -->
        <div class="scrollable" style="display: flex; flex-direction: row">
          <div>
            <img src="~/assets/stats.svg" alt="" height="220px" />
          </div>
        </div>
        <!-- promo & ads card go here -->
        <div class="scrollable" style="display: flex; flex-direction: row">
          <img src="~/assets/promo.svg" height="220px" />
          <img src="~/assets/promo_two.svg" height="220px" />
          <img src="~/assets/promo_three.svg" height="220px" />
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
import Salutations from "../../components/Salutations.vue";
import RoundedGoldLoadingButton from "../../components/RoundedGoldLoadingButton.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import NavigationBar from "../../components/NavigationBar/index.vue";
export default {
  data() {
    return {
      listenersStarted: false,
      idToken: "",
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
      allowBuySubscription: false,
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.daySalutatuins();
      this.fetchWalletBalance();
      this.getSessionDetails();
      this.startListeners();
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
    navigateToBuySubscription(allowBuySubscription) {
      if (allowBuySubscription) {
        showModal = true;
      } else {
        showModal = false;
      }
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
    showNotificationToast(title, body) {
      this.$bvToast.toast(`${body}`, {
        title: `${title}`,
        variant: "info",
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
    async getSessionDetails() {
      let sessionresponseurl = `solo-play/get-solo-session&user_id=${this.mswaliUserId}`;
      let sessionResponse = await this.$axios.get(
        `/apiproxy/${sessionresponseurl}`,
      );
      await this.persistSessionDetails(sessionResponse.data);
      await this.persistCanWinStatus(this.$store.state.sessionDetails.can_win);
      this.banner = await this.$store.state.sessionDetails.banner;
      this.prize = await this.$store.state.sessionDetails.session.prize;
    },

    // FCM NOTIFICATION FUNCTIONS
    async startListeners() {
      await this.startOnMessageListener();
      await this.startTokenRefreshListener();
      await this.requestPermission();
      await this.getIdToken();
      this.listenersStarted = true;
    },
    startOnMessageListener() {
      try {
        this.$fire.messaging.onMessage((payload) => {
          console.info("Message received : ", payload);
          console.log(payload.data.body);
        });
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    startTokenRefreshListener() {
      try {
        this.$fire.messaging.onTokenRefresh(async () => {
          try {
            await this.$fire.messaging.getToken();
          } catch (e) {
            console.error("Error : ", e);
          }
        });
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    async requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        console.log(permission);
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    async getIdToken() {
      try {
        this.idToken = await this.$fire.messaging.getToken();
      } catch (e) {
        console.error("Error : ", e);
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
    Salutations,
    RoundedGoldLoadingButton,
    ConfirmationModal,
    NavigationBar,
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
.prize-card {
  height: 40px;
  width: 60vw;
  color: #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #160d3d;
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
.wallet-card {
  margin-bottom: 20px;
  padding: 20px;
  width: 50vw;
  border-radius: 15px;
  box-shadow: 0 0 50px #ccc;
}
</style>
