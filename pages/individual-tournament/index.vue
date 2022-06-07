<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex" v-if="!tournamentExists">
          <div>
            <img src="~/assets/tournament.png" height="80" width="80" />
            <br /><br />
            <div class="subheading2">No active tournaments found</div>
            <a href="/tournament" class="subheading3">Go Back</a>
          </div>
        </div>
        <div class="center-align-item d-flex" v-if="tournamentExists">
          <div>
            <br /><br />
            <div class="heading3 text-left">Live/Ongoing Tournaments</div>
            <br />
            <div>
              <div class="d-flex flex-direction-row">
                <div
                  class="d-flex justify-content-between"
                  style="margin-right: 20px"
                >
                  <div>
                    <div class="heading4">
                      {{ tournaments.tournament_name }}
                    </div>
                    <div class="subheading3 text-left">
                      Start Date: {{ tournaments.start_date }} End Date:
                      {{ tournaments.start_date }}
                    </div>
                  </div>
                </div>
                <button
                  class="tournament-btn d-flex justify-content-start"
                  @click="navigateTo(tournament.route)"
                >
                  View
                </button>
              </div>
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
      tournaments: {},
      tournamentExists: false,
      startDate: "",
      endDate: "",
    };
  },
  mounted() {
    this.fetchTournaments();
  },
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
    async fetchTournaments() {
      let tournamentsResponse = await this.$axios.$get(
        `/apiproxy/team-play/get-tournament`,
      );
      this.tournaments = tournamentsResponse.data;
      console.log(this.tournaments);
      console.log("EXISTING TOURNAMENTS");
      if (tournamentsResponse.status) {
        this.tournamentExists = true;
        // this.startDate = this.tournaments.data.start_date.toUTCString();
        // this.endDate = this.tournaments.data.end_date.toUTCString();
      }
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
</style>
