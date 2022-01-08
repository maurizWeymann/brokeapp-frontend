import { mount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('Home.vue', () => {
  it('', () => {
    const wrapper = mount(Home)
    expect(wrapper.html().includes('class="home"')).toBe(true)
    console.log(wrapper.html())
  })
})
