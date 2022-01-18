<template>
  <div>
    <!--Big screen device code begins here-->
    <div
      class="d-none d-md-block d-lg-none d-none d-lg-block d-xl-none d-none d-xl-block"
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
          <div class="d-flex flex-row" style="padding-top: 0em">
            <div class="col padding-left-60 d-flex justify-content-around">
              <div class="row" style="flex-direction: column">
                <div class="heading3 padding-right-20">FAQS</div>
                <div class="subheading3">Frequently asked questions</div>
                <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.accordion-1 variant="info"
                        >mSwali top up</b-button
                      >
                    </b-card-header>
                    <b-collapse
                      id="accordion-1"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>

                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.accordion-2 variant="info"
                        >mSwali withdraw request</b-button
                      >
                    </b-card-header>
                    <b-collapse
                      id="accordion-2"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>

                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.accordion-3 variant="info"
                        >Accordion 3</b-button
                      >
                    </b-card-header>
                    <b-collapse
                      id="accordion-3"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
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
      <div class="painted-background" style="padding: 20px">
        Small screen view
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
