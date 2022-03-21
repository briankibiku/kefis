<template>
  <div>
    <!--Big screen component goes here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
    >
      <div class="nudge-card">
        <div class="d-flex flex-column align-content-between">
          <div class="promo-heading">Register your team today</div>
          <div style="width: 10vw">
            <div class="subheading5nudge">
              Dial *397# to register your team or click button below
            </div>
          </div>
          <button
            class="rounded-button-cyan"
            style="margin-top: 10px; position: right bottom"
          >
            <div class="subheading4nudge">
              Register team
              <!--
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
              -->
            </div>
          </button>
        </div>
      </div>
    </div>

    <!--Small screen device component starts here-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="nudge-card-mobile">
        <div class="d-flex flex-column align-content-between">
          <div class="promo-heading-mobile">Register your team today</div>
          <div class="subheading5nudge-mobile">
            Dial *397# to register your team or click button below
          </div>
          <button class="rounded-button-cyan" style="margin-top: 10px">
            <div class="subheading4nudge-mobile">
              Register team
              <!--
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
              -->
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.promo-heading {
  font-size: 1.2vw;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
}
.subheading5nudge {
  font-size: 1vw;
  font-weight: 500;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
  white-space: wrap;
  text-overflow: show;
  word-break: break-word;
  width: 100px;
}
.subheading4nudge {
  font-size: 0.9vw;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.bg-image-nudge {
  background: url("~/assets/win_big.png");
  background-repeat: no-repeat;
  width: 8vw;
  background-size: contain;
  height: 18vw;
}

.promo-heading-mobile {
  font-size: 12px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
}
.subheading5nudge-mobile {
  font-size: 10px;
  font-weight: 500;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.subheading4nudge-mobile {
  font-size: 10px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.bg-image-nudge-mobile {
  background: url("~/assets/win_big.png");
  background-repeat: no-repeat;
  width: 100px;
  background-size: contain;
  height: 200px;
}

.nudge-card-mobile {
  background: linear-gradient(
      to right bottom,
      rgb(28, 237, 237, 0.8),
      rgb(22, 13, 61, 0.8)
    ),
    url("~/assets/win_big.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  margin-right: 20px;
  width: 74vw;
  height: 43vw;
  padding: 20px;
  margin-bottom: 5em;
  border-radius: 6px;
}
</style>
