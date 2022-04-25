<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div>
          <div class="text-center">
            <div class="col d-flex justify-content-around">
              <div class="row" style="flex-direction: column">
                <div class="support-container"></div>
                <div class="heading3 d-flex justify-content-center">
                  Need help?
                </div>
                <div class="subheading3 d-flex justify-content-center">
                  Give us a call at +254 794 583 651 / +254 783 397 397 or reach
                  out to us via our socials
                </div>

                <div class="row d-flex justify-content-center">
                  <div>
                    <a href="https://wa.me/254794583651" target="blank">
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
