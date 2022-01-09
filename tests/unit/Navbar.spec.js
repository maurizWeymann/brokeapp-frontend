import { mount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'

describe('Navbar.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.html()).toContain('ul class="navbar-nav"')
  })
})
