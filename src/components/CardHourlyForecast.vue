<template>
  <div class="flex justify-center text-white">
    <div class="w-full lg:w-4/5 xl:w-2/3 px-4 py-6">
      <div class="bg-slate-800 px-6 py-4 rounded-t-2xl shadow-md">
        <h2 class="text-2xl font-semibold tracking-wide">Pronóstico por hora</h2>
      </div>

      <div
        class="bg-slate-700 rounded-b-2xl shadow-lg overflow-hidden transition-all"
        :class="{ 'max-h-auto': isExpanded }"
      >
        <div
          v-for="(hour, index) in visibleData"
          :key="index"
          class="grid grid-cols-4 items-center text-sm md:text-base gap-y-3 px-6 py-4 border-b border-white/10"
        >
          <span class="text-white/90 font-medium">{{ formattedTime(hour.datetime) }}</span>

          <span class="text-sky-500 font-bold text-xl md:text-2xl">
            {{ fahrenheitToCelsius(hour.feelslike) }}°
          </span>

          <component :is="generateTemperatureIcon(hour.icon)" class="h-12 md:h-14 drop-shadow" />

          <div class="flex items-center space-x-2 text-white/80">
            <component :is="generateTemperatureIcon('rain')" class="h-5 md:h-6" />
            <span>{{ hour.precipprob }}%</span>
          </div>
        </div>
      </div>

      <button
        @click="toggleExpand"
        class="mt-4 w-full py-2 rounded-lg font-semibold text-white bg-sky-500 hover:bg-sky-600 transition"
      >
        {{ isExpanded ? 'Ver menos' : 'Próximas 13 horas' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateTemperatureIcon } from '@/utils/generateTemperatureIcon'
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'
import { formattedTime } from '@/utils/formattedTime'
import { ref, computed } from 'vue'

const isExpanded = ref(false)
const toggleExpand = () => (isExpanded.value = !isExpanded.value)

const props = defineProps<{
  data: {
    icon: string
    datetime: number
    feelslike: number
    precipprob: number
  }[]
}>()

const visibleData = computed(() => (isExpanded.value ? props.data : props.data.slice(0, 11)))
</script>
