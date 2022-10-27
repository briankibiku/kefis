<template>
    <div>
      <a :href="route">
        <div class="action-card">
          <div class="center-text">{{title}}</div>
        </div>
      </a>
      </div>
</template>

<script>
export default{
  props: ['title', 'route']
}
</script>

<style scoped>
.action-card {
  margin-bottom: 20px;
  padding: 20px;
  width: 170px;
  height: 170px;
  border-radius: 15px;
  box-shadow: 0 0 50px #ccc;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.center-text{
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
}
a:link { text-decoration: none; }
</style>