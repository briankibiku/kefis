<template>
  <div class="row">
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
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
            <LogoPurple style="height: 27px; width: 120px" />
          </div>
          <div style="text-align: left">
            <b-button
              class="rounded-button-transparent padding-top-20"
              style="text-align: left; background-color: transparent"
              @click="navigateToAnswers()"
            >
              <div class="menu">
                <font-awesome-icon :icon="['fas', 'question-circle']" />
                My Answers
              </div>
            </b-button>
            <b-button
              class="rounded-button-transparent"
              style="text-align: left; background-color: transparent"
              @click="navigateToWallet()"
            >
              <div class="menu">
                <font-awesome-icon :icon="['fas', 'wallet']" />
                Wallet
              </div>
            </b-button>
            <b-button
              class="rounded-button-transparent"
              style="text-align: left; background-color: transparent"
              @click="navigateToRankings()"
            >
              <div class="menu">
                <font-awesome-icon :icon="['fas', 'trophy']" />
                Rankings
              </div>
            </b-button>
            <b-button
              class="rounded-button-transparent"
              style="text-align: left; background-color: transparent"
              @click="navigateToSettings()"
            >
              <div class="menu">
                <font-awesome-icon :icon="['fas', 'cog']" />
                Settings
              </div>
            </b-button>
            <b-button
              class="rounded-button-transparent"
              style="text-align: left; background-color: transparent"
              @click="navigateToNotifications()"
            >
              <div class="menu">
                <font-awesome-icon :icon="['fas', 'bell']" />
                Notifications
              </div>
            </b-button>
            <b-button
              class="rounded-button-transparent"
              style="text-align: left; background-color: transparent"
              @click="navigateToSupport()"
            >
              <div class="menu">
                <font-awesome-icon :icon="['fas', 'headset']" />
                Support
              </div>
            </b-button>
            <b-button
              @click="revokeAuthentication()"
              class="rounded-button-transparent"
              style="
                background-position: bottom;
                background-color: transparent;
                text-align: left;
              "
            >
              <div
                class="menu"
                style="
                  position: fixed;
                  bottom: 0;

                  /* And if you want the div to be full-width: */
                  right: 0;
                "
              >
                <font-awesome-icon :icon="['fa', 'sign-out-alt']" />
                Logout
              </div>
            </b-button>
          </div>
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
                  placeholder="Search"
                  style="margin-bottom: 10px"
                />
              </div>
            </form>
            <b-button
              class="rounded-button-cyan"
              @click="navigateToCategory()"
              style="width: 150px"
            >
              <div class="subheading4">
                Start Quiz
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
              </div>
            </b-button>
            <div class="d-flex align-items-center" style="flex-direction: row">
              <button class="avatar margin-horizontal-20" @click="">
                <div class="subheading4"></div>
              </button>
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
                  <div class="heading3 padding-right-20">
                    Good morning {{ this.$store.state.loggedinUserName }}!
                  </div>
                  <div class="subheading2">
                    {{ this.$store.state.loggedinUserPhone }}
                  </div>
                </div>
                <div class="card padding-10">
                  <div class="heading4">Wallet Balance</div>
                  <div class="heading2">Ksh 100,0000</div>
                </div>
              </div>
              <!--Statistics area, quiz passed, fastest times go here-->
              <div
                class="d-flex justify-content-start"
                style="flex-direction: row"
              >
                <div class="stats-card">
                  <font-awesome-icon :icon="['fas', 'flag']" />
                  <div
                    class="heading4"
                    style="
                      text-align: center;
                      padding: 2px;
                      border-radius: 5px;
                      background-color: #f0f0f0;
                    "
                  >
                    Quiz Passed
                  </div>
                  <div
                    class="heading3"
                    style="padding-bottom: 0px; padding-top: 0px"
                  >
                    27
                  </div>
                  <div class="subheading5">Out of 30 questions</div>
                </div>
                <div class="stats-card">
                  <font-awesome-icon :icon="['fas', 'clock']" />
                  <div
                    class="heading4"
                    style="
                      text-align: center;
                      padding: 2px;
                      border-radius: 5px;
                      background-color: #f0f0f0;
                    "
                  >
                    Fastest time
                  </div>
                  <div
                    class="heading3"
                    style="padding-bottom: 0px; padding-top: 0px"
                  >
                    27 mins
                  </div>
                  <div class="subheading5">In under an hour</div>
                </div>
              </div>
            </div>
          </div>
          <!--Nudge area promotions go here-->
          <div class="scrollable" style="display: flex; flex-direction: row">
            <NudgeArea /><NudgeArea /><NudgeArea />
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>

    <!--Small screen device code begins here-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="painted-background">
        <NavigationBar />
        <div class="row" style="vertical-align: top">
          <div class="column left">
            <b-avatar variant="light"></b-avatar>
          </div>

          <div class="column middle" style="text-align: left">
            <div class="heading3">
              Good morning {{ this.$store.state.loggedinUserName }}!
            </div>
            <div class="subheading2">
              {{ this.$store.state.loggedinUserPhone }}
            </div>
          </div>
          <div
            class="column"
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
            <font-awesome-icon :icon="['fas', 'bell']" style="color: #fff" />
          </div>
          <div class="centered-container">
            <div
              class="row centered-container"
              style="width: 100%; margin-right: 20px; margin-left: 20px"
            >
              <div class="col" style="text-align: left">
                <!-- wallet card go here -->
                <div class="wallet-card">
                  <div class="heading4">Wallet Balance</div>
                  <div class="heading2">Ksh 100,0000</div>
                </div>

                <!-- start quiz button -->
                <div style="margin-inline: 20px; padding-bottom: 10px">
                  <button
                    class="rounded-button-cyan"
                    @click="navigateToCategory()"
                  >
                    <div class="subheading4">
                      Start Quiz
                      <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </div>
                  </button>
                </div>

                <!-- stats card go here -->
                <div class="row scrollable">
                  <div class="stats-card">
                    <font-awesome-icon :icon="['fas', 'flag']" />
                    <div
                      class="heading4"
                      style="
                        text-align: center;
                        padding: 2px;
                        border-radius: 5px;
                        background-color: #f0f0f0;
                      "
                    >
                      Quiz Passed
                    </div>
                    <div
                      class="heading3"
                      style="padding-bottom: 0px; padding-top: 0px"
                    >
                      27
                    </div>
                    <div class="subheading5">Out of 30 questions</div>
                  </div>
                  <div class="stats-card">
                    <font-awesome-icon :icon="['fas', 'clock']" />
                    <div
                      class="heading4"
                      style="
                        text-align: center;
                        padding: 2px;
                        border-radius: 5px;
                        background-color: #f0f0f0;
                      "
                    >
                      Fastest time
                    </div>
                    <div
                      class="heading3"
                      style="padding-bottom: 0px; padding-top: 0px"
                    >
                      27 mins
                    </div>
                    <div class="subheading5">In under an hour</div>
                  </div>
                </div>
                <!-- promo & ads card go here -->
                <div class="row scrollable">
                  <NudgeArea />
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
export default {
  data() {
    return {
      overallPoints: "2,000",
      userProfile: {},
      lastName: "",
      phoneNumber: "",
      showHideSpinner: true,
      largeScreen: true,
    };
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.showHideSpinner = false;
      this.getuserName();
    } else {
      this.navigateToLogin();
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      loggedinUserName: "loggedinUserName",
      loggedinUserPhone: "loggedinUserPhone",
    }),
  },
  methods: {
    ...mapActions({
      peristAuthentication: "peristAuthentication",
      peristUserPhone: "peristUserPhone",
      peristUserName: "peristUserName",
    }),
    async revokeAuthentication() {
      await this.peristAuthentication(false);
      await this.peristUserPhone("");
      await this.peristUserName("");
      return this.$router.push("/login");
    },
    async getuserName() {
      this.phoneNumber = this.$store.state.signUpPhone;
      let userProfile = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-user&username=mast&account_number=${this.phoneNumber}`,
      );
      console.log("userProfile");
      console.log(userProfile);
      let userName = userProfile.data.data.name;
      let phoneNumberFromApi = userProfile.data.data.account_number;
      let splitName = userName.indexOf(" ");
      let lastNameFromApi = userName
        .slice(splitName + 1, userName.length)
        .trim();
      // persist username and phone number
      await this.peristUserPhone(phoneNumberFromApi);
      await this.peristUserName(lastNameFromApi);
      this.lastName = this.$store.state.loggedinUserName;
      this.phoneNumber = this.$store.state.loggedinUserPhone;
    },
    navigateToAnswers() {
      return this.$router.push("/my-answers");
    },
    navigateToWallet() {
      return this.$router.push("/wallet");
    },
    navigateToNotifications() {
      return this.$router.push("/notifications");
    },
    navigateToSettings() {
      return this.$router.push("/settings");
    },
    navigateToSupport() {
      return this.$router.push("/support");
    },
    navigateToLogin() {
      return this.$router.push("/login");
    },
    navigateToRankings() {
      return this.$router.push("/winners");
    },
    navigateToCategory() {
      return this.$router.push("/category");
    },
  },
  components: { NudgeArea },
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
  /* white-space: nowrap; */
}

.left,
.right {
  padding-left: 40px;
  width: 25%;
}

.middle {
  width: 50%;
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
.promo-card {
  color: #160d3d;
  padding: 10px;
  margin-left: 30px;
  margin-top: 20px;
  width: 320px;
  height: 200px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  object-fit: fill;
  background: linear-gradient(to right bottom, #1ceded 20%, #160d3d 95%);
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
