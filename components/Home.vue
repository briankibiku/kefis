<template>
  <div>
    <h3>
      Store
    </h3>
    <table class="table" style="margin: 20px;">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
  </div>
  
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  layout: 'default',
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
  components: { NavBar },
};
</script>


<style scoped>
.center-align-content {
  margin: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.underline {
  height: 10px;
  width: 120px;
  color: aqua;
}
</style>
