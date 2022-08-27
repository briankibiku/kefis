<template>
  <div>
    <div class="heading3">
      {{ this.greetings }}{{ this.$store.state.loggedinUserName }}!
    </div>
    <div class="subheading2">
      {{ this.$store.state.loggedinUserPhone }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greetings: "",
    };
  },
  mounted() {
    this.daySalutatuins();
  },
  methods: {
    async daySalutatuins() {
      var d = new Date();
      var time = d.getHours();

      if (time < 12) {
        this.greetings = "Morning ";
      } else if (time == 12) {
        this.greetings = "Afternoon ";
      } else if (time > 13 && time < 18) {
        this.greetings = "Afternoon ";
      } else if (time == 18) {
        this.greetings = "Evening ";
      } else if (time > 18) {
        this.greetings = "Evening ";
      }
      return this.greetings;
    },
  },
};
</script>
