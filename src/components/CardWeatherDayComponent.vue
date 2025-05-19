<template>
  <div class="flex justify-center text-white">
    <div class="w-full lg:w-4/5 xl:w-2/3 px-4">
      <div
        class="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-700 px-6 py-5 rounded-t-2xl shadow-md"
      >
        <span class="text-2xl font-semibold tracking-wide">{{ location }}</span>
      </div>

      <div
        class="bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300 px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-b-2xl shadow-lg"
      >
        <div class="text-center md:text-left flex flex-col font-medium">
          <span class="text-7xl md:text-9xl font-bold leading-tight drop-shadow"
            >{{ temperature }}°</span
          >
          <span class="text-2xl md:text-3xl mt-2 capitalize">{{ conditions }}</span>
          <p class="text-base md:text-lg mt-4 leading-relaxed max-w-md">
            {{ description }}
          </p>
        </div>
        <component :is="generateTemperatureIcon(icon)" class="h-52 md:h-60 drop-shadow-xl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { generateTemperatureIcon } from '@/utils/generateTemperatureIcon'

defineProps<{
  icon: string
  location: string
  conditions: string
  temperature: string
  description: string
}>()
</script>
