<template>
  <div style="margin: 0 auto; min-height: 100vh">
    <div class="overlay" v-if="loading">
      <div style="margin: 20px">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
    </div>
    <div class="" style="padding: 20px">
      <div style="text-align: left">
        <a href="/wallet">
          <font-awesome-icon
            :icon="['fas', 'chevron-left']"
            style="color: #160d3d"
          />
        </a>

        <div class="heading2">Hi Doe</div>

        <div class="subheading3">How much would you wish to deposit?</div>
      </div>

      <div class="centered-container" style="align-items: flex-start">
        <div class="centered-container-top">
          <img src="" height="50" width="50" alt="" />

          <div class="heading3 padding-vertical-20">
            Enter amount you wish to deposit
          </div>

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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      depositAmount: this.depositAmount,

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
      const config = {
        headers: {
          Accept: "application/json",
        },
      };

      try {
        this.loading = true;
        console.log(this.depositAmount);

        let userProfile = await this.$store.dispatch("getuserProfile");

        this.phoneNumber = this.$store.state.loggedinUserPhone;

        console.log(this.phoneNumber);

        const res = await axios.get(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/initiate-payment&account_number=${this.phoneNumber}&amount=${this.depositAmount}`,

          config,
        );
        console.log("Your deposit goes here!!!");
        console.log(res);
      } catch (err) {
        console.log(err);

        console.log("error occured while trying to deposit...");
      }
    },
  },
};
</script>
