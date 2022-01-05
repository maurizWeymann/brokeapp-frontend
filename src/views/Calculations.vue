<template>
  <div class="calculations row pt-5" v-for="(calculation, index) in calculations" :key="index">
    <calculation-item :calculation="calculation"></calculation-item>
  </div>
</template>

<script>
import CalculationItem from '@/components/CalculationItem'

export default {
  name: 'Calculations',
  data () {
    return {
      calculations: []
    }
  },
  components: {
    CalculationItem
  },
  mounted () {
    // const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/calculations'
    const endpoint = 'https://brokeapp-frontend.herokuapp.com/api/v1/calculations'
    // const endpoint = 'http://localhost:8080/api/v1/calculations'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(calculation => {
        this.calculations.push(calculation)
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
