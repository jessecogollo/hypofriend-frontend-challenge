import { mount } from '@vue/test-utils'
import Index from '@/pages/index'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index)
    expect(wrapper.vm).toBeTruthy()
  })

  describe('Methods', () => {
    test('getFixationYearsData should udpdate resultData data', () => {
      const wrapper = mount(Index)

      const fakeData = {
        meta: {
          serverTime: '2020-10-26T15:34:12+00:00',
          status: 0,
          key: 'OK'
        },
        data: {
          root: {
            ratesTable: {
              5: {
                borrowingRate: 0.7,
                monthlyRate: 710.24
              },
              10: {
                borrowingRate: 0.75,
                monthlyRate: 723.39
              },
              15: {
                borrowingRate: 1.04,
                monthlyRate: 799.68
              },
              20: {
                borrowingRate: 1.32,
                monthlyRate: 873.33
              },
              25: {
                borrowingRate: 1.89,
                monthlyRate: 1023.27
              },
              30: {
                borrowingRate: 1.94,
                monthlyRate: 1036.43
              }
            }
          }
        }
      }

      expect(wrapper.vm.resultData).toStrictEqual({})
      wrapper.vm.getFixationYearsData(fakeData)
      expect(wrapper.vm.resultData).toStrictEqual(fakeData)
    })
  })
})
