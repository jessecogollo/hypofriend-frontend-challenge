<template>
  <div class="shadow sm:col-span-3 border-b border-gray-200 sm:rounded-lg p-4 text-gray-700 bg-white">
    {{ title }}
    <p class="font-bold text-lg">
      {{ fixValueAmount }} {{ symbolMeasure }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true
    },
    symbolMeasure: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true,
      default: 0
    },
    fixValue: {
      type: Number,
      required: true
    }
  },
  computed: {
    fixValueAmount () {
      return this.value.toFixed(this.fixValue)
    }
  }
}
</script>
