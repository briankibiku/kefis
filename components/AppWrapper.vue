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
            <!-- <RoundedGoldLoadingButton
              buttonText="Play NOW to WIN"
              style="font-size: 24px; font-weight: bold"
            /> -->
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      return this.$router.push("/email-login");
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
  },
  components: {
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
