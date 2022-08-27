<template>
  <div style="text-align: left">
    <button
      class="rounded-button-transparent padding-top-20"
      style="text-align: left; background-color: transparent"
      @click="navigateToHome()"
    >
      <div class="menu">
        <!--
        <font-awesome-icon :icon="['fas', 'home']" />
      -->
        Home
      </div>
    </button>
    <button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToRankings()"
    >
      <div class="menu">
        <!--
        <font-awesome-icon :icon="['fas', 'trophy']" />
      -->
        Leaderboard
      </div>
    </button>
    <button
      class="rounded-button-transparent"
      @click="navigateTotournaments()"
      style="text-align: left; background-color: transparent"
    >
      <div class="menu">
        <!--
        <font-awesome-icon :icon="['fas', 'share']" /> 
      -->
        My Team
      </div>
    </button>
    <button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToSupport()"
    >
      <div class="menu">
        <!--
      
        <font-awesome-icon :icon="['fas', 'headset']" />
      -->
        Support
      </div>
    </button>
    <button
      class="rounded-button-transparent"
      @click="sharemSwali()"
      style="text-align: left; background-color: transparent"
    >
      <div class="menu">
        <!--
        <font-awesome-icon :icon="['fas', 'share']" /> 
      -->
        Share
      </div>
    </button>
    <button
      class="rounded-button-transparent"
      @click="feedback()"
      style="text-align: left; background-color: transparent"
    >
      <div class="menu">
        <!--
        <font-awesome-icon :icon="['fas', 'share']" /> 
      -->
        Feedback
      </div>
    </button>
    <button
      @click="logOut()"
      class="rounded-button-transparent"
      style="
        background-position: bottom;
        background-color: transparent;
        text-align: left;
      "
    >
      <div
        class="menu"
        style="
          position: fixed;
          bottom: 0;

          /* And if you want the div to be full-width: */
          right: 0;
          padding-bottom: 20px;
        "
      >
        <!--
        <font-awesome-icon :icon="['fa', 'sign-out-alt']" />
      -->
        Logout
      </div>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      loggedinUserName: "loggedinUserName",
      loggedinUserPhone: "loggedinUserPhone",
      sessionDetails: "sessionDetails",
      userDetails: "userDetails"
    }),
  },
  methods: {
    ...mapActions({
      peristUserName: "peristUserName",
      peristUserPhone: "peristUserPhone",
      peristAuthentication: "peristAuthentication",
      persistSessionDetails: "persistSessionDetails",
      persistuserDetails: "persistuserDetails"
    }),
    async logOut() {
      await this.peristAuthentication(false);
      await this.persistSessionDetails("");
      await this.peristUserPhone("");
      await this.peristUserName("");
      await this.persistuserDetails({});
      return this.$router.push("/email-login");
    },
    navigateToHome() {
      return this.$router.push("/home");
    },
    feedback() {
      return this.$router.push("/feedback");
    },
    navigateToBuySubscription() {
      return this.$router.push("/buy-subscription");
    },
    navigateToAnswers() {
      return this.$router.push("/my-answers");
    },
    navigateTotournaments() {
      return this.$router.push("/my-team");
    },
    navigateToWallet() {
      return this.$router.push("/wallet");
    },
    navigateToNotifications() {
      return this.$router.push("/notifications");
    },
    navigateToSettings() {
      return this.$router.push("/settings");
    },
    navigateToSupport() {
      return this.$router.push("/support");
    },
    navigateToRankings() {
      return this.$router.push("/winners");
    },
    navigateToFAQ() {
      return this.$router.push("/faq");
    },
    sharemSwali() {
      return this.$router.push("/share");
      // navigator.clipboard.writeText("apps.mwsali.co.ke");
      // this.copiedLinkToast();
    },
    copiedLinkToast(toaster, variant = "success") {
      this.$bvToast.toast("Link has been copied to clipboard 📋.", {
        title: `Link copied`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
  },
};
</script>
