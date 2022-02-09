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
          <div class="d-flex flex-row">
            <div class="col padding-left-60 d-flex justify-content-around">
              <div class="row" style="flex-direction: column">
                <div class="heading3 padding-right-20">Notifications</div>
                <div class="subheading3">Your notifications</div>
                <div v-for="notification in notifications">
                  <div class="row d-flex justify-content-between">
                    <div class="notification-card">
                      <div class="heading4">{{ notification.heading }}</div>
                      <div class="subheading3">{{ notification.message }}</div>
                    </div>
                    <a href="/notifications">
                      <font-awesome-icon
                        :icon="['fas', 'chevron-right']"
                        style="color: #160d3d"
                      />
                    </a>
                  </div>
                  <div class="divider"></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <!--Search bar / Start quiz button / Profile  Ends here-->
      </div>
    </div>
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div>
        <div class="d-flex flex-row">
          <div class="col d-flex justify-content-around">
            <div class="row" style="flex-direction: column">
              <div class="heading3 padding-right-20">Notifications</div>
              <div class="subheading3">Your notifications</div>
              <div v-for="notification in notifications">
                <div class="row d-flex justify-content-between">
                  <div class="notification-card">
                    <div class="heading4">{{ notification.heading }}</div>
                    <div class="subheading3">{{ notification.message }}</div>
                  </div>
                  <a href="/notifications">
                    <font-awesome-icon
                      :icon="['fas', 'chevron-right']"
                      style="color: #160d3d"
                    />
                  </a>
                </div>
              </div>
              <a href="/notifications" style="color: #bbb"> Home </a>
              <br />
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
      text: `
          You have deposited Kshs 100.00
        `,
      notifications: [
        {
          heading: "Uko na form kesho?",
          message:
            "Tokelezea iBerry Lounge, cheze mSwali and get a chance to win BIG!!!!",
        },
        {
          heading: "Insufficient balance",
          message:
            "You have insufficient balance to play mSwali. Load your account to enjoy limitless plays.",
        },
        {
          heading: "Game play is on",
          message: "mSwali is now LIVE, play to win",
        },
        {
          heading: "You won",
          message: "You won top score on 12/12/2022",
        },
      ],
    };
  },
};
</script>

<style scoped>
.hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #000;
  margin: 1em 0;
  padding: 0;
}
.left,
.right {
  padding-left: 40px;
  width: 25%;
}

.middle {
  width: 50%;
}
.column {
  float: left;
  padding: 10px;
  height: 150px; /* Should be removed. Only for demonstration */
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
}
#col1 {
  width: 20%;
}
#col2 {
  width: 80%;
}
</style>
