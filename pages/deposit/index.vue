<template>
  <div>
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      style="padding: 40px"
    >
      <div class="overlay" v-if="loading">
        <div style="margin: 20px">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
          <div>Loading...</div>
        </div>
      </div>
      <div class="overlay-home">
        <div style="margin: 20px">
          <div style="text-align: center">
            <div class="heading2" style="color: #fff">
              Hi {{ this.userName }}
            </div>
            <div class="subheading3" style="color: #fff; padding-bottom: 20px">
              How much would you wish to deposit?
            </div>
          </div>
          <div class="custom-modal">
            <div class="form-section">
              <form method="post">
                <div class="form-group">
                  <input
                    class="rounded-border-input"
                    type="number"
                    placeholder="KES 0.00"
                    v-model="depositAmount"
                    required
                    style="text-align: center"
                  />
                </div>
              </form>
            </div>
            <div>M-pesa</div>
          </div>
          <RoundedCyanArrowButton
            @click="processDeposit()"
            buttonText="Continue"
          />
          <div class="subheading3" style="margin-top: 20px">
            <a href="/wallet" style="color: #bbb">Back</a>
          </div>
        </div>
      </div>
    </div>
    <!--Small screen view-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="painted-background">
        <div class="overlay" v-if="loading">
          <div style="margin: 20px">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
        </div>

        <div style="padding: 20px">
          <div style="text-align: left">
            <a href="/wallet">
              <font-awesome-icon
                :icon="['fas', 'chevron-left']"
                style="color: #160d3d"
              />
            </a>

            <div class="heading2">{{ this.userName }}</div>

            <div class="subheading3">How much would you wish to deposit?</div>
          </div>
          <div style="margin: 20px">
            <div
              class="card center-align-content"
              style="
                height: 30vh;
                width: 80vw;
                padding: 30px;
                border-radius: 10px;
              "
            >
              <br />
              <div class="form-section">
                <form method="post">
                  <div class="form-group">
                    <input
                      class="rounded-border-input"
                      type="number"
                      placeholder="KES 0.00"
                      v-model="depositAmount"
                      required
                      style="text-align: center"
                    />
                  </div>
                </form>
              </div>
              <div class="subheading3">M-Pesa</div>
            </div>
            <br /><br />
            <RoundedCyanArrowButton
              @click="processDeposit()"
              buttonText="Continue"
            />
            <div class="subheading3" style="margin-top: 20px">
              <a href="/wallet" style="color: #bbb">Back</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
export default {
  data() {
    return {
      depositAmount: this.depositAmount,
      depositResponse: {},
      phoneNumber: "",
      loading: false,
      userName: this.$store.state.loggedinUserName,
      text: "",
      balanceAfterDeposit: "",
    };
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
    }
  },
  computed: {
    ...mapState({
      walletBalance: "walletBalance",
    }),
  },
  methods: {
    ...mapActions({
      persistwalletBalance: "persistwalletBalance",
    }),
    async navigate() {
      let makeDepositResponse = await this.$store.dispatch("makeDeposit");
      console.log(makeDepositResponse);
      return this.makeDepositResponse;
      // return this.$router.push("/category");
    },
    navigateToLogin() {
      return this.$router.push("/login");
    },
    async fecthUserBalance() {
      let mswaliUserId = this.$store.state.mswaliId;
      let response = await this.$axios.get(
        `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-balance&user_id=${mswaliUserId}`,
      );
      let balance = response.data.data;
      return balance;
    },
    async processDeposit() {
      if (!!this.depositAmount) {
        if (this.depositAmount > 0) {
          try {
            this.loading = true;
            let userProfile = await this.$store.dispatch("getuserProfile");
            this.phoneNumber = this.$store.state.loggedinUserPhone;
            const res = await this.$axios.get(
              `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/initiate-payment&account_number=${this.phoneNumber}&amount=${this.depositAmount}`,
            );
            console.log("Deposit ongoing.....");
            console.log(res.data);
            await this.$store.dispatch("delayThirtySeconds");
            let mswaliUserId = this.$store.state.mswaliId;
            let response = await this.$axios.get(
              `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-balance&user_id=${mswaliUserId}`,
            );
            let balance = response.data.data;
            let initialBalance = this.$store.state.walletBalance;
            let totalAfterDeposit =
              parseInt(this.depositAmount) + parseInt(initialBalance);
            console.log(
              "My balance after topping up" +
                balance +
                "  " +
                initialBalance +
                "  " +
                this.depositAmount,
            );
            if (balance == totalAfterDeposit) {
              let walletBalanceFromAPI = await Math.trunc(balance);
              await this.persistwalletBalance(walletBalanceFromAPI);
              this.walletBalanceFromAPI = this.$store.state.walletBalance;
              await this.depositSuccessfulToast();
              await this.$store.dispatch("delayFiveSeconds");
              await this.$router.push("/wallet");
            } else {
              await this.depositErrorToast();
              await this.$store.dispatch("delayFiveSeconds");
              await this.$router.push("/wallet");
            }
            this.loading = false;
          } catch (err) {
            console.log(err);
            this.loading = false;
            console.log("error occured while trying to deposit...");
          }
        } else {
          // you cannot deposit amount less than KSH
          this.inputErrorToast();
        }
      } else {
        this.inputErrorToast();
      }
    },
    depositErrorToast(toaster) {
      this.$bvToast.toast(
        `We had trouble completing your deposit transaction, kindly retry later`,
        {
          title: `Deposit Error`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    inputErrorToast(toaster) {
      this.$bvToast.toast(
        `Deposit amount is a required field. Make sure you fill it before proceeding`,
        {
          title: `Amount required`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    depositSuccessfulToast(toaster) {
      this.$bvToast.toast(`Deposit transaction successful`, {
        title: `Deposit successful`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
    },
  },
  components: { RoundedCyanArrowButton },
};
</script>
