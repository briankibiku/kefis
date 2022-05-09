<template>
  <div>
    <h1>{{ error.statusCode }} It Seems you are lost?</h1>
    <nuxt-link to="/">Take Me Home </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "error",
};
</script>
<style scopped></style>
