<template>
  <div id="row">
    <div id="col2">
      <div style="margin: 0 auto; min-height: 100vh">
        <div class="centered-container">
          <div>
            <LogoPurple />
            <br />
            <br />
            <p class="heading1" style="color: #160d3d">
              Select/search category you want to play
            </p>

            <input
              list="programming-languages"
              id="car-make"
              name="car-makes"
              placeholder="Select/search category.."
            />

            <datalist id="programming-languages">
              <option value="Politics"></option>

              <option value="Music"></option>

              <option value="Sports"></option>

              <option value="Geography"></option>

              <option value="Physics"></option>
            </datalist>
            <br />
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
                    style="color: #160d3d"
                    >{{ quiz_category.tag }}</b-form-radio
                  >
                </b-form-group>
              </div>
            </div>

            <div class="mt-3" v-if="!selected == ''" style="color: #160d3d">
              Proceed with: <strong>{{ selected }}</strong> ?
            </div>
            <b-button
              class="outline-button-cyan"
              @click="navigateToQuiz()"
              style="margin-top: 20px"
              >Go</b-button
            >
            <br /><br /><br />
            <a href="/home" style="color: #fff; bottom: 0">Back</a>
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
      loop_counter: 0,
      quiz_categories: [],
      selected: "",
    };
  },
  async fetch() {
    this.quiz_categories = await this.$store.state.quiz_categories;
  },
  methods: {
    navigateToQuiz() {
      return this.$router.push("/quiz");
    },
  },
};
</script>
<style>
#row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#col1 {
  width: 50%;
}
#col2 {
  width: 50%;
}
</style>
