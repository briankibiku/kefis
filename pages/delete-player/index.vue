<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="d-flex">
          <div>
            <br /><br />
            <div class="heading3 text-left">Nairobi Garage Teams</div>
            <div class="subheading4 text-left">
              Below are the registered teams under this tournament
            </div>
            <br />
            <div v-for="tournament in tournamentlist">
              <div class="d-flex flex-direction-row justify-content-between">
                <div
                  class="d-flex justify-content-between"
                  style="margin-right: 20px"
                >
                  <div>
                    <div class="heading4">{{ tournament.title }}</div>
                    <div class="subheading3 text-left">
                      {{ tournament.body }}
                    </div>
                  </div>
                </div>
                <ConfirmationModal
                  class="subscription-card"
                  buttonText="Join"
                  title="Confirm team"
                  body="Are you sure you want to join OTM team?"
                  action="success"
                  isTextBtn="true"
                  style="background-color: #f3190b"
                  @click=""
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
      tournamentlist: [
        {
          title: "OTM Kites",
          route: "veiw-individual-tournament",
        },
        {
          title: "mSwali Knights",
          route: "view-individual-tournament",
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
