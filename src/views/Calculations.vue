<template>
  <div class="calculations row pt-5" v-for="(dataSet, index) in datasets" :key="index">
    <form class="col">
      <div class="form-row align-items-center">
        <div class="row align-items-center">
          <div class="col-auto my-1">
            <label class="mr-sm-2" >initial investment</label>
            <input type="text" class="form-control" placeholder="1000,00">
          </div>
          <div class="col-auto my-1">
            <label class="mr-sm-2" >years to accumulate</label>
            <input type="text" class="form-control" placeholder="10">
          </div>
          <div class="col-auto my-1">
            <label class="mr-sm-2" >additional contribution</label>
            <input type="text" class="form-control" placeholder="500,00">
          </div>
        </div>
        <div class="col-auto my-1">
          <div class="col-auto my-1">
            <label class="mr-sm-2" >interest rate</label>
            <input type="text" class="form-control" placeholder="10%">
          </div>
          <label class="mr-sm-2" >compound crequency</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Choose...</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </form>

    <line-chart class="col" :x-values="dataSet.xValues" :y-values="dataSet.yValues"></line-chart>
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
          yValues: [30, 40, 35, 50, 49, 60, 10, 1]
        }
      ]
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/calculations'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .then(result => result.forEach(calculation => {
        this.calculation.push(calculation)
      }))
      .catch(error => console.log('error', error))
  }
}

</script>

<style scoped>
.calculations{
  background-color: #c9c8c8;
}
</style>
