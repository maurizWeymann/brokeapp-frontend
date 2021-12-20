<template>
  <div>
    <apexchart
      width="500"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: 'LineChart',
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: this.xValues
        }
      },
      series: [
        {
          name: 'series-1',
          data: this.yValues
        }
      ]
    }
  },
  watch: {
    xValues () {
      this.chartOptions.xaxis.categories = this.xValues
    },
    yValues () {
      this.series[0].data = this.yValues
    }
  },
  props: {
    xValues: {
      type: Array,
      required: true
    },
    yValues: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
