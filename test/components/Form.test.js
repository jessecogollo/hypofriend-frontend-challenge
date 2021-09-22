import { mount } from '@vue/test-utils'
import Form from '@/components/Form'

describe('Form', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Form)

    expect(wrapper.vm).toBeTruthy()
  })

  describe('methods', () => {
    test('validateFields does not update component values', () => {
      const wrapper = mount(Form)
      wrapper.vm.validateFields()

      expect(wrapper.vm.loanToValue).toBe(0)
    })

    test('validateFields should update component values', async () => {
      const wrapper = mount(Form)

      await wrapper.setData({
        porpertyPurchasePrice: 70000,
        totalSavings: 70000
      })
      wrapper.vm.validateFields()

      expect(wrapper.vm.loanToValue).toBe(0.15645714285714285)
    })

    test('calculatebuttonClick should show 5 message errors', () => {
      const wrapper = mount(Form)
      wrapper.vm.calculatebuttonClick()

      expect(wrapper.vm.calculating).toBe(false)
      expect(wrapper.vm.errorMessages).toHaveLength(5)
    })

    test('calculatebuttonClick should show 0 message errors', async () => {
      const wrapper = mount(Form)

      await wrapper.setData({
        porpertyPurchasePrice: 70000,
        totalSavings: 70000,
        annualRepaymentRate: 1
      })
      wrapper.vm.calculatebuttonClick()

      expect(wrapper.vm.calculating).toBe(false)
      expect(wrapper.vm.errorMessages).toHaveLength(0)
    })

    test('decrementAnnualRate should decrese annual rate value', async () => {
      const wrapper = mount(Form)

      await wrapper.setData({
        annualRepaymentRate: 2
      })

      wrapper.vm.decrementAnnualRate()

      expect(wrapper.vm.annualRepaymentRate).toBe(1)
    })

    test('decrementAnnualRate should NOT decrese annual rate value', () => {
      const wrapper = mount(Form)
      wrapper.vm.decrementAnnualRate()

      expect(wrapper.vm.annualRepaymentRate).toBe(0)
    })

    test('incrementAnnualRate should increment annual rate value', async () => {
      const wrapper = mount(Form)

      await wrapper.setData({
        annualRepaymentRate: 2
      })

      wrapper.vm.incrementAnnualRate()

      expect(wrapper.vm.annualRepaymentRate).toBe(3)
    })

    test('incrementAnnualRate should NOT increment annual rate value', async () => {
      const wrapper = mount(Form)

      await wrapper.setData({
        annualRepaymentRate: 100
      })
      wrapper.vm.incrementAnnualRate()

      expect(wrapper.vm.annualRepaymentRate).toBe(100)
    })
  })
})
