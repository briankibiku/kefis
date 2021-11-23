<template>
  <footer>
    <b-container>
      <p class="text-footer text-mswali">
        Copyright &#169;{{ currentYear }} mswali All rights Reserved
      </p>
    </b-container>
  </footer>
</template>
<script>
export default {
  props: {
    isDark: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      importStyle: this.isDark ? "text-mswali" : "text-light",
    };
  },
};
</script>
<style scoped>
.text-mswali {
  color: #160d3d;
}
.text-turquoise {
  color: #1ceded;
}
.text-footer {
  color: #160d3d;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.02em;
}
</style>
