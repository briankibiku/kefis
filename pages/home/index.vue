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
        <div id="col2" style="background-color: #fff">
          <div
            class="d-flex justify-content-around"
            style="height: 50px; background-color: #fff"
          >
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
            <!--Play Quiz button-->
            <!-- Admin buttons  -->
            <div
              v-if="
                this.isAdminUser === 1 &&
                this.istournamentLive === true &&
                this.remainingRounds > 0 &&
                !this.hasPlayed
              "
              :key="rebuildbutton"
            >
              <RoundedGoldLoadingButton
                buttonText="Session is live: Play Now & Win"
                disabled="false"
                style="font-size: 18px; font-weight: bold"
                :key="rebuildbutton"
              />
            </div>
            <div
              v-if="this.isAdminUser === 1 && this.istournamentLive === false"
              :key="rebuildbutton"
            >
              <BeginSessionLoadingButton
                buttonText="Let The Games Begin"
                disabled="false"
                style="font-size: 18px; font-weight: bold"
              />
            </div>

            <!-- Normal Player buttons  -->
        <div v-if="this.hasPlayed" class="heading4">You have already participated in this trivia. Please wait for the next round.</div>
            <div
              v-if="
                this.isAdminUser === 0 &&
                this.istournamentLive === true &&
                this.remainingRounds > 0 &&
                !this.hasPlayed
              "
              :key="rebuildbutton"
            >
              <RoundedGoldLoadingButton
                buttonText="Session is live: Play Now & Win"
                disabled="false"
                style="font-size: 18px; font-weight: bold"
                :key="rebuildbutton"
              />
            </div>
            <div
              v-if="this.isAdminUser === 0 && this.istournamentLive === false"
              :key="rebuildbutton"
            >
              <RoundedGoldLoadingButton
                buttonText="Game Not Live"
                disabled="true"
                style="font-size: 18px; font-weight: bold"
              />
            </div>
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
              </div>
              <!-- stats card go here -->
              <div class="wallet-card" style="width: 80%">
                <div
                  class="heading2 d-flex text-center justify-content-between"
                >
                  <span class="heading3" style="color: rgb(80, 79, 79)"
                    >Remaining Rounds :
                  </span>
                  <div style="color: #160d3d">{{ remainingRounds }}</div>
                </div>
              </div>
              <!-- Rounds -->
              <div>
                <br />
                <div class="heading3" style="text-align: left">
                  Round Scores
                </div>
                <br />
                <div>
                  <div
                    class="scrollable"
                    style="display: flex; flex-direction: row"
                  >
                    <div v-for="round in roundsScoreList">
                      <div
                        style="
                          background: #fff;
                          padding: 10px;
                          margin-right: 15px;
                          margin-bottom: 25px;
                          box-sizing: border-box;
                          border-radius: 6px;
                          box-shadow: 0 0 50px #fff;
                        "
                      >
                        <div>
                          <span class="points-heading">{{
                            round.score * 10
                          }}</span
                          >pts
                        </div>
                        <div class="round-title">Round {{ round.row }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
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
        <div class="row" style="padding: 10px; margin: 5px">
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
        <!--Play Quiz button-->
        <!-- Admin buttons  -->
        <div
          v-if="
            this.isAdminUser === 1 &&
            this.istournamentLive === true &&
            this.remainingRounds > 0 &&
            !this.hasPlayed
          "
          :key="rebuildbutton"
        >
          <RoundedGoldLoadingButton
            buttonText="Session is live: Play Now & Win"
            disabled="false"
            style="font-size: 18px; font-weight: bold"
            :key="rebuildbutton"
          />
        </div>
        <div
          v-if="this.isAdminUser === 1 && this.istournamentLive === false"
          :key="rebuildbutton"
        >
          <BeginSessionLoadingButton
            buttonText="Let The Games Begin"
            disabled="false"
            style="font-size: 18px; font-weight: bold"
          />
        </div>

        <!-- Normal Player buttons  -->
        <div
          v-if="
            this.isAdminUser === 0 &&
            this.istournamentLive === true &&
            this.remainingRounds > 0 &&
            !this.hasPlayed
          "
          :key="rebuildbutton"
        >
          <RoundedGoldLoadingButton
            buttonText="Session is live: Play Now & Win"
            disabled="false"
            style="font-size: 18px; font-weight: bold"
            :key="rebuildbutton"
          />
        </div>
        <div v-if="this.hasPlayed" class="heading4" style="text-align: center; padding-inline: 40px">You have already participated in this trivia. Please wait for the next round.</div>
        <div
          v-if="this.isAdminUser === 0 && this.istournamentLive === false"
          :key="rebuildbutton"
        >
          <RoundedGoldLoadingButton
            buttonText="Game Not Live"
            disabled="true"
            style="font-size: 18px; font-weight: bold"
          />
        </div>
        <br />
        <!-- stats card go here -->
        <div class="wallet-card" style="margin: auto; width: 80%">
          <div class="heading2 d-flex text-center justify-content-between">
            <span class="heading3" style="color: rgb(80, 79, 79)"
              >Remaining Rounds :
            </span>
            <div style="color: #160d3d">{{ remainingRounds  }}</div>
          </div>
        </div>

        <!-- ROunda -->
        <div>
          <br />
          <div class="heading3" style="text-align: left; padding-left: 40px">
            Round Scores
          </div>
          <br />
          <div v-if="this.noRoundsScore">You have not played any round yet.</div>
          <div v-if="!this.noRoundsScore">
            <div
              class="scrollable"
              style="display: flex; flex-direction: row; margin-left: 40px"
            >
              <div v-for="round in roundsScoreList">
                <div
                  style="
                    background: #fff;
                    padding: 10px;
                    margin-right: 15px;
                    margin-bottom: 25px;
                    box-sizing: border-box;
                    border-radius: 15px;
                    box-shadow: 0 0 50px #fff;
                  "
                >
                  <div>
                    <span class="points-heading">{{ round.score }}</span
                    >pts
                  </div>
                  <div class="round-title">Round {{ round.round }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div style="padding-inline: 30px;">
          <TopPlayers/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
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
import BeginSessionLoadingButton from "../../components/BeginSessionLoadingButton.vue";
import Winners from '../winners/index.vue';
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
      mswaliUserId:
        //  '141927',
        this.$store.state.mswaliId.toString(),
      walletBalanceFromState: "",
      creditsBalanceFromState: "",
      gameSubBalanceFromState: "",
      banner: "",
      prize: "",
      allowBuySubscription: false,
      isAdminUser: false,
      rebuildbutton: 0,
      customBtnText: "",
      isBtnDisabled: "",
      buttonText: null,
      disabled: null,
      timer: null,
      hasPlayed: null,
      istournamentLive: null,
      remainingRounds: "",
      roundsScoreList: [],
      noRoundsScore: null,
      teamID: null,
    };
  },
  async mounted() {
    if (this.$store.state.isAuthenticated) {
      await this.daySalutatuins();
      await this.isAlreadyTeamMember();
      await this.getTournamentDetails();
      await this.fetchUserDetails();
      // await this.getSessionDetails();
      await this.getRoundScore();
      await this.startListeners();
      this.timer = setInterval(async () => {
        if (this.istournamentLive === false) {
          await this.getTournamentDetails();
          await this.forceRerender()
          // this.istournamentLive === 1 && (await this.forceRerender());
        }
        if (this.istournamentLive === true) {
          await this.getTournamentDetails();
          await this.forceRerender();
        }
      }, 5000);
    } else {
      this.navigateToLogin();
    }
  },
  watch: {
    istournamentLive(newStatus) {
      // yes, console.log() is a side effect
      // console.log(`new agame status is: ${newStatus}`);
    },
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
      gameSubs: "gameSubs",
      canNotify: "canNotify",
      userDetails: "userDetails",
      tournamentDetails: "tournamentDetails",
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
      persistgameSubs: "persistgameSubs",
      peristCanNotify: "peristCanNotify",
      persistuserDetails: "persistuserDetails",
      persisttournamentDetails: "persisttournamentDetails",
    }),
    beforeDestroy() {
      clearInterval(this.timer);
    },
    forceRerender() {
      this.rebuildbutton += 1;
    },
    async getRoundScore() {
      try {
        let roundScoreResponse = await axios.get(
          `/apiproxy/tournament-play/rounds-score&user_id=${this.mswaliUserId}`,
        );
        if(Object.keys(roundScoreResponse.data).length === 0) {
          this.noRoundsScore = true;
        } else {
          this.noRoundsScore = false;
          this.roundsScoreList = roundScoreResponse.data.splice(0, 4);
        }
      } catch (error) {
        this.errorToast();
        this.$store.state.dispatch("delayFiveSeconds");
      }
    },
    toggleShowBalance() {
      if (this.showBalance) {
        this.showBalance = false;
      } else {
        this.showBalance = true;
      }
    },
    navigateToLogin() {
      return this.$router.push("/email-login");
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
    async fetchUserDetails() {
      await this.persistwalletBalance("");
      await this.persistUserCredits("");
      await this.$store.commit("updateTournamentUserDetails", "");
      let mswaliUserId = this.$store.state.mswaliId;
      let userProfile = await axios.get(
        `/apiproxy/api/get-user&username=mast&account_number=${this.$store.state.userDetails.personal.email}`,
      );
      let canNotifyUser = await userProfile.data.data.disabled;
      await this.peristCanNotify(canNotifyUser);
      try {
        // fetch user details
        let userProfileDetails = await axios.get(
          `/apiproxy/tournament-play/check-membership&user_id=${this.mswaliUserId}`,
        );
        if (userProfileDetails.data.status === true) {
          await this.$store.commit(
            "updateTournamentUserDetails",
            userProfileDetails,
          );
        } else {
          await this.addMemberToTeam();
        }
        // // await this.persistuserDetails(userProfileDetails)
        this.isAdminUser =
          this.$store.state.userDetails.tournament.data.roles.is_admin;
      } catch (e) {
        console.log("Error", e);
      }
    },
    async addMemberToTeam() {
      try {
        // get tournament details
        let res = await axios.get(`/apiproxy/tournament-play/get-tournament`);
        if (res.data.status === true) {
          // add member to team
          let response = await axios.post(
            `/apiproxy/tournament-play/add-member&user_id=${this.mswaliUserId}&team_id=${res.data.teams[0].id}`,
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async isAlreadyTeamMember() {
      let isTeamMemberResponse = await this.$axios.$get(
        `/apiproxy/tournament-play/check-membership&user_id=${this.mswaliUserId}`,
      );
      this.teamID = isTeamMemberResponse.data.id;
      if (isTeamMemberResponse.status) {
      } else {
        await this.joinTeamToast();
        await this.$store.dispatch("delayFiveSeconds");
        this.$router.push("/my-team");
      }
    },

    joinTeamToast(toaster) {
      this.$bvToast.toast(
        `You are not a member of a team yet, we are redirecting you to join a team.`,
        {
          title: `Join a team!`,
          variant: "info",
          toaster: toaster,
          solid: true,
        },
      );
    },
    async getTournamentDetails() {
      // get game on 
      let gameOnVariable = await axios.get(`/apiproxy/tournament-play/get-tournament`)
      // fetch tournament details
      let tournamentDetails = await axios.get(
        `/apiproxy/tournament-play/get-tournament-session&user_id=${this.mswaliUserId}`,
      );
      this.hasPlayed = tournamentDetails.data.has_played;
      await this.persisttournamentDetails(tournamentDetails);
      await this.fetchUserDetails();
      await gameOnVariable.data.teams.filter((team) => {if(team.id === this.teamID) { this.istournamentLive =  team.game_on;}})
      if (!tournamentDetails.data.live) {
        this.remainingRounds = tournamentDetails.data.remaining_rounds;
      } else {
        this.remainingRounds = tournamentDetails.data.remaining_rounds;
      }
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
    BeginSessionLoadingButton,
    Winners
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

.points-heading {
  font-size: 34px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.round-title {
  font-size: 14px;
  font-family: "Nunito Sans", sans-serif;
  color: rgb(80, 79, 79);
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
  padding: 20px;
  margin-inline: 5px;
  border-radius: 15px;
  box-shadow: 0 0 50px #ccc;
}
</style>
