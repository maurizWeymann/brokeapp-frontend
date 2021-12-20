<template>
  <form class="col">
    <div class="form-row align-items-center">
      <div class="row align-items-center">
        <div class="col-auto my-1">
          <label class="mr-sm-2" >initial investment</label>
          <input type="text" class="form-control" placeholder="1000,00" v-model="initialInvestment" @keypress="calculate">
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2" >years to accumulate</label>
          <input type="text" class="form-control" placeholder="10" v-model="yearsToAccumulate" @keypress="calculate">
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
  <line-chart class="col" :x-values="xValues" :y-values="yValues"></line-chart>
</template>

<script>
import calculate from '@/components/calculator'
import LineChart from '@/components/LineChart'

export default {
  name: 'CalculationItem',
  components: {
    LineChart
  },
  data () {
    return {
      initialInvestment: 0,
      yearsToAccumulate: 0,
      xValues: [1, 2, 3],
      yValues: [1, 2, 3]
    }
  },
  methods: {
    calculate () {
      const result = calculate(this.initialInvestment, this.yearsToAccumulate)
      this.xValues = result.xValues
      this.yValues = result.yValues
      console.log(this.xValues)
    }
  }
}
</script>

<style scoped>

</style>
