<template>
  <div class="calculations">
    <h1>This is an calculation page</h1>
    <line-chart></line-chart>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'Calculations',
  components: { LineChart }
}

</script>

<style scoped>

</style>
