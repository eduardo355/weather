<template>
  <div class="flex justify-center items-center">
    <div class="lg:w-1/2 w-full px-4 py-4">
      <span class="text-2xl font-semibold">El tiempo en {{ address }} Hoy</span>
      <div class="mt-6 flex flex-col px-6">
        <span class="md:text-xl text-lg">Sensacion termica</span>
        <span class="text-6xl font-semibold">{{ feelslike }}°</span>
      </div>
      <div class="flex justify-evenly space-x-8 text-sm md:text-base">
        <div class="w-full">
          <div class="border-b px-4 py-2 border-slate-300 flex justify-between">
            <div class="flex items-center space-x-2">
              <TemperatureIcon />
              <span> Max./Min. </span>
            </div>
            <span>{{ tempMaxMin }}</span>
          </div>
          <div class="border-b px-4 py-2 border-slate-300 flex justify-between">
            <div class="flex items-center space-x-2">
              <HumidityIcon />
              <span>Humedad</span>
            </div>
            <span>{{ humidity }}%</span>
          </div>
          <div class="border-b px-4 py-2 border-slate-300 flex justify-between">
            <div class="flex items-center space-x-2">
              <PressureIcon />
              <span>Presion</span>
            </div>
            <span>{{ pressure }} mb</span>
          </div>
          <div class="px-4 py-2 flex justify-between">
            <div class="flex items-center space-x-2">
              <VisibilityIcon />
              <span>Visibilidad</span>
            </div>
            <span>{{ visibility }} km</span>
          </div>
        </div>
        <div class="w-full">
          <div class="border-b px-4 py-2 border-slate-300 flex justify-between">
            <div class="flex items-center space-x-2">
              <WindIcon />
              <span>Viento</span>
            </div>
            <span>{{ windSpeed }} Km/h</span>
          </div>
          <div class="border-b px-4 py-2 border-slate-300 flex justify-between">
            <div class="flex items-center space-x-2">
              <DropletIcon />
              <span>Punto de rocio</span>
            </div>
            <span>{{ dew }}°</span>
          </div>
          <div class="border-b px-4 py-2 border-slate-300 flex justify-between">
            <div class="flex items-center space-x-2">
              <UvIcon />
              <span>Indice UV</span>
            </div>
            <span>{{ uv }} de 11</span>
          </div>
          <div class="px-4 py-2 flex justify-between">
            <div class="flex items-center space-x-2">
              <WaxingIcon />
              <span>Fase lunar</span>
            </div>
            <span>{{ moonphase }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UvIcon from './icons/UvIcon.vue'
import WindIcon from './icons/WindIcon.vue'
import WaxingIcon from './icons/WaxingIcon.vue'
import DropletIcon from './icons/DropletIcon.vue'
import HumidityIcon from './icons/HumidityIcon.vue'
import PressureIcon from './icons/PressureIcon.vue'
import VisibilityIcon from './icons/VisibilityIcon.vue'
import TemperatureIcon from './icons/TemperatureIcon.vue'

defineProps<{
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
</script>
