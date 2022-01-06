<template>
  <div>
    <apexchart
      width="500"
      type="area"
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
          id: 'vuechart-example',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: this.xValues,
          labels: {
            style: {
              colors: '#ffffff',
              fontFamily: 'Poppins'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#ffffff',
              fontFamily: 'Poppins'
            }
          }
        },
        annotations: {
          yaxis: [],
          xaxis: []
        }
      },
      series: [
        {
          name: 'period',
          data: this.yValues
        }
      ]
    }
  },
  watch: {
    xValues () {
      this.chartOptions.xaxis.categories = this.xValues
      console.debug(`LineChart: ${this.chartOptions}`)
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
