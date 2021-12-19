<template>
  <div class="calculations">
    <form>
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
          <label class="mr-sm-2" for="inlineFormCustomSelect">compound crequency</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Choose...</option>
            <option value="Daily">One</option>
            <option value="Monthly">Two</option>
            <option value="Yearly">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </form>

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
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('http://localhost:8080/api/v1/calculations', requestOptions)
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
