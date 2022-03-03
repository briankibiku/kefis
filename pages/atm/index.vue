<template>
  <div>
    <AppWrapper>
      <template v-slot:large-screen>
        <h1>Here might be a LARGE page title</h1>
      </template>
      <template v-slot:small-screen>
        <h1>Here might be a SMALL page title</h1>
      </template>
    </AppWrapper>
  </div>
</template>

<script>
import AppWrapper from "../../components/AppWrapper.vue";
export default { components: { AppWrapper } };
</script>
