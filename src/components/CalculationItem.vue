<template>
  <form class="col needs-validation" novalidate>
    <div class="form-row align-items-center">
      <div class="form-row align-items-center">
        <div class="col-auto my-1">
          <label class="mr-sm-2 text-light " >initial investment</label>
          <input type="number" v-model="initialInvestment" @change="calculate" required class="form-control bg-transparent text-light rounded-0 border-bottom-1 border-top-0 border-start-0 border-end-0"  >
          <div class="invalid-feedback">Please provide an amount</div>
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2 text-light" >years to accumulate</label>
          <input type="number" placeholder="1000" v-model="yearsToAccumulate" @change="calculate" required class="form-control bg-transparent text-light rounded-0 border-bottom-1 border-top-0 border-start-0 border-end-0" >
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2 text-light" >additional contribution</label>
          <input type="number" placeholder="500,00" v-model="additionalContribution" @change="calculate" required class="form-control bg-transparent text-light rounded-0 border-bottom-1 border-top-0 border-start-0 border-end-0">
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2 text-light" >interest rate</label>
          <input type="number" placeholder="10%" v-model="interestRate" @change="calculate" required class="form-control bg-transparent text-light rounded-0 border-bottom-1 border-top-0 border-start-0 border-end-0">
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2 text-light" >compound frequency</label>
          <select id="inlineFormCustomSelect" v-model="compoundFrequency" required class="form-select bg-transparent text-light rounded-0 border-bottom-1 border-top-0 border-start-0 border-end-0">
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div class="col-auto d-grid gap-2 d-md-flex justify-content-md-center pt-3 ">
        <button type="submit" class="btn btn-primary" @click="updateCalculation(calculationId)">Update</button>
        <button type="submit" class="btn btn-primary" @click="createCalculation">Save</button>
        <button type="submit" class="btn btn-danger"  @click="deleteCalculation(calculationId)">Delete</button>
      </div>
    </div>
  </form>
  <div class="col">
    <line-chart class="pt-3" :x-values="xValues" :y-values="yValues" :key="keyToChange"></line-chart>
    <h2 class="text-light">final earning: {{totalEarning}}€</h2>
  </div>
  <div v-if="this.serverValidationMessages">
    <ul>
      <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
        {{ message }}
      </li>
    </ul>
  </div>
<!--  <p>xValues {{xValues}}</p>-->
<!--  <p>yValues {{yValues}}</p>-->
</template>

<script>
import calculate from '@/components/calculator'
import LineChart from '@/components/LineChart'

export default {
  props: ['calculation'],
  initialInvestment: {
    type: Number,
    default: 0
  },
  name: 'CalculationItem',
  components: {
    LineChart
  },
  data () {
    return {
      initialInvestment: this.calculation.initialInvestment,
      yearsToAccumulate: this.calculation.yearsToAccumulate,
      additionalContribution: this.calculation.additionalContribution,
      interestRate: this.calculation.interestRate,
      compoundFrequency: this.calculation.compoundFrequency,
      xValues: [],
      yValues: [],
      serverValidationMessages: [],
      calculationId: this.calculation.id,
      totalEarning: 0,
      keyToChange: 0
    }
  },
  emits: ['created'],
  methods: {
    calculate () {
      const result = calculate(this.initialInvestment, this.yearsToAccumulate, this.interestRate, this.compoundFrequency, this.additionalContribution)
      this.xValues = result.xValues
      this.yValues = result.yValues
      // console.log(`x:  ${this.xValues} `)
      // console.log(this.xValues)
      // console.log(`y:  ${this.yValues} `)
      // console.log(this.yValues)
      this.keyToChange += 1
      this.totalEarning = this.yValues[this.yValues.length - 1].toLocaleString()
    },
    async createCalculation () {
      // console.log(this.initialInvestment)
      // console.log(this.yearsToAccumulate)
      // console.log(this.additionalContribution)
      // console.log(this.interestRate)
      // console.log(this.compoundFrequency)
      // const valid = this.validate()
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/calculations'
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const calculation = JSON.stringify({
          initialInvestment: this.initialInvestment,
          yearsToAccumulate: this.yearsToAccumulate,
          additionalContribution: this.additionalContribution,
          interestRate: this.interestRate,
          compoundFrequency: this.compoundFrequency
        })

        var requestOptions = {
          method: 'POST',
          headers: headers,
          body: calculation,
          redirect: 'follow'
        }

        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    },
    async updateCalculation (calculationId) {
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/calculations/' + calculationId
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const calculation = JSON.stringify({
          initialInvestment: this.initialInvestment,
          yearsToAccumulate: this.yearsToAccumulate,
          additionalContribution: this.additionalContribution,
          interestRate: this.interestRate,
          compoundFrequency: this.compoundFrequency
        })
        var requestOptions = {
          method: 'PUT',
          headers: headers,
          body: calculation,
          redirect: 'follow'
        }
        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    },
    async deleteCalculation (calculationId) {
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/calculations/' + calculationId
      fetch(endpoint, requestOptions)
        .catch(error => console.log('error', error))
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created', response.headers.get('location'))
        // document.getElementById('close-offcanvas').click()
      } else if (response.status === 400) {
        response = await response.json()
        response.errors.forEach(error => {
          this.serverValidationMessages.push(error.defaultMessage)
        })
      } else {
        this.serverValidationMessages.push('Unknown error occurred')
      }
    },
    validate () {
      let valid = true
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              valid = false
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
      return valid
    }
  },
  created () {
    this.calculate()
  }
}
</script>

<style scoped>
input:focus{
  box-shadow: 0 0 4px 0.05rem rgba(255, 255, 255, 0.55);
  border-bottom: 0;
}
select:focus{
  box-shadow: 0 0 4px 0.05rem rgba(255, 255, 255, 0.55);
  border-bottom: 0;
}
option:focus{
  box-shadow: 0 0 4px 0.05rem rgba(255, 255, 255, 0.55);
  border-bottom: 0;
}
option{
  box-shadow: 0 0 4px 0.05rem rgba(255, 255, 255, 0.55);
  background-color: #455af3;
}

</style>
