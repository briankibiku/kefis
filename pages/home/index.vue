<template>
  <section class="painted-background">
    <b-container>
      <NavigationBar />
    </b-container>

    <b-container fluid class="container-fluid-edited">
      <b-row>
        <b-col>
          <p v-if="true" class="text-center subheading2 text-blue mb-0 mt-p-2">
            <!-- {{ this.$store.state.profile.status }} -->
          </p>
          <p v-else class="text-center subheading2 text-blue mb-0 mt-p-2">
            no Data
          </p>
          <p class="text-center subheading1 text-blue mb-0 mt-p-2">
            Welcome back
          </p>
          <p class="text-center heading2 text-blue mb-0">{{ username }} !</p>
          <!-- <p v-if ="this.$store.state.visitor_info.phone" class="text-center subheading2-title text-blue mb-0">{{this.$store.state.visitor_info.phone}}</p> -->
          <!-- <p v-else class="text-center subheading2-title text-blue mb-0">No data</p> -->
          <p class="text-center subheading3 text-blue">
            Here is how your account is looking today
          </p>
        </b-col>
      </b-row>
      <div>
        <b-row class="mt-18">
          <b-col class="pr-0">
            <div class="display-card">
              <p class="mb-0 text-blue subheading2 text-center pt-3">KSH</p>

              <div class="text-blue heading2 text-center">
                {{ overallPoints }}
              </div>
              <p class="text-blue subheading3 text-center">Wallet Balance</p>
            </div>
          </b-col>
          <b-col>
            <div class="display-card">
              <p class="mb-0 text-blue subheading2 text-center pt-3">
                Overall Points
              </p>
              <div class="text-blue heading2 text-center">
                {{ overallPoints }}
              </div>
              <p class="text-blue subheading3 text-center">Points Earned</p>
            </div>
          </b-col>
          <div class="w-100 py-2"></div>
          <b-col class="pr-0">
            <div class="display-card">
              <p class="mb-0 text-blue subheading2 text-center pt-3">
                Games Played
              </p>
              <div class="text-blue heading2 text-center">20</div>
              <p class="text-blue subheading3 text-center">Sessions</p>
            </div>
          </b-col>
          <b-col>
            <div class="display-card">
              <p class="mb-0 text-blue subheading2 text-center pt-3">
                Free Sessions
              </p>
              <div class="text-blue heading2 text-center">6</div>
              <p class="text-blue subheading3 text-center">Invite Friends</p>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-row class="mt-ipadpro">
        <b-col>
          <br />
          <b-form-row class="justify-content-center">
            <b-button
              href="/category"
              class="primary-button"
              style="background-color: #fff; color: #000; font-weight: 600"
              >Play now</b-button
            >
          </b-form-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "Kim",
      overallPoints: "2,000",
    };
  },
};
</script>

<style scoped>
.container-fluid-edited {
  width: auto;
  padding: 20px;
}

.display-card {
  background: #ffffff;
  border: 1px solid #1ceded;
  box-sizing: border-box;
  border-radius: 6px;
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
  .container-fluid-edited {
    width: 30%;
    padding: 20px;
  }
}
/* @media only screen and (min-width: 780px) {
  .container-fluid-edited {
    width: 50%;
    padding: 20px;
  }
} */
</style>
