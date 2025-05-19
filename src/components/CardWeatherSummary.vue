<template>
  <div class="flex justify-center items-center py-8">
    <div class="w-full lg:w-4/5 xl:w-2/3 px-4 space-y-4">
      <h2 class="text-3xl font-bold text-center text-slate-800">El tiempo en {{ address }} hoy</h2>

      <div class="bg-white shadow-md rounded-2xl p-6">
        <div class="text-center mb-6">
          <p class="text-lg text-slate-600">Sensación térmica</p>
          <p class="text-6xl font-extrabold text-sky-700">{{ feelslike }}°</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(item, index) in firstColumn"
            :key="index"
            class="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
            <div class="flex items-center space-x-2 text-slate-700">
              <component :is="item.icon" class="w-5 h-5 text-sky-700" />
              <span>{{ item.label }}</span>
            </div>
            <span class="text-slate-800">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-2xl p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(item, index) in secondColumn"
            :key="index"
            class="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
            <div class="flex items-center space-x-2 text-slate-700">
              <component :is="item.icon" class="w-5 h-5 text-purple-500" />
              <span>{{ item.label }}</span>
            </div>
            <span class="text-slate-800">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TemperatureIcon from './icons/TemperatureIcon.vue'
import VisibilityIcon from './icons/VisibilityIcon.vue'
import PressureIcon from './icons/PressureIcon.vue'
import HumidityIcon from './icons/HumidityIcon.vue'
import DropletIcon from './icons/DropletIcon.vue'
import WaxingIcon from './icons/WaxingIcon.vue'
import WindIcon from './icons/WindIcon.vue'
import UvIcon from './icons/UvIcon.vue'

const props = defineProps<{
  uv: number
  dew: string
  address: string
  humidity: number
  pressure: number
  moonphase: string
  windSpeed: string
  feelslike: string
  visibility: number
  tempMaxMin: string
}>()

const firstColumn = [
  { icon: TemperatureIcon, label: 'Max./Min.', value: props.tempMaxMin },
  { icon: HumidityIcon, label: 'Humedad', value: `${props.humidity}%` },
  { icon: PressureIcon, label: 'Presión', value: `${props.pressure} mb` },
  { icon: VisibilityIcon, label: 'Visibilidad', value: `${props.visibility} km` }
]

const secondColumn = [
  { icon: WindIcon, label: 'Viento', value: `${props.windSpeed} km/h` },
  { icon: DropletIcon, label: 'Punto de rocío', value: `${props.dew}°` },
  { icon: UvIcon, label: 'Índice UV', value: `${props.uv} de 11` },
  { icon: WaxingIcon, label: 'Fase lunar', value: props.moonphase }
]
</script>
