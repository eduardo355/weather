<template>
  <main class="mt-10">
    <div v-if="address && weatherData && notGeolocation" class="space-y-12">
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
    <div class="flex justify-center items-center w-full mt-80" v-else>
      <h2 class="font-bold text-2xl text-center text-balance">
        Debes de aceptar los permisos para acceder al clima de tu localidad. :(
      </h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useActionsStore } from '@/stores/actions'
import { convertMphToKmh } from '@/utils/convertMphToKmh'
import { getMoonPhaseText } from '@/utils/getMoonPhaseText'
import { fahrenheitToCelsius } from '@/utils/fahrenheitToCelsius'
import CardHourlyForecast from '@/components/CardHourlyForecast.vue'
import CardWeatherSummary from '@/components/CardWeatherSummary.vue'
import CardWeatherDayComponent from '@/components/CardWeatherDayComponent.vue'
import CardDaysForecast from '@/components/CardDaysForecast.vue'

const useActions = useActionsStore()
const { geolocation, getWeatherForLatitudeAndLongitude } = useActions

const address = ref('')
const notGeolocation = ref(true)
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
    await getWeather(latitude, longitude)
    const locationResult = (await geolocation(position)) as location
    address.value = `${locationResult.city}, ${locationResult.road}, ${locationResult.state}`
  }
}

async function getWeather(latitude: number, longitude: number) {
  try {
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
  } catch (err) {
    console.error('Error fetching weather data:', err)
  }
}

function error() {
  notGeolocation.value = false
}
</script>
