<template>
  <button class="outline-button" @click="callback($event)">Press Me</button>
</template>

<script>
export default {
  methods: {
    callback: function (e) {
      this.$emit("click", e);
    },
  },
};
</script>
