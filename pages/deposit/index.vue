<template>
  <div>
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
    >
      <div class="colored-center-align-container">
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
          <ConfirmationModal
            buttonText="Continue"
            title="Confirm deposit"
            body="Are you sure you want to deposit"
            :extra="depositAmount"
            action="success"
            @click="processDeposit()"
          />
          <div class="subheading3" style="margin-top: 20px">
            <a @click="$router.back()" style="color: #bbb">Back</a>
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

            <div class="heading2">Hello, {{ this.userName }}</div>

            <div class="subheading3">Make a deposit</div>
          </div>
          <div style="margin: 20px">
            <div
              class="wallet-card center-align-content"
              style="
                height: 30vh;
                width: 80vw;
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
              "
            >
              <br />
              <div class="form-section">
                <div class="heading2">How much would you wish to deposit?</div>
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
                <div class="subheading3">M-Pesa</div>
              </div>
            </div>
            <br /><br />
            <ConfirmationModal
              buttonText="Continue"
              title="Confirm deposit"
              body="Are you sure you want to deposit"
              :extra="depositAmount"
              action="success"
              @click="processDeposit()"
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
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
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
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    async navigate() {
      let makeDepositResponse = await this.$store.dispatch("makeDeposit");
      return this.makeDepositResponse;
      // return this.$router.push("/category");
    },
    navigateToLogin() {
      return this.$router.push("/email-login");
    },
    async fecthUserBalance() {
      let mswaliUserId = this.$store.state.mswaliId;
      let getbalanceurl = `api/get-balance&user_id=${mswaliUserId}`;
      let response = await this.$axios.get(`/apiproxy/${getbalanceurl}`);
      let balance = response.data.data;
      return balance;
    },
    async processDeposit() {
      if (!!this.depositAmount) {
        if (this.depositAmount > 0) {
          try {
            this.busy = true;
            let userProfile = await this.$store.dispatch("getuserProfile");
            this.phoneNumber = this.$store.state.loggedinUserPhone;
            let depositurl = `api/initiate-payment&account_number=${this.phoneNumber}&amount=${this.depositAmount}`;
            const res = await this.$axios.get(`/apiproxy/${depositurl}`);
            await this.$store.dispatch("delayThirtySeconds");
            let mswaliUserId = this.$store.state.mswaliId;
            let getbalanceurl = `api/get-balance&user_id=${mswaliUserId}`;
            let response = await this.$axios.get(`/apiproxy/${getbalanceurl}`);
            let balance = Math.trunc(response.data.data);
            let initialBalance = this.$store.state.walletBalance;
            let totalAfterDeposit =
              parseInt(this.depositAmount) + parseInt(initialBalance);

            if (balance == totalAfterDeposit) {
              let walletBalanceFromAPI = await Math.trunc(balance);
              await this.persistwalletBalance(walletBalanceFromAPI);
              this.walletBalanceFromAPI = this.$store.state.walletBalance;
              await this.depositSuccessfulToast();
              await this.$store.dispatch("delayFourSeconds");
              await this.$router.push("/wallet");
            } else {
              await this.depositErrorToast();
              await this.$store.dispatch("delayFourSeconds");
              await this.$router.push("/wallet");
            }
            this.busy = false;
          } catch (err) {
            this.busy = false;
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
  components: { RoundedCyanLoadingButton, ConfirmationModal },
};
</script>
