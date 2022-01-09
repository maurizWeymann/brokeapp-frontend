import { mount } from '@vue/test-utils'
import CalculationItem from '@/components/CalculationItem'

describe('CalculationItem', () => {
  it('should return something', () => {
    const wrapper = mount(CalculationItem, {
      propsData: {
        calculation: {
          initialInvestment: 10,
          yearsToAccumulate: 10,
          additionalContribution: 10,
          interestRate: 10,
          compoundFrequency: 'daily',
          yValues: [],
          totalEarning: 0
        }
      }
    })
    const foundCalculationItems = wrapper.html()
    expect(foundCalculationItems).not.toBeNull()
  })
})
