<template>
  <div>
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
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
          <div class="d-flex flex-row" style="margin-inline: 10em">
            <div class="centered-container" v-if="$fetchState.pending">
              <b-spinner label="Spinning"></b-spinner>
              <div>Loading...</div>
            </div>
            <p v-else-if="$fetchState.error">
              An error occurred while fetching data
            </p>
            <div v-else style="padding: 40px">
              <div class="center-align-content">
                <div class="row d-flex align-items-center">
                  <div class="heading3" style="padding-right: 40px">
                    <button
                      class="outline-button subheading3"
                      style="height: 40px"
                      @click="topScoreView = true"
                    >
                      Top Players
                    </button>
                  </div>
                  <div class="heading3">
                    <button
                      class="outline-button subheading3"
                      style="height: 40px"
                      @click="topScoreView = false"
                    >
                      Top Teams
                    </button>
                  </div>
                </div>
                <br />

                <div v-if="topScoreView">
                  <div class="heading3">Top players</div>
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
                  <div class="heading3">Top teams</div>
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
        </div>
      </div>
    </div>
    <div class="d-block d-sm-none d-none d-sm-block d-md-none" v-if="!loading">
      <div class="painted-background" style="padding: 20px">
        <NavigationBar />
        <div class="d-flex flex-row">
          <div class="centered-container" v-if="$fetchState.pending">
            <b-spinner label="Spinning"></b-spinner>
            <div>Loading...</div>
          </div>
          <p v-else-if="$fetchState.error">
            An error occurred while fetching data
          </p>
          <div v-else style="padding: 40px">
            <div class="center-align-content">
              <div class="row d-flex align-items-center">
                <div class="heading3" style="padding-right: 40px">
                  <button
                    class="outline-button subheading3"
                    style="height: 40px"
                    @click="topScoreView = true"
                  >
                    Top Players
                  </button>
                </div>
                <div class="heading3">
                  <button
                    class="outline-button subheading3"
                    style="height: 40px"
                    @click="topScoreView = false"
                  >
                    Top Teams
                  </button>
                </div>
              </div>
              <br />

              <div v-if="topScoreView">
                <div class="heading3">Top players</div>
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
                <div class="heading3">Top teams</div>
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
      teamPerPage: 8,
      teamCurrentPage: 1,
      topScoreView: true,
      fields: [{ key: "name", label: "Player Name" }, , "score", "phone"],
      teamFields: ["team_name", "score"],
    };
  },
  async fetch() {
    if (!this.$store.state.topScoreSet) {
      console.log(this.$store.state.topScoreSet);
      console.log("Didn't fetched top scores from state!!");
      this.topScores = await fetch(
        "http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=team-play/get-top-performers",
      ).then((res) => res.json());
      // this.topScores = this.topScores.data;
      //   getting of user answers payload to state
      this.$store.commit("updateTopScores", this.topScores);
      //   getting of top players from state
      this.topScores = this.$store.state.topScores.data;

      this.topTeams = await fetch(
        "http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=team-play/get-top-teams",
      ).then((res) => res.json());
      this.$store.commit("updateTopScoreSet", true);
      console.log("updateTopScoreSet set to TRUE");
      this.$store.commit("updateTopTeams", this.topTeams);
      //   getting of top teams from state
      this.topTeams = this.$store.state.topTeams.data;
    } else {
      console.log("Fetched top scores from state!!");
      //   getting of top players from state
      this.topScores = this.$store.state.topScores.data;
      //   getting of top teams from state
      this.topTeams = this.$store.state.topTeams.data;
    }
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
