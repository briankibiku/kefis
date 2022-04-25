<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen>
        <div class="center-align-item d-flex">
          <div>
            <img src="~/assets/check.png" height="80" width="80" />
            <div class="heading3">Thanks for your feedback</div>
            <div class="subheading3">we care to listen to better mSwali</div>
            <br />
            <RoundedCyanLoadingButton
              buttonText="Submit"
              @click=""
              style="width: 320px"
            />
          </div>
        </div>
      </template>
    </AppWrapper>
  </div>
</template>

<script>
import RoundedCyanLoadingButton from "../../components/Buttons/RoundedCyanLoadingButton.vue";
export default {
  components: {
    RoundedCyanLoadingButton,
  },
};
</script>
