<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div id="shopping-list">
    <h1>{{header}}</h1>
    <input type="text" v-model="header">
  </div>
</template>
<script>
    el: '#shopping-list';
</script>
