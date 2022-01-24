<template>
  <div>
    <div class="overlay" v-if="loading">
      <div style="margin: 20px">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
        <div>Loading...</div>
      </div>
    </div>
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
      v-if="!loading"
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

        <div id="col2">
          <!-- salutations, wallet card, statistics cards go here -->
          <div class="centered-container" style="width: 320px">
            <div class="col d-flex justify-content-around">
              <div class="row" style="flex-direction: column">
                <div>
                  <img src="~/assets/share.png" alt="" height="80" width="80" />
                </div>
                <br />
                <div class="heading3">Share</div>
                <div class="subheading3" style="margin-block: 10px">
                  Enter number you wish to share with are receive referral
                  credits
                </div>
                <input
                  class="rounded-border-input"
                  type="number"
                  v-model="referralNumber"
                  placeholder="0712 345 678"
                  required
                  style="margin-bottom: 10px"
                />
                <RoundedCyanArrowButton
                  @click="submit()"
                  buttonText="Proceed"
                  style="width: 240px"
                />
                <br />
              </div>
            </div>
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>
    <div class="d-block d-sm-none d-none d-sm-block d-md-none" v-if="!loading">
      <div class="painted-background" style="padding: 20px">
        <div class="centered-container" style="width: 320px">
          <div class="col d-flex justify-content-around">
            <div class="row" style="flex-direction: column">
              <div>
                <img src="~/assets/share.png" alt="" height="80" width="80" />
              </div>
              <div class="heading3">Share</div>
              <div class="subheading3" style="margin-block: 10px">
                Enter number you wish to share with are receive referral credits
              </div>
              <input
                class="rounded-border-input"
                type="number"
                v-model="referralNumber"
                placeholder="0712 345 678"
                required
                style="margin-bottom: 10px"
              />
              <RoundedCyanArrowButton
                @click="submit()"
                buttonText="Proceed"
                style="width: 240px"
              />
              <br />
              <a href="/home" style="color: #bbb"> Home </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
export default {
  data() {
    return {
      referralNumber: "",
      loading: false,
    };
  },
  methods: {
    async submit() {
      if (!!this.referralNumber && this.referralNumber.length >= 10) {
        this.loading = true;
        let referralResponse = await this.$axios.post(
          `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/refer-player&user_id=96601&phone_number=${this.referralNumber}`,
        );
        // check if player is already referred
        if (referralResponse.data.is_refered) {
          await this.failureReferalToast();
          this.loading = false;
        } else {
          await this.successReferalToast();
          this.loading = false;
          await this.$store.dispatch("delayFiveSeconds");
        }
      } else {
        this.referralNumberRequiredToast();
      }
    },
    referralNumberRequiredToast(toaster) {
      this.$bvToast.toast(`Fill in the number to proceed`, {
        title: `Referral number required`,
        variant: "danger",
        toaster: toaster,
        solid: true,
      });
    },
    failureReferalToast(toaster) {
      this.$bvToast.toast(
        `${this.referralNumber} is already an mSwalian😊😊 `,
        {
          title: `Referral Unsuccessful`,
          variant: "danger",
          toaster: toaster,
          solid: true,
        },
      );
    },
    successReferalToast(toaster) {
      this.$bvToast.toast(`You referred ${this.referralNumber} successfully`, {
        title: `Referral Successful`,
        variant: "success",
        toaster: toaster,
        solid: true,
      });
    },
  },
  components: { RoundedCyanArrowButton },
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
</style>
