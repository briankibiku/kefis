<template>
  <div style="padding-bottom: 20px">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand> </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/wallet"
            ><span class="heading4" style="color: #160d3d"
              >Wallet</span
            ></b-nav-item
          >
          <b-nav-item href="/winners"
            ><span class="heading4" style="color: #160d3d"
              >Winners</span
            ></b-nav-item
          >
          <b-nav-item href="/my-answers"
            ><span class="heading4" style="color: #160d3d">My Answers </span>
          </b-nav-item>
          <b-button @click="revokeAuthentication()">Logout</b-button>
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
    title: "About",
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
      isAuthenticated: "isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      peristAuthentication: "peristAuthentication",
    }),
    async revokeAuthentication() {
      await this.peristAuthentication(false);
      return this.$router.push("/login");
    },
  },
};
</script>
