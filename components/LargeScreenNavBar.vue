<template>
  <div style="text-align: left">
    <b-button
      class="rounded-button-transparent padding-top-20"
      style="text-align: left; background-color: transparent"
      @click="navigateToAnswers()"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'question-circle']" />
        My Answers
      </div>
    </b-button>
    <b-button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToWallet()"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'wallet']" />
        Wallet
      </div>
    </b-button>
    <b-button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToRankings()"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'trophy']" />
        Rankings
      </div>
    </b-button>
    <b-button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToSettings()"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'cog']" />
        Settings
      </div>
    </b-button>
    <b-button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToNotifications()"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'bell']" />
        Notifications
      </div>
    </b-button>
    <b-button
      class="rounded-button-transparent"
      style="text-align: left; background-color: transparent"
      @click="navigateToSupport()"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'headset']" />
        Support
      </div>
    </b-button>
    <b-button
      class="rounded-button-transparent"
      @click="sharemSwali()"
      style="text-align: left; background-color: transparent"
    >
      <div class="menu">
        <font-awesome-icon :icon="['fas', 'share']" /> Share
      </div>
    </b-button>
    <b-button
      @click="revokeAuthentication()"
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
        "
      >
        <font-awesome-icon :icon="['fa', 'sign-out-alt']" />
        Logout
      </div>
    </b-button>
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
    }),
  },
  methods: {
    ...mapActions({
      peristAuthentication: "peristAuthentication",
      peristUserPhone: "peristUserPhone",
      peristUserName: "peristUserName",
    }),
    async revokeAuthentication() {
      await this.peristAuthentication(false);
      await this.peristUserPhone("");
      await this.peristUserName("");
      return this.$router.push("/login");
    },
    navigateToAnswers() {
      return this.$router.push("/my-answers");
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
    sharemSwali() {
      navigator.clipboard.writeText("apps.mwsali.co.ke");
      this.copiedLinkToast();
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
