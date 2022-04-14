<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/talk.png" height="80" width="80" />
            <div class="heading3">General Feedback</div>
            <div class="subheading3">
              Your feedback helps us serve you better
            </div>
            <br />
            <!--
            <div style="width: 320px">
              <input
                class="rounded-input"
                type="text"
                placeholder="Your name"
                v-model="userName"
                required
                style="margin-bottom: 10px"
              />
              <input
                class="rounded-input"
                type="emial"
                placeholder="email@example.com"
                v-model="email"
                required
                style="margin-bottom: 10px"
              />
              <br />
              <input
                class="rounded-input"
                type="textarea"
                placeholder="Feedback"
                v-model="message"
                required
                style="margin-bottom: 10px; height: 100px"
              />
              <RoundedCyanLoadingButton
                buttonText="Submit"
                @click=""
                style="width: 320px"
              />
            </div>
            -->
            <div class="question-title">
              {{ surveys[counter].question }}
            </div>
            <div
              v-for="item in surveys[counter].choices"
              :key="item.choice"
              class="text-left"
            >
              <input
                type="radio"
                :disabled="isDisabled"
                v-on:click="recordFeedback(item.choice, item.index)"
                style="margin-right: 10px"
              />
              {{ item.choice }}
            </div>
          </div>
        </div>
      </template>
    </AppWrapper>
  </div>
</template>

<script>
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
export default {
  data() {
    return {
      userName: "",
      email: "",
      message: "",
      counter: 0,
      isDisabled: false,
      surveys: this.$store.state.survey,
      phoneNumber: this.$store.state.loggedinUserPhone,
    };
  },
  methods: {
    // send feedback api
    async sendFeedback(questionNo, response) {
      await this.$axios.get(
        `/apiproxy/api/feedback&respondent=${this.phoneNumber}&question=${questionNo}&response=${response}`,
      );
    },

    feedbackSubmittedToast(toaster) {
      this.$bvToast.toast(`Thank you for your feedback, keep playing mSwali`, {
        title: `Feedback submitted successfully`,
        variant: "info",
        toaster: toaster,
        solid: true,
      });
    },
    async recordFeedback(choice, index) {
      try {
        if (this.counter < this.surveys.length - 1) {
          this.isDisabled = true;
          await this.sendFeedback(this.counter, index);
          this.counter += 1;
          this.isDisabled = false;
        } else if (this.counter < this.surveys.length) {
          this.isDisabled = true;
          await this.sendFeedback(this.counter, index);
          await this.feedbackSubmittedToast();
          await this.$store.dispatch("delayFourSeconds"),
            await this.$router.push("/feedback");
        }
      } catch (e) {
        console.log(e);
        await this.$router.push("/feedback");
      }
    },
  },
  components: {
    RoundedCyanLoadingButton,
  },
};
</script>

<style>
.rounded-input {
  border: 1px solid #1ceded;
  border-color: #bbb;
  padding: 13px;
  border-radius: 20px;
}
.question-title {
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
  font-size: 18px;
  font-weight: 800;
  line-height: 36px;
}
</style>
