<template>
  <div class="flex justify-center items-center">
    <div class="lg:w-1/2 w-full px-4 py-4">
      <h2 class="text-2xl font-semibold">Pronóstico por hora</h2>

      <div :class="isExpanded && 'max-h-auto'" class="overflow-hidden">
        <div
          v-for="(hour, index) in visibleData"
          :key="index"
          class="grid grid-cols-4 place-content-center place-items-center items-center md:py-2"
        >
          <span>{{ formattedTime(hour.datetime) }}</span>
          <span class="text-sky-500 md:text-4xl text-3xl font-semibold">
            {{ fahrenheitToCelsius(hour.feelslike) }}°
          </span>
          <component :is="generateTemperatureIcon(hour.icon)" class="h-20" />
          <div class="flex items-center space-x-2">
            <component :is="generateTemperatureIcon('rain')" class="h-20 hidden md:block" />
            <span>{{ hour.precipprob }}%</span>
          </div>
        </div>
      </div>
      <button
        @click="toggleExpand"
        class="mt-4 px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg transition hover:bg-sky-600 w-full"
      >
        {{ isExpanded ? 'Ver menos' : 'Proximas 13 horas' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formattedTime } from '@/utils/formattedTime'
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'
import { generateTemperatureIcon } from '@/utils/generateTemperatureIcon'

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const visibleData = computed(() => {
  return isExpanded.value ? props.data : props.data.slice(0, 11)
})

const props = defineProps<{
  data: {
    icon: string
    datetime: number
    feelslike: number
    precipprob: number
  }[]
}>()
</script>
