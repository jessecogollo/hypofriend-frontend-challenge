<template>
  <div class="sm:col-span-3">
    <label for="property-purchase-price" class="block text-sm font-medium text-gray-700">
      {{ title }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="sm:text-sm">
          €
        </span>
      </div>
      <input
        id="property-purchase-price"
        :value="value"
        type="text"
        name="property-purchase-price"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
        placeholder="0.00"
        @input="$emit('input', $event.target.value)"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Currency',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
