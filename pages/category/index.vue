<template>
  <div
    class="purple-container"
    style="background-color: #160d3d; width: 100%; color: #fff; height: 100vh"
  >
    <div class="row">
      <div class="col">
        <LogoCyan />
        <p class="heading1">Select category you want to play</p>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="music"
            >Music</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="sports"
            >Sports</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="history"
            >History</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="politics"
            >Politics</b-form-radio
          >
        </b-form-group>

        <div class="mt-3" v-if="!selected == ''">
          Proceed with: <strong>{{ selected }}</strong> category
        </div>
        <b-button class="outline-button" href="/quiz">Go</b-button>
        <br /><br /><br />
        <a href="/home" style="color: #bbb;  bottom: 0"
          >Back</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
    };
  },
};
</script>
