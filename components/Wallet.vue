<template>
  <div>
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      style="padding: 0px"
    >
      <div class="row">
        <div id="col2">
          <!-- salutations, wallet card, statistics cards go here -->
          <div class="d-flex flex-row">
            <div class="col-3 winner-container" style="margin-top: 3em"></div>
            <div class="col-9 padding-left-60 d-flex justify-content-around">
              <div class="row" style="flex-direction: column">
                <div class="row">
                  <div>
                    <div class="heading3 padding-right-20">
                      {{ this.greetings }}
                      {{ this.$store.state.loggedinUserName }}!
                    </div>
                    <div class="subheading3">
                      Here is how your account is looking today
                    </div>
                  </div>
                </div>
                <br />
                <div
                  class="wallet-card"
                  style="margin-bottom: 20px; padding-left: 40px; width: 50vw"
                >
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
                    KES {{ this.walletBalanceFromState }}
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

                <!--Statistics area, quiz passed, fastest times go here-->
                <div class="d-flex justify-content-around">
                  <b-button
                    class="rounded-button"
                    @click="navigateToDeposit()"
                    style="background-color: #1ceded; color: #160d3d"
                  >
                    <div class="subheading4">Deposit</div>
                  </b-button>
                  <div style="padding: 10px"></div>
                  <b-button
                    class="rounded-button"
                    @click="navigateToWithdraw()"
                    style="background-color: #1ceded; color: #160d3d"
                  >
                    <div class="subheading4">Withdraw</div>
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>
    <!--Small screen begins here-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div style="padding: 20px">
        <div>
          <div class="row" style="padding-left: 20px">
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
              <font-awesome-icon
                :icon="['fas', 'bell']"
                style="color: #160d3d"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="text1 text-center">
            Here is how your account is looking today
          </div>
          <hr />

          <div class="wallet-card" style="margin: auto; width: 100%">
            <div
              class="d-flex flex-row padding-10 justify-content-between"
              style="margin-bottom: 10px"
            >
              <div>
                <div class="heading4">Wallet Balance</div>
                <div v-if="showBalance">
                  <div
                    class="heading4"
                    style="
                      font-size: 24px;
                      font-weight: 800;
                      font-family: 'Nunito Sans', sans-serif;
                      color: #160d3d;
                    "
                  >
                    KES {{ this.walletBalanceFromState }}
                  </div>
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
              <div>Credits: {{ this.creditsBalanceFromState }}</div>
            </div>
            <!--Statistics area, quiz passed, fastest times go here-->
            <div class="d-flex justify-content-around">
              <b-button
                class="rounded-button"
                @click="navigateToDeposit()"
                style="
                  background-color: #fff;
                  color: #160d3d;
                  border: 1px solid #abb3bb;
                "
              >
                <div class="subheading4">Deposit</div>
              </b-button>
              <div style="padding: 10px"></div>
              <b-button
                class="rounded-button"
                @click="navigateToWithdraw()"
                style="
                  background-color: #fff;
                  color: #160d3d;
                  border: 1px solid #abb3bb;
                "
              >
                <div class="subheading4">Withdraw</div>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Salutations from "./Salutations.vue";
export default {
  data() {
    return {
      walletBalanceFromState: this.$store.state.walletBalance,
      creditsBalanceFromState: this.$store.state.userCredits,
      mswaliUserId: "",
      showBalance: true,
      greetings: "",
    };
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
    }
    this.refreshBalance();
    this.daySalutatuins();
  },
  computed: {
    ...mapState({
      walletBalance: "walletBalance",
      userCredits: "userCredits",
    }),
  },
  methods: {
    ...mapActions({
      persistwalletBalance: "persistwalletBalance",
      persistUserCredits: "persistUserCredits",
    }),
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
      try {
        this.walletBalanceFromState = this.$store.state.walletBalance;
      } catch (e) {
        this.fetchBalanceErrorToast();
      }
    },
    async refreshBalance() {
      // fetch user balance from db to check if amount was deposited successfully
      let mswaliUserId = this.$store.state.mswaliId;
      let response = await this.$axios.get(
        `/apiproxy/api/get-balance&user_id=${mswaliUserId}`,
      );
      let walletBalanceFromAPI = await Math.trunc(response.data.data);
      await this.persistwalletBalance(walletBalanceFromAPI);
      let walletCreditsFromAPI = await response.data.credit_balance;
      await this.persistUserCredits(walletCreditsFromAPI);
      this.walletBalanceFromState = this.$store.state.walletBalance;
      this.creditsBalanceFromState = this.$store.state.userCredits;
    },
    fetchBalanceErrorToast(toaster, variant = null) {
      this.$bvToast.toast(
        "We encoundeted an error while trying to fetch your balance, try later",
        {
          title: `Balance Error`,
          variant: variant,
          toaster: toaster,
          solid: true,
        },
      );
    },
    toggleShowBalance() {
      if (this.showBalance) {
        this.showBalance = false;
      } else {
        this.showBalance = true;
      }
    },
    navigateToDeposit() {
      return this.$router.push("/deposit");
    },
    navigateToWithdraw() {
      return this.$router.push("/withdraw");
    },
    navigateToLogin() {
      return this.$router.push("/email-login");
    },
    makeToast(toaster, variant = null) {
      this.$bvToast.toast("Dev at work to bring this feature", {
        title: `Coming soon!`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
  },
  components: { Salutations },
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

.winner-container {
  background-image: url("~/assets/win.png");
  background-repeat: no-repeat;
  width: 300px;
  height: 260px;
  background-color: #160d3d;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
  display: flex;
  border-radius: 1em;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.transact-container {
  background-color: #fff;
  opacity: 80%;
  color: #160d3d;
  border-radius: 2em;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  border: 1px solid;
  border-color: #160d3d;
}
.user-title {
  font-size: 20px;
  justify-content: center;
  /* text-align-last:justify; */
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;

  /* or 150% */
  letter-spacing: 0.03em;
}
.label {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  /* identical to box height, or 157% */
  text-align: center;
  letter-spacing: 0.02em;
}
.text-mswali {
  color: #160d3d;
}
.container {
  box-sizing: border-box;
  padding: 20px;
}
.text-label2 {
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 61px;

  /* or 169% */
  text-align: center;
  letter-spacing: 0.03em;
}
.text-label3 {
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 36px;

  /* identical to box height, or 75% */
  text-align: center;
  letter-spacing: 0.03em;
}
</style>
