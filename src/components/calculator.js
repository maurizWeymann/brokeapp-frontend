export default function calculate (initialInvestment, yearToAccumulate, interestRate) {
  // let initialInvestment
  // let yearsToAccumulate
  let xes = []
  let yes = []
  if (interestRate === 0) {
    interestRate = 0
  }
  const oneTenthYearToAccumulate = yearToAccumulate / 10
  for (let i = 0; i < 10; i++) {
    xes[i] = oneTenthYearToAccumulate * i
  }
  if (initialInvestment > 0) {
    yes.push(initialInvestment)
    for (let i = 1; i <= yearToAccumulate; i++) {
      yes[i] = yes[i - 1] + (yes[i - 1] * interestRate / 100)
      // xes[i] = i
    }
  } else {
    yes = [1, 2, 3]
    xes = [100, 200, 300, 400, 5, 6]
  }
  return {
    xValues: xes,
    yValues: yes
  }
}
