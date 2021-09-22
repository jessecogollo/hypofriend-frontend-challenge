<template>
  <div class="space-y-8 mx-5">
    <div class="bg-white shadow sm:col-span-3 border-b border-gray-200 sm:rounded-lg p-4 text-gray-700">
      <div class="space-y-8">
        <div class="pt-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Mortgage Calculator
            </h3>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <Currency
              v-model.number="porpertyPurchasePrice"
              title="Property Purchase Price"
            />

            <Currency
              v-model.number="totalSavings"
              title="Total Savings"
            />

            <div class="sm:col-span-3">
              <label for="real-estate-commission" class="block text-sm font-medium text-gray-700">
                Real estate commission
              </label>
              <div class="mt-1">
                <label class="inline-flex items-center">
                  <input v-model="realEstateCommission" :value="true" type="radio" name="accountType">
                  <span class="ml-2">Yes</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input v-model="realEstateCommission" :value="false" type="radio" name="accountType">
                  <span class="ml-2">No</span>
                </label>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="annual-repayment-rate" class="block text-sm font-medium text-gray-700">
                Annual repayment rate (%) *
              </label>
              <div class="mt-1">
                <div class="flex flex-row h-9 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    class=" text-white bg-indigo-600 hover:bg-indigo-700  h-full w-20 rounded-l cursor-pointer sm:text-sm"
                    @click="decrementAnnualRate"
                  >
                    <span class="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input v-model="annualRepaymentRate" type="number" class="border-gray-300 outline-none focus:outline-none text-center w-full bg-white text-sm md:text-basecursor-default flex items-center text-gray-700" value="0">
                  <button
                    class="text-white bg-indigo-600 hover:bg-indigo-700  h-full w-20 rounded-r cursor-pointer sm:text-sm"
                    @click.prevent="incrementAnnualRate"
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="errorMessages.length !== 0"
        class="rounded-md bg-red-50 p-4 mt-8"
      >
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Please check:
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <ul role="list" class="list-disc pl-5 space-y-1">
                <li v-for="(message, Idx) in errorMessages" :key="Idx">
                  {{ message }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            class="mt-6 inline-flex justify-center py-2 px-4 w-full sm:w-36 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="calculatebuttonClick"
          >
            <div v-if="calculating" class=" flex justify-center items-center">
              <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white-50" />
            </div>
            <span v-else>
              Calculate
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <Card
          title="Implied loan"
          symbol-measure="€"
          :value="rawLoanAmount"
          :fix-value="0"
        />
        <Card
          title="Loan to value"
          symbol-measure="%"
          :value="loanToValueFormated"
          :fix-value="1"
        />
      </div>
    </div>
  </div>
</template>
<script>

import gql from 'graphql-tag'

import Card from '@/components/Card'
import Currency from '@/components/InputCurrency'

const result = {
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

export default {
  name: 'Form',
  components: {
    Card,
    Currency
  },
  data () {
    return {
      porpertyPurchasePrice: '',
      totalSavings: '',
      realEstateCommission: true,
      annualRepaymentRate: 0,
      brokerTax: 0.0714,
      cityTax: 0.06, // berlin, brandenburg, bavaria, hamburg, saxony, baden-wurttemberg and hesse
      stampDutyCosts: 0,
      brokerCosts: 0,
      notaryCosts: 0,
      totalCost: 0,
      rawLoanAmount: 0,
      loanToValue: 0,
      calculating: false,
      errorMessages: []
    }
  },
  computed: {
    loanToValueFormated () {
      return (this.loanToValue * 100)
    }
  },
  watch: {
    porpertyPurchasePrice () {
      this.validateFields()
    },
    totalSavings () {
      this.validateFields()
    }
  },
  methods: {
    validateFields () {
      const porpertyPurchasePriceNumber = parseInt(this.porpertyPurchasePrice, 10)
      const totalSavingsNumber = parseInt(this.totalSavings, 10)
      if (porpertyPurchasePriceNumber >= 60000 && totalSavingsNumber >= 10000) {
        this.calculateloanValues(porpertyPurchasePriceNumber, totalSavingsNumber)
      }
    },
    calculateloanValues (porpertyPurchasePriceNumber, totalSavingsNumber) {
      this.notaryCosts = (2144.0 + (0.013 * (porpertyPurchasePriceNumber - 100000.0)))
      this.brokerCosts = this.brokerTax * porpertyPurchasePriceNumber
      this.stampDutyCosts = this.cityTax * porpertyPurchasePriceNumber
      this.totalCost = this.notaryCosts + this.brokerCosts + this.stampDutyCosts
      this.rawLoanAmount = this.totalCost - totalSavingsNumber + porpertyPurchasePriceNumber
      this.loanToValue = this.rawLoanAmount / porpertyPurchasePriceNumber
    },
    calculatebuttonClick () {
      this.calculating = true
      if (this.formValidation() === 0) {
        // TODO Get GraphQL data
        this.$emit('get-fixation-years-data', result.data.root.ratesTable)
      }
      this.calculating = false
    },
    formValidation () {
      this.errorMessages = []
      if (this.porpertyPurchasePrice === '') {
        this.errorMessages.push('Property Purchase Price is mandatory')
      }
      if (this.porpertyPurchasePrice < 60000) {
        this.errorMessages.push('Property Purchase Price should be more than 60000 €')
      }
      if (this.totalSavings === '') {
        this.errorMessages.push('Total Savings is mandatory')
      }
      if (this.totalSavings < 10000) {
        this.errorMessages.push('Total Savings should be more than 10000 €')
      }
      if (this.annualRepaymentRate === 0) {
        this.errorMessages.push('Annual repayment rate is mandatory')
      }
      return this.errorMessages.length
    },
    decrementAnnualRate () {
      if (this.annualRepaymentRate <= 0) {
        this.annualRepaymentRate = 0
      } else {
        this.annualRepaymentRate--
      }
    },
    incrementAnnualRate () {
      if (this.annualRepaymentRate >= 100) {
        this.annualRepaymentRate = 100
      } else {
        this.annualRepaymentRate++
      }
    }
  },
  apollo: {
    characters: gql`
      query getCharacters {
        characters {
          results {
            id
            name
            status
          }
        }
      }
    `,
  }
}
</script>
