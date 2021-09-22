import { mount } from '@vue/test-utils'
import Table from '@/components/Table'

describe('Table', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Table, {
      propsData: {
        fixationYears: {}
      }
    })

    expect(wrapper.vm).toBeTruthy()
  })
})
