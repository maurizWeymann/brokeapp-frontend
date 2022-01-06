<template>
  <div class="page">
    <div class="wrapperClass" style="min-height:100vh; max-width:850px; margin: 0 auto;">
      <div class="borderClass"  style=" width:100%; height: 100%; ">
        <navbar></navbar>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar }
}

</script>

<style>

#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.page {
  background-image: linear-gradient(#110d33, #372aa8, #455af3, #3d6bf4, #173466);
}
</style>
