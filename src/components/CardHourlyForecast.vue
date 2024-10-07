<template>
  <div class="flex justify-center items-center">
    <div class="w-1/2 px-4 py-4">
      <h1 class="text-2xl font-semibold">Pronóstico por hora</h1>

      <!-- Contenedor con animación -->
      <div :class="isExpanded && 'max-h-auto'" class="overflow-hidden">
        <div
          v-for="(hour, index) in visibleData"
          :key="index"
          class="grid grid-cols-4 place-content-center place-items-center items-center py-2"
        >
          <span>{{ formattedTime(hour.datetime) }}</span>
          <span class="text-sky-500 text-4xl font-semibold">
            {{ fahrenheitToCelsius(hour.feelslike) }}°
          </span>
          <span>{{ hour.icon }}</span>
          <div class="flex items-center space-x-2">
            <RainIcon />
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
import RainIcon from './icons/RainIcon.vue'
import { formattedTime } from '@/utils/formattedTime'
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const visibleData = computed(() => {
  return isExpanded.value ? props.data : props.data.slice(0, 11)
})

const props = defineProps<{
  data: {
    datetime: number
    feelslike: number
    icon: string
    precipprob: number
  }[]
}>()
</script>
