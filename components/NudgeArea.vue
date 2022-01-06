<template>
  <div>
    <!--Big screen component goes here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
    >
      <div class="promo-card">
        <div class="row">
          <div class="col-8">
            <div class="promo-heading">Register your team today</div>
            <div class="subheading5nudge">
              Dial *397# to register your team or click button below
            </div>
            <button class="rounded-button-cyan" style="margin-top: 10px">
              <div class="subheading4nudge">
                Register team
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
              </div>
            </button>
          </div>
          <div class="col-4">
            <div class="bg-image-nudge"></div>
          </div>
        </div>
      </div>
    </div>

    <!--Small screen device component starts here-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="promo-card-mobile">
        <div class="row">
          <div class="col-7">
            <div class="promo-heading-mobile">Register your team today</div>
            <div class="subheading5nudge-mobile">
              Dial *397# to register your team or click button below
            </div>
            <button class="rounded-button-cyan" style="margin-top: 10px">
              <div class="subheading4nudge-mobile">
                Register team
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
              </div>
            </button>
          </div>
          <div class="col-5">
            <div class="bg-image-nudge-mobile"></div>
          </div>
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

.promo-card-mobile {
  color: #160d3d;
  padding: 10px;
  margin-left: 10px;
  margin-top: 10px;
  width: 240px;
  height: 160px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  object-fit: fill;
  background: linear-gradient(to right bottom, #1ceded 20%, #160d3d 95%);
}
</style>
