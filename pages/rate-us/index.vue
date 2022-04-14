<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/rating.png" height="80" width="80" />
            <br /><br />
            <div class="heading3">Rate Us</div>
            <div class="subheading3">
              Your feedback helps us serve you better
            </div>
            <br />

            <div class="rating">
              <input
                type="radio"
                name="rating"
                value="5"
                id="5"
                v-model="rating"
              /><label for="5">☆</label>
              <input
                type="radio"
                name="rating"
                value="4"
                id="4"
                v-model="rating"
              /><label for="4">☆</label>
              <input
                type="radio"
                name="rating"
                value="3"
                id="3"
                v-model="rating"
              /><label for="3">☆</label>
              <input
                type="radio"
                name="rating"
                value="2"
                id="2"
                v-model="rating"
              /><label for="2">☆</label>
              <input
                type="radio"
                name="rating"
                value="1"
                id="1"
                v-model="rating"
              /><label for="1">☆</label>
            </div>
            <br />
            <RoundedCyanLoadingButton
              buttonText="Submit"
              @click="submitRating()"
            />
            <br />
          </div>
        </div>
      </template>
    </AppWrapper>
  </div>
</template>

<script>
// import StarRating from "vue-star-rating";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
export default {
  data() {
    return {
      rating: "",
    };
  },
  methods: {
    async submitRating() {
      await this.ratingSubmittedToast();
      await this.$store.dispatch("delayFourSeconds");
      this.$router.push("/feedback");
    },
    ratingSubmittedToast(toaster) {
      this.$bvToast.toast(
        `Thank you for rating us a ${this.rating}, keep playing mSwali`,
        {
          title: `Rating submitted successfully`,
          variant: "info",
          toaster: toaster,
          solid: true,
        },
      );
    },
  },
  components: {
    // StarRating,
    RoundedCyanLoadingButton,
  },
};
</script>
<style>
.rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
}

.rating > input {
  display: none;
}

.rating > label {
  position: relative;
  width: 1.1em;
  font-size: 12vw;
  color: #ffd700;
  cursor: pointer;
}

.rating > label::before {
  content: "\2605";
  position: absolute;
  opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before {
  opacity: 1 !important;
}

.rating > input:checked ~ label:before {
  opacity: 1;
}

.rating:hover > input:checked ~ label:before {
  opacity: 0.4;
}
</style>
