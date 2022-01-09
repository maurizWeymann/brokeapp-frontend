import calculate from '@/components/calculator'

describe('calculation', () => {
  it('return an calculation object', () => {
    const wrapper = calculate(100, 21, 100, 'daily')
    expect(wrapper).valueOf('yValues: [100, 400, 1600, 6400, 25600, 204800, 819200, 3276800, 13107200, 52428800, 209715200]')
  })
  it('checks if calculation returns a xValues', () => {
    const wrapper = calculate(100, 21, 100, 'daily')
    expect(wrapper).toHaveProperty('xValues')
  })
  it('return the total earning', () => {
    const wrapper = calculate(100, 27, 10, 'daily')
    expect(wrapper.yValues[10]).toBe(1311)
  })
})
