<template>
  <div>
    <div>
      <div>
        <div class="row" style="width: 100%">
          <div class="heading3" style="padding-right: 40px; margin-left: 20px">
            <button
              class="text-button"
              style="height: 40px; font-weight: 600"
              @click="toggleViewFunction"
            >
              Top Players
            </button>
            <div
              v-if="!toggleView"
              style="height: 5px; background-color: #160d3d; width: 100%"
            ></div>
          </div>
          <div class="heading3">
            <button
              class="text-button"
              style="height: 40px; font-weight: 600"
              @click="toggleViewFunction"
            >
              Top Teams
            </button>
            <div
              v-if="toggleView"
              style="height: 5px; background-color: #160d3d; width: 100%"
            ></div>
          </div>
        </div>
        <div v-if="topScoreView">
          <b-table
            striped
            hover
            :items="this.topScores"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
          ></b-table>
        </div>

        <div v-if="!topScoreView">
          <b-table
            striped
            hover
            :items="this.topTeams"
            :fields="teamFields"
            :per-page="perPage"
            :current-page="teamCurrentPage"
          ></b-table>
        </div>

        <div v-if="topScoreView">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>

        <div v-if="!topScoreView">
          <p class="mt-3">
            Current Page: <b> {{ teamCurrentPage }} </b>
          </p>
          <b-pagination
            v-model="teamCurrentPage"
            :total-rows="teamRows"
            :per-page="teamPerPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      topScores: [],
      topTeams: [],
      perPage: 8,
      currentPage: 1,
      toggleView: false,
      teamPerPage: 8,
      teamCurrentPage: 1,
      topScoreView: true,
      fields: ["name", "score"],
      teamFields: ["team_name", "score"],
    };
  },
  loading: {
    color: "blue",
    height: "5px",
  },
  mounted() {
    this.fetchWinners();
  },
  methods: {
    toggleViewFunction() {
      this.toggleView ? (this.toggleView = false) : (this.toggleView = true);
      this.topScoreView
        ? (this.topScoreView = false)
        : (this.topScoreView = true);
    },
    async fetchWinners() {
      // if (!this.$store.state.topScoreSet) {
      this.topScores = await this.$axios.get(
        "/apiproxy/tournament-play/get-top-performers",
      );
      // this.topScores = this.topScores.data;
      //   getting of user answers payload to state
      this.$store.commit("updateTopScores", this.topScores.data);
      //   getting of top players from state
      this.topScores = this.$store.state.topScores.data;
      this.topTeams = await this.$axios.get(
        "/apiproxy/tournament-play/get-top-teams",
      );
      this.$store.commit("updateTopScoreSet", true);
      this.$store.commit("updateTopTeams", this.topTeams);
      // //   getting of top teams from state
      this.topTeams = this.$store.state.topTeams.data;
    },
  },
  computed: {
    rows() {
      return this.topScores.length;
    },
    teamRows() {
      return this.topTeams.length;
    },
  },
};
</script>

<style scoped>
.center-align-content {
  margin: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.underline {
  height: 10px;
  width: 120px;
  color: aqua;
}
</style>
