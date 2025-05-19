<template>
  <main class="mt-10 px-4 mx-auto">
    <div v-if="isLoading" class="space-y-8">
      <div class="h-40 bg-sky-300 rounded-xl animate-pulse"></div>
      <div class="h-32 bg-sky-300 rounded-xl animate-pulse"></div>
      <div class="h-64 bg-sky-300 rounded-xl animate-pulse"></div>
    </div>

    <div v-else-if="address && weatherData && notGeolocation" class="space-y-12">
      <CardWeatherDayComponent
        :location="address"
        :icon="weatherData.icon"
        :temperature="weatherData.temp"
        :conditions="weatherData.conditions"
        :description="weatherData.description"
      />
      <CardWeatherSummary
        :address="address"
        :uv="weatherData.uv"
        :dew="weatherData.dew"
        :tempMaxMin="temMaxMin"
        :humidity="weatherData.humidity"
        :pressure="weatherData.pressure"
        :feelslike="weatherData.feelslike"
        :windSpeed="weatherData.windSpeed"
        :moonphase="weatherData.moonphase"
        :visibility="weatherData.visibility"
      />
      <CardHourlyForecast :data="weatherData.hours" />
      <CardDaysForecast :data="weatherData.days" />
    </div>

    <div class="flex justify-center items-center w-full mt-32 px-4" v-if="notGeolocation === false">
      <h2 class="font-bold text-2xl text-center text-red-600 max-w-md">
        Debes aceptar los permisos para acceder al clima de tu localidad. :(
      </h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import CardWeatherDayComponent from '@/components/CardWeatherDayComponent.vue'
import CardWeatherSummary from '@/components/CardWeatherSummary.vue'
import CardHourlyForecast from '@/components/CardHourlyForecast.vue'
import CardDaysForecast from '@/components/CardDaysForecast.vue'
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'
import { getMoonPhaseText } from '@/utils/getMoonPhaseText'
import { convertMphToKmh } from '@/utils/convertMphToKmh'
import { useActionsStore } from '@/stores/actions'
import { ref, computed } from 'vue'

const useActions = useActionsStore()
const { geolocation, getWeatherForLatitudeAndLongitude } = useActions

const address = ref('')
const notGeolocation = ref(true)
const isLoading = ref(true)

const weatherData = ref({
  uv: 0,
  dew: '',
  temp: '',
  icon: '',
  tempMax: '',
  tempMin: '',
  humidity: 0,
  pressure: 0,
  moonphase: '',
  feelslike: '',
  visibility: 0,
  windSpeed: '',
  conditions: '',
  description: '',
  hours: [],
  days: []
})

const temMaxMin = computed(() => {
  return `${weatherData.value.tempMax}° | ${weatherData.value.tempMin}°`
})

navigator.geolocation?.getCurrentPosition(success, error)

type location = {
  road: string
  city: string
  state: string
  county: string
}

async function success(position: GeolocationPosition) {
  const { latitude, longitude } = position.coords
  if (latitude && longitude) {
    try {
      await getWeather(latitude, longitude)
      const locationResult = (await geolocation(position)) as location
      address.value = `${locationResult.city}, ${locationResult.road}, ${locationResult.state}`
      notGeolocation.value = true
    } finally {
      isLoading.value = false
    }
  }
}

async function getWeather(latitude: number, longitude: number) {
  const resultWeather = await getWeatherForLatitudeAndLongitude(latitude, longitude)
  weatherData.value = {
    hours: resultWeather.days[0].hours,
    description: resultWeather.description,
    icon: resultWeather.currentConditions.icon,
    uv: resultWeather.currentConditions.uvindex,
    humidity: resultWeather.currentConditions.humidity,
    pressure: resultWeather.currentConditions.pressure,
    visibility: resultWeather.currentConditions.visibility,
    conditions: resultWeather.currentConditions.conditions,
    tempMax: fahrenheitToCelsius(resultWeather.days[0].tempmax),
    tempMin: fahrenheitToCelsius(resultWeather.days[0].tempmin),
    dew: fahrenheitToCelsius(resultWeather.currentConditions.dew),
    temp: fahrenheitToCelsius(resultWeather.currentConditions.temp),
    windSpeed: convertMphToKmh(resultWeather.currentConditions.windspeed),
    moonphase: getMoonPhaseText(resultWeather.currentConditions.moonphase),
    feelslike: fahrenheitToCelsius(resultWeather.currentConditions.feelslike),
    days: resultWeather.days
  }
}

function error() {
  notGeolocation.value = false
  isLoading.value = false
}
</script>
