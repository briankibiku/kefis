<template>
  <div class="">
  <Home/>
  </div>
</template>

<script>
import Home from '../components/Home.vue';

export default {
  data() {
    return {
    };
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {},
  components: { Home },
  middleware: 'redirect'
};
</script>

<style>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  outline: none;
}

input[type="text"]:focus {
  border: 2px solid #1ceded;
}
p {
  background-position: bottom;
  color: #bbb;
  padding-top: 2em;
}
</style>
