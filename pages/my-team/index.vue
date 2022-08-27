<template>
    <div>
      <AppWrapper requiresSmallAndLargeScreenViews="false">
        <template v-slot:large-screen>
          <div class="center-align-item d-flex" v-if="isTeamMember">
            <div>
              <div class="d-flex flex-direction-row justify-content-between">
                <div class="subheading1" style="color: grey">
                  You are a member of
                </div>
                <div
                  class="d-flex justify-content-between"
                  style="margin-inline: 5px"
                >
                  <div>
                    <div class="subheading1" style="font-weight: bold">
                      {{ memberTeam }}
                    </div>
                  </div>
                </div>
                <div class="subheading1" style="color: grey">team</div>
              </div>
              <div class="divider"></div>
              <div>
                <a href="/winners" class="subheading2">View team scores</a>
              </div>
              <a href="/home" class="subheading2">Go Back</a>
            </div>
          </div>
          <div class="center-align-item d-flex" v-if="!isTeamMember">
            <div>
              <br /><br />
              <div class="heading3 text-left">
                {{ tournamentName }} Tournament
              </div>
              <div class="subheading3 text-left">
                Below are the registered teams under this tournament
              </div>
              <br />
              <div v-for="tournament in tournamentTeams">
                <div class="d-flex flex-direction-row justify-content-between">
                  <div
                    class="d-flex justify-content-between"
                    style="margin-right: 20px"
                  >
                    <div>
                      <div class="heading4">{{ tournament.team_name }}</div>
                      <div class="subheading3 text-left">
                        Status: {{ (tournament.game_on === 1) ? 'Live' : 'Not Live' }}
                      </div>
                    </div>
                  </div>
                  <ConfirmationModal
                    class="tournament-btn"
                    buttonText="Join"
                    title="Join team"
                    body="Are you sure you want to join team"
                    :extra="tournament.team_name"
                    action="success"
                    isTextBtn="true"
                    style="background-color: #1ceded; width: 100px"
                    @click="joinTeam(tournament.id)"
                  />
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
        tournamentTeams: [],
        tournamentName: "",
        body: "",
        loggedInUserPhone: this.$store.state.loggedinUserPhone,
        mswaliUserID: this.$store.state.mswaliId,
        isTeamMember: false,
        memberTeam: "",
      };
    },
    mounted() {
      this.isAlreadyTeamMember();
    },
    methods: {
      navigateTo(route) {
        this.$router.push(`/${route}`);
      },
      async isAlreadyTeamMember() {
        let isTeamMemberResponse = await this.$axios.$get(
          `/apiproxy/tournament-play/check-membership&user_id=${this.mswaliUserID}`,
        );
        if (isTeamMemberResponse.status) {
          this.isTeamMember = true;
          this.memberTeam = isTeamMemberResponse.data.team_name;
        } else {
          await this.fetchTeams();
        }
      },
      async fetchTeams() {
        let tournamentsTeamsResponse = await this.$axios.$get(
          `/apiproxy/tournament-play/get-tournament`,
        );
        console.log(tournamentsTeamsResponse);
        console.log("LIVE TURNAMENTS");
        if (tournamentsTeamsResponse.status) {
          this.tournamentTeams = tournamentsTeamsResponse.teams;
          this.tournamentName = tournamentsTeamsResponse.data.tournament_name;
        }
      },
      async joinTeam(teamID) {
        try {
        //   let joinTeamString = `team-play/add-team-member&msisdn=${this.loggedInUserPhone}&team-leader=${teamLeaderNumber}`;
          let joinTeamResponse = await this.$axios.$post(
            // `/apiproxy/${joinTeamString}`,
            `/apiproxy/tournament-play/add-member&user_id=${this.mswaliUserID}&team_id=${teamID}`
          );
          console.log(joinTeamResponse)
          console.log('<0-------JOIN TEAM-------->')
          if (joinTeamResponse.status) {
            await this.successToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          } else {
            await this.alreadyTeamMemberToast();
            await this.$store.dispatch("delayTwoSeconds");
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
          await this.errorToast();
          await this.$store.dispatch("delayTwoSeconds");
          window.location.reload();
        }
      },
      errorToast(toaster) {
        this.$bvToast.toast(
          `We encountered a problem while adding you to this team, please retry later.`,
          {
            title: `Error!`,
            variant: "danger",
            toaster: toaster,
            solid: true,
          },
        );
      },
      alreadyTeamMemberToast(toaster) {
        this.$bvToast.toast(
          `You are already a member of this team`,
          {
            title: `Already a member`,
            variant: "info",
            toaster: toaster,
            solid: true,
          },
        );
      },
      successToast(toaster) {
        this.$bvToast.toast(`Team joined successfully.`, {
          title: `Success!`,
          variant: "success",
          toaster: toaster,
          solid: true,
        });
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
  