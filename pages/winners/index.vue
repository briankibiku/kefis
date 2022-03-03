<template>
  <div>
    <AppWrapper requiresSmallAndLargeScreenViews="false">
      <template v-slot:large-screen><Winners /> </template
    ></AppWrapper>
  </div>
</template>

<script>
import AppWrapper from "../../components/AppWrapper.vue";
import Winners from "../../components/Winners.vue";
export default { components: { AppWrapper, Winners } };
</script>
