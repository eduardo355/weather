<template>
  <div class="flex justify-center items-center text-white">
    <div class="w-1/2">
      <div
        class="bg-gradient-to-r from-sky-900 from-50% via-sky-700 via-90% w-full px-4 py-4 rounded-t-md"
      >
        <span class="text-xl font-semibold">{{ location }}</span>
      </div>
      <div
        class="bg-gradient-to-r from-sky-400 from-50% via-sky-500 via-90% w-full px-10 py-8 flex items-center justify-between rounded-b-md"
      >
        <div class="flex flex-col font-semibold">
          <span class="text-9xl">{{ temperature }}°</span>
          <span class="text-2xl">{{ conditions }}</span>
          <p class="text-lg mt-4">
            {{ description }}
          </p>
        </div>
        <PartlyCloudyIcon />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PartlyCloudyIcon from '@/components/icons/PartlyCloudyIcon.vue'

defineProps<{
  location: string
  temperature: string
  conditions: string
  description: string
}>()
</script>
