<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="height: 60vh">
    <HelloWorld class="text-light pt-5" msg="brokeApp by mauriz weymann"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
