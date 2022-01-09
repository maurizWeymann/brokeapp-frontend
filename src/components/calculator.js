export default function calculate (initialInvestment, yearToAccumulate, interestRate, compoundFrequency, additionalContribution) {
  // let initialInvestment
  // let yearsToAccumulate
  const xValueArray = []
  const yValueArray = []
  const yValueCalculation = []
  let yCalculationArrayIndex
  let oneTenthYearToAccumulate
  // InterestRate
  if (interestRate.isNaN) {
    interestRate = 0
  }
  // yearsToAccumulate
  if (yearToAccumulate === 0) {
    yearToAccumulate = 1
    // oneTenthYearToAccumulate = 1
  } else if (yearToAccumulate > 20) {
  }
  for (let i = 0; i <= yearToAccumulate; i++) {
    yValueCalculation[i] = (initialInvestment * ((interestRate + 100) / 100) ** (12 * i / 12))
    // initialInvestment = yValueCalculation[i] + additionalContribution
  }
  if (yearToAccumulate <= 20) {
    yValueCalculation.forEach(element => yValueArray.push(Math.round(element * 100) / 100))
    // yValueArray = yValueCalculation
  } else if (yearToAccumulate > 20) {
    oneTenthYearToAccumulate = yearToAccumulate / 10
    yValueArray[0] = Math.round((yValueCalculation[0.00] * 100) / 100)
    xValueArray.push(1)
    for (let i = 1; i <= 10; i++) {
      yCalculationArrayIndex = Math.round(oneTenthYearToAccumulate * (i))
      // console.log(yCalculationArrayIndex)
      xValueArray.push(yCalculationArrayIndex)
      yValueArray[i] = Math.round(yValueCalculation[yCalculationArrayIndex] * 100) / 100
    }
  }
  return {
    yValues: yValueArray,
    xValues: xValueArray
  }
}
