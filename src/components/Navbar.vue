<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">BrokeApp</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
<!--            <a class="nav-link active" aria-current="page" href="#">Home</a>-->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
            <!--            <a class="nav-link" href="#">About</a>-->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/calculations">Calculations</router-link>
            <!--            <a class="nav-link" href="#">Calculations</a>-->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>

</style>
