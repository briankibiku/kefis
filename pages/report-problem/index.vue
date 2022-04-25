<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/error.png" height="70" width="70" />
            <br /><br />
            <div class="heading3">Report Problem</div>
            <div class="subheading3">
              Your feedback helps us serve you better
            </div>
            <br />
            <div v-for="feedback in feedbacklist">
              <button
                class="feedback-btn d-flex justify-content-start"
                @click="navigateTo(feedback.route)"
              >
                <div class="d-flex justify-content-between">
                  <div>
                    <div class="heading4">{{ feedback.title }}</div>
                    <div class="subheading3 text-left">{{ feedback.body }}</div>
                  </div>
                </div>
              </button>
              <div class="divider"></div>
            </div>
          </div></div
      ></template>
    </AppWrapper>
  </div>
</template>

<script>
import AppWrapper from "../../components/AppWrapper.vue";
export default {
  data() {
    return {
      feedbacklist: [
        {
          title: "Problem with deposit",
          body: "Having trouble when attempting to deposit on mSwali?",
          route: "other-problem",
        },
        {
          title: "Problem with withdraw",
          body: "Having trouble when attempting to withdraw from mSwali?",
          route: "other-problem",
        },
        {
          title: "Problem with playing",
          body: "Had any problem playing mSwali?",
          route: "other-problem",
        },
        {
          title: "Other problem",
          body: "Report any other problem faced while engaging with mSwali?",
          route: "other-problem",
        },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
  },
  components: { AppWrapper },
};
</script>

<style>
.divider {
  height: 1px;
  margin-block: 10px;
  background-color: #160d3d;
  opacity: 20%;
}
.feedback-btn {
  background-color: transparent;
  border: none;
}
</style>
