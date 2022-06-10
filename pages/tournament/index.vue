<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/tournament.png" height="80" width="80" />
            <br /><br />
            <div class="heading3">Are you up for competition?</div>
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
          title: "View Tournaments",
          body: "View and make changes to a tournament",
          route: "view-tournament",
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
