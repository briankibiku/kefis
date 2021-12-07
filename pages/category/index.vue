<template>
  <div
    class="purple-bg"
    style="background-color: #160d3d; width: 100%; color: #fff; height: 100vh"
  >
    <div class="centered-container">
      <div class="row">
        <div class="col">
          <LogoCyan />
          <p class="heading1">Select category you want to play</p>

          <div class="grid-container resize-choices">
            <div
              class="choices"
              v-for="quiz_category in quiz_categories"
              :key="quiz_category.tag"
            >
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio
                  v-model="selected"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  :value="quiz_category.value"
                  >{{ quiz_category.tag }}</b-form-radio
                >
              </b-form-group>
            </div>
          </div>

          <div class="mt-3" v-if="!selected == ''">
            Proceed with: <strong>{{ selected }}</strong> ?
          </div>
          <b-button class="outline-button-cyan" href="/quiz" style="margin-top: 20px"
            >Go</b-button
          >
          <br /><br /><br />
          <a href="/home" style="color: #fff; bottom: 0">Back</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loop_counter: 0,
      quiz_categories: [],
      selected: "",
    };
  },
  async fetch() {
    this.quiz_categories = await this.$store.state.quiz_categories;
  },
};
</script>

<style scoped>
@media only screen and (min-width: 300px) {
  .purple-container {
    background-image: url("~/assets/mswali-win.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    opacity: 90%;
    background-size: contain;
    width: 100%;
    min-height: 100vh;
    text-align: center;
    color: #fff;
    background-color: #160d3d;
    padding: 20px;
  }
}
@media only screen and (min-width: 420px) {
  .purple-container {
    background-image: url("~/assets/mswali-win.png");
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    opacity: 90%;
    background-size: contain;
    width: 100%;
    min-height: 100vh;
    text-align: center;
    color: #fff;
    background-color: #160d3d;
    padding: 20px;
  }
}
</style>
