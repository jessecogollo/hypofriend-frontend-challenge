<template>
  <div class="my-5">
    <Form
      @get-fixation-years-data="getFixationYearsData"
    />
    <Table
      :fixation-years="resultData"
    />
  </div>
</template>
<script>
import Form from '@/components/Form'
import Table from '@/components/Table'
export default {
  name: 'MortgageCalculator',
  components: {
    Form,
    Table
  },
  data () {
    return {
      resultData: {}
    }
  },
  methods: {
    getFixationYearsData (data) {
      this.resultData = data
    }
  }
}
</script>
