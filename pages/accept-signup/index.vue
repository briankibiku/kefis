<template>
  <div class="bg">
    <div class="centered-container">
      <div style="margin: 20px">
        <div class="custom-modal">
          <div class="heading2">Hello!</div>
          <div class="subheading5">You do not have an account yet</div>
          <div class="heading5">Would you like to Sign up?</div>
        </div>
        <RoundedCyanLoadingButton
          buttonText="Yes sign me up"
          showIcon="true"
          @click="goToSignup()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RoundedGoldLoadingButton from "../../components/RoundedGoldLoadingButton.vue";
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
export default {
  methods: {
    goToSignup() {
      return this.$router.push("/signup");
    },
  },
  components: { RoundedGoldLoadingButton, RoundedCyanLoadingButton },
};
</script>

<style>
.bg {
  background-color: #160d3d;
  min-height: 100vh;
  width: 100%;
}
</style>
