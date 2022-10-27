<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a href="/home"><img src="~/assets/kefis.png" width="200" height="65" /></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse text-center" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/store">Store</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/warehouse">Warehouse</a>
      </li>
    </ul>
    <span class="navbar-text">
        <ul class="navbar-nav mr-auto">
      <li>         
        <a class="nav-link" >{{userName}}</a>
      </li>
    </ul>
    </span>
  </div>
</nav>
</template>

<script>
export default{
  data(){
    return {
      userName: this.$store.state.userName,
    }
  }
}
</script>