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
                @click="processFeedback()"
                style="width: 320px"
              />
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
      message: "",
      email: "",
      userName: "",
    };
  },
  methods: {
    showToast(toaster) {
      this.$bvToast.toast(`Thank you for your feedback, keep playing mSwali`, {
        title: `Feedback submitted successfully`,
        variant: "info",
        toaster: toaster,
        solid: true,
      });
    },
    async processFeedback() {
      this.showToast();
      await this.$store.dispatch("delayFourSeconds");
      this.$router.push("/feedback");
    },
  },
  components: { RoundedCyanLoadingButton },
};
</script>

<style>
.rounded-input {
  border: 1px solid #1ceded;
  border-color: #bbb;
  padding: 13px;
  border-radius: 20px;
}
</style>
