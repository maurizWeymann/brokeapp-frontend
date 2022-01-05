<template>
  <form class="col needs-validation" novalidate>
    <div class="form-row align-items-center">
      <div class="form-row align-items-center">
        <div class="col-auto my-1">
          <label class="mr-sm-2" >initial investment</label>
          <input type="number" class="form-control"  v-model="initialInvestment" @change="calculate" required>
          <div class="invalid-feedback">Please provide an amount</div>
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2" >years to accumulate</label>
          <input type="number" class="form-control" placeholder="1000" v-model="yearsToAccumulate" @change="calculate" required>
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2" >additional contribution</label>
          <input type="number" class="form-control" placeholder="500,00" v-model="additionalContribution" @change="calculate" required>
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2" >interest rate</label>
          <input type="number" class="form-control" placeholder="10%" v-model="interestRate" @change="calculate" required>
        </div>
        <div class="col-auto my-1">
          <label class="mr-sm-2" >compound frequency</label>
          <select class="form-select " id="inlineFormCustomSelect" v-model="compoundFrequency" required>
            <option value="" selected disabled>Choose...</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div class="col-auto d-grid gap-2 d-md-flex justify-content-md-center ">
        <button type="submit" class="btn btn-primary" @click="updateCalculation(calculationId)">Update</button>
        <button type="submit" class="btn btn-primary" @click="createCalculation">Save</button>
        <button type="submit" class="btn btn-danger"  @click="deleteCalculation(calculationId)">Delete</button>
      </div>
    </div>
  </form>
  <line-chart class="col" :x-values="xValues" :y-values="yValues"></line-chart>
  <div v-if="this.serverValidationMessages">
    <ul>
      <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
        {{ message }}
      </li>
    </ul>
  </div>
  <p>xValues {{xValues}}</p>
  <p>yValues {{yValues}}</p>
</template>

<script>
import calculate from '@/components/calculator'
import LineChart from '@/components/LineChart'

export default {
  props: ['calculation'],
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
      calculationId: this.calculation.id
    }
  },
  emits: ['created'],
  methods: {
    calculate () {
      const result = calculate(this.initialInvestment, this.yearsToAccumulate, this.interestRate, this.compoundFrequency)
      this.xValues = result.xValues
      this.yValues = result.yValues
      console.log(`x:  ${this.xValues} `)
      console.log(this.xValues)
      console.log(`y:  ${this.yValues} `)
      console.log(this.yValues)
    },
    async createCalculation () {
      console.log(this.initialInvestment)
      console.log(this.yearsToAccumulate)
      console.log(this.additionalContribution)
      console.log(this.interestRate)
      console.log(this.compoundFrequency)
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
  mounted () {
    this.calculate()
  }
}
</script>

<style scoped>

</style>
