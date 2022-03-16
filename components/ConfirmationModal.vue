<template>
  <div>
    <button class="rounded-button-cyan heading4 text-center" @click="showModal">
      {{ buttonText }}
    </button>

    <b-modal ref="my-modal" hide-footer :title="title">
      <div class="d-block">
        <div class="heading3">{{ body }} {{ extra }}</div>
      </div>
      <div class="d-block text-center" style="margin-top: 20px">
        <b-button
          variant="secondary"
          @click="hideModal"
          style="margin-right: 20px"
          >Cancel</b-button
        >

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
            :variant="action"
            ref="button"
            :disabled="busy"
            @click="
              callback($event);
              onClick();
            "
            >Yes</b-button
          ></b-overlay
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: "",
    title: "",
    body: "",
    action: "",
    extra: "",
    busy: false,
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  methods: {
    onClick() {
      this.busy = true;
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
      });
    },
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
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      return this.$router.push("/home");
    },
    callback: function (e) {
      this.$emit("click", e);
    },
  },
};
</script>
