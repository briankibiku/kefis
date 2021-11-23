<template>
  <div class="painted-background">
    <b-container>
      <NavigationBar />
    </b-container>
    <div class="row" style="vertical-align: top">
      <div class="column left">
        <b-avatar variant="light"></b-avatar>
      </div>

      <div class="column middle" style="text-align: left">
        <div class="heading3">Good morning {{ this.lastName }}!</div>
        <div>{{ this.phoneNumber }}</div>
      </div>
      <div
        class="column right"
        style="
          background-color: #160d3d;
          width: 20px;
          height: 50px;
          justify-content: center;
          align-items: center;
          text-align: center;
          display: flex;
          border-radius: 15px;
        "
      >
        <font-awesome-icon :icon="['fas', 'bell']" style="color: #fff" />
      </div>
      <div
        class="row centered-container"
        style="width: 100%; margin-right: 20px; margin-left: 20px"
      >
        <div class="col" style="text-align: left">
          <!-- wallet card go here -->
          <div class="wallet-card">
            <div class="heading4">Wallet Balance</div>
            <div class="heading2">Ksh 100,0000</div>
          </div>

          <!-- stats card go here -->
          <div class="row">
            <div class="stats-card">
              <font-awesome-icon :icon="['fas', 'flag']" />
              <div
                class="heading4"
                style="
                  text-align: center;
                  padding: 2px;
                  border-radius: 5px;
                  background-color: #f0f0f0;
                "
              >
                Quiz Passed
              </div>
              <div
                class="heading3"
                style="padding-bottom: 0px; padding-top: 0px"
              >
                27
              </div>
              <div class="subheading5">Out of 30 questions</div>
            </div>
            <div class="stats-card">
              <font-awesome-icon :icon="['fas', 'clock']" />
              <div
                class="heading4"
                style="
                  text-align: center;
                  padding: 2px;
                  border-radius: 5px;
                  background-color: #f0f0f0;
                "
              >
                Fast Time
              </div>
              <div
                class="heading3"
                style="padding-bottom: 0px; padding-top: 0px"
              >
                27 min
              </div>
              <div class="subheading5">In under an hour</div>
            </div>
          </div>
          <!-- promo & ads card go here -->
          <div class="row scrollable">
            <div class="promo-card">
              <div class="row">
                <div class="col-7">
                  <div class="promo-heading">Register your team today</div>
                  <div class="subheading5">
                    Dial *397# to register your team or click button below
                  </div>
                  <button class="rounded-button-cyan" @click="navigate()">
                    <div class="subheading4">
                      Register team
                      <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </div>
                  </button>
                </div>
                <div class="col-2">
                  <img
                    src="~/assets/shared/win.png"
                    height="100"
                    width="140"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <button class="rounded-button-cyan" @click="navigate()">
            <div class="subheading4">
              Start Quiz
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overallPoints: "2,000",
      userProfile: {},
      lastName: "",
      phoneNumber: "",
    };
  },
  mounted() {
    this.getuserName();
  },

  methods: {
    async getuserName() {
      let userProfile = await this.$store.dispatch("getuserProfile");
      console.log(userProfile);
      let userName = userProfile.data.data.name;
      this.phoneNumber = userProfile.data.data.account_number;
      let splitName = userName.indexOf(" ");
      this.lastName = userName.slice(splitName + 1, userName.length).trim();
    },
    navigate() {
      return this.$router.push("/category");
    },
  },
};
</script>

<style scoped>
.promo-heading {
  font-size: 1.2em;
  font-weight: 600;
  font-family: "Work Sans", Tahoma, Geneva, Verdana, sans-serif;
}
.centered-container {
  width: 100%;
  max-width: 600px;
  background-size: contain;
  margin: 0 auto;
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container-fluid-edited {
  width: auto;
  padding: 20px;
}
.column {
  float: left;
  padding: 10px;
  height: 150px; /* Should be removed. Only for demonstration */
}
.scrollable {
  margin: 4px, 4px;
  padding: 4px;
  width: 350px;
  overflow: auto;
  /* white-space: nowrap; */
}

.left,
.right {
  padding-left: 40px;
  width: 25%;
}

.middle {
  width: 50%;
}

.wallet-card {
  background: #fff;
  padding: 10px;
  margin: 20px;
  box-sizing: border-box;
  border-radius: 6px;
}
.stats-card {
  background: #fff;
  padding: 10px;
  margin-left: 30px;
  border-radius: 6px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.promo-card {
  color: #160d3d;
  padding: 10px;
  margin-left: 30px;
  margin-top: 20px;
  width: 320px;
  height: 200px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  object-fit: fill;
  background: linear-gradient(to right bottom, #1ceded 20%, #160d3d 95%);
}
/* Small Devices, Phones and Desktop screens*/
@media only screen and (min-width: 780px) {
  .container-fluid-edited {
    padding-left: 200px;
    padding-right: 200px;
  }
}
@media only screen and (min-width: 1024px) {
  .container-fluid-edited {
    padding-left: 300px;
    padding-right: 300px;
  }
}
</style>
