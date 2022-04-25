<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/feedback.png" height="80" width="80" />
            <br /><br />
            <div class="heading3">Feedback</div>
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
          </div>
        </div> </template
    ></AppWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbacklist: [
        {
          title: "Rate Us",
          body: "Did you enjoy playing mSwali?",
          route: "rate-us",
        },
        {
          title: "Report problem",
          body: "Had any problem playing mSwali?",
          route: "report-problem",
        },
        {
          title: "General feedback",
          body: "Share your thoughts on mSwali?",
          route: "general-feedback",
        },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
  },
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
