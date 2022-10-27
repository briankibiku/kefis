<template>
  <div class="centered-container">
    <div
      v-if="
        error.statusCode === 404 ||
        error.statusCode === 502 ||
        error.statusCode === 504
      "
    >
      <!-- <img src="~/assets/errorbot.gif" width="260" alt="" /> -->
      <div class="heading1" style="color: #160d3d">Oops!!</div>
      <div class="heading4 text-center">
        An error occurred, we are working on resolving it
      </div>
      Go to
      <nuxt-link class="heading3" style="text-decoration: underline" to="/home"
        >Home page</nuxt-link
      >
    </div>
    <h1 v-else>An error occurred</h1>
  </div>
</template>
<script>
export default {
  props: ["error"],
};
</script>
