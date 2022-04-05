<template>
  <button class="rounded-button-cyan subheading4" @click="callback($event)">
    {{ buttonText }}
    <!--
    <font-awesome-icon v-if="show" :icon="['fas', 'arrow-right']" />
    -->
  </button>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  props: {
    buttonText: String,
    showIcon: String,
  },
  mounted() {
    this.showIconFunc();
  },
  methods: {
    callback: function (e) {
      this.$emit("click", e);
    },
    showIconFunc() {
      this.showIcon == "true" ? (this.show = true) : (this.show = false);
    },
  },
};
</script>
