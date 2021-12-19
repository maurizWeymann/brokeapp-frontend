<template>
  <div class="calculations">
    <h1>This is an calculation page</h1>
    <line-chart v-for="(dataSet, index) in datasets" :x-values="dataSet.xValues" :y-values="dataSet.yValues" :key="index"></line-chart>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'Calculations',
  components: { LineChart },
  data () {
    return {
      datasets: [
        {
          xValues: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          yValues: [30, 40, 35, 50, 49, 60, 70, 91]
        },
        {
          xValues: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          yValues: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ]
    }
  }
}

</script>

<style scoped>

</style>
