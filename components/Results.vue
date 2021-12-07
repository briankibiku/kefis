<template>
  <section class="purple-bg">
    <div style="width: 300px" class="center-align-content">
      <div class="otp-header">
        <div>
          <img
            class="Logo"
            width="200"
            height="43"
            src="~/assets/logos/mSwali-cyan.png"
          />
          <br /><br />
          <h3 style="color: #fff">Awesome try on your quiz</h3>
          <br />
        </div>
      </div>

      <p class="outline-button-cyan">Correct: {{ this.correctAttempts }}</p>
      <p class="outline-button-cyan">Failed: {{ this.totalFailed }}</p>
      <p class="outline-button-cyan">Timeouts: {{ this.totalTimeouts }}</p>
      <p class="outline-button-cyan">Not Attempted: {{ this.unAttempted }}</p>
      <!-- <p class='result-detail'> Not Attempted: {{this.token}} </p>  -->

      <p>
        Points Earned: <strong> {{ this.myScore }} </strong>
      </p>

      <div class="t-section">
        <button
          type="submit"
          @click.stop.prevent="
            onSubmit(), makeToast('b-toaster-bottom-full', 'info')
          "
          form="otp-form"
          class="outline-button-cyan ml-10 mr-10"
        >
          <span class="btn-label"><center>Continue</center></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "verify",
      meta: [],
    };
  },
  data() {
    return {
      myScore: this.$store.getters.calculteScore,
      correctAttempts: this.$store.state.trivia_score.correct,
      totalFailed: this.$store.state.trivia_score.wrong,
      totalTimeouts: this.$store.state.trivia_score.timeouts,
      unAttempted: 0,
      // token: nuxtStorage.localStorage.getItem('Token')
    };
  },

  methods: {
    async onSubmit() {
      this.$router.push("/home");
    },

    makeToast(toaster, variant = null) {
      this.$bvToast.toast("Thanks and see you again.", {
        title: `Come again`,
        variant: variant,
        toaster: toaster,
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
.result-score {
  height: 20px;
  font-size: 15px;
  color: #fff;
  margin-top: 10px;
  padding: 20px 40px;
  width: 60%;
}
p {
  color: #fff;
}
</style>
