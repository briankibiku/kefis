<template>
  <div style="padding-bottom: 20px">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand>
        <LogoPurple style="width: 140px; height: 30px;" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/home"
            ><span class="heading4" style="color: #160d3d">
              Home</span
            ></b-nav-item
          ><b-nav-item href="/buy-subscription"
            ><span class="heading4" style="color: #160d3d">
              Buy Subscription
            </span></b-nav-item
          >
          <b-nav-item href="/my-answers"
            ><span class="heading4" style="color: #160d3d">My Answers </span>
          </b-nav-item>
          <b-nav-item href="/wallet"
            ><span class="heading4" style="color: #160d3d"
              >Wallet</span
            ></b-nav-item
          >
          <b-nav-item href="/winners"
            ><span class="heading4" style="color: #160d3d"
              >Rankings</span
            ></b-nav-item
          >
          <b-nav-item href="/support"
            ><span class="heading4" style="color: #160d3d"
              >Support</span
            ></b-nav-item
          >
          <b-nav-item href="/faq"
            ><span class="heading4" style="color: #160d3d"
              >FAQs</span
            ></b-nav-item
          >
          <b-nav-item href="/share"
            ><span class="heading4" style="color: #160d3d"
              >Share</span
            ></b-nav-item
          >
          <b-button
            @click="logOut()"
            style="background-color: transparent; color: #160d3d; border: none"
          >
            <span class="heading4"> Logout </span>
          </b-button>
        </b-navbar-nav>
        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown style="color: #160d3d" right>
            <template #button-content>
              <em>
                <b-avatar variant="light"></b-avatar>
              </em>
            </template>
            <b-dropdown-item class="heading4" href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item class="heading4" href="/">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  head: {
    title: "Home",
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js",
      },
      { src: "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto&display=swap",
      },
    ],
  },

  computed: {
    ...mapState({
      sessionDetails: "sessionDetails",
      isAuthenticated: "isAuthenticated",
      loggedinUserName: "loggedinUserName",
      loggedinUserPhone: "loggedinUserPhone",
    }),
  },
  methods: {
    ...mapActions({
      peristUserName: "peristUserName",
      peristUserPhone: "peristUserPhone",
      persistSessionDetails: "persistSessionDetails",
      peristAuthentication: "peristAuthentication",
    }),
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
    async logOut() {
      await this.peristAuthentication(false);
      await this.persistSessionDetails("");
      await this.peristUserPhone("");
      await this.peristUserName("");
      return this.$router.push("/login");
    },
  },
};
</script>
<style>
.heading4 {
  font-size: 14px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
</style>
