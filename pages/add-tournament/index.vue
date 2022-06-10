<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/tournament.png" height="80" width="80" />
            <div class="heading3">Add Tournament</div>
            <br />
            <div style="width: 320px">
              <input
                class="rounded-input"
                type="text"
                placeholder="Tournament Name"
                v-model="tournamentName"
                required
                style="margin-bottom: 10px"
              />
              <input
                class="rounded-input"
                type="text"
                placeholder="venue"
                v-model="venue"
                required
                style="margin-bottom: 10px"
              />
              <br />
              <RoundedCyanLoadingButton
                buttonText="Submit"
                @click="addTournament()"
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
    async addTournament() {},
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
