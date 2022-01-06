<template>
  <div>
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      style="padding: 40px"
    >
      <div class="overlay">
        <div style="margin: 20px">
          <div style="text-align: center">
            <div class="heading2" style="color: #fff">Hi Doe</div>
            <div class="subheading3">How much would you wish to withdraw?</div>
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
                    style="text-align: center; border-bottom: 1px solid"
                  />
                </div>
              </form>
            </div>
            <div>M-pesa</div>
          </div>
          <button class="rounded-button-cyan" @click="goToHomePage()">
            <div class="subheading4">
              Continue
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </div>
          </button>
        </div>
      </div>
    </div>
    <!--Small screen view-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="painted-background">
        <div class="centered-container" v-if="loading">
          <div style="margin: 20px">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
            <div class="heading4">Loading...</div>
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

            <div class="heading2">Hi Doe</div>

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
              <img
                src="~/assets/mpesa.svg"
                style="margin: 10px"
                alt=""
                height="40"
                width="100"
              />
              <div class="subheading3">Enter amount you wish to withdraw</div>
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
            </div>
            <br /><br />
            <button class="rounded-button-cyan" @click="onSubmit()">
              <div class="subheading4">
                Continue

                <font-awesome-icon :icon="['fas', 'arrow-right']" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      withdrawAmount: this.withdrawAmount,

      depositResponse: {},

      phoneNumber: "",
      loading: false,

      text: "",
    };
  },
  mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.navigateToLogin();
    }
  },
  methods: {
    async navigate() {
      let makeDepositResponse = await this.$store.dispatch("makeDeposit");

      console.log(makeDepositResponse);

      return this.makeDepositResponse;

      // return this.$router.push("/category");
    },
    navigateToLogin() {
      return this.$router.push("/login");
    },

    async onSubmit() {
      try {
        this.loading = true;
        console.log(this.withdrawAmount);
        this.phoneNumber = this.$store.state.loggedinUserPhone;

        console.log(this.phoneNumber);
        let res = await this.$axios.post(
          `http://161.35.6.91/mswali/mswali_app/backend/web/index.php?r=api/log-payment-request&msisdn=${this.phoneNumber}&amount=${this.withdrawAmount}&type=WITHDRAWAL`,
        );

        this.loading = false;
        console.log("Withdraw request successful!!!");
        console.log(res.data);
      } catch (err) {
        console.log(err);

        console.log("error occured while trying to deposit...");
      }
    },
  },
};
</script>
