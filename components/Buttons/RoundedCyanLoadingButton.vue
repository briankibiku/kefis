<template>
  <b-overlay
    :show="busy"
    rounded
    opacity="0.6"
    spinner-small
    spinner-variant="primary"
    class="d-inline-block"
    @hidden="onHidden"
  >
    <b-button
      class="rounded-button-cyan subheading4"
      ref="button"
      :disabled="busy"
      @click="
        callback($event);
        onClick();
      "
      style="width: 240px"
    >
      {{ buttonText }}
      <font-awesome-icon v-if="show" :icon="['fas', 'arrow-right']" />
    </b-button>
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      busy: false,
      timeout: null,
      show: false,
    };
  },
  props: {
    buttonText: String,
    showIcon: String,
    showloading: String,
  },
  mounted() {
    if (this.showIcon == "true") {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  methods: {
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    setTimeout(callback) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        callback();
      }, 60000);
    },
    onHidden() {
      // Return focus to the button
      this.$refs.button.focus();
    },
    onClick() {
      this.busy = true;
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
      });
    },
    callback: function (e) {
      this.$emit("click", e);
    },
    showIconFunc() {
      this.showIcon == "true" ? (this.show = true) : (this.show = false);
    },
  },
};
</script>
