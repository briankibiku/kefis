<template>
  <div>
    <div class="overlay" v-if="loading">
      <LoadingBar />
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
                    Good morning {{ this.$store.state.loggedinUserName }}!
                  </div>
                  <div class="subheading22">
                    {{ this.$store.state.loggedinUserPhone }}
                  </div>
                </div>
                <template>
                  <div class="card padding-10" style="margin-bottom: 20px">
                    <div class="heading4">Wallet Balance</div>
                    <div class="heading2">KSH {{ this.walletBalance }}</div>
                  </div>
                </template>
              </div>
              <!--Statistics area, quiz passed, fastest times go here-->
              <StatsCards />
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
    <div class="d-block d-sm-none d-none d-sm-block d-md-none" v-if="!loading">
      <div class="painted-background" style="padding: 20px">
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
          <a href="/notifications">
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
              <font-awesome-icon
                :icon="['fas', 'bell']"
                style="color: #fff"
              /></div
          ></a>
          <div class="centered-container">
            <div
              class="row centered-container"
              style="width: 100%; margin-right: 20px; margin-left: 20px"
            >
              <div class="col" style="text-align: left">
                <!-- wallet card go here -->
                <WalletCard />
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
                  <NudgeArea /><NudgeArea /><NudgeArea />
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
export default {
  data() {
    return {
      overallPoints: "2,000",
      userProfile: {},
      lastName: "",
      phoneNumber: "",
      showHideSpinner: true,
      largeScreen: true,
      loading: false,
      mswaliUserId: "",
      walletBalance: "",
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.loading = true;
      this.getuserName();
      this.loading = false;
    } else {
      this.navigateToLogin();
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      loggedinUserName: "loggedinUserName",
      loggedinUserPhone: "loggedinUserPhone",
      mswaliId: "mswaliId",
    }),
  },
  methods: {
    ...mapActions({
      peristAuthentication: "peristAuthentication",
      peristUserPhone: "peristUserPhone",
      peristUserName: "peristUserName",
      persistMswaliId: "persistMswaliId",
    }),
    async revokeAuthentication() {
      await this.peristAuthentication(false);
      await this.peristUserPhone("");
      await this.peristUserName("");
      return this.$router.push("/login");
    },
    navigateToLogin() {
      return this.$router.push("/login");
    },
    navigateToCategory() {
      return this.$router.push("/category");
    },
    async getuserName() {
      this.phoneNumber = this.$store.state.signUpPhone;
      let userProfile = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-user&username=mast&account_number=${this.phoneNumber}`,
      );
      let userName = userProfile.data.data.name;
      let phoneNumberFromApi = userProfile.data.data.account_number;
      let mswaliIdfromApi = userProfile.data.data.id;
      let splitName = userName.indexOf(" ");
      let lastNameFromApi = userName
        .slice(splitName + 1, userName.length)
        .trim();
      // persist username and phone number
      await this.peristUserPhone(phoneNumberFromApi);
      await this.peristUserName(lastNameFromApi);
      await this.persistMswaliId(mswaliIdfromApi);
      this.lastName = this.$store.state.loggedinUserName;
      this.phoneNumber = this.$store.state.loggedinUserPhone;
      await fetchWalletBalance();
    },
    async fetchWalletBalance() {
      this.mswaliUserId = this.$store.state.mswaliId;
      let response = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-balance&user_id=${this.mswaliUserId}`,
      );
      console.log("response");
      console.log(response);
      this.walletBalance = response.data.data;
    },
  },
  components: { NudgeArea, StatsCards, LoadingBar },
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
