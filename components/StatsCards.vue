<template>
  <div style="padding-left: 20px">
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
    >
      <div
        class="d-flex justify-content-start"
        style="margin-top: 4vh; margin-bottom: 4vw"
      >
        <div class="d-flex justify-content-start align-items-center">
          <div>
            <font-awesome-icon
              :icon="['fas', 'check']"
              style="height: 2.5vw; width: 2.5vw; margin-right: 20px"
            />
          </div>
          <div>
            <div class="heading33 justify-content-center">27</div>
            <div
              class="heading44"
              style="
                text-align: center;
                padding: 2px;
                border-radius: 5px;
                background-color: #f0f0f0;
              "
            >
              Quiz Passed
            </div>
            <div class="subheading55">Out of 30 questions</div>
          </div>
        </div>
        <div
          class="d-flex justify-content-start align-items-center"
          style="margin-left: 40px"
        >
          <div>
            <font-awesome-icon
              :icon="['fas', 'clock']"
              style="height: 2.5vw; width: 2.5vw; margin-right: 20px"
            />
          </div>
          <div>
            <div
              class="heading33"
              style="padding-bottom: 0px; padding-top: 0px"
            >
              12min
            </div>
            <div
              class="heading44"
              style="
                text-align: center;
                padding: 2px;
                border-radius: 5px;
                background-color: #f0f0f0;
              "
            >
              Fastest Time
            </div>
            <div class="subheading55">Out of 30 questions</div>
          </div>
        </div>
      </div>
    </div>

    <!--small screen view-->
    <div class="d-block d-sm-none d-none d-sm-block d-md-none">
      <div class="scrollable">
        <div
          class="d-flex justify-content-start"
          style=" margin-bottom: 4vw"
        >
          <div
            class="d-flex justify-content-start align-items-center"
            style="
              background-color: #1ceded;
              opacity: 76%;
              padding: 10px;
              border-radius: 8px;
            "
          >
            <div>
              <font-awesome-icon
                :icon="['fas', 'check']"
                style="height: 25px; width: 25px; margin-right: 10px"
              />
            </div>
            <div>
              <div class="heading333 justify-content-center">27</div>
              <div
                class="heading444"
                style="
                  border-radius: 5px;
                  padding: 2px;
                  background-color: #f0f0f0;
                "
              >
                Quiz Passed
              </div>
              <div class="subheading555">Out of 30 questions</div>
            </div>
          </div>
          <div
            class="d-flex justify-content-start align-items-center"
            style="
              background-color: #ffc107;
              opacity: 76%;
              padding: 10px;
              border-radius: 8px;
              margin-left: 20px;
            "
          >
            <div>
              <font-awesome-icon
                :icon="['fas', 'clock']"
                style="height: 25px; width: 25px; margin-right: 10px"
              />
            </div>
            <div>
              <div
                class="heading333"
                style="padding-bottom: 0px; padding-top: 0px"
              >
                12min
              </div>
              <div
                class="heading444"
                style="
                  border-radius: 5px;
                  padding: 2px;
                  background-color: #f0f0f0;
                "
              >
                Fastest Time
              </div>
              <div class="subheading555">Out of 30 questions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.heading33 {
  font-size: 1.6vw;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.heading44 {
  font-size: 1.4vw;
  font-weight: 500;
  text-align: left;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.subheading55 {
  padding-top: 15px;
  font-size: 1vw;
  font-weight: 500;
  font-family: "Nunito Sans", sans-serif;
  color: #b0b0b0;
}

.heading333 {
  font-size: 14px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.heading444 {
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  font-family: "Nunito Sans", sans-serif;
  color: #160d3d;
}
.subheading555 {
  font-size: 10px;
  font-weight: 500;
  font-family: "Nunito Sans", sans-serif;
  color: #4b4949;
}
</style>
