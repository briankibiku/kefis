<template>
  <div class="overlay" style="z-index: 9999; height: 100vh" v-if="loading">
    <div style="margin: 20px">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
      <div>Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>
