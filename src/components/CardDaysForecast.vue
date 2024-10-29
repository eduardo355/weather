<template>
  <div class="flex justify-center items-center">
    <div class="w-1/2 px-4 py-4">
      <h2 class="text-2xl font-semibold">Pronóstico a 15 dias</h2>

      <div
        v-for="(item, index) in data"
        class="grid grid-cols-4 place-content-center place-items-center items-center py-2"
        :key="index"
      >
        <span>{{ item.datetime }}</span>
        <span class="text-sky-500 text-2xl font-semibold"
          >{{ fahrenheitToCelsius(item.tempmax) }}°/{{ fahrenheitToCelsius(item.tempmin) }}°</span
        >
        <component :is="generateTemperatureIcon(item.icon)" class="h-20" />
        <div class="flex items-center space-x-2">
          <component :is="generateTemperatureIcon('rain')" class="h-20" />
          <span>{{ item.precipprob }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'
import { generateTemperatureIcon } from '@/utils/generateTemperatureIcon'

defineProps<{
  data: any
}>()
</script>
