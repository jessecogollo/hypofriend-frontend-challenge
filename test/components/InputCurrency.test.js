import { mount } from '@vue/test-utils'
import Currency from '@/components/InputCurrency'

describe('Currency', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Currency, {
      propsData: {
        title: 'test title',
        value: ''
      }
    })

    expect(wrapper.vm).toBeTruthy()
  })
})
