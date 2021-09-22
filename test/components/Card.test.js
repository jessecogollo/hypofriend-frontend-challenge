import { mount } from '@vue/test-utils'
import Card from '@/components/Card'

describe('Card', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Card, {
      propsData: {
        title: 'test title',
        symbolMeasure: '$',
        value: 100000,
        fixValue: 1
      }
    })

    expect(wrapper.vm).toBeTruthy()
  })
})
