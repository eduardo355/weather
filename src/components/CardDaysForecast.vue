<template>
  <div class="flex justify-center text-white">
    <div class="w-full lg:w-4/5 xl:w-2/3 px-4 py-6">
      <div class="bg-slate-800 px-6 py-4 rounded-t-2xl shadow-md">
        <h2 class="text-2xl font-semibold tracking-wide">Pronóstico a 15 días</h2>
      </div>

      <div class="bg-slate-700 rounded-b-2xl shadow-lg overflow-hidden">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="grid grid-cols-4 items-center text-sm md:text-base gap-y-3 px-6 py-4 border-b border-white/10"
        >
          <span class="text-white/90 font-medium">{{ item.datetime }}</span>

          <span class="text-sky-500 font-bold text-lg md:text-xl">
            {{ fahrenheitToCelsius(item.tempmax) }}° / {{ fahrenheitToCelsius(item.tempmin) }}°
          </span>

          <component :is="generateTemperatureIcon(item.icon)" class="h-12 md:h-14 drop-shadow" />

          <div class="flex items-center space-x-2 text-white/80">
            <component :is="generateTemperatureIcon('rain')" class="h-5 md:h-6" />
            <span>{{ item.precipprob }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateTemperatureIcon } from '@/utils/generateTemperatureIcon'
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'

// Tipado de los datos esperados
interface ForecastItem {
  datetime: string
  tempmax: number
  tempmin: number
  icon: string
  precipprob: number
}

defineProps<{
  data: ForecastItem[]
}>()
</script>
