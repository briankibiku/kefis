<template>
  <div>
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      style="padding: 40px"
    >
      <div class="colored-center-align-container">
        <div style="margin: 20px">
          <div style="text-align: center">
            <div class="heading2" style="color: #fff">
              Hi {{ this.userName }}
            </div>
            <div class="subheading" style="color: #fff; padding-bottom: 20px">
              How much do you wish to withdraw?
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
                    v-model="withdrawAmount"
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
            title="Confirm withdraw"
            body="Are you sure you want to withdraw"
            :extra="withdrawAmount"
            action="success"
            @click="processWithdrawal()"
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

            <div class="heading2">Hi {{ this.userName }}</div>

            <div class="subheading3">How much would you wish to withdraw?</div>
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
                      v-model="withdrawAmount"
                      required
                      style="text-align: center"
                    />
                  </div>
                </form>
              </div>
              <div class="subheading3">M-Pesa</div>
            </div>
            <br /><br />
            <ConfirmationModal
              buttonText="Continue"
              title="Confirm withdraw"
              body="Are you sure you want to withdraw"
              :extra="withdrawAmount"
              action="success"
              @click="processWithdrawal()"
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
      withdrawAmount: this.withdrawAmount,
      depositResponse: {},
      phoneNumber: "",
      loading: false,
      transactionCost: "16",
      text: "",
      allowableWithdraw: "",
      maximumWithdrawable: "",
      userName: this.$store.state.loggedinUserName,
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
      return this.makeDepositResponse;
      // return this.$router.push("/category");
    },
    navigateToLogin() {
      return this.$router.push("/email-login");
    },
    async processWithdrawal() {
      // check if user has input amount they want to withdraw
      if (!!this.withdrawAmount) {
        if (this.withdrawAmount > 9) {
          try {
            this.loading = true;
            // check if user account has enough money to transact a withdrawal
            // withdrawal costs KSH 16
            // get wallet balance
            this.walletBalanceFromState = this.$store.state.walletBalance;
            // subtract amount they wish to withdraw + KSH 16 for the transaction and make sure the account does run a negative
            this.balanceAfterWithdraw =
              parseInt(this.walletBalanceFromState) -
              parseInt(this.transactionCost) -
              parseInt(this.withdrawAmount);
            // check if balanceAfterWithdraw is a negative and proceed with withdrawal
            // check for maximum amount user can withdraw
            if (this.walletBalanceFromState > this.transactionCost) {
              this.maximumWithdrawable =
                this.walletBalanceFromState - this.transactionCost;
            } else {
              this.maximumWithdrawable = "0";
            }
            this.balanceAfterWithdraw = parseInt(this.balanceAfterWithdraw);
            if (this.balanceAfterWithdraw < 0) {
              // decline  withdrawal request
              await this.withdrawErrorToast();
              await this.$store.dispatch("delayTwoSeconds");
              await this.$router.push("/wallet");
            } else {
              // allow withdrawl request
              this.phoneNumber = this.$store.state.loggedinUserPhone;
              let withdrawurl = `api/log-payment-request&msisdn=${this.phoneNumber}&amount=${this.withdrawAmount}&type=WITHDRAWAL`;
              let res = await this.$axios.post(`/apiproxy/${withdrawurl}`);
              console.log("Wallet BALANCE");
              console.log(res);
              if (res.data.status) {
                await this.persistwalletBalance(this.balanceAfterWithdraw);
                await this.withdrawSuccessfulToast();
                await this.$store.dispatch("delayFourSeconds");
                await this.$router.push("/wallet");
              } else {
                await this.errorWithdrawToast();
                await this.$store.dispatch("delayFourSeconds");
                await this.$router.push("/wallet");
              }
            }
          } catch (err) {
            await this.withdrawErrorToast();
            await this.$store.dispatch("delayFourSeconds");
            await this.$router.push("/wallet");
          }
        } else {
          this.amountErrorToast();
        }
      } else {
        // show required filled toast
        this.inputErrorToast();
      }
    },
    withdrawSuccessfulToast(toaster) {
      this.$bvToast.toast(`Withdraw transaction successful`, {
        title: `Withdrawal successful`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
    },
    errorWithdrawToast(toaster) {
      this.$bvToast.toast(
        `We encountered an error while processing your withdrawal`,
        {
          title: `Withdrawal Error`,
          variant: "success",
          toaster: toaster,
          solid: true,
        },
      );
    },
    amountErrorToast(toaster) {
      this.$bvToast.toast(`You cannot withdraw amount less than KSH 10`, {
        title: `Minimum withdraw limit`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    withdrawErrorToast(toaster) {
      this.$bvToast.toast(
        `You account does not have enough money to complete the transaction. Your withdraw limit is ${this.maximumWithdrawable}`,
        {
          title: `Insufficient balance`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    inputErrorToast(toaster) {
      this.$bvToast.toast(
        `Withdraw amount is a required field. Make sure you fill it before proceeding`,
        {
          title: `Amount required`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
  },
  components: {
    RoundedCyanArrowButton,
    RoundedCyanLoadingButton,
    ConfirmationModal,
  },
};
</script>
