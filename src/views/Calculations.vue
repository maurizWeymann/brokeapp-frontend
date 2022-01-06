<template>
  <div class="calculations row mb-3 mt-4 p-4" v-for="(calculation, index) in calculations" :key="index">
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
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/calculations'
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
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 15px 70px;
  border: 1px  solid #c9c8c8;
  box-shadow: 0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030;
}
</style>
