<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
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
          <div class="row" style="padding-left: 0px">
            <div>
              <!-- salutations, wallet card, statistics cards go here -->
              <div class="d-flex flex-row" style="margin-inline: 10em">
                <div class="col d-flex justify-content-around">
                  <div class="row text-center" style="flex-direction: column">
                    <img
                      class="center-align-item"
                      src="~/assets/share.png"
                      alt="buy subscription"
                      height="80"
                      width="80"
                    />
                    <div class="heading2">Share</div>
                    <div class="subheading">
                      Enter number you wish to share with are receive referral
                      credits
                    </div>
                    <div>
                      <input
                        class="rounded-border-input"
                        type="number"
                        v-model="referralNumber"
                        placeholder="0712 345 678"
                        required
                        style="margin-bottom: 10px"
                      />
                    </div>
                    <RoundedCyanLoadingButton
                      @click="submit()"
                      buttonText="Share"
                    />
                    <br />
                    <div class="heading4 text-center">or</div>
                    <br />
                    <div class="heading4 text-center">
                      <img
                        src="~/assets/twitter.png"
                        height="30"
                        width="30"
                        alt=""
                      />
                      <a
                        href="https://twitter.com/intent/tweet?text=I%27m%20playing%20mSwali%20Join%20me%20at%20@mSwali_KE&url=http://quiz.mswali.co.ke/&hashtags=mSwali"
                        target="blank"
                        >Share on Twitter</a
                      >
                    </div>
                    <div
                      class="d-flex flex-row padding-10 justify-content-center"
                      style="margin-bottom: 10px"
                    ></div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <!--Search bar / Start quiz button / Profile  Ends here-->
          </div>
        </div>
        <div
          class="d-block d-sm-none d-none d-sm-block d-md-none"
          v-if="!loading"
        >
          <div
            class="align-center"
            style="flex-direction: column; margin-top: 20px"
          >
            <div>
              <img src="~/assets/share.png" alt="" height="80" width="80" />
            </div>
            <div class="heading3">Share</div>
            <div class="subheading3" style="margin-block: 10px">
              Enter number you wish to share with and receive referral credits
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
            <br />
            <div class="heading4 text-center">or</div>
            <div class="heading4 text-center">
              <img src="~/assets/twitter.png" height="30" width="30" alt="" />
              <a
                href="https://twitter.com/intent/tweet?text=I%27m%20playing%20mSwali%20Join%20me%20at%20@mSwali_KE&url=https://quiz.mswali.co.ke&hashtags=mSwali"
                target="blank"
                >Share on Twitter</a
              >
            </div>
            <br />
            <a @click="$router.back()" style="color: #bbb">Back</a>
            <br />
          </div>
        </div> </template
    ></AppWrapper>
  </div>
</template>

<script>
import RoundedCyanArrowButton from "../../components/Buttons/RoundedCyanArrowButton.vue";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
import AppWrapper from "../../components/AppWrapper.vue";
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
        let referralResponse = await this.$axios.post(
          `/apiproxy/api/refer-player&user_id=96601&phone_number=${this.referralNumber}`,
        );
        // check if player is already referred
        if (referralResponse.data.is_refered) {
          await this.failureReferalToast();
          await this.$store.dispatch("delayFiveSeconds");
          window.location.reload();
        } else {
          await this.successReferalToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      } else {
        this.referralNumberRequiredToast();
        await this.$store.dispatch("delayTwoSeconds");
        window.location.reload();
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
          variant: "info",
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
  components: { RoundedCyanArrowButton, RoundedCyanLoadingButton, AppWrapper },
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
