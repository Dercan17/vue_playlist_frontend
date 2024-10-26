import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ShowPlayListComponent from '../src/components/ShowPlayListComponent.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(ShowPlayListComponent)
    expect(wrapper).toMatchSnapshot
  })
})
