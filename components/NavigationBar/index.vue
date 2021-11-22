<template>
  <div style="padding-bottom: 20px">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand>
        <img src="~/assets/logos/mSwali-cyan.png" height="30" width="120" alt="" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/wallet"
            ><span style="color: #160d3d">Wallet</span></b-nav-item
          >
          <b-nav-item href="#"
            ><span style="color: #160d3d">Gifts</span></b-nav-item
          >
          <b-nav-item href="#"
            ><span style="color: #160d3d"
              >Notifications
              <!-- <p class="notification-count-container">5</p>' -->
            </span>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown style="color: #160d3d" right>
            <template #button-content>
              <em>
                <b-avatar variant="light"></b-avatar>
              </em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="/">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
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
};
</script>
