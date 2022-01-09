import calculate from '@/components/calculator'

describe('calculation', () => {
  it('return the total earning', () => {
    const wrapper = calculate(100, 21, 100, 'daily')
    expect(wrapper).valueOf('yValues: [100, 400, 1600, 6400, 25600, 204800, 819200, 3276800, 13107200, 52428800, 209715200]')
    console.log(wrapper)
  })
})
