<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <!--Big screen device code begins here-->
        <div
          class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
          style="padding: 40px"
        >
          <div class="row" style="padding-left: 50px">
            <div id="col2">
              <!-- salutations, wallet card, statistics cards go here -->
              <div class="d-flex flex-row">
                <div
                  class="col-12 padding-top-20 padding-left-60 d-flex justify-content-around"
                >
                  <div>
                    <div class="row">
                      <div>
                        <div class="support-container"></div>
                        <div class="heading3 d-flex justify-content-center">
                          Need help?
                        </div>
                        <div class="subheading3 d-flex justify-content-center">
                          Give us a call at +254 794 583 651 / +254 783 397 397
                          or reach out to us via our socials
                        </div>
                        <div class="row d-flex justify-content-center">
                          <div>
                            <a href="https://wa.me/254795583651" target="blank">
                              <img
                                src="~/assets/whatsapp.png"
                                height="40"
                                width="40"
                                alt=""
                              />
                            </a>
                          </div>
                          <div class="padding-horizontal-20">
                            <a
                              href="https://www.instagram.com/mswali_ke/"
                              target="blank"
                            >
                              <img
                                src="~/assets/instagram.png"
                                height="40"
                                width="40"
                                alt=""
                              />
                            </a>
                          </div>
                          <div>
                            <a
                              href="https://twitter.com/mSwali_KE"
                              target="blank"
                            >
                              <img
                                src="~/assets/twitter.png"
                                height="40"
                                width="40"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                      </div>
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
            <div class="centered-container" style="width: 320px">
              <div class="col d-flex justify-content-around">
                <div class="row" style="flex-direction: column">
                  <div class="support-container"></div>
                  <div class="heading3 d-flex justify-content-center">
                    Need help?
                  </div>
                  <div class="subheading3 d-flex justify-content-center">
                    Give us a call at +254 794 583 651 / +254 783 397 397 or
                    reach out to us via our socials
                  </div>

                  <div class="row d-flex justify-content-center">
                    <div>
                      <a href="https://wa.me/254795583651" target="blank">
                        <img
                          src="~/assets/whatsapp.png"
                          height="40"
                          width="40"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="padding-horizontal-20">
                      <a
                        href="https://www.instagram.com/mswali_ke/"
                        target="blank"
                      >
                        <img
                          src="~/assets/instagram.png"
                          height="40"
                          width="40"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="https://twitter.com/mSwali_KE" target="blank">
                        <img
                          src="~/assets/twitter.png"
                          height="40"
                          width="40"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div> </template
    ></AppWrapper>
  </div>
</template>
<script>
import AppWrapper from "../../components/AppWrapper.vue";
export default { components: { AppWrapper } };
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
