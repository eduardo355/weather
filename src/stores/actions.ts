import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  async function geolocation(position: any) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const apiKey = '12cafa40a27748b4b859d853d72dd9f2'
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const components = data.results[0].components
        const country = components.country
        const state = components.state
        return { country, state, latitude, longitude }
      })
      .catch((error) => console.error('Error al obtener los datos de ubicación:', error))
  }

  async function getWeatherForLatitudeAndLongitude(latitude: number, longitude: number) {
    return fetch(`https://wheater-api.fly.dev/api/weather/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => console.error('Error al obtener los datos del clima:', error))
  }
  return { count, doubleCount, geolocation, getWeatherForLatitudeAndLongitude }
})
