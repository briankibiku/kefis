<template>
  <b-button class="outline-button" @click="clickEvent">{{ title }}</b-button>
</template>

<script>
export default {
  props: { title: String, clickEvent: Promise },
};
</script>
